const express = require("express");
const app = express();
const port = 4000;
// const axios = require("axios");
// require("dotenv").config();
const { shelf1, shelf2, shelf3, reviews } = require("./books");
const e = require("express");

app.use((req, res, next) => {
  console.log(`Request: ${req.method} ${req.originalUrl}`);
  next();
});
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the Job Application Tracker API!!!");
});

function getNextIdFromCollection(collection) {
  if (collection.length === 0) return 1;
  const lastRecord = collection[collection.length - 1];
  return lastRecord.id + 1;
}

// List shelf1
app.get("/books/:shelfID", (req, res) => {
  // This will eventually return a list of all jobs
  const bookid = parseInt(req.params.shelfID, 10);
  if (bookid === 1) {
    res.send(shelf1);
  } else if (bookid === 2) {
    res.send(shelf2);
  } else if (bookid === 3) {
    res.send(shelf3);
  } else {
    res.status(404).send({ message: "Shelf not found" });
  }
});

// Get a specific book
app.get("/books/:shelfID/:id", (req, res) => {
  // This will eventually return a specific job
  const bookid = parseInt(req.params.shelfID, 10);
  const id = parseInt(req.params.id, 10);
  if (bookid === 1) {
    const book = shelf1.find((book) => book.id === id);
    res.send(book);
  } else if (bookid === 2) {
    const book = shelf2.find((book) => book.id === id);
    res.send(book);
  } else if (bookid === 3) {
    const book = shelf3.find((book) => book.id === id);
    res.send(book);
  } else {
    res.status(404).send({ message: "Book not found" });
  }
});

// Create a new book
app.post("/books/:shelfID", (req, res) => {
  const bookid = parseInt(req.params.shelfID, 10);
  let targetShelf;

  if (bookid === 1) {
    targetShelf = shelf1;
  } else if (bookid === 2) {
    targetShelf = shelf2;
  } else if (bookid === 3) {
    targetShelf = shelf3;
  }else {
    res.status(404).send({ message: "Shelf not found" });
    }

  if (targetShelf) {
    const newBook = {
      ...req.body,
      id: getNextIdFromCollection(targetShelf),
    };

    targetShelf.push(newBook);
    res.status(201).send(newBook);
  } else {
    res.status(404).send({ message: "Shelf not found" });
  }
});

// Update a specific book
app.patch("/books/:shelfID/:id", (req, res) => {
  const bookid = parseInt(req.params.shelfID, 10);
    const id = parseInt(req.params.id, 10);
  const bookUpdate = req.body;
    let targetShelf;
  if (bookid === 1) {
    targetShelf = shelf1;
  } else if (bookid === 2) {
    targetShelf = shelf2;
  } else if (bookid === 3) {
    targetShelf = shelf3;
  }else{
    res.status(404).send({ message: "Shelf not found" });
  }
    const foundBook = targetShelf.findIndex((book) => book.id === id);
    const OgBook = targetShelf[foundBook];
    const updatedBook = { ...OgBook, ...bookUpdate };
    targetShelf[foundBook] = updatedBook;
    res.send(updatedBook);
});

// Delete a specific job
app.delete("/books/:shelfID/:id", (req, res) => {
    const bookid = parseInt(req.params.shelfID, 10);
    const id = parseInt(req.params.id, 10);
    let targetShelf;
    if (bookid === 1) {
        targetShelf = shelf1;
    } else if (bookid === 2) {
        targetShelf = shelf2;
    } else if (bookid === 3) {
        targetShelf = shelf3;
    }else{
        res.status(404).send({ message: "Shelf not found" });
    }
    const foundBook = targetShelf.findIndex((book) => book.id === id);
    if(foundBook !== -1) {
    targetShelf.splice(foundBook, 1);
    res.send({ message: "Book deleted" });
        res.status(404).send({ message: "Book not found" });
    }
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
