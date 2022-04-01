require("dotenv").config();
const connect = require("./db/connection");
const { hideBin } = require("yargs/helpers");
const mongoose = require("mongoose");
const yargs = require("yargs");
const yargsObj = yargs(hideBin(process.argv)).argv;
const Movie = require("./models/movie");
const { deleteMovie, update, list, add, listRating } = require("./utils/methods");

(async () => {
  if (yargsObj.add) {
    const movie = new Movie({
      title: yargsObj.title,
      actor: yargsObj.actor,
      genre: yargsObj.genre,
      rating: yargsObj.rating,
      release: yargsObj.release,
      update: yargsObj.update
    });
    await movie.save();
    // add({
    //   title: yargsObj.title,
    //   actor: yargsObj.actor,
    //   genre: yargsObj.genre,
    //   rating: yargsObj.rating
    // });
  } else if (yargsObj.list) {
    console.log(await list());
  } else if (yargsObj.update) {
    await update(yargsObj.id, yargsObj.title, yargsObj.actor);
    console.log("complete");
  } else if (yargsObj.delete) {
    await deleteMovie({ id: yargsObj.id });
  } else if (yargsObj.listRating) {
    console.log(await listRating(yargsObj.rating));
  } else if (yargsObj.listGenre) { 
    console.log(await listGenre(yargsObj.genre));
  } else if (yargsObj.listRelease) {
    console.log(await listRelease(yargsObj.release));
  }
  console.log(yargsObj);

  connect.close();
})();
