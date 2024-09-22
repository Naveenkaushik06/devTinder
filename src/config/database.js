const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev:ido6umAyFRi9ajX8@namastenode.n7plu.mongodb.net/devTinder"
  );
};
module.exports = connectDB;