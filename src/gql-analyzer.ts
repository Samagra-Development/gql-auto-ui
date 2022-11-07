import { buildClientSchema, printSchema } from "graphql";
import fs from "fs";
import { getEntityDetails } from "./utils";

const introspectionSchemaResult = JSON.parse(fs.readFileSync("introspection.json", { encoding: 'utf-8' })).data;
getEntityDetails("location", introspectionSchemaResult);
// const graphqlSchemaObj = buildClientSchema(introspectionSchemaResult);
// const sdlString = printSchema(graphqlSchemaObj);
// fs.writeFileSync('./results.txt', sdlString , 'utf-8');