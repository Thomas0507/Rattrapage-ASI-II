import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";

import Router from "./routes";

// configures dotenv to work in your application
dotenv.config();
// app port, 3000 if not specified in .env file
const PORT = process.env.PORT || 3000;

const app: Application = express();
// json for request parsing
app.use(express.json());
// morgan for logging request
app.use(morgan("tiny"));
//
app.use(express.static("public"));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});
