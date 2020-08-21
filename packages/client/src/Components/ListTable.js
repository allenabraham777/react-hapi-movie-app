import React, { useState, useEffect } from "react";
import StarComponent from "./StarComponent";
import { fetchMovie, updateMovie } from "../Apis/movies";
import { Link } from "react-router-dom";

const ListTable = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovie().then((movies) => setMovies(movies));
  }, []);

  const updateRating = async (index, rating) => {
    console.log("Called");
    const newList = movies;
    newList[index].rating = rating;
    await updateMovie(newList[index].id, { rating });
    fetchMovie().then((movies) => setMovies(movies));
  };

  return (
    <div>
      <table className="table table-striped table-dark">
        <thead>
          <tr className="bg-info">
            <th scope="col">Movie</th>
            <th scope="col">Genere</th>
            <th scope="col">Rating</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie, index) => (
            <tr key={movie.id}>
              <td><Link to={`/movies/edit/${movie.id}`} className="text-white">{movie.title}</Link></td>
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

export default ListTable;
