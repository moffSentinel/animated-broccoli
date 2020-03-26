import low, { LowdbSync } from "lowdb";
import FileSystem from "lowdb/adapters/FileSync";
import path from "path";

import { AuthorDto, BookDto } from "./models";
const dbPath = path.resolve("db.json");
const adapter = new FileSystem<{ books: BookDto[]; authors: AuthorDto[] }>(
  dbPath
);

const db = low(adapter);
db.defaults({
  books: [
    { author: "moff", name: "getting started about gql" },
    { author: "moff", name: "talking about gql" },
    { author: "moff", name: "even more gql" }
  ],
  authors: [
    {
      name: "moff",
      books: ["getting started about gql", "talking about gql", "even more gql"]
    }
  ]
}).write();

const dbBooks = db.get("books");
const dbAuthors = db.get("authors");

export const bookDb = {
  getAll() {
    const books = dbBooks.value();

    return books;
  },
  getByName(name: string) {
    const book = dbBooks.find({ name }).value();

    return book;
  },
  getByAuthor(author: string) {
    const book = dbBooks.filter({ author }).value();

    return book;
  },
  add(book: BookDto) {
    const existingBook = dbBooks.find({ name: book.name }).value();

    if (!!existingBook) {
      throw new Error(`A book with name ${name} allready exists`);
    }

    dbBooks.push(book);

    return book;
  }
};

export const authorsDb = {
  getAll() {
    const authors = dbAuthors.value();

    return authors;
  },
  getByName(name: string) {
    const author = dbAuthors.find({ name }).value();

    return author;
  },
  addBook(name: string, book: string) {
    const authorData = dbAuthors.find({ name });
    const { books } = authorData.value();

    if (books.filter(b => b === book).length !== 0) {
      throw new Error(
        `A book with name ${book} allready exists for the author ${name}`
      );
    }
    
    authorData.assign({ books: [...books, book] }).write();

    const author = authorData.value();

    return author;
  }
};
