const simplefetch = require("./simplefetch");
const {API} = require("./backend");

exports.fetchMovie = () => {
  return simplefetch
    .get(`${API}/movies`)
    .then((movies) => {
      console.log(movies)
      return movies.data
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
};

exports.fetchMovieById = (id) => {
  return simplefetch
    .get(`${API}/movies/${id}`)
    .then((movie) => {
      console.log(movie)
      return movie.data
    })
    .catch((error) => {
      throw error.response;
    });
};

exports.addMovie = (title, genere, rating) => {
  return simplefetch
    .post(`${API}/movies`, {title, genere, rating})
    .then((movies) => {
      console.log(movies)
      return {success: true}
    })
    .catch((error) => {
      console.log(error);
      throw error.response;
    });
}

exports.updateMovie = (id, value) => {
  console.log(value);
  return simplefetch
    .put(`${API}/movies/${id}`, value, {headers: {"Access-Control-Request-Method":"PUT"}})
    .then((movies) => {
      console.log(movies)
      return movies.data
    })
    .catch((error) => {
      console.log(error);
      return [];
    });
}