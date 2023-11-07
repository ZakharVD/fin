package routes

import (
	"github.com/ZakharVD/finlio/controllers"
	"github.com/gorilla/mux"
)

var ExpensesRoutes = func(router *mux.Router) {
	// those routes are prefixed with "/dashboard" !
	router.HandleFunc("/expenses/collection/{collectionId}", controllers.AddExpense).Methods("POST")
	router.HandleFunc("/expenses/collection/{collectionId}", controllers.GetExpensesAndStatistics).Methods("GET")
	router.HandleFunc("/expenses/expense/{expenseId}", controllers.GetExpense).Methods(("GET"))
	router.HandleFunc("/expenses/expense/{expenseId}", controllers.UpdateExpense).Methods("PUT")
	router.HandleFunc("/expenses/expense/{expenseId}", controllers.DeleteExpense).Methods("DELETE")
}
