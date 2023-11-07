package routes

import (
	"github.com/ZakharVD/finlio/controllers"
	"github.com/gorilla/mux"
)

var StatisticsRoutes = func(router *mux.Router) {
	// those routes are prefixed with "/dashboard" !
	router.HandleFunc("/statistics", controllers.GetStatistics).Methods("GET")
	router.HandleFunc("/statistics/cashflow", controllers.GetTotalCashFlow).Methods("GET")
}
