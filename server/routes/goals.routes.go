package routes

import (
	"github.com/ZakharVD/finlio/controllers"
	"github.com/gorilla/mux"
)

var GoalsRoutes = func(router *mux.Router) {
	// those routes are prefixed with "/dashboard" !
	router.HandleFunc("/goals", controllers.CreateGoal).Methods("POST")
	router.HandleFunc("/goals", controllers.GetGoal).Methods("GET")
	router.HandleFunc("/goals/{goalId}", controllers.AddToGoal).Methods("POST")
}
