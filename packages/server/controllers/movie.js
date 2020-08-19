const Movie = require("../models/Movie");
const Genere = require("../models/Genere");

// Controller - Add Movie
exports.addMovie = (request, reply) => {
  console.log(request.payload);
  const { title, genere, rating } = request.payload;

  Genere.findOne({
    where: { genere },
  })
    .then((response) => {
      if (!response) return reply({ error: "No Such Genere" }).code(404);

      Movie.create({ title, genere, rating })
        .then((movie) =>
          reply({
            id: movie.id,
            title: movie.title,
            genere: movie.genere,
            rating: movie.rating,
          })
        )
        .catch((err) => reply({ error: err.errors[0].message }).code(400));
    })
    .catch((err) => reply({ error: "Unprocessable Entity" }).code(422));
};

// Controller - Get All Movie
exports.getAllMovies = (request, reply) => {
  Movie.findAll({
    attributes: ["id", "title", "genere", "rating"],
  })
    .then((movies) => {
      reply(movies);
    })
    .catch((err) => {
      reply({ error: "Error fetching all movies" });
    });
};

// Controller - Get A Movie
exports.getMovie = (request, reply) => {
  const id = request.params.movie_id;
  return Movie.findOne({
    where: { id },
    attributes: ["id", "title", "genere", "rating"],
  })
    .then((movie) => {
      if (movie) return reply(movie).code(200);
      return reply({ error: "No Such Data" }).code(404);
    })
    .catch((err) => reply({ error: "Unprocessable Entity" }).code(422));
};

// Controller - Update a Movie
exports.updateMovie = async (request, reply) => {
  const id = request.params.movie_id;

  const { genere } = request.payload;

  if (genere) {
    return Genere.findOne({
      where: { genere },
    })
      .then((response) => {
        if (!response) return reply({ error: "No Such Genere" }).code(404);
      })
      .catch((err) => reply({ error: "Unprocessable Entity" }).code(422));
  }

  try {
    const updatedMovie = await Movie.update(request.payload, {
      where: {
        id,
      },
    });
    if (updatedMovie[0]) {
      reply({ message: "Movie update successful" });
    } else {
      reply({ error: "Update unsuccessful - No such record" }).code(422);
    }
  } catch (err) {
    reply({ error: err.errors[0].message }).code(400);
  }
};

// Controller - Delete a Movie
exports.deleteMovie = async (request, reply) => {
  const id = request.params.movie_id;

  try {
    const deletedMovie = await Movie.destroy({
      where: {
        id,
      },
    });
    if (deletedMovie) reply({ message: "Delete Successful" });
    else reply({ error: "Delete Unsuccessful - No such record" }).code(400);
  } catch (err) {
    reply({ error: "Delete Unsuccessful - Invalid Entry" }).code(400);
  }
};
