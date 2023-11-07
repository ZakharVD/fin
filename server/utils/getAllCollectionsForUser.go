package utils

import (
	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/models"
)

func GetAllCollectionsForUser(userId string) ([]models.Collection, error) {
	var collections []models.Collection

	// find the collection available to user based on his id
	result := database.DB.Where("user_id = ?", userId).Order("collection_name DESC").Find(&collections)
	if result.Error != nil {
		return nil, result.Error
	}

	return collections, nil
}
