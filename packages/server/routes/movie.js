const {
  getAllMovies,
  addMovie,
  getMovie,
  updateMovie,
  deleteMovie,
} = require("../controllers/movie");
const Joi = require("joi");

exports.register = (server, options, next) => {
  server.route([
    {
      method: "GET",
      path: "/movies",
      handler: getAllMovies,
    },
    {
      method: "POST",
      path: "/movies",
      config: {
        validate: {
          payload: {
            title: Joi.string().required(),
            genere: Joi.string().required(),
            rating: Joi.number().required().min(0).max(5),
          },
        },
      },
      handler: addMovie,
    },
    {
      method: "GET",
      path: "/movies/{movie_id}",
      handler: getMovie,
    },
    {
      method: "PUT",
      path: "/movies/{movie_id}",
      config: {
        validate: {
          payload: {
            title: Joi.string(),
            genere: Joi.string(),
            rating: Joi.number().min(0).max(5)
          },
        },
      },
      handler: updateMovie,
    },
    {
      method: "DELETE",
      path: "/movies/{movie_id}",
      handler: deleteMovie,
    },
  ]);
};

exports.register.attributes = {
  name: "movie",
};
