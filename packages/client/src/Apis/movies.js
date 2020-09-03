const {simplefetch} = require("./simplefetch");
const {API} = require("./backend");

export const fetchMovie = () => {
  console.log(simplefetch);
  return simplefetch
    .get(`${API}/movies`)
    .then((movies) => {
      return movies.data
    })
    .catch((error) => {
      return [];
    });
};

export const fetchMovieById = (id) => {
  return simplefetch
    .get(`${API}/movies/${id}`)
    .then((movie) => {
      return movie.data
    })
    .catch((error) => {
      throw error.response;
    });
};

export const addMovie = (data) => {
  return simplefetch
    .post(`${API}/movies`, data)
    .then((movie) => {
      return {data: movie, error:false, success: true}
    })
    .catch((error) => {
      throw error.response;
    });
}

export const updateMovie = (id, value) => {
  return simplefetch
    .put(`${API}/movies/${id}`, value, {headers: {"Access-Control-Request-Method":"PUT"}})
    .then((movies) => {
      return movies.data.movie
    })
    .catch((error) => {
      return Promise.reject("Movie update failed")
    });
}

export const deletemovie = (id) => {
  return simplefetch
    .delete(`${API}/movies/${id}`)
    .then((movie) => {
      return movie
    })
    .catch((error) => {
      return Promise.reject("Movie delete failed")
    });
}