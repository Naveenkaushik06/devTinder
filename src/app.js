const express = require("express");

const app = express();
const PORT = 3000;

app.use("/test", (req, res) => {
  res.send("test data....");
});
app.use("/hello", (req, res) => {
  res.send("helloooo..");
});
app.use("/", (req, res) => {
  res.send("helloooo from homepage..");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
