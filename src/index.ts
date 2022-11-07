import { buildClientSchema, printSchema } from "graphql";
import fs from "fs";
import { getEntityDetails } from "./utils";

const introspectionSchemaResult = JSON.parse(fs.readFileSync("introspection.json", { encoding: 'utf-8' }));
getEntityDetails("location", introspectionSchemaResult);