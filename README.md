GoDrive

A full-stack car rental platform where users can discover cars, check their availability, and make bookings, while owners can list and manage their vehicles.

Built with **React, Node.js, Express, MongoDB and ImageKit**.

> This project started as a way to understand how a real full-stack application fits together — authentication, APIs, database relationships, file uploads and booking logic — rather than just building another frontend clone.

---

## What it does

There are two sides to the application.

### For customers

* Create an account and log in
* Browse available cars
* View individual car details
* Select rental dates
* Book a car
* View previously created bookings

### For car owners

* Log in as an owner
* Add vehicles to the platform
* Upload vehicle images
* Manage listed cars
* Manage rental-related information

Authentication and authorization are handled on the server, so protected operations aren't dependent only on frontend checks.

---

## The stack

| Part              | Technology         |
| ----------------- | ------------------ |
| Frontend          | React + Vite       |
| Styling           | Tailwind CSS       |
| API communication | Axios              |
| Backend           | Node.js + Express  |
| Database          | MongoDB + Mongoose |
| Authentication    | JWT + bcrypt       |
| Image uploads     | Multer + ImageKit  |
| Configuration     | dotenv             |

---

## How the application is put together

The frontend and backend are intentionally kept separate.

```text
                 Browser
                    |
                    v
          ┌─────────────────┐
          │  React Frontend │
          │   Vite/Tailwind │
          └────────┬────────┘
                   |
              REST API
                   |
                   v
          ┌─────────────────┐
          │ Express Server  │
          └────────┬────────┘
                   |
        ┌──────────┼──────────┐
        |          |          |
        v          v          v
     Users       Cars      Bookings
        |          |          |
        └──────────┼──────────┘
                   |
                   v
              MongoDB

Car images ───────────────> ImageKit
```

The server is divided into **routes, controllers, middleware, models and configuration**, so request handling and business logic aren't all sitting inside one file.

---

## A request through the backend

For example, when a logged-in user creates a booking:

```text
React
  |
  | POST /api/bookings/...
  | + JWT
  v
Express Route
  |
  v
Auth Middleware
  |
  | verifies token
  v
Booking Controller
  |
  | validates request
  | checks required data
  v
Mongoose
  |
  v
MongoDB
```

The important part here is that the frontend isn't trusted to decide whether a request is authenticated. The backend verifies the token before allowing protected operations.

---

## Authentication

Authentication is based on JWT.

The general flow is:

```text
Register
   ↓
Password hashed with bcrypt
   ↓
User stored in MongoDB

Login
   ↓
Credentials verified
   ↓
JWT generated
   ↓
Token used for protected API requests
   ↓
Authentication middleware verifies token
```

This same authentication layer is used when accessing protected user/owner functionality.

---

## Cars and images

Cars are stored as MongoDB documents through Mongoose.

Images are handled separately from the database:

```text
Owner selects image
       ↓
     Multer
       ↓
    ImageKit
       ↓
  Image URL returned
       ↓
Car document stores image reference
```

This avoids storing the actual image file inside MongoDB.

---

## Booking flow

The main customer flow is:

```text
Browse cars
     ↓
Choose a car
     ↓
Select dates
     ↓
Create booking
     ↓
Backend processes request
     ↓
Booking stored in MongoDB
     ↓
User can view it in My Bookings
```

Bookings are associated with the relevant user and car, which lets the application retrieve bookings specific to the logged-in customer.

---

## API structure

The backend currently groups its APIs around the application's main responsibilities:

```text
/api/user
/api/owner
/api/bookings
```

### `/api/user`

User authentication and user-related operations.

### `/api/owner`

Operations available to car owners, including vehicle management.

### `/api/bookings`

Creating and retrieving rental bookings and other booking-related operations.

Authentication middleware is applied where the endpoint requires an authenticated user.

---

## Repository structure

```text
CarRental-Website/
│
├── clientpage/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── configs/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── package.json
│   └── server.js
│
└── README.md
```

The separation is deliberate:

* **routes** → define API endpoints
* **controllers** → handle application logic
* **models** → define MongoDB data structures
* **middleware** → authentication/request processing
* **configs** → external services and database configuration

---

## Running it locally

### 1. Clone

```bash
git clone https://github.com/athmika2904/CarRental-Website.git
cd CarRental-Website
```

### 2. Frontend

```bash
cd clientpage
npm install
npm run dev
```

### 3. Backend

In another terminal:

```bash
cd server
npm install
npm run server
```

The exact npm scripts can be found in each `package.json`.

---

## Environment variables

The backend requires configuration for the database, authentication and image storage.

Create the required `.env` file with values for:

```env
MONGODB_URI=
JWT_SECRET=

IMAGEKIT_PUBLIC_KEY=
IMAGEKIT_PRIVATE_KEY=
IMAGEKIT_URL_ENDPOINT=
```

Never commit real credentials to the repository.

---

## A few things I'd improve next

The current version gives me a solid base, but there are a few directions I'd take it in a production version:

**Booking reliability**

Move more of the availability/conflict checking into the backend so the server is the final authority on whether a car can be booked.

**Payments**

Add a proper payment workflow instead of treating booking creation as the end of the rental process.

**Testing**

Add API tests around authentication, car creation and booking creation — especially the cases where two users try to book the same car.

**Deployment**

Deploy the frontend and API separately and configure production environment variables rather than relying on local development configuration.

---

## What this project taught me

The interesting part of this project wasn't making a car listing page.

It was figuring out how the pieces interact once the application becomes stateful:

**user → authentication → API → database → car → booking → user**

Adding authentication changes how every protected request works. Adding bookings introduces relationships between users and cars. Adding image uploads introduces another service that the backend has to communicate with.

That was the part of the project I wanted to understand by building it.

---

## Author

**Athmika**

[GitHub](https://github.com/athmika2904)

---

## Repository

[github.com/athmika2904/CarRental-Website](https://github.com/athmika2904/CarRental-Website)
