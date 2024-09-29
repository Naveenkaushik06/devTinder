const express = require("express");
const { userAuth } = require("../middlewares/auth");
const { validateEditProfileData } = require("../utils/validation");
const { validatePasswordEditProfileData } = require("../utils/validation");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const validator = require("validator");

const profileRouter = express.Router();

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/edit", userAuth, async (req, res) => {
  try {
    if (!validateEditProfileData(req)) {
      throw new Error("Invalid Edit Request");
    }
    const loggedInUser = req.user;
    // console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    // console.log(loggedInUser);

    await loggedInUser.save();
    // res.send(`${loggedInUser.firstName}, your profile is updated successfully!!`)

    res.json({
      message: `${loggedInUser.firstName}, your profile is updated successfully!!`,
      data: loggedInUser,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});

profileRouter.patch("/profile/password", userAuth, async (req, res) => {
  try {
    if (!validatePasswordEditProfileData(req)) {
      throw new Error("Invalid Edit Password Request");
    }
    const emailId = req.user.emailId;
    const { password } = req.body;

    if (!validator.isStrongPassword(password)) {
      throw new Error("Please enter a strong password!!");
    }
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.findOneAndUpdate(
      {
        emailId: emailId,
      },
      { password: passwordHash },
      { returnDocument: "after" }
    );
    await user.save();
    res.json({
      message: `${user.firstName} ${user.lastName}, your password is updated successfully!!`,
      data: user,
    });
  } catch (err) {
    res.status(400).send("ERROR: " + err.message);
  }
});
module.exports = profileRouter;
