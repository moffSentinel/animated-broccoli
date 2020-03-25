# Queries

## Lesson 1

Try the following query:

```graphql
{
  hello
}
```

Result:

```graphql
{
  "data": {
    "hello": "World"
  }
}
```

## Lesson 2

Try the following query:

```graphql
query getAll {
  getAllAuthors {
    name
    books {
      name
    }
  }
  getAllBooks {
    name
    author {
      name
      books {
        name
      }
    }
  }
}
```

Result:

```graphql
{
  "data": {
    "getAllAuthors": [
      {
        "name": "moff",
        "books": [
          {
            "name": "getting started about gql"
          },
          {
            "name": "talking about gql"
          },
          {
            "name": "even more gql"
          }
        ]
      }
    ],
    "getAllBooks": [
      {
        "name": "getting started about gql",
        "author": {
          "name": "moff",
          "books": [
            {
              "name": "getting started about gql"
            },
            {
              "name": "talking about gql"
            },
            {
              "name": "even more gql"
            }
          ]
        }
      },
      {
        "name": "talking about gql",
        "author": {
          "name": "moff",
          "books": [
            {
              "name": "getting started about gql"
            },
            {
              "name": "talking about gql"
            },
            {
              "name": "even more gql"
            }
          ]
        }
      },
      {
        "name": "even more gql",
        "author": {
          "name": "moff",
          "books": [
            {
              "name": "getting started about gql"
            },
            {
              "name": "talking about gql"
            },
            {
              "name": "even more gql"
            }
          ]
        }
      }
    ]
  }
}
```

## Lesson 3

Try the following query:

```graphql
query getOne($authorName: String, $bookName: String) {
  getBooksByAuthor(authorName: $authorName) {
    name
  }
  getAuthorForBook(bookName: $bookName) {
    name
  }
}
```

query variables

```json
{
  "authorName": "moff",
  "bookName": "talking about gql"
}
```

Result:

```graphql
{
  "data": {
    "getBooksByAuthor": [
      {
        "name": "getting started about gql"
      },
      {
        "name": "talking about gql"
      },
      {
        "name": "even more gql"
      }
    ],
    "getAuthorForBook": {
      "name": "moff"
    }
  }
}
```

## Lesson 4

Try the following query:

```graphql
{

}
```

Result:

```graphql
{

}
```
