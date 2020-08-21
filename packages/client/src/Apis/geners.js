const { API } = require("./backend");
const simplefetch = require("./simplefetch");

exports.getGenere = () => {
  return simplefetch
    .get(`${API}/generes`)
    .then((generes) => {
      return generes.data;
    })
    .catch(() => []);
};

exports.addGenere = (genere) => {
  return simplefetch
    .post(`${API}/generes`, { genere })
    .then((genere) => {
      return genere.data;
    })
    .catch((error) => {
      console.log(error.response);
      return Promise.reject(error.response.error);
    });
};

exports.editGenere = (genere, id) => {
  return simplefetch
    .put(`${API}/generes/${id}`, { genere })
    .then((genere) => {
      return { success: "Genere updated successfully" };
    })
    .catch((error) => {
      console.log(error);
      return Promise.reject(error.response.error);
    });
};
