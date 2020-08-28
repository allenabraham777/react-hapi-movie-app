import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { movieEditAction } from "../Action/movieAction";
import StarComponent from "./StarComponent";
import { filter } from "../Reselect/movieReselect";
// import { fetchMovie, updateMovie } from "../Apis/movies";

const ListTable = (props) => {
  const [display, setDisplay] = useState([]);
  const [filters, setFilters] = useState({ rating: 0, genere: false });
  const [sorts, setSorts] = useState({
    movie: true,
    genere: true,
    rating: true,
  });
  useEffect(() => {
    const init = async () =>
      setDisplay(await filter({ movies: props.movies, filters }));
    init();
    console.log(props.movies);
  }, [filters, props.movies]);

  useEffect(() => {
    display.length && console.log(display);
  }, [display]);


  const updateRating = async (index, rating) => {
    props.movieEditAction({ id: props.movies[index].id, value: { rating } });
    // fetchMovie().then((movies) => setMovies(movies));
  };

  return (
    <div>
      <div className="pb-2 text-right">
        <span className="ml-auto">
          <b className="text-white">Genere : </b>
          <select
            onChange={(e) => setFilters({ ...filters, genere: e.target.value })}
            className="border border-primary bg-dark text-white px-2 ml-2 rounded"
          >
            <option value={""}>All</option>
            {props.generes &&
              props.generes.map(({ genere }) => (
                <option value={genere} key={genere}>
                  {genere}
                </option>
              ))}
          </select>
          <b className="text-white ml-4"> Stars : </b>
          <select
            onChange={(e) => setFilters({ ...filters, rating: e.target.value })}
            className="border border-primary bg-dark text-white px-2 ml-2 rounded"
          >
            <option value="0">All</option>
            <option value="1">1+</option>
            <option value="2">2+</option>
            <option value="3">3+</option>
            <option value="4">4+</option>
          </select>
        </span>
      </div>
      <table className="table table-striped table-dark">
        <thead>
          <tr className="bg-info">
            <th scope="col">Movie</th>
            <th scope="col">Genere</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {display.map((movie, index) => (
            <tr key={movie.id}>
              <td>
                <Link to={`/movies/edit/${movie.id}`} className="text-white">
                  {movie.title}
                </Link>
              </td>
              <td>{movie.genere}</td>
              <td>
                <StarComponent
                  star={movie.rating}
                  index={index}
                  updateRating={updateRating}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: state.movie.movies,
  generes: state.genere.generes,
});

export default connect(mapStateToProps, { movieEditAction })(ListTable);
