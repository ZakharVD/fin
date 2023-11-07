package main

import (
	"log"
	"net/http"
	"os"

	"github.com/ZakharVD/finlio/database"
	"github.com/ZakharVD/finlio/middlewares"
	"github.com/ZakharVD/finlio/routes"
	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"
)

func main() {
	godotenv.Load()

	database.ConnectDB()

	PORT := os.Getenv("PORT")

	c := cors.New(cors.Options{
		AllowedOrigins: []string{"*"},
		ExposedHeaders: []string{"Authorization", "*"},
		AllowedHeaders: []string{"Authorization", "*"},
		AllowedMethods: []string{"GET", "POST", "DELETE", "PUT"},
	})

	router := mux.NewRouter()

	dbRouter := router.PathPrefix("/dashboard").Subrouter()
	dbRouter.Use(middlewares.JWTMiddleware)

	handler := c.Handler(router)

	routes.UserRoutes(router)
	routes.UserRoutesProtected(dbRouter)
	routes.CollectionsRoutes(dbRouter)
	routes.ExpensesRoutes(dbRouter)
	routes.GoalsRoutes(dbRouter)
	routes.IncomesRoutes(dbRouter)
	routes.StatisticsRoutes(dbRouter)

	server := &http.Server{
		Addr:    ":" + PORT,
		Handler: handler,
	}

	log.Printf("Server is running on port: %v", PORT)

	if err := server.ListenAndServe(); err != nil {
		log.Fatal("Error starting a server ", err)
	}
}
