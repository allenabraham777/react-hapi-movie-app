import { createSelector } from "reselect";

export const filter = createSelector(
  [(state) => state.movies, (state) => state.filters],
  (movies, filter) =>
    movies.filter((movie) =>
      filter.genere
        ? movie.genere == filter.genere && movie.rating > filter.rating
        : movie.rating > filter.rating
    )
);

// const sorting = createSelector(
//   [(state) => state.movies, (state) => state.attributes],
//   (movies, rating) => movies.sort((movie) => movie.rating > rating)
// );

const genere = createSelector(
  [(state) => state.movies, (state) => state.genere],
  (movies, genere) => movies.filter((movie) => movie.genere == genere)
);
