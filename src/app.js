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

app.get("/user", (req, res) => {
  res.send({
    firstName: "Naveen",
    lastName: "Kaushik",
  });
});

app.post("/user", (req, res) => {
  res.send("Data send to DB Successfully!");
});

app.delete("/user", (req, res) => {
  res.send("Data Deleted Successfully");
});


// this will match all the HTTP Method API calls to /test
app.use("/test", (req, res) => {
  res.send("test data....");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
