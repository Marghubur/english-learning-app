# Backend for English Learning Hub

This is a mock REST API backend using `json-server` for development purposes.

## Installation

```bash
npm install
```

## Running the Backend

```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Users
- `GET /users` - Get all users
- `POST /users` - Create a new user
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Notes
- `GET /notes` - Get all notes
- `GET /notes?userId=:userId` - Get notes by user ID
- `POST /notes` - Create a new note
- `GET /notes/:id` - Get note by ID
- `PATCH /notes/:id` - Update note
- `DELETE /notes/:id` - Delete note

## Database

The database is stored in `db.json` file. It will be automatically created when you run the server for the first time.
