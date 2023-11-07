package models

import "github.com/google/uuid"

type Goal struct {
	ID           uuid.UUID `json:"id" gorm:"type:uuid;primaryKey"`
	Name         string    `json:"name" gorm:"not null"`
	TargetAmount int       `json:"targetAmount" gorm:"not null"`
	Amount       int       `json:"amount"`
	UserId       string    `json:"userId" gorm:"type:uuid;references:User;not null"`
}

func (g *Goal) TableName() string {
	return "goals"
}
