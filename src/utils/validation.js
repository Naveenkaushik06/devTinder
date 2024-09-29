const validator = require("validator");

const validateSignUpData = (req) => {
  const { firstName, lastName, emailId, password } = req.body;
  if (!firstName || !lastName) {
    throw new Error("Please enter a correct name!");
  } else if (!validator.isEmail(emailId)) {
    throw new Error("Email is not valid!");
  } else if (!validator.isStrongPassword(password)) {
    throw new Error("Please enter a strong password!");
  }
};

const validateEditProfileData = (req) => {
  const allowedEditFields = [
    "firstName",
    "lastName",
    "emailId",
    "photoUrl",
    "about",
    "gender",
    "age",
    "skills",
  ];
  const isEditAllowed = Object.keys(req.body).every((field) =>
    allowedEditFields.includes(field)
  );
  return isEditAllowed;
};

const validatePasswordEditProfileData = (req) => {
  const allowedPasswordEditField = ["password"];
  
  const isPasswordEditAllowed = Object.keys(req.body).every((field) =>
    allowedPasswordEditField.includes(field)
  );
  return isPasswordEditAllowed;
};

module.exports = {
  validateSignUpData,
  validateEditProfileData,
  validatePasswordEditProfileData,
};
