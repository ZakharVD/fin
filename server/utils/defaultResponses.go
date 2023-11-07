package utils

import (
	"encoding/json"
	"log"
	"net/http"
)

func RespondWithError(w http.ResponseWriter, statusCode int, message string) {
	if statusCode > 499 {
		log.Printf("Server error: %v", message)
	}
	type errorRes struct {
		Error string `json:"error"`
	}
	RespondWithJSON(w, statusCode, errorRes{
		Error: message,
	})
}

func RespondWithMessage(w http.ResponseWriter, statusCode int, message string) {
	type messageRes struct {
		Message string `json:"message"`
	}
	RespondWithJSON(w, statusCode, messageRes{
		Message: message,
	})
}

func RespondWithJSON(w http.ResponseWriter, statusCode int, payload interface{}) {
	// try to convert payload into JSON
	data, err := json.Marshal(payload)
	if err != nil {
		log.Printf("Failed to conver to JSON: %v", payload)
		w.WriteHeader(500)
		return
	}
	// configure the header
	w.Header().Add("Content-type", "application/json")
	// configure the status code
	w.WriteHeader(statusCode)
	// return JSON
	w.Write((data))

}
