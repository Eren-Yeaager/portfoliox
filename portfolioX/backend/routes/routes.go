package routes

import (
	"github.com/Eren-Yeaager/defi-analytics-platform/handlers"
	"github.com/gin-gonic/gin"
)

func RegisterRoutes(r *gin.Engine) {
	r.GET("/tokens", handlers.GetTokens)
	r.GET("/tokens/:id", handlers.GetTokenByID)
	r.POST("/tokens", handlers.CreateToken)
	r.PUT("/tokens/:id", handlers.UpdateToken)
	r.DELETE("/tokens/:id", handlers.DeleteToken)
	r.GET("/auth/nonce", handlers.GetNonce)
	r.POST("/auth/verify", handlers.VerifySignature)
}
