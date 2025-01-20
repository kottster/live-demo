/**
 * This file is the entry point for the server.
 * It's used only for live demo purposes and is not part of the final project.
 * Please avoid creating files like this in your own projects.
 */

import { createRequestHandler } from "@remix-run/express";
import express from "express";
import apicache from "apicache";
import * as build from "./build/server/index.js";

const app = express();
const cache = apicache.middleware;

app.use(cache('1 year'));
app.use(express.static('build/client'));

app.all(
  "*",
  createRequestHandler({
    build
  })
);

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});