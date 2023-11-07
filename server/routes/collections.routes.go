package routes

import (
	"github.com/ZakharVD/finlio/controllers"
	"github.com/gorilla/mux"
)

var CollectionsRoutes = func(router *mux.Router) {
	// those routes are prefixed with "/dashboard" !
	router.HandleFunc("/collections", controllers.AddCollection).Methods("POST")
	router.HandleFunc("/collections", controllers.GetCollections).Methods("GET")
	router.HandleFunc("/collections/{collectionId}", controllers.GetCollection).Methods("GET")
	router.HandleFunc("/collections/{collectionId}", controllers.DeleteCollection).Methods("DELETE")
}
