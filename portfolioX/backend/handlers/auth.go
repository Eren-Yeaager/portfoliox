package handlers

import (
	"encoding/hex"
	"math/rand"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/ethereum/go-ethereum/crypto"
	"github.com/gin-gonic/gin"
)

var nonces = make(map[string]string) // address -> nonce

func GetNonce(c *gin.Context) {
	address := c.Query("address")
	if address == "" {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Missing address"})
		return
	}
	nonce := generateNonce()
	nonces[address] = nonce
	c.JSON(http.StatusOK, gin.H{"nonce": nonce})
}

func generateNonce() string {
	rand.Seed(time.Now().UnixNano())
	const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
	b := make([]byte, 16)
	for i := range b {
		b[i] = letters[rand.Intn(len(letters))]
	}
	return string(b)
}

func VerifySignature(c *gin.Context) {
	var req struct {
		Address   string `json:"address"`
		Signature string `json:"signature"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	nonce, ok := nonces[req.Address]
	if !ok {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Nonce not found"})
		return
	}
	msg := []byte("\x19Ethereum Signed Message:\n" + strconv.Itoa(len(nonce)) + nonce)
	hash := crypto.Keccak256Hash(msg)

	sig, err := hex.DecodeString(strings.TrimPrefix(req.Signature, "0x"))
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid signature"})
		return
	}
	if sig[64] != 27 && sig[64] != 28 {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid signature (V value)"})
		return
	}
	sig[64] -= 27

	pubKey, err := crypto.SigToPub(hash.Bytes(), sig)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Signature verification failed"})
		return
	}
	recoveredAddr := crypto.PubkeyToAddress(*pubKey).Hex()
	if !strings.EqualFold(recoveredAddr, req.Address) {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Signature does not match address"})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "Authenticated", "address": req.Address})
}
