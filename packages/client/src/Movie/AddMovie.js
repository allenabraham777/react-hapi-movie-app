import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import StarComponent from "../Components/StarComponent";
import { getGenere } from "../Apis/geners";
import { addMovie } from "../Apis/movies";

function AddMovie() {
  const [values, setValues] = useState({ title: "", genere: "", rating: 0 });

  const [generes, setGeneres] = useState([]);
  useEffect(() => {
    const init = async () => {
      const gnrs = await getGenere();
      setGeneres(gnrs);
    };
    init();
  }, []);

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
      <div className="form-control alert-success">Movie added successfully</div>
    ) : (
      <></>
    );
  const errorMessage = () =>
    error ? <div className="form-control alert-danger">{error}</div> : <></>;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    addMovie(title, genere, rating)
      .then((success) => setSuccess(true))
      .catch(({ error }) => setError(error));
    setValues({ name: "", genere: "", rating: "" });
  };
  const { title, genere, rating } = values;
  return (
    <div>
      <Layout>
        <div className="pt-5 container">
          <h4 className="mt-5 text-center text-white">Add Movies</h4>
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
                <select
                  className="custom-select form-control"
                  onChange={changehandler}
                  name="genere"
                  required
                >
                  {generes.map(({ genere }) => (
                    <option value={genere} key={genere}>
                      {genere}
                    </option>
                  ))}
                </select>
                <div>
                  <label className="text-white mt-3">Rating</label>
                  <span>
                    <StarComponent
                      star={rating}
                      index={0}
                      updateRating={updateRating}
                    />
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

export default AddMovie;
