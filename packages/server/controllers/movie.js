const Movie = require("../models/Movie");
const Genere = require("../models/Genere");

// Controller - Add Movie
exports.addMovie = (request, reply) => {
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
          }).code(200)
        )
        .catch((err) => reply({ error: err.errors[0].message }).code(500));
    })
    .catch(() => reply({ error: "Internal Server Error" }).code(500));
};

// Controller - Get All Movie
exports.getAllMovies = (request, reply) => {
  Movie.findAll({
    attributes: ["id", "title", "genere", "rating"],
    order: [["id", "ASC"]],
  })
    .then((movies) => {
      reply(movies).code(200);
    })
    .catch(() => {
      reply({ error: "Error fetching all movies" }).code(500);
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
    .catch(() =>
      reply({ error: "Error fetching the movie details" }).code(500)
    );
};

// Controller - Update a Movie
exports.updateMovie = async (request, reply) => {
  const id = request.params.movie_id;

  const { genere } = request.payload;

  let flag = true;

  if (genere) {
    flag = await Genere.findOne({
      where: { genere },
    })
      .then((response) => {
        if (!response) {
          reply({ error: "No Such Genere" }).code(404);
          return false;
        }
        return true;
      })
      .catch(() => {
        reply({ error: "Internal Server Error" }).code(500);
        return false;
      });
  }

  if (!flag) return;

  try {
    await Movie.update(request.payload, {
      where: {
        id,
      },
      returning: true,
      plain: true,
      attributes: ["id", "title", "genere", "rating"],
    })
      .then((response) => {
        const movie = {
          title: response[1].title,
          genere: response[1].genere,
          rating: response[1].rating,
          id: response[1].id,
        };
        return reply({
          message: "Movie update successful",
          movie,
        }).code(200);
      })
      .catch(() =>
        reply({ error: "Update unsuccessful - No such record" }).code(404)
      );
  } catch (err) {
    reply({ error: err.errors[0].message }).code(500);
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
    else reply({ error: "Delete Unsuccessful - No such record" }).code(404);
  } catch (err) {
    reply({ error: "Internal Server Error" }).code(500);
  }
};
