import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import http from "http";
import Router from "./routes";
import { initSocket } from './socket/socket';


// configures dotenv to work in your application
dotenv.config();
// app port, 3000 if not specified in .env file
const PORT = process.env.PORT || 3000;

const app: Application = express();

// Middleware setup
// json for request parsing
app.use(express.json());
// morgan for logging request
app.use(morgan("tiny"));
//
app.use(express.static("public"));

// Swagger docs
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);


// API routes
app.use(Router);

// app.listen(PORT, () => {
//   console.log("Server is running on port", PORT);
// });

// Create an HTTP server from the Express app
const server = http.createServer(app);

// Initialize Socket.IO on the HTTP server
initSocket(server);

// Start the server
server.listen(PORT, () => {
  console.log("Server is running on port", PORT);
});

