import { client } from "./index.js";
import bcrypt from "bcrypt";
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

export async function genPassword(password) {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPassword = await bcrypt.hash(password, salt);
  //  console.log(hashedPassword)
  return hashedPassword;
}

export async function createUser(username, hashedPassword) {
  return await client
    .db("b44-wd")
    .collection("users")
    .insertOne({ username: username, password: hashedPassword });
}

export async function getUserByName(username) {
  return await client
    .db("b44-wd")
    .collection("users")
    .findOne({ username: username });
}
