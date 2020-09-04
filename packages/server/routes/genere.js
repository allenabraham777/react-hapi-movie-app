const Joi = require("joi");
const {
  getAllGenere,
  addGenere,
  updateGenere,
  deleteGenere,
} = require("../controllers/genere");

exports.register = (server, options, next) => {
  server.route([
    {
      method: "GET",
      path: "/generes",
      handler: getAllGenere,
    },
    {
      method: "POST",
      path: "/generes",
      config: {
        validate: {
          payload: {
            genere: Joi.string().required(),
          },
        },
      },
      handler: addGenere,
    },
    // {
    //   method: "PUT",
    //   path: "/generes/{genere}",
    //   config: {
    //     validate: {
    //       payload: {
    //         genere: Joi.string().required(),
    //       },
    //     },
    //   },
    //   handler: updateGenere,
    // },
    // {
    //   method: "DELETE",
    //   path: "/generes/{genere}",
    //   handler: deleteGenere,
    // },
  ]);
};

exports.register.attributes = {
  name: "genere",
};
