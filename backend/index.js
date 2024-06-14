import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "psyco1010",
  database: "test",
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err);
    return;
  }
  console.log("Connected to the MySQL server.");
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/books", (req, res) => {
  const q = "SELECT * FROM books";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    console.log('Data from database:', data);
    return res.json(data);
  });
});

app.post("/books", (req, res) => {
  const { title, description, price, cover } = req.body;
  const q = "INSERT INTO books (`title`, `description`, `price`, `cover`) VALUES (?, ?, ?, ?)";
  const values = [title, description, price, cover];

  db.query(q, values, (err, result) => {
    if (err) {
      console.error("Error inserting book:", err);
      return res.status(500).json({ error: "Error inserting book" });
    }
    const insertedBook = {
      id: result.insertId, // Assuming your result object provides the inserted ID
      title,
      description,
      price,
      cover,
    };
    return res.status(201).json(insertedBook);
  });
});

app.delete("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "DELETE FROM books WHERE id = ?";

  db.query(q, [bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/books/:id", (req, res) => {
  const bookId = req.params.id;
  const q = "UPDATE books SET `title`= ?, `description`= ?, `price`= ?, `cover`= ? WHERE id = ?";

  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.cover,
  ];

  db.query(q, [...values, bookId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
