import { createSelector } from "reselect";

export const select = createSelector(
  [(state) => state.movies, (state) => state.filters, (state) => state.sort],
  (movies, filters, order) => {
    console.log("MOVIES", movies);
    console.log("FILTER", filters);
    const filteredMovie = movies.filter((movie) =>
      filters.genere
        ? movie.genere == filters.genere && movie.rating >= filters.rating
        : movie.rating >= filters.rating
    );

    return filteredMovie.sort((a, b) => {
      return a.title <= b.title ? (order ? -1 : 1) : order ? 1 : -1;
    });
  }
);
