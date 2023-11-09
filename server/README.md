# Documentation

Welcome to Finlio!

Here is what this application is built with:

- Golang (REST API with Gorilla Mux and GORM)
- PostgreSQL (v15)
- JWT (authentication)
- AWS (S3 image storage)

## The endpoints used:

**Note:** The routes starting with "/dashboard" require the following header:

```json
"Authorization": "Bearer token"
```

### User
POST "/register" - creates a new user.

- Expected payload:
```json
{
    "firstName": "myFirstName",
    "lastName": "myLastName",
    "email": "myEmail",
    "password": "myPassword"
}
```
- Expected response:
```json
{
    "id": "6c8ae294-c3ba-41e4-9583-44e77b8ad470",
    "firstName": "FirstName",
    "lastName": "LastName",
    "email": "test@gmail.com",
    "hasProfileImage": false
}
```
POST “/login” - check the user credential and logs in user.
- Expected payload:
```json
{
	"email": "myEmail",
	"password": "myPassword"
}
```
- Expected response:
```json
{
    "id": "6c8ae294-c3ba-41e4-9583-44e77b8ad470",
    "firstName": "FirstName",
    "lastName": "LastName",
    "email": "test@gmail.com",
		"hasProfileImage": false
}
```
