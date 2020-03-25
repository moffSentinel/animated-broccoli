import { DataSource, DataSourceConfig } from "apollo-datasource";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

import {
  BookDto,
  DataSourceForBook,
  DataSourceForAuthor,
  AuthorDto
} from "./models";
import { GqlContext } from "./context";

const books: BookDto[] = [
  { author: "moff", name: "getting started about gql" },
  { author: "moff", name: "talking about gql" },
  { author: "moff", name: "even more gql" }
];

const authors: AuthorDto[] = [
  {
    name: "moff",
    books: ["getting started about gql", "talking about gql", "even more gql"]
  }
];

class BookDataSource extends RESTDataSource<GqlContext>
  implements DataSourceForBook {
  constructor() {
    super();
    this.baseURL = "http://localhost:6666/api/";
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", this.context.authorization);
  }

  public getAll() {
    return books;
  }

  private filterByAuthorName = (authorName: string) =>
    books.filter(book => book.author === authorName);
  private filterByName = (name: string) =>
    books.filter(book => book.name === name);

  public getByName(name: string) {
    const existingBook = this.filterByName(name);

    if (existingBook.length === 0) {
      throw new Error(`No book by the name ${name}`);
    }

    return existingBook[0];
  }

  public getByAuthor(authorName: string) {
    const existingBook = this.filterByAuthorName(authorName);
    if (existingBook.length === 0) {
      throw new Error(`No book by the author ${authorName}`);
    }

    return existingBook;
  }

  public add({ name, author }: BookDto) {
    const existingBook = this.filterByName(name);
    if (existingBook.length !== 0) {
      throw new Error(`A book with name ${name} allready exists`);
    }

    const book: BookDto = { author, name };
    books.push(book);

    return book;
  }
}

class AuthorDataSource extends DataSource<GqlContext>
  implements DataSourceForAuthor {
  private context!: GqlContext;

  constructor() {
    super();
  }

  public initialize(config: DataSourceConfig<GqlContext>): void {
    this.context = config.context;
  }

  public getAll() {
    return authors;
  }

  public getByName(name: string) {
    const existingAuthors = authors.filter(author => author.name === name);

    if (existingAuthors.length === 0) {
      throw new Error(`No author by the name ${name}`);
    }

    return authors[0];
  }

  public addBook(name: string, book: string) {
    let author = this.getByName(name);

    if (!author) {
      author = { name, books: [] };
      authors.push(author);
    }

    if (author.books.filter(bookName => bookName === book).length === 0)
      author.books.push(book);

    return author;
  }
}

export const dataSources = () => ({
  authors: new AuthorDataSource(),
  books: new BookDataSource()
});
