package models

import "github.com/google/uuid"

type Expense struct {
	ID           uuid.UUID `json:"id" gorm:"type:uuid;primaryKey"`
	Day          string    `json:"day" gorm:"not null"`
	Amount       int       `json:"amount" gorm:"not null"`
	Description  string    `json:"description"`
	Label        string    `json:"label" gorm:"not null"`
	CollectionId string    `json:"collectionId" gorm:"type:uuid;references:Collection;not null"`
	UserId       string    `json:"userId" gorm:"type:uuid;references:User;not null"`
}

func (e *Expense) TableName() string {
	return "expenses"
}

type TotalExpense struct {
	Expense int `json:"totalExpenses"`
}

func (e *TotalExpense) TableName() string {
	return "expenses"
}
