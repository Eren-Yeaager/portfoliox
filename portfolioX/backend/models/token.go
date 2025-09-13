package models

type Token struct {
	ID     uint    `grom:"primaryKey" json:"id"`
	Name   string  `json:"name" binding:"required"`
	Symbol string  `json:"symbol" binding:"required"`
	Price  float64 `json:"price" binding:"required,gt=0"`
}
