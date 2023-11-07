package controllers

import (
	"encoding/json"
	"net/http"
	"os"
	"time"

	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/models"
	"github.com/ZakharVD/finlio/utils"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/google/uuid"
	"github.com/joho/godotenv"
	"golang.org/x/crypto/bcrypt"
)

func RegisterUser(w http.ResponseWriter, r *http.Request) {
	godotenv.Load(".env")
	secret := os.Getenv("JWT_SECRET")

	var user models.User

	// decode json
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect fileds types")
		return
	}

	// validate inputs
	if len(user.FirstName) == 0 || len(user.LastName) == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Required fields not comleted")
		return
	}
	if !utils.ValidateEmail(user.Email) {
		utils.RespondWithError(w, http.StatusBadRequest, "Email is invalid format")
		return
	}
	if len(user.Password) < 6 {
		utils.RespondWithError(w, http.StatusBadRequest, "Password must be at least 6 characters")
		return
	}

	// check if the email is already in use:
	result := database.DB.Where("email = ?", user.Email).First(&user)
	if result.RowsAffected > 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "Email already in use")
		return
	}

	// generate new UUID for the user
	user.ID = uuid.New()

	// hash the password
	hasheadPassword, err := bcrypt.GenerateFromPassword([]byte(user.Password), 5)
	if err != nil {
		http.Error(w, "Failed to create a hash", http.StatusInternalServerError)
		return
	}
	user.Password = string(hasheadPassword)

	user.HaveProfileImage = false

	// create new user entry
	database.DB.Create(&user)

	// issue a JWT
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.ID.String(),
		ExpiresAt: jwt.NewTime(float64(time.Now().Add(time.Hour * 24).Unix())),
	})
	token, err := claims.SignedString([]byte(secret))
	if err != nil {
		http.Error(w, "Failed to issue jwt", http.StatusInternalServerError)
	}

	// return success message to the client
	// successResponse := struct {
	// 	Message string `json:"message"`
	// }{"user created success"}
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Authorization", "Bearer "+token)
	w.WriteHeader(http.StatusCreated)
	json.NewEncoder(w).Encode(user)
}

func LoginUser(w http.ResponseWriter, r *http.Request) {
	godotenv.Load(".env")
	secret := os.Getenv("JWT_SECRET")

	type Req struct {
		Email    string
		Password string
	}
	var data Req
	var user models.User

	// decode email and password from reqest body
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&data); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect fileds types")
		return
	}

	// validate inputs
	if !utils.ValidateEmail(data.Email) {
		utils.RespondWithError(w, http.StatusBadRequest, "Email format is invalid")
		return
	}
	if len(data.Password) < 6 {
		utils.RespondWithError(w, http.StatusBadRequest, "Password must be at least 6 characters")
		return
	}

	// check if the user exists
	result := database.DB.Where("email = ?", data.Email).First(&user)
	if result.Error != nil {
		utils.RespondWithError(w, http.StatusUnauthorized, "User with such email does not exist")
		return
	}
	// verify the password
	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(data.Password)); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect password")
		return
	}
	// issue a JWT
	claims := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.StandardClaims{
		Issuer:    user.ID.String(),
		ExpiresAt: jwt.NewTime(float64(time.Now().Add(time.Hour * 24).Unix())),
	})
	token, err := claims.SignedString([]byte(secret))
	if err != nil {
		http.Error(w, "Failed to issue jwt", http.StatusInternalServerError)
	}

	// return user as json with the token
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Authorization", "Bearer "+token)
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(user)
}

func UpdateProfile(w http.ResponseWriter, r *http.Request) {
	// update user first name and last name

	userID := r.Context().Value("userID").(string)

	var user models.User

	// Decode JSON
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect field types")
		return
	}

	if len(user.FirstName) < 1 || len(user.LastName) < 1 {
		utils.RespondWithError(w, http.StatusBadRequest, "Invalid value")
		return
	}

	existingUser := models.User{}
	result := database.DB.Where("id = ?", userID).First(&existingUser)
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "User with such id does not exist.")
	}

	existingUser.FirstName = user.FirstName
	existingUser.LastName = user.LastName

	database.DB.Save(&existingUser)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&existingUser)
}

func UpdateEmail(w http.ResponseWriter, r *http.Request) {
	// update the email of the user

	userID := r.Context().Value("userID").(string)

	var user models.User

	// Decode JSON
	decoder := json.NewDecoder(r.Body)
	if err := decoder.Decode(&user); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Incorrect field types")
		return
	}

	// validate inputs
	if !utils.ValidateEmail(user.Email) {
		utils.RespondWithError(w, http.StatusBadRequest, "Email format is invalid")
		return
	}

	existingUser := models.User{}

	// check if the user exists
	result := database.DB.Where("id = ?", userID).First(&existingUser)
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "User with such id does not exist.")
		return
	}

	// check if the email is already in use:
	if result := database.DB.Where("email = ?", user.Email).First(&user); result.RowsAffected > 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "This email is already in use.")
		return
	}

	existingUser.Email = user.Email

	database.DB.Save(&existingUser)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(&existingUser)
}

func DeleteUser(w http.ResponseWriter, r *http.Request) {
	// delete user

	userID := r.Context().Value("userID").(string)

	var user models.User

	result := database.DB.Where("id = ?", userID).Delete(&user)
	if result.RowsAffected == 0 {
		utils.RespondWithError(w, http.StatusBadRequest, "User with such id does not exist.")
		return
	}

	if result.Error != nil {
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	utils.RespondWithMessage(w, http.StatusOK, "User account have been deleted.")
}
