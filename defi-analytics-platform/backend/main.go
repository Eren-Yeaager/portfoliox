package main

import (
	"net/http"

	"github.com/Eren-Yeaager/defi-analytics-platform/handlers"
	"github.com/Eren-Yeaager/defi-analytics-platform/models"
	"github.com/Eren-Yeaager/defi-analytics-platform/routes"
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
	r.Run()
}
