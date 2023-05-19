const express = require("express");
const app = express();
const fs = require("fs");
const body = require("body-parser");
app.use(body.json());
app.use(body.urlencoded({ extended: true }));

const port = 3002;

// Import routes
const Routes = require("./routes/users.routes");
const postRoutes = require("./routes/posts.routes");

// Use routes
app.use("/api/v1/users", Routes);
app.use("/api/v1/posts", postRoutes);

app.get("/", (req, res) => {
  res.json("hello world");
});

app.listen(port, () => {
  console.log(`port http://localhost:${port}`);
});
