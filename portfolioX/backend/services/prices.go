package services

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/Eren-Yeaager/defi-analytics-platform/models"
	"gorm.io/gorm"
)

var SymbolToID = map[string]string{
	"BTC": "bitcoin",
	"ETH": "ethereum",
	"SOL": "solana",
}

func FetchPrices(tokenIDs []string) (map[string]float64, error) {
	ids := ""
	for i, id := range tokenIDs {
		if i > 0 {
			ids += ","
		}
		ids += id
	}
	url := fmt.Sprintf("https://api.coingecko.com/api/v3/simple/price?ids=%s&vs_currencies=usd", ids)

	resp, err := http.Get(url)
	if err != nil {
		return nil, err
	}
	defer resp.Body.Close()
	var result map[string]map[string]float64
	if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
		return nil, err
	}

	prices := make(map[string]float64)
	for k, v := range result {
		prices[k] = v["usd"]
	}
	return prices, nil
}

func UpdateAllTokenPricesInDB(db *gorm.DB, FetchPrices func([]string) (map[string]float64, error)) error {
	var tokens []models.Token
	if err := db.Find(&tokens).Error; err != nil {
		return err
	}

	var ids []string
	idToToken := make(map[string]*models.Token)
	for i := range tokens {
		coingeckoID, ok := SymbolToID[strings.ToUpper(tokens[i].Symbol)]
		if ok {
			ids = append(ids, coingeckoID)
			idToToken[coingeckoID] = &tokens[i]
		}
	}

	prices, err := FetchPrices(ids)
	if err != nil {
		return err
	}

	for id, price := range prices {
		token := idToToken[id]
		token.Price = price
		db.Save(token)
	}

	return nil
}
