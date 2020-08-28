const Genere = require("../models/Genere");

// Controller - Add genere
exports.addGenere = (request, reply) => {
  const { genere } = request.payload;

  Genere.create({ genere })
    .then((genere) =>
      reply({
        genere: genere.genere,
      }).code(201)
    )
    .catch((err) => reply({ error: err.errors[0].message }).code(500));
};

// Controller - Get All genere
exports.getAllGenere = (request, reply) => {
  Genere.findAll({
    attributes: ["genere"],
  })
    .then((generes) => {
      reply(generes).code(200);
    })
    .catch((err) => {
      reply({ error: "Error fetching all generes" }).code(500);
    });
};

// Controller - Update a genere
exports.updateGenere = async (request, reply) => {
  const genere = request.params.genere;

  try {
    const updatedGenere = await Genere.update(request.payload, {
      where: {
        genere,
      },
    });
    if (updatedGenere[0]) {
      reply({ message: "Genere update successful" }).code(202);
    } else {
      reply({ error: "Update unsuccessful - No such record" }).code(422);
    }
  } catch (err) {
    reply({ error: err.errors[0].message }).code(400);
  }
};

// Controller - Delete a genere
exports.deleteGenere = async (request, reply) => {
  const id = request.params.genere;

  try {
    const deletedGenere = await Genere.destroy({
      where: {
        id,
      },
    });
    if (deletedGenere) reply({ message: "Delete Successful" }).code(200);
    else reply({ error: "Delete Unsuccessful - No such record" }).code(404);
  } catch (err) {
    reply({ error: "Delete Unsuccessful - Invalid Entry" }).code(500);
  }
};
