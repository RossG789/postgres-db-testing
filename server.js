import pg from "pg";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

const app = express();
app.use(cors());
app.use(express.json());
dotenv.config(); // allow us to use the environment variables (like the DATABASE_URL)

const db = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

const PORT = 2020;

app.listen(PORT, () => {
  console.log(`Port currently running on localhost:${PORT} (҂◡_◡) ᕤ`);
});

app.get("/table-maker", async (req, res) => {
  const result = await db.query(`CREATE TABLE IF NOT EXISTS stuff (
        stuff_id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        age INT,
        species VARCHAR(255)
        
    );`);
  res.json(result);
});

app.get("/seed-stuff", async (req, res) => {
  const result = await db.query(`INSERT INTO stuff (name, age, species)
    VALUES 
    ('Otto', 5, 'North American River Otter'),
    ('Lili', 2, 'Smooth-Coated Otter'),
    ('Hanan', 4, 'Asian Small-Clawed Otter')
    ;`);
  res.json({ message: "seeded", result });
});
