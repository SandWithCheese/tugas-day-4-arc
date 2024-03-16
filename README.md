# Movie RESTful API Using Express and TypeScript

## Description

The "Movie RESTful API Using Express and TypeScript" project is a backend application that provides a RESTful API for managing movie data. Built with Express.js and TypeScript, the API allows users to perform CRUD operations (Create, Read, Update, Delete) on movie resources. It features endpoints for creating new movies, retrieving a list of movies, updating existing movies, and deleting movies.

## Docker Deployment

1. Create a `.env` file with the following variables:

    - PORT
    - POSTGRES_USER
    - POSTGRES_PASSWORD
    - POSTGRES_DB
    - POSTGRES_URL

2. Build the Docker image

    ```bash
    docker-compose build
    ```

3. Deploy the container

    ```bash
    docker-compose up
    ```

4. If this is the first deployment and you need to initialize the database, use the following command:

    ```bash
    docker exec -i <container-id> psql -U <postgres-user> -d <postgres-db> < movies.sql
    ```

    Replace `<container-id>`, `<postgres-user>`, and `<postgres-db>` with your container ID, PostgreSQL username, and database name respectively.

5. Access the page at localhost:3000

## API Documentation

1. Welcome Message
    - URL: /
    - Method: GET
    - Description: Get a welcome message.
    - Response: Welcome message.

2. Get All Movies
    - URL: /movies
    - Method: GET
    - Description: Get a list of all movies.
    - Response: Array of movie objects.

3. Get Movie by ID
    - URL: /movies/:id
    - Method: GET
    - Description: Get a movie by its IMDb ID.
    - Response: Array containing the movie object.

4. Add a Movie
    - URL: /movies
    - Method: POST
    - Description: Add a new movie to the database.
    - Request Body: Movie object json (title, year, imdbid, type, poster).

5. Update a Movie
    - URL: /movies/:id
    - Method: PUT
    - Description: Update an existing movie by its IMDb ID.
    - Request Body: Updated movie object json (title, year, type, poster).

6. Delete a Movie
    - URL: /movies/:id
    - Method: DELETE
    - Description: Delete a movie by its IMDb ID.

7. Search for Movies by Title
    - URL: /movies/search/:title
    - Method: GET
    - Description: Search for movies by title (case-insensitive).
    - Response: Array of movie objects matching the search criteria.
