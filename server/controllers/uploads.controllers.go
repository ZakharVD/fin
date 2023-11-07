package controllers

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/models"
	"github.com/ZakharVD/finlio/utils"
	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/awserr"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/s3"
	"github.com/joho/godotenv"
)

func UploadFile(w http.ResponseWriter, r *http.Request) {
	// upload a user profile picture

	godotenv.Load()

	userID := r.Context().Value("userID").(string)

	// create an S3 session
	s3Session, err := session.NewSession(&aws.Config{})
	if err != nil {
		fmt.Println("Failed to create AWS session.", err)
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	// parse data
	err = r.ParseMultipartForm(10 << 20)
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "File is too large.")
		return
	}

	// retrieve the uploaded file
	file, _, err := r.FormFile("file")
	if err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Failed to get the file.")
		return
	}
	defer file.Close()

	// generate a unique file name
	objectKey := fmt.Sprintf("uploads/%s/profile-photo", userID)

	bucketname := os.Getenv("AWS_BUCKET_NAME")

	// create a new s3 client
	client := s3.New(s3Session)

	// create a s3 request to upload the file
	_, err = client.PutObject(&s3.PutObjectInput{
		Bucket: aws.String(bucketname),
		Key:    aws.String(objectKey),
		Body:   file,
	})
	if err != nil {
		if awserr, ok := err.(awserr.Error); ok {
			log.Println("AWS error", awserr.Error())
			utils.RespondWithError(w, http.StatusInternalServerError, "Error")
			return
		} else {
			log.Println("Error", err)
			utils.RespondWithError(w, http.StatusInternalServerError, "Error")
			return
		}
	}

	// update user field to indicate they have a profile picture
	var existingUser models.User
	if result := database.DB.Where("id = ?", userID).First(&existingUser); result.Error != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "User does not exist.")
	}
	existingUser.HaveProfileImage = true
	database.DB.Save(&existingUser)

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(existingUser)
}

func DeleteFile(w http.ResponseWriter, r *http.Request) {
	// delete user profile picture

	godotenv.Load()

	userID := r.Context().Value("userID").(string)

	// create an S3 session
	s3Session, err := session.NewSession(&aws.Config{})
	if err != nil {
		fmt.Println("Failed to create AWS session.", err)
		utils.RespondWithError(w, http.StatusInternalServerError, "Error")
		return
	}

	// create a new s3 client
	client := s3.New(s3Session)

	objectKey := fmt.Sprintf("uploads/%s/profile-photo", userID)
	bucketname := os.Getenv("AWS_BUCKET_NAME")

	// Create a delete request
	if _, err = client.DeleteObject(&s3.DeleteObjectInput{
		Bucket: aws.String(bucketname),
		Key:    aws.String(objectKey),
	}); err != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "Error")
		return
	}

	// update user entry
	var existingUser models.User
	if result := database.DB.Where("id = ?", userID).First(&existingUser); result.Error != nil {
		utils.RespondWithError(w, http.StatusBadRequest, "User does not exist.")
	}
	existingUser.HaveProfileImage = false
	database.DB.Save(&existingUser)

	// return json
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	json.NewEncoder(w).Encode(existingUser)
}
