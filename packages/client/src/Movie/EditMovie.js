import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import StarComponent from "../Components/StarComponent";
import { getGenere } from "../Apis/geners";
import { fetchMovieById, updateMovie } from "../Apis/movies";
import { useParams } from "react-router-dom";

function EditMovie() {
  const [values, setValues] = useState({ title: "", genere: "", rating: 0 });
  const [generes, setGeneres] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const init = async () => {
      const gnrs = await getGenere();
      setGeneres(gnrs);
      await fetchMovieById(id)
        .then((movie) => {
          const { title, genere, rating } = movie;
          console.log(title, genere, rating);
          setValues({ title, genere, rating });
          setLoaded(true);
        })
        .catch(async () => {
          setLoaded(true);
          setError("Error Loading Data..  Redirecting.....");
          await setTimeout(() => {
            window.location = "/";
          }, 1000);
        });
    };
    init();
  }, [id]);

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const changehandler = (e) => {
    setSuccess(false);
    setError(false);
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const updateRating = (index, rating) => {
    changehandler({ target: { name: "rating", value: rating } });
  };

  const successMessage = () =>
    success ? (
      <div className="form-control alert-success">
        Movie updated successfully
      </div>
    ) : (
      <></>
    );
  const errorMessage = () =>
    error ? <div className="form-control alert-danger">{error}</div> : <></>;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    updateMovie(id, { title, genere, rating })
      .then((success) => setSuccess(true))
      .catch(({ error }) => setError(error));
  };
  const { title, genere, rating } = values;
  return (
    <div>
      <Layout>
        <div className="pt-5 container">
          <h4 className="mt-5 text-center text-white">Edit Movies</h4>
          <div className="row">
            <form onSubmit={onSubmit} className="col-md-6 offset-md-3">
              <div className="form-group">
                {successMessage()}
                {errorMessage()}
                <label className="text-white">Title</label>
                <input
                  type="text"
                  onChange={changehandler}
                  name="title"
                  value={title}
                  className="form-control"
                  required
                />
                <label className="text-white mt-3">Genere</label>
                {loaded && (
                  <select
                    className="custom-select form-control"
                    onChange={changehandler}
                    name="genere"
                    required
                  >
                    {generes.map((gen) => (
                      <option
                        value={gen.genere}
                        key={gen.genere}
                        selected={genere === gen.genere ? true : false}
                      >
                        {gen.genere}
                      </option>
                    ))}
                  </select>
                )}
                <div>
                  <label className="text-white mt-3">Rating</label>
                  <span>
                    {loaded && (
                      <StarComponent
                        star={rating}
                        index={0}
                        updateRating={updateRating}
                      />
                    )}
                  </span>
                </div>
                <button className="btn btn-success form-control mt-4">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Layout>
    </div>
  );
}

export default EditMovie;
