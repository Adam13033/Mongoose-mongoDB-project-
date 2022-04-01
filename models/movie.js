const mongoose = require("mongoose");

const Movie = mongoose.model("Movie", {
  title: {
    type: String,
    unique: true,
  },
  actor: {
    type: String,
    default: "Not Specified",
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
  },
  genre: {
    type: String,
    default: "Not specified",
  },
  release: Date,
  added: {
    type: Date,
    default: Date.now(),
  },
  updated: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = Movie;
