const express = require("express");
const connectDB = require("./config/database");

const app = express();
const PORT = 3000;
const User = require("./models/user");

app.use(express.json());

app.post("/signup", async (req, res) => {

  // console.log(req.body);
  // creating a new instance of the User model
  const user = new User(req.body);
  try {
    await user.save();
    res.send("User added successfully!!!!");
  } catch (err) {
    res.status(400).send("Error saving the user: " + err.message);
  }

});

connectDB()
  .then(() => {
    console.log("Database connected successfully!");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("Database can't be connected!");
  });
