package routes

import (
	"github.com/ZakharVD/finlio/controllers"
	"github.com/gorilla/mux"
)

var IncomesRoutes = func(router *mux.Router) {
	// those routes are prefixed with "/dashboard" !
	router.HandleFunc("/incomes/collections/{collectionId}", controllers.AddIncome).Methods("POST")
	router.HandleFunc("/incomes/{incomeId}", controllers.UpdateIncome).Methods("PUT")
	router.HandleFunc("/income/collection/{collectionId}", controllers.GetTotalIncome).Methods("GET")
}
