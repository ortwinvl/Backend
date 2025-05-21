// apptst.js

// Require express
import 'reflect-metadata';
const express = require("express");
// Create the new express app instance for our API
const app = express();

// // Define the route for the GET /greet endpoint
// app.get("/greet", (req, res) => {
// const name = req.query.name || "World";
//   res.json({ message: `Hello, ${name}!` });
// });

// Export the app for testing later
module.exports = app;