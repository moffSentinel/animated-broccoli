import { DataSources, BookDto } from "./models";

export const resolvers = {
  Query: {
    hello() {
      return "World";
    },
    getAllAuthors(
      _: any,
      __: any,
      { dataSources }: { dataSources: DataSources }
    ) {
      const authors = dataSources.authors.getAll();

      return authors;
    },
    getAllBooks(
      _: any,
      __: any,
      { dataSources }: { dataSources: DataSources }
    ) {
      const books = dataSources.books.getAll();

      return books;
    },
    getBooksByAuthor(
      _: any,
      args: any,

      { dataSources }: { dataSources: DataSources }
    ) {
      const { authorName } = args;

      const books = dataSources.books.getByAuthor(authorName);

      return books;
    },
    getAuthorForBook(
      _: any,
      args: any,
      { dataSources }: { dataSources: DataSources }
    ) {
      const { bookName } = args;
      const book = dataSources.books.getByName(bookName);
      const author = dataSources.authors.getByName(book.author);
      return author;
    }
  },
  Mutation: {
    addBook(_: any, args: any, { dataSources }: { dataSources: DataSources }) {
      const { input } = args;
      const { bookName, authorName } = input;
      const book = { name: bookName, author: authorName };

      dataSources.books.add(book);
      dataSources.authors.addBook(authorName, bookName);

      return book;
    }
  },
  Book: {
    author(
      parent: any,
      __: any,
      { dataSources }: { dataSources: DataSources }
    ) {
      const author = dataSources.authors.getByName(parent.author);
      return author;
    }
  },
  Author: {
    books(parent: any, __: any, { dataSources }: { dataSources: DataSources }) {
      const { books } = parent;

      const authorBooks = books.map((bookName: string) => {
        const book = dataSources.books.getByName(bookName);

        return book;
      });

      return authorBooks;
    }
  }
};
