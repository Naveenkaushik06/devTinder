
# finding by emailId
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

# findOne
app.get("/users", async (req, res) => {
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

# finding all feed
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

# delete a user from database
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

# Update data of a user by id
app.patch("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const data = req.body;
  try {
    const ALLOWED_UPDATES = [
      "userId",
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
    ];
    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("Updates not allowed!");
    }
    if (data?.skills.length > 10) {
      throw new Error("Skills can't be more than 10");
    }
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      returnDocument: "after",
      runValidators: true,
    });
    console.log(user);
    res.send("User updated successfully!");
  } catch (err) {
    res.status(400).send("UPDATE FAILED: " + err.message);
  }
});

# Update data of a user by email
app.patch("/users", async (req, res) => {
  const emailId = req.body.emailId;
  console.log(emailId);
  const data = req.body;
  console.log(data);
  try {
    const user = await User.findOneAndUpdate(
      { emailId: emailId },
      { firstName: "Anup", lastName: "Kumar", age: 26 },
      { returnDocument: "after", runValidators: true }
    );
    console.log(user);
    res.send("User updated successfully!");
  } catch (error) {
    console.log("Something went wrong");
  }
});