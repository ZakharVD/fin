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

func AddIncome(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)

	vars := mux.Vars(r)
	collectionId := vars["collectionId"]

	var income models.Income
	var currentIncome models.Income
	var collection models.Collection

	// decode json
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&income); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect fileds types")
		return
	}

	//validate input
	if income.Amount < 1 {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid value")
		return
	}

	// check if collection exists
	result := database.DB.Where("id = ?", collectionId).First(&collection)
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Collection does not exist")
		return
	}

	database.DB.Where("collection_id = ?", collectionId).First(&currentIncome)

	// Update the total income based on the new income
	currentIncome.Amount += income.Amount

	if currentIncome.ID == uuid.Nil {
		// If there's no existing entry, create one
		income.ID = uuid.New()
		income.CollectionId = collectionId
		income.UserId = userID
		database.DB.Create(&income)
	} else {
		// Update the existing entry
		database.DB.Save(&currentIncome)
	}

	// return
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&currentIncome)

}

func GetTotalIncome(w http.ResponseWriter, r *http.Request) {
	// get sum of income by collection ID

	vars := mux.Vars(r)
	collectionId := vars["collectionId"]

	var income models.Income

	result := database.DB.Where("collection_id = ?", collectionId).First(&income)
	if result.RowsAffected == 0 {
		w.Header().Set("Content-Type", "application/json")
		w.WriteHeader(http.StatusOK)
		json.NewEncoder(w).Encode(models.Income{})
		return
	}
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(income)
}

func UpdateIncome(w http.ResponseWriter, r *http.Request) {
	// update income for collection

	vars := mux.Vars(r)
	incomeId := vars["incomeId"]

	var updatedIncome models.Income
	var existingIncome models.Income

	// decode json
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&updatedIncome); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect fileds types")
		return
	}

	//validate input
	if updatedIncome.Amount < 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid value")
		return
	}

	// check if collection exists
	result := database.DB.Where("id = ?", incomeId).First(&existingIncome)
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Income does not exist")
		return
	}

	// Update the existing entry
	database.DB.Model(&existingIncome).Updates(updatedIncome)

	// return
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&existingIncome)
}
