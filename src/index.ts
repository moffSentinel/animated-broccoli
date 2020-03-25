import express from "express";
import { ApolloServer } from "apollo-server-express";

import { resolvers } from "./resolvers";
import { typeDefs } from "./schema-loader";
import { context } from "./context";
import { dataSources } from "./data-sources";

const app = express();
const gqlServer = new ApolloServer({
  typeDefs,
  resolvers,
  context,
  dataSources
});

gqlServer.applyMiddleware({ app });

app.listen(8888, () => console.log("up and running!"));
