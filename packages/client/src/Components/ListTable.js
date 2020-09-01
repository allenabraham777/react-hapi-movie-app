import React from "react";
import { FaCaretDown, FaCaretUp, FaTrashAlt } from "react-icons/fa";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { movieEditAction, movieDeleteAction } from "../action/movie";
import { applyFilter } from "../action/filter";
import { applySort } from "../action/sort";
import StarComponent from "./StarComponent";
import { select } from "../reselect/movie";

const ListTable = (props) => {
  const updateRating = async (index, rating) => {
    props.movieEditAction({ id: props.movies[index].id, value: { rating } });
  };

  return (
    <div>
      <div className="pb-2">
        <span className="float-right mb-3">
          <b className="text-white">Genere : </b>
          <select
            onChange={(e) => props.applyFilter({ genere: e.target.value })}
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
            onChange={(e) => props.applyFilter({ rating: e.target.value })}
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
      <div className="table-responsive">
        <table className="table table-striped table-dark border border-danger">
          <thead>
            <tr className="bg-danger">
              <th scope="col">
                Movie{" "}
                <span>
                  <a
                    className="my-0 text-white"
                    onClick={() => props.applySort(!props.sort)}
                  >
                    {props.sort ? <FaCaretDown /> : <FaCaretUp />}
                  </a>
                </span>
              </th>
              <th scope="col">Genere</th>
              <th scope="col">
                <span className="ml-2 pl-5">Rating</span>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {props.movies.map((movie, index) => (
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
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => props.movieDeleteAction(movie.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  movies: select({
    movies: state.movie.movies,
    filters: state.filter.filters,
    sort: state.sort.sort,
  }),
  generes: state.genere.generes,
  filters: state.filter.filters,
  sort: state.sort.sort,
});

export default connect(mapStateToProps, {
  movieEditAction,
  movieDeleteAction,
  applyFilter,
  applySort,
})(ListTable);
