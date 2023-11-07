package models

import "github.com/google/uuid"

type Income struct {
	ID           uuid.UUID `json:"id" gorm:"type:uuid;primaryKey"`
	Amount       int       `json:"amount" gorm:"not null"`
	CollectionId string    `json:"collectionId" gorm:"type:uuid;references:Collection;not null"`
	UserId       string    `json:"userId" gorm:"type:uuid;references:User;not null"`
}

func (e *Income) TableName() string {
	return "incomes"
}

type TotalIncome struct {
	Income int `json:"totalIncome"`
}

func (inc *TotalIncome) TableName() string {
	return "incomes"
}
