const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

// const __dirname = "."

app.use(express.static(path.resolve(".", "../build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(".", "../build", "index.html"));
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
