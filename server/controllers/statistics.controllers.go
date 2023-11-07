package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/models"
	"github.com/ZakharVD/finlio/utils"
)

func GetStatistics(w http.ResponseWriter, r *http.Request) {
	// get all statistics

	userID := r.Context().Value("userID").(string)

	statistics, err := utils.GetStatistics(userID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(statistics)
}

func GetTotalCashFlow(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)

	var totalExpense models.TotalExpense
	var totalIncome models.TotalIncome

	if result := database.DB.Model(&models.TotalExpense{}).Select("SUM(CAST(amount AS INTEGER)) as Expense").Where("user_id = ?", userID).Scan(&totalExpense); result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
	}
	if result := database.DB.Model(models.TotalIncome{}).Select("SUM(CAST(amount AS INTEGER)) as Income").Where("user_id = ?", userID).Scan(&totalIncome); result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
	}

	cashFlow := totalIncome.Income - totalExpense.Expense

	type ResponseData struct {
		TotalCashFlow int `json:"totalCashFlow"`
	}
	response := ResponseData{
		TotalCashFlow: cashFlow,
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(response)

}
