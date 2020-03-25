# Mutations

## Lesson

```graphql
mutation intro($input: AddBookInput!) {
  addBook(input: $input) {
    name
  }
}
```

```json
{
  "input":{
    "bookName": "testing gql",
    "authorName": "moff"
  }
```

Result first run:

```graphql
{
  "data": {
    "addBook": {
      "name": "testing gql"
    }
  }
}
```

Result after first run:

```graphql
{
  "errors": [
    {
      "message": "A book with name testing gql allready exists",
      "locations": [
        {
          "line": 2,
          "column": 3
        }
      ],
      "path": [
        "addBook"
      ],
      "extensions": {
        "code": "INTERNAL_SERVER_ERROR",
        "exception": {
          "stacktrace": [
            "Error: A book with name testing gql allready exists",
            "    at BookDataSource.add ({filepath here}\\lib\\data-sources.js:46:19)",
            "    at addBook ({filepath here}\\lib\\resolvers.js:33:31)",
            "    at field.resolve ({filepath here}\\node_modules\\graphql-extensions\\dist\\index.js:133:26)",
            "    at resolveFieldValueOrError ({filepath here}\\node_modules\\graphql\\execution\\execute.js:467:18)",
            "    at resolveField ({filepath here}\\node_modules\\graphql\\execution\\execute.js:434:16)",
            "    at {filepath here}\\node_modules\\graphql\\execution\\execute.js:244:18",
            "    at {filepath here}\\node_modules\\graphql\\jsutils\\promiseReduce.js:23:10",
            "    at Array.reduce (<anonymous>)",
            "    at promiseReduce ({filepath here}\\node_modules\\graphql\\jsutils\\promiseReduce.js:20:17)",
            "    at executeFieldsSerially ({filepath here}\\node_modules\\graphql\\execution\\execute.js:241:37)"
          ]
        }
      }
    }
  ],
  "data": {
    "addBook": null
  }
}
```
