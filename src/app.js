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

// finding by emailId
app.get("/user", async (req, res) => {
  const email = req.body.emailId;
  try {
    const users = await User.find({ emailId: email });
    if (users.length === 0) {
      res.status(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (error) {
    console.log("Something went wrong");
  }
});

// findOne
app.get("/userss", async (req, res) => {
  const email = req.body.emailId;
  try {
    const users = await User.findOne({ emailId: email });
    if (!users) {
      res.status(404).send("User not found!");
    } else {
      res.send(users);
    }
  } catch (error) {
    console.log("Something went wrong");
  }
});

// finding all feed
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (error) {
    console.log("Something went wrong");
  }
});

app.get("/feeds", async (req, res) => {
  const id = req.body._id;
  try {
    if (id) {
      const users = await User.findById(id);
      res.send(users);
    } else {
      res.status(404).send("UserId not found! Enter correct userId");
    }
  } catch (error) {
    console.log("Something went wrong");
  }
});

// delete a user from database
app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  console.log(userId);
  try {
    const user = await User.findByIdAndDelete({ _id: userId });
    // const user = await User.findByIdAndDelete(userId);
    res.send("User deleted Successfully!!");
  } catch (error) {
    console.log("Something went wrong");
  }
});

// Update data of a user by id
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  console.log(userId);
  console.log(data);
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
    });
    console.log(user);
    res.send("User updated successfully!");
  } catch (err) {
    console.log("Something went wrong");
  }
});

// Update data of a user by email
app.patch("/userss", async (req, res) => {
  const emailId = req.body.emailId;
  console.log(emailId);
  const data = req.body;
  console.log(data);
  try {
    const user = await User.findOneAndUpdate(
      { emailId: emailId },
      { firstName: "Anup", lastName: "Kumar", age: 26 },
      { returnDocument: "after" }
    );
    console.log(user);
    res.send("User updated successfully!");
  } catch (error) {
    console.log("Something went wrong");
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
