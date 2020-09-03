const { API } = require("./backend");
const {simplefetch} = require("./simplefetch");

export const getGenere = () => {
  return simplefetch
    .get(`${API}/generes`)
    .then((generes) => {
      return generes.data;
    })
    .catch(() => []);
};

export const addGenere = (genere) => {
  return simplefetch
    .post(`${API}/generes`, { genere })
    .then((genere) => {
      return genere.data;
    })
    .catch((error) => {
      return Promise.reject(error.response.error);
    });
};

export const editGenere = (genere, id) => {
  return simplefetch
    .put(`${API}/generes/${id}`, { genere })
    .then((genere) => {
      return { success: "Genere updated successfully" };
    })
    .catch((error) => {
      return Promise.reject(error.response.error);
    });
};
