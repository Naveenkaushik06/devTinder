const express = require("express");
const {adminAuth} = require("./middlewares/auth")
const {userAuth} = require("./middlewares/auth")

const app = express();
const PORT = 3000;

// middleware
app.use("/admin", adminAuth);


app.post("/user/login", (req,res)=>{
  res.send("User loggedin successfully")
})

app.get("/user/data", userAuth, (req, res) => {
  res.send("User Data sent!");
});

app.get("/admin/getAllData", (req, res) => {
  res.send("All data send!");
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted a user!");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
