package handlers

import (
	"net/http"
	"strconv"

	"github.com/Eren-Yeaager/defi-analytics-platform/models"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init(db *gorm.DB) {
	DB = db
}
func GetTokens(c *gin.Context) {
	var tokens []models.Token
	if err := DB.Find(&tokens).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, tokens)
}
func GetTokenByID(c *gin.Context) {
	idStr := c.Param("id")
	id, err := strconv.Atoi(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid token"})
		return
	}
	var token models.Token
	if err := DB.First(&token, id).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			c.JSON(http.StatusNotFound, gin.H{"error": "Token not found"})
		} else {
			c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		}

		return
	}
	c.JSON(http.StatusOK, token)

}
func CreateToken(c *gin.Context) {
	var newToken models.Token
	if err := c.ShouldBindJSON(&newToken); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	if err := DB.Create(&newToken).Error; err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusCreated, newToken)
}
