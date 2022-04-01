const Movie = require("../models/movie");
const connection = require("../db/connection");
const { disconnect } = require("process");
const { ObjectId } = require("mongodb");

const add = async (movieObj) => {
  const movie = new Movie(movieObj);
  await movie.save();
  console.log("Successfully added to DB");
};

const list = async () => {
  try {
    return await Movie.find({});
  } catch (error) {
    console.log(error.message);
    return [];
  }
};

const listRating = async (rating) => {
  try {
    return await Movie.find({ rating });
  } catch (error) {
    console.Error(error.message);
    return [];
  }
};

const update = async (id, title, actor, rating, genre, release) => {
  if (!id || !title) {
    throw new Error("id an title are required");
  }
  let query = { _id: { $eq: ObjectId(id) } };
  let values = {
    $set: {
      title,
      ...(actor && { actor }),
      ...(genre && { genre }),
      ...(rating && { rating }),
      ...(release && { release }),
    },
  };
  //   let values = { $set: { title, ...(actor && { actor }) } };
  const items = await Movie.updateOne(query, values);
};

const deleteMovie = async (id) => {
  if (!id) {
    throw new Error("Id is required to delete a specific document.");
  }

  let query = { _id: { $eq: ObjectId(id) } };
  try {
    return await Movie.deleteOne(query);
  } catch (error) {
    console.Error("error", code);
  }
};

module.exports = { deleteMovie, update, list, add, listRating };
