FROM postgres:latest

# Set the environment variable
ENV POSTGRES_USER=postgres
ENV POSTGRES_PASSWORD=postgres
ENV POSTGRES_DB=postgres

# Copy the SQL file to the container
COPY ./movies.sql /docker-entrypoint-initdb.d/

# Expose the port
EXPOSE 5432

# Run the command
CMD ["postgres"]