import express from "express";
import { auth } from "../middleware/auth.js";
import {
  getAllBook,
  getBookById,
  deleteBookById,
  addBook,
  updateBookById,
} from "../helper.js";

const router = express.Router();

//get all books => add auth middleware
router.get("/", auth, async (req, res) => {
  const { language, rating } = req.query;
  console.log(req.query, language);
  if (req.query.rating) {
    req.query.rating = +req.query.rating;
  }
  const book = await getAllBook(req);
  res.send(book);
});

//get book by id
router.get("/:id", auth, async (req, res) => {
  const { id } = req.params;
  console.log(req.params, id);
  const book = await getBookById(id);
  //const book = books.find((bk) => bk.id === id)
  book ? res.send(book) : res.status(404).send({ message: "No book found" });
});

//delete book by id
router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  console.log(req.params, id);
  const book = await deleteBookById(id);
  //const book = books.find((bk) => bk.id === id)
  res.send(book);
});

// add book data
//inbuild middleware | say data is json
router.post("/", async (req, res) => {
  const newBook = req.body;
  const result = await addBook(newBook);
  res.send(result);
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const updatedBook = req.body;
  const result = await updateBookById(id, updatedBook);
  res.send(result);
});
export const booksRouter = router;
