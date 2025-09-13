package main

import (
	"log"
	"net/http"
	"time"

	"github.com/Eren-Yeaager/defi-analytics-platform/handlers"
	"github.com/Eren-Yeaager/defi-analytics-platform/models"
	"github.com/Eren-Yeaager/defi-analytics-platform/routes"
	"github.com/Eren-Yeaager/defi-analytics-platform/services"
	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func main() {
	ConnectDatabase()
	DB.AutoMigrate(&models.Token{})
	handlers.Init(DB)
	r := gin.Default()
	r.Use(cors.Default())
	r.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{
			"message": "Welcome to PortfolioX",
		})
	})
	routes.RegisterRoutes(r)
	go func() {
		ticker := time.NewTicker(1 * time.Minute)
		defer ticker.Stop()
		for {
			log.Println("Updating token prices in background...")
			err := services.UpdateAllTokenPricesInDB(DB, services.FetchPrices)
			if err != nil {
				log.Println("Background price update failed:", err)
			}
			<-ticker.C
		}
	}()
	r.Run()
}
