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
POST `/register` - creates a new user.

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
POST `/login` - check the user credential and logs in user.
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

PUT `/dashboard/settings/profile` - updates user first and last name.
- Expected payload:
```json
{
	"firstName": "myFirstName",
	"lastName": "myLastName"
}
```
- Expected response:
```json
{
    "id": "6c8ae294-c3ba-41e4-9583-44e77b8ad470",
    "firstName": "NewFirstName",
    "lastName": "NewLastName",
    "email": "test@gmail.com",
	"hasProfileImage": false
}
```

PUT `/dashboard/settings/email` - updates user email.
- Expected payload:
```json
{
	"email": "myEmail"
}
```
- Expected response:
```json
{
    "id": "6c8ae294-c3ba-41e4-9583-44e77b8ad470",
    "firstName": "FirstName",
    "lastName": "LastName",
    "email": "newaddress@gmail.com",
	"hasProfileImage": false
}
```

DELETE `/dashboard/settings/user` - deletes the user.
- Expected response:
```json
{
	"message": "User account have been deleted."
}
```

POST `/dashboard/settings/upload` - uploads (or overwrites if exists) a file into S3 bucket.
- Expected response:
```json
{
    "id": "6c8ae294-c3ba-41e4-9583-44e77b8ad470",
    "firstName": "FirstName",
    "lastName": "LastName",
    "email": "newaddress@gmail.com",
		"hasProfileImage": true
}
```

DELETE `/dashboard/settings/uploads` - deletes the file from S3 bucket.
- Expected response:
```json
{
    "id": "6c8ae294-c3ba-41e4-9583-44e77b8ad470",
    "firstName": "FirstName",
    "lastName": "LastName",
    "email": "newaddress@gmail.com",
	"hasProfileImage": false
}
```

### Collections

POST `/dashboard/collections` - creates a new collection
- Expected payload:
```json
{
	"collectionName": "2023-11"
}
```
- Expected response:
```json
{
    "id": "bdae7c85-ba08-40e2-9c43-9ee7e49df379",
    "collectionName": "2019-07",
    "userId": "ee5913a7-a42a-4554-be15-bd15dc5fa31d"
}
```

GET `/dashboard/collections` - returns all collections available to the user.
- Expected response:
```json
[
    {
        "id": "991d94a7-eae3-4197-a3e3-a85cab5809d6",
        "collectionName": "2023-11",
        "userId": "ee5913a7-a42a-4554-be15-bd15dc5fa31d"
    },
    {
        "id": "bdae7c85-ba08-40e2-9c43-9ee7e49df379",
        "collectionName": "2019-07",
        "userId": "ee5913a7-a42a-4554-be15-bd15dc5fa31d"
    },
		... 
]
```

GET `/dashboard/collections/{collectionId}` - returns information about specific collection based on ID.
- Expected response:
```json
{
    "id": "bdae7c85-ba08-40e2-9c43-9ee7e49df379",
    "collectionName": "2019-07",
    "userId": "ee5913a7-a42a-4554-be15-bd15dc5fa31d"
}
```

DELETE `/dashboard/collections/{collectionId}` - deletes a collection (and related data (income, expenses)) based on ID
- Expected response:
```json
{
	"collections": [{...}, {...}],
	"statistics": {}
}
```

### Expenses

POST `/dashboard/expenses/collection/{collectionId}` - adds a new expense to collection based on its ID
- Expected payload:
```json
{
	"day": "12",
	"amount": 3000,
	"description": "your description for expense",
	"label": "housing"
}
```
- Expected response:
```json
{
	"expenses": [{...}, {...}],
	"totalExpense": 4399,
	"statistics": {}
}
```

GET `/dashboard/expenses/collection/{collectionId}` - returns all expenses and statistic data for collection based on its ID
- Expected response:
```json
{
	"expenses": [{...}, {...}],
	"totalExpense": 4399,
	"statistics": {}
}
```

GET `/dashboard/expenses/expense/{expenseId}` - returns data for single expense based on its ID
- Expected response:
```json
{
    "id": "737d39fe-4e5a-456c-b14f-22c14240d2c1",
    "day": "08",
    "amount": 62,
    "description": "Bill",
    "label": "Other",
    "collectionId": "03488eca-9df3-4a0f-b62d-85499f0bf237",
    "userId": "ad7d79d5-3ecc-4905-a2e4-7d5f99f564c2"
}
```

PUT `/dashboard/expenses/expense/{expenseId}` - updates data for single expense based on its ID
- Expected payload:
```json
{
	"day": "12",
	"amount": 3000,
	"description": "your description for expense",
	"label": "housing"
}
```
- Expected response:
```json
{
	"message": "Expense have been updated."
}
```

DELETE `/dashboard/expenses/expense/{expenseId}` - deletes expense based on its ID
- Expected response:
```json
{
	"message": "Expense have been deleted."
}
```

### Income

POST `/dashboard/incomes/collections/{collectionId}` - adds income for collection based on its ID
- Expected payload:
```json
{
	"amount": 200
}
```
- Expected response:
```json
{
    "id": "e2609d09-d5ff-4cd0-ae85-e2f83dd8c5ae",
    "amount": 5000,
    "collectionId": "e98dc2f1-9891-4aef-96f6-0a84a63dab9d",
    "userId": "ee5913a7-a42a-4554-be15-bd15dc5fa31d"
}
```

GET `/dashboard/income/collection/{collectionId}` - returns the SUM of the income for collection based on its ID
- Expected response:
```json
{
    "id": "e2609d09-d5ff-4cd0-ae85-e2f83dd8c5ae",
    "amount": 5000,
    "collectionId": "e98dc2f1-9891-4aef-96f6-0a84a63dab9d",
    "userId": "ee5913a7-a42a-4554-be15-bd15dc5fa31d"
}
```

PUT `/dashboard/incomes/{incomeId}` - overwrites the existing income with provided value.
- Expected payload:
```json
{
	"amount": 200
}
```
- Expected response:
```json
{
    "id": "e2609d09-d5ff-4cd0-ae85-e2f83dd8c5ae",
    "amount": 5000,
    "collectionId": "e98dc2f1-9891-4aef-96f6-0a84a63dab9d",
    "userId": "ee5913a7-a42a-4554-be15-bd15dc5fa31d"
}
```

### Goals

POST `/dashboard/goals` - creates a new goal.
- Expected payload:
```json
{
	"name": "nameOfGoal",
	"targetAmount": 5000,
	"amount": 1000,
}
```
- Expected response:
```json
{
    "id": "e5ca174f-2356-415f-87d5-bcbbc7c96486",
    "name": "My goal",
    "targetAmount": 1000,
    "amount": 0,
    "userId": "ad7d79d5-3ecc-4905-a2e4-7d5f99f564c2"
}
```

GET `/dashboard/goals` - return goal available to the user.
- Expected response:
```json
{
    "id": "e5ca174f-2356-415f-87d5-bcbbc7c96486",
    "name": "My goal",
    "targetAmount": 1000,
    "amount": 0,
    "userId": "ad7d79d5-3ecc-4905-a2e4-7d5f99f564c2"
}
```

POST `/dashboard/goals/{goalId}` - add provided amount to the existing amount.
- Expected payload:
```json
{
	"amountToAdd": 300
}
```
- Expected response:
```json
{
    "id": "e5ca174f-2356-415f-87d5-bcbbc7c96486",
    "name": "My goal",
    "targetAmount": 1000,
    "amount": 0,
    "userId": "ad7d79d5-3ecc-4905-a2e4-7d5f99f564c2"
}
```

### Statistics

GET `/dashboard/statistics` - returns overall statistics for the user.
- Expected response:
```json
{
    "housing": 0.4065040650406504,
    "food": 0.2967479674796748,
    "transportation": 0.024390243902439025,
    "health": 0,
    "entertainment": 0,
    "education": 0,
    "debt": 0,
    "other": 0.27235772357723576
}
```

GET `/dashboard/statistics/cashflow` - returns the overall cash flow for the user.
- Expected response:
```json
{
	"totalCashFlow": 246
}
```