package routes

import (
	"github.com/Eren-Yeaager/defi-analytics-platform/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/tokens", handlers.GetTokens)
	r.GET("/tokens/:id", handlers.GetTokenByID)
	r.POST("/tokens", handlers.CreateToken)
}
