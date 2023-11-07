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

func CreateGoal(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)

	var goal models.Goal

	// Decode JSON
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&goal); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect field types")
		return
	}

	// Validate input
	if goal.TargetAmount < 1 {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid value")
		return
	}

	// Attempt to find an existing goal for the user
	existingGoal := models.Goal{}
	result := database.DB.Where("user_id = ?", userID).First(&existingGoal)

	if result.RowsAffected == 0 {
		// No existing goal, create a new one
		goal.ID = uuid.New()
		goal.UserId = userID
		database.DB.Create(&goal)
	} else {
		// Update the existing goal
		existingGoal.Name = goal.Name
		existingGoal.TargetAmount = goal.TargetAmount
		existingGoal.Amount = goal.Amount
		database.DB.Save(&existingGoal)
		goal = existingGoal // Use the updated goal in the response
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(&goal)
}

func AddToGoal(w http.ResponseWriter, r *http.Request) {
	// add amount to existing goal

	userID := r.Context().Value("userID").(string)

	vars := mux.Vars(r)
	goalID := vars["goalId"]

	var addToGoalRequest struct {
		AmountToAdd int `json:"amountToAdd"`
	}

	// Decode JSON
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&addToGoalRequest); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect field types")
		return
	}

	// Validate input
	if addToGoalRequest.AmountToAdd <= 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid value")
		return
	}

	// Find the goal to update
	existingGoal := models.Goal{}
	result := database.DB.Where("id = ? AND user_id = ?", goalID, userID).First(&existingGoal)

	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Goal does not exist")
		return
	}

	// Update the existing goal's amount
	existingGoal.Amount += addToGoalRequest.AmountToAdd
	database.DB.Save(&existingGoal)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&existingGoal)

}

func GetGoal(w http.ResponseWriter, r *http.Request) {
	// get a goal avaiable to user

	userID := r.Context().Value("userID").(string)

	var goal models.Goal

	result := database.DB.Where("user_id = ?", userID).Find(&goal)
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(goal)
}
