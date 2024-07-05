# Backend of DF Travel App

The backend of the DF Travel App has a MongoDB AWS database and a Node.js express server which comprises of the following layers: services which interact with the database to process data based on MongoDB models, controllers which create appropriate responses to requests, middleware validators to validate the requests, and routers which divert different requests to different routes. The application provides the following functionalities:

1. user registration;
2. user login;
3. update of user password;
4. get all saved favourite locations;
5. add a favourite location; and
6. delete a favourite location.

# Benefits of the Backend

Data retrieval:
Without the backend, the data used in the frontend side would be lost after a refresh of the page, which would not be an ideal user experience.

Personalised services:
With the login function in place, users can save their favourite locations in the application.

Maintainability:
With a robust backend, the application can scale to handle more users and additional features.

These benefits enables continued development of the application and helps DF to adapt their services according to customer needs, which hopefully brings about business growth.

Note: This backend application did not use token based user authentication so its security could be improved.

# Use of API

After starting the server with `npm start` and database connection is made, this RESTful API can be used as explained below:

## User registration

Send a POST request to http://localhost:4000/register with the following as parameter:

```
{
    "email": "email1@example.com",
    "password": "Password1!"
}
```

## User login

Send a POST request to http://localhost:4000/login with the following as parameter:

```
{
    "email": "email1@example.com",
    "password": "Password1!"
}
```

## User password update

Send a PATCH request to http://localhost:4000/password with the following as parameter:

```
{
    "email": "email1@example.com",
    "password": "newPassword1!"
}
```

## Get all favourites

Send a POST request to http://localhost:4000/fav with the following as parameter:

```
{
    "email": "email1@example.com",
    "password": "Password1!"
    "city": "exampleCity"
}
```

## Add a favourite

Send a PATCH request to http://localhost:4000/addfav with the following as parameter:

```
{
    "email": "email1@example.com",
    "password": "Password1!"
    "city": "newCity"
}
```

## Delete a favourite

Send a PATCH request to http://localhost:4000/deletefav with the following as parameter:

```
{
    "email": "email1@example.com",
    "password": "Password1!"
    "city": "exampleCity"
}
```
