## Api Docs

### Endpoints:

- POST "/register"
Payload:
{
    "firstName": "first_name",
    "lastName": "last_name",
    "email":"email@gmail.com",
    "password":"password"
}

- POST "/login"
Payload:
{
    "email":"email@gmail.com",
    "password":"password"
}

## ! Routes below are prefixed with "/dashboard"

- GET "/collections" - returns all collection avaibale to the user
Headers: "Authorization": "Bearer" + token

- POST "/collections" - adds new collection
Headers: "Authorization": "Bearer" + token
Payload: 
{
    "collectionName": "name_of_collection"
} 

- GET "/collections/{collectionId}" - return data about collection for given id
Headers: "Authorization": "Bearer" + token

- GET "/expenses/{collectionId}" - returns all expenses for given collection
Headers: "Authorization": "Bearer" + token

- POST "/expenses/{collectionId}" - adds new expense for the given collection
Headers: "Authorization": "Bearer" + token
Payload:
{
    "amount": "amount",
    "description": "description to expense,
    "label": "label",
    "day": "day"
}

- GET "/expenses/{expenseId}" - return expense based on its id
Headers: "Authorization": "Bearer" + token

- POST "/income/{collectionId}" - add a new income to the respective collection
Headers: "Authorization": "Bearer" + token

- GET "/income/{collectionId}" - returns all income for collection
Headers: "Authorization": "Bearer" + token