const simplefetch = require("./simplefetch");
const {API} = require("./backend");

exports.fetchMovie = () => {
  return simplefetch
    .get(`${API}/movies`)
    .then((movies) => {
      return movies.data
    })
    .catch((error) => {
      return [];
    });
};

exports.fetchMovieById = (id) => {
  return simplefetch
    .get(`${API}/movies/${id}`)
    .then((movie) => {
      return movie.data
    })
    .catch((error) => {
      throw error.response;
    });
};

exports.addMovie = (data) => {
  return simplefetch
    .post(`${API}/movies`, data)
    .then((movie) => {
      return {data: movie, error:false, success: true}
    })
    .catch((error) => {
      throw error.response;
    });
}

exports.updateMovie = (id, value) => {
  return simplefetch
    .put(`${API}/movies/${id}`, value, {headers: {"Access-Control-Request-Method":"PUT"}})
    .then((movies) => {
      return movies.data.movie
    })
    .catch((error) => {
      return Promise.reject("Movie update failed")
    });
}

exports.deletemovie = (id) => {
  return simplefetch
    .delete(`${API}/movies/${id}`)
    .then((movie) => {
      return movie
    })
    .catch((error) => {
      return Promise.reject("Movie delete failed")
    });
}