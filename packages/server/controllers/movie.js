const Movie = require("../models/Movie");
const Genere = require("../models/Genere");

// Controller - Add Movie
exports.addMovie = async (request, reply) => {
  const { title, genere, rating } = request.payload;

  try {
    const response = await Genere.findOne({ where: { genere } });
    if (!response) return reply({ error: "No Such Genere" }).code(404);

    const movie = await Movie.create({ title, genere, rating });

    return reply({
      id: movie.id,
      title: movie.title,
      genere: movie.genere,
      rating: movie.rating,
    }).code(200);
  } catch (err) {
    console.log("2");
    reply({ error: "Internal Server Error" }).code(500);
  }
};

// Controller - Get All Movie
exports.getAllMovies = async (request, reply) => {
  try {
    const movies = await Movie.findAll({
      attributes: ["id", "title", "genere", "rating"],
    });
    reply(movies).code(200);
  } catch (error) {
    reply({ error: "Error fetching all movies" }).code(500);
  }
};

// Controller - Get A Movie
exports.getMovie = async (request, reply) => {
  try {
    const id = request.params.movie_id;
    const movie = await Movie.findOne({
      where: { id },
      attributes: ["id", "title", "genere", "rating"],
    });
    if (movie) {
      return reply(movie).code(200);
    }
    return reply({ error: "No Such Data" }).code(404);
  } catch (error) {
    reply({ error: "Error fetching the movie details" }).code(500);
  }
};

// Controller - Update a Movie
exports.updateMovie = async (request, reply) => {
  try {
    const id = request.params.movie_id;
    const { genere } = request.payload;

    //If Genere Update Request Made
    if (genere) {
      const response = await Genere.findOne({ where: { genere } });

      if (!response) return reply({ error: "No Such Genere" }).code(404);
    }

    const movie = await Movie.update(request.payload, {
      where: {
        id,
      },
      returning: true,
      plain: true,
      attributes: ["id", "title", "genere", "rating"],
    });
    if (!movie) return reply({ error: "No Such Movie" }).code(404);

    return reply({
      message: "Movie update successful",
      movie: movie[1],
    }).code(200);
  } catch (error) {
    return reply({ error: "Error updating the movie" }).code(500);
  }
};

// Controller - Delete a Movie
exports.deleteMovie = async (request, reply) => {
  const id = request.params.movie_id;

  try {
    const movie = await Movie.findOne({
      where: {
        id,
      },
    });
    if (!movie) {
      return reply({ error: "Delete Unsuccessful - No such record" }).code(404);
    }

    await movie.destroy();
    reply({ message: "Delete Successful" }).code(200);
  } catch (err) {
    reply({ error: "Delete Unsuccessful" }).code(500);
  }
};
