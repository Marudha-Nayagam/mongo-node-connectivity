import { client } from "./index.js";

export async function getAllBook(req) {
  return await client
    .db("b44-wd")
    .collection("books")
    .find(req.query)
    .toArray();
}
export async function getBookById(id) {
  return await client.db("b44-wd").collection("books").findOne({ id: id });
}
export async function deleteBookById(id) {
  return await client.db("b44-wd").collection("books").deleteOne({ id: id });
}
export async function addBook(newBook) {
  return await client.db("b44-wd").collection("books").insertMany(newBook);
}

export async function updateBookById(id, updatedBook) {
  return await client
    .db("b44-wd")
    .collection("books")
    .updateMany({ id: id }, { $set: updatedBook });
}
