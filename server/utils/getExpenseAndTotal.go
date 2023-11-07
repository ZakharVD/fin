package utils

import (
	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/models"
)

func GetExpensesAndTotal(userID, collectionId string) ([]models.Expense, int, error) {
	var expenses []models.Expense
	var totalExpense int

	if result := database.DB.Where("user_id = ? AND collection_id = ?", userID, collectionId).Order("day DESC").Find(&expenses); result.Error != nil {
		return nil, 0, result.Error
	}
	// get updated sum
	if len(expenses) > 0 {
		if result := database.DB.Model(&models.TotalExpense{}).Select("SUM(CAST(amount AS INTEGER)) as Expense").Where("collection_id = ?", collectionId).Scan(&totalExpense); result.Error != nil {
			return nil, 0, result.Error
		}
	} else {
		return []models.Expense{}, 0, nil
	}

	return expenses, totalExpense, nil
}
