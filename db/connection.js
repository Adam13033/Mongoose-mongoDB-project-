const mongoose = require("mongoose");


mongoose.connect(process.env.MONGO_URI);
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully!");
});

module.exports = connection; 