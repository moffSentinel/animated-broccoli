import { DataSource, DataSourceConfig } from "apollo-datasource";
import { RequestOptions, RESTDataSource } from "apollo-datasource-rest";

import { BookDto, DataSourceForBook, DataSourceForAuthor } from "./models";
import { GqlContext } from "./context";
import { bookDb, authorsDb } from "./database";
import DataLoader from "dataloader";

class BookDataSource extends RESTDataSource<GqlContext>
  implements DataSourceForBook {
  private counter = 0;

  private byName = new DataLoader<string, BookDto>(
    (names: readonly string[]) => {
      const books = names.map(name => bookDb.getByName(name));

      return Promise.resolve(books);
    }
  );

  constructor() {
    super();
    this.baseURL = "http://localhost:6666/api/";
  }

  protected willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", this.context.authorization);
  }

  public getAll() {
    console.log("BookDataSourceCounter", ++this.counter);

    const books = bookDb.getAll();
    return books;
  }

  public async getByName(name: string) {
    console.log("BookDataSourceCounter", ++this.counter);

    const existingBook = await this.byName.load(name);

    if (!existingBook) {
      throw new Error(`No book by the name ${name}`);
    }

    return existingBook;
  }

  public getByAuthor(authorName: string) {
    console.log("BookDataSourceCounter", ++this.counter);

    const existingBook = bookDb.getByAuthor(authorName);
    if (!existingBook) {
      throw new Error(`No book by the author ${authorName}`);
    }

    return existingBook;
  }

  public add({ name, author }: BookDto) {
    console.log("BookDataSourceCounter", ++this.counter);

    const book: BookDto = bookDb.add({ author, name });

    return book;
  }
}

class AuthorDataSource extends DataSource<GqlContext>
  implements DataSourceForAuthor {
  private context!: GqlContext;

  private counter = 0;

  constructor() {
    super();
  }

  public initialize(config: DataSourceConfig<GqlContext>): void {
    this.context = config.context;
  }

  public getAll() {
    console.log("AuthorDataSourceCounter", ++this.counter);
    const authors = authorsDb.getAll();

    return authors;
  }

  public getByName(name: string) {
    console.log("AuthorDataSourceCounter", ++this.counter);

    const author = authorsDb.getByName(name);
    if (!author) {
      throw new Error(`No author by the name ${name}`);
    }

    return author;
  }

  public addBook(name: string, book: string) {
    console.log("AuthorDataSourceCounter", ++this.counter);

    const author = authorsDb.addBook(name, book);

    return author;
  }
}

export const dataSources = () => ({
  authors: new AuthorDataSource(),
  books: new BookDataSource()
});
