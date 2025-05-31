package main

import (
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)
func main(){
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	r := gin.Default()

	//CORS Middleware
	r.Use(func(c *gin.Context){
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
        c.Writer.Header().Set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Authorization")
		if c.Request.Method == "OPTIONS"{
			c.AbortWithStatus(204)
			return
		}
		c.Next()
	})

	//Health check-very imp tho
	r.GET("/health",func(c *gin.Context){
		c.JSON(200,gin.H{
			"status":"ok",
		})
	})
}