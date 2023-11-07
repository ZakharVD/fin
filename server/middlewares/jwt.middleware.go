package middlewares

import (
	"context"
	"net/http"
	"os"
	"strings"

	"github.com/ZakharVD/finlio/utils"
	"github.com/dgrijalva/jwt-go/v4"
	"github.com/joho/godotenv"
)

func JWTMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		godotenv.Load()
		JWT_SECRET := os.Getenv("JWT_SECRET")

		// Access token
		tokenString := r.Header.Get("Authorization")
		if tokenString == "" {
			utils.RespondWithError(w, http.StatusUnauthorized, "No JWT token provided")
			return
		}
		tokenString = strings.TrimPrefix(tokenString, "Bearer ")

		// Define a custom struct to represent the claims
		type CustomClaims struct {
			UserID string `json:"sub"`
			jwt.StandardClaims
		}

		// Parse and validate the JWT token
		token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
			return []byte(JWT_SECRET), nil
		})
		if err != nil {
			utils.RespondWithError(w, http.StatusUnauthorized, "Invalid JWT token")
			return
		}
		if !token.Valid {
			utils.RespondWithError(w, http.StatusUnauthorized, "Invalid JWT token")
			return
		}

		// Extract user ID from claims
		claims, ok := token.Claims.(*CustomClaims)
		if !ok {
			utils.RespondWithError(w, http.StatusUnauthorized, "Invalid JWT token")
			return
		}

		// Add user ID to request context for downstream handlers to access
		ctx := context.WithValue(r.Context(), "userID", claims.Issuer)
		r = r.WithContext(ctx)

		// Call the next handler in the chain
		next.ServeHTTP(w, r)
	})
}
