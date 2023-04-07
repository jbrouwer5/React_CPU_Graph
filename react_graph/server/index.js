const path = require("path");
const express = require("express");

const PORT = process.env.PORT || 3000;

const app = express();

// const __dirname = "."

const cpu_data = [
  [Date.now() - 90000, 100 - Math.random() * 99],
  [Date.now() - 85000, 100 - Math.random() * 99],
  [Date.now() - 80000, 100 - Math.random() * 99],
  [Date.now() - 75000, 100 - Math.random() * 99],
  [Date.now() - 70000, 100 - Math.random() * 99],
  [Date.now() - 65000, 100 - Math.random() * 99],
  [Date.now() - 60000, 100 - Math.random() * 99],
  [Date.now() - 55000, 100 - Math.random() * 99],
  [Date.now() - 50000, 100 - Math.random() * 99],
  [Date.now() - 45000, 100 - Math.random() * 99],
  [Date.now() - 40000, 100 - Math.random() * 99],
  [Date.now() - 35000, 100 - Math.random() * 99],
  [Date.now() - 30000, 100 - Math.random() * 99],
  [Date.now() - 25000, 100 - Math.random() * 99],
  [Date.now() - 20000, 100 - Math.random() * 99],
  [Date.now() - 15000, 100 - Math.random() * 99],
  [Date.now() - 10000, 100 - Math.random() * 99],
  [Date.now() - 5000, 100 - Math.random() * 99],
  [Date.now(), 100 - Math.random() * 99],
];

app.use(express.static(path.resolve(".", "../build")));

app.get("/cpu", (req, res) => {
  res.send(cpu_data);
});

app.get("/add", (req, res) => {
  cpu_data.push([Date.now(), 100 - Math.random() * 99]);
});

app.get("*", (req, res) => {
  res.sendFile(path.resolve(".", "../build", "index.html"));
});


app.listen(PORT, console.log(`Server started on port ${PORT}`));
