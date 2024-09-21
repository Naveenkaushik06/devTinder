const express = require("express");
const connectDB = require("./config/database");

const app = express();
const PORT = 3000;
const User = require("./models/user");

app.post("/signup", async (req, res) => {
  // creating a new instance ofthe User model
  const user = new User({
    firstName: "Naveen",
    lastName: "Kaushik",
    emailId: "naveenkaushik0612@gmail.com",
    password: "1234",
    age: 24,
    gender: "Male",
  });

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
