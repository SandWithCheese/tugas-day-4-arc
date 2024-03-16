import express, { Express, Request, Response } from "express"
import dotenv from "dotenv"
import { Pool } from "pg"
import bodyParser from "body-parser"
import { Movie } from "./types"

dotenv.config()

const app: Express = express()
const port = process.env.PORT || 3000

const jsonParser = bodyParser.json()

const pool = new Pool({
  user: process.env.POSTGRES_USER,
  host: "172.19.0.2",
  database: process.env.POSTGRES_DB,
  password: process.env.POSTGRES_PASSWORD,
  port: 5432,
})

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to my movie database!")
})

app.get("/movies", async (req: Request, res: Response) => {
  try {
    const client = await pool.connect()
    const result = await client.query("SELECT * FROM movies")
    client.release()
    res.json(result.rows)
  } catch (err) {
    console.error("Error executing query", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.get("/movies/:id", jsonParser, async (req: Request, res: Response) => {
  try {
    const client = await pool.connect()
    const result = await client.query(
      "SELECT * FROM movies WHERE imdbid = $1",
      [req.params.id]
    )
    client.release()
    res.json(result.rows)
  } catch (err) {
    console.error("Error executing query", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.post("/movies", jsonParser, async (req: Request, res: Response) => {
  try {
    const client = await pool.connect()
    const body: Movie = req.body
    const result = await client.query(
      "INSERT INTO movies (title, year, imdbid, type, poster) VALUES ($1, $2, $3, $4, $5)",
      [body.title, body.year, body.imdbid, body.type, body.poster]
    )
    client.release()
    res.status(201).json({ message: "Movie added successfully" })
  } catch (err) {
    console.error("Error executing query", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.delete("/movies/:id", jsonParser, async (req: Request, res: Response) => {
  try {
    const client = await pool.connect()
    const result = await client.query("DELETE FROM movies WHERE imdbid = $1", [
      req.params.id,
    ])
    client.release()
    res.status(204).json({ message: "Movie deleted successfully" })
  } catch (err) {
    console.error("Error executing query", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.put("/movies/:id", jsonParser, async (req: Request, res: Response) => {
  try {
    const client = await pool.connect()
    const body: Movie = req.body
    const result = await client.query(
      "UPDATE movies SET title = $1, year = $2, type = $3, poster = $4 WHERE imdbid = $5",
      [body.title, body.year, body.type, body.poster, req.params.id]
    )
    client.release()
    res.status(204).json({ message: "Movie updated successfully" })
  } catch (err) {
    console.error("Error executing query", err)
    res.status(500).json({ error: "Internal server error" })
  }
})

app.get(
  "/movies/search/:title",
  jsonParser,
  async (req: Request, res: Response) => {
    try {
      const client = await pool.connect()
      const result = await client.query(
        "SELECT * FROM movies WHERE title ILIKE $1",
        [`%${req.params.title}%`]
      )
      client.release()
      res.json(result.rows)
    } catch (err) {
      console.error("Error executing query", err)
      res.status(500).json({ error: "Internal server error" })
    }
  }
)

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`)
})
