package models

import "github.com/google/uuid"

type Collection struct {
	ID             uuid.UUID `json:"id" gorm:"type:uuid;primaryKey"`
	CollectionName string    `json:"collectionName"`
	UserId         string    `json:"userId" gorm:"type:uuid;references:User"`
}

// Define a foreign key constraint
func (p *Collection) TableName() string {
	return "collections"
}
