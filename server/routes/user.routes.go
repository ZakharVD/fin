package routes

import (
	"github.com/ZakharVD/finlio/controllers"
	"github.com/gorilla/mux"
)

var UserRoutes = func(router *mux.Router) {
	router.HandleFunc("/register", controllers.RegisterUser).Methods("POST")
	router.HandleFunc("/login", controllers.LoginUser).Methods("POST")
}

var UserRoutesProtected = func(router *mux.Router) {
	router.HandleFunc("/settings/profile", controllers.UpdateProfile).Methods("PUT")
	router.HandleFunc("/settings/email", controllers.UpdateEmail).Methods("PUT")
	router.HandleFunc("/settings/user", controllers.DeleteUser).Methods("DELETE")
	router.HandleFunc("/settings/upload", controllers.UploadFile).Methods("POST")
	router.HandleFunc("/settings/upload", controllers.DeleteFile).Methods("DELETE")
}
