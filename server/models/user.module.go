package models

import "github.com/google/uuid"

type User struct {
	ID               uuid.UUID `json:"id" gorm:"type:uuid;primaryKey"`
	FirstName        string    `json:"firstName"`
	LastName         string    `json:"lastName"`
	Email            string    `json:"email" gorm:"unique"`
	Password         string    `json:"password"`
	HaveProfileImage bool      `json:"haveProfileImage"`
}

func (u *User) TableName() string {
	return "users"
}
