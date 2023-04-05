const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, "../react_graph/build")));

app.get("/api", (req, res) => {
  res.json({ message: "Hello World!" });
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(_dirname, "../react_graph/build", "index.html"));
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
