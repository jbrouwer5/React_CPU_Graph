const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

// const __dirname = "."

const cpu_data = [
  [Date.now() - 150000, 30.95],
  [Date.now() - 155000, 35.95],
  [Date.now() - 160000, 30.95],
  [Date.now() - 165000, 30.95],
  [Date.now() - 170000, 39.95],
  [Date.now() - 175000, 30.95],
  [Date.now() - 180000, 30.95],
  [Date.now() - 185000, 20.95],
  [Date.now() - 190000, 20.95],
  [Date.now() - 195000, 20.95],
  [Date.now() - 200000, 23.95],
  [Date.now() - 205000, 30.95],
  [Date.now() - 215000, 35.95],
  [Date.now() - 220000, 30.95],
  [Date.now() - 225000, 30.95],
  [Date.now() - 230000, 39.95],
  [Date.now() - 235000, 30.95],
  [Date.now() - 240000, 30.95],
  [Date.now() - 245000, 20.95],
  [Date.now() - 255000, 20.95],
  [Date.now() - 260000, 20.95],
  [Date.now() - 265000, 23.95],
];

app.use(express.static(path.resolve(".", "../build")));

app.get("/cpu", (req, res) => {
  res.send(cpu_data);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(".", "../build", "index.html"));
});

app.listen(PORT, console.log(`Server started on port ${PORT}`));
