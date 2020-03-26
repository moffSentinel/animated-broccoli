export interface BookDto {
  name: string;
  author: string;
}

export interface AuthorDto {
  name: string;
  books: string[];
}

export interface DataSourceForBook {
  getAll: () => BookDto[];
  getByName: (name: string) => Promise<BookDto>;
  getByAuthor: (name: string) => BookDto[];
  add: (book: BookDto) => BookDto;
}

export interface DataSourceForAuthor {
  getAll: () => AuthorDto[];
  getByName: (name: string) => AuthorDto;
  addBook: (name: string, book: string) => AuthorDto;
}

export interface DataSources {
  authors: DataSourceForAuthor;
  books: DataSourceForBook;
}
