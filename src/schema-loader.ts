import fs from "fs";
import { gql } from "apollo-server-express";
import path from "path";

const schemaFile = path.resolve("schemas/schema.graphql");
console.debug(`Loading schema from ${schemaFile}`);

const schemaString = fs.readFileSync(schemaFile, "utf8");
export const typeDefs = gql(schemaString);
