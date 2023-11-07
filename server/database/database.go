package database

import (
	"fmt"
	"os"

	"github.com/ZakharVD/finlio/models"
	"github.com/joho/godotenv"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDB() {
	godotenv.Load()
	host := os.Getenv("DB_HOST")
	port := os.Getenv("DB_PORT")
	user := os.Getenv("DB_USER")
	// dbName := os.Getenv("DB_NAME")
	password := os.Getenv("DB_PASSWORD")

	dsn := fmt.Sprintf("host=%s port=%s user=%s password=%s slmode=require", host, port, user, password)
	connection, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		panic("Could not connect to the database")
	}

	DB = connection

	connection.AutoMigrate(&models.User{}, &models.Collection{}, &models.Expense{}, &models.Income{}, &models.Goal{})
}
