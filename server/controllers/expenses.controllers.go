package controllers

import (
	"encoding/json"
	"net/http"

	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/models"
	"github.com/ZakharVD/finlio/utils"
	"github.com/google/uuid"
	"github.com/gorilla/mux"
)

func AddExpense(w http.ResponseWriter, r *http.Request) {
	// add new expense and return updated list of expenses and statistics

	userID := r.Context().Value("userID").(string)

	vars := mux.Vars(r)
	collectionId := vars["collectionId"]

	var expense models.Expense // req body
	var collection models.Collection

	// decode json
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&expense); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect fileds types")
		return
	}

	// check if collection where adding exists
	if result := database.DB.Where("id = ?", collectionId).First(&collection); result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Collection does not exist")
		return
	}

	// check inputs
	if expense.Amount < 1 || len(expense.Day) < 1 || len(expense.Label) < 1 {
		utils.RespondWithError(w, http.StatusBadRequest, "Incomplete fields")
		return
	}

	// generate new UUID for the user
	expense.ID = uuid.New()

	expense.UserId = userID
	expense.CollectionId = collectionId

	// create
	database.DB.Create(&expense)

	// get updated expenses
	expenses, totalExpense, err := utils.GetExpensesAndTotal(userID, collectionId)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}
	// get updated statistics
	statistics, err := utils.GetStatisticsForCollection(userID, collectionId)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	type ResponseData struct {
		Expenses     []models.Expense `json:"expenses"`
		TotalExpense int              `json:"totalExpense"`
		Statistics   utils.Statistics `json:"statistics"`
	}

	responseData := ResponseData{
		Expenses:     expenses,
		TotalExpense: totalExpense,
		Statistics:   statistics,
	}

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(responseData)

}

func GetExpensesAndStatistics(w http.ResponseWriter, r *http.Request) {
	// get expenses and statistics for collection

	userID := r.Context().Value("userID").(string)

	vars := mux.Vars(r)
	collectionId := vars["collectionId"]

	expenses, totalExpense, err := utils.GetExpensesAndTotal(userID, collectionId)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	statistics, err := utils.GetStatisticsForCollection(userID, collectionId)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	type ResponseData struct {
		Expenses     []models.Expense `json:"expenses"`
		TotalExpense int              `json:"totalExpense"`
		Statistics   utils.Statistics `json:"statistics"`
	}

	responseData := ResponseData{
		Expenses:     expenses,
		TotalExpense: totalExpense,
		Statistics:   statistics,
	}

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(responseData)
}

func GetExpense(w http.ResponseWriter, r *http.Request) {
	// get single expense by id

	vars := mux.Vars(r)
	expenseId := vars["expenseId"]

	var expense models.Expense

	result := database.DB.Where("id = ?", expenseId).Find(&expense)
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}
	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(expense)
}

func DeleteExpense(w http.ResponseWriter, r *http.Request) {
	// delete expense by id

	// userID := r.Context().Value("userID").(string)

	vars := mux.Vars(r)
	expenseId := vars["expenseId"]

	var expense models.Expense

	// delete related expenses
	result := database.DB.Where("id = ?", expenseId).Delete(&expense)
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusNotFound, "Expense does not exist.")
		return
	}
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	utils.RespondWithMessage(w, http.StatusOK, "Expense have been deleted.")
}

func UpdateExpense(w http.ResponseWriter, r *http.Request) {
	// update expense

	vars := mux.Vars(r)
	expenseId := vars["expenseId"]

	var expense models.Expense

	// decode json
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&expense); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect fileds types.")
		return
	}

	var existingExpense models.Expense

	result := database.DB.Where("id = ?", expenseId).First(&existingExpense)
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Expense does not exist.")
		return
	}

	// check inputs
	if expense.Amount < 1 || len(expense.Day) < 1 || len(expense.Label) < 1 {
		utils.RespondWithError(w, http.StatusBadRequest, "Incomplete fields")
		return
	}

	existingExpense.Amount = expense.Amount
	existingExpense.Day = expense.Day
	existingExpense.Description = expense.Description
	existingExpense.Label = expense.Label

	database.DB.Save(&existingExpense)

	utils.RespondWithMessage(w, http.StatusOK, "Expense have been updated.")
}
