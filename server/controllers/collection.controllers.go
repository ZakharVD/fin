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

func AddCollection(w http.ResponseWriter, r *http.Request) {
	userID := r.Context().Value("userID").(string)

	var collection models.Collection

	// decode json
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&collection); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Could not parse body")
		return
	}

	// validate inputs
	if len(collection.CollectionName) == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Input is invalid")
		return
	}

	// check if the collection already exists
	result := database.DB.Where("collection_name = ? AND user_id = ?", collection.CollectionName, userID).First(&collection)
	if result.RowsAffected > 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Collection already exists")
		return
	}

	// generate new UUID
	collection.ID = uuid.New()

	collection.UserId = userID

	// create  entry
	database.DB.Create(&collection)

	// return new collection
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(collection)
}

func GetCollections(w http.ResponseWriter, r *http.Request) {
	// get all collection for user

	userId := r.Context().Value("userID").(string)

	collections, err := utils.GetAllCollectionsForUser(userId)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(collections)
}

func GetCollection(w http.ResponseWriter, r *http.Request) {
	// get collection by its ID

	vars := mux.Vars(r)
	collectionId := vars["collectionId"]

	var collection models.Collection

	result := database.DB.Where("id = ?", collectionId).Find(&collection)
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(collection)
}

func DeleteCollection(w http.ResponseWriter, r *http.Request) {
	// delete collection by its ID

	userID := r.Context().Value("userID").(string)

	vars := mux.Vars(r)
	collectionId := vars["collectionId"]

	var collection models.Collection
	var expense models.Expense

	// delete Collection
	result := database.DB.Where("id = ?", collectionId).Delete(&collection)
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusNotFound, "Collection does not exist.")
		return
	}

	// delete related expenses
	if result := database.DB.Where("collection_id = ?", collectionId).Delete(&expense); result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	// delete related income

	// get updateCollections
	collections, err := utils.GetAllCollectionsForUser(userID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	// get updated statistics
	statistics, err := utils.GetStatistics(userID)
	if err != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}
	type ResponseData struct {
		Collections []models.Collection `json:"collections"`
		Statistics  utils.Statistics    `json:"statistics"`
	}
	responseData := ResponseData{
		Collections: collections,
		Statistics:  statistics,
	}

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(responseData)

}
