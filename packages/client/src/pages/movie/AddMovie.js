import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { movieAddAction, resetAllAction } from "../../action/movie";
import { fetchGenereAction } from "../../action/genere";

import Layout from "../../Layout";
import StarComponent from "../../components/StarComponent";

function AddMovie(props) {
  const [values, setValues] = useState({
    title: "",
    genere: "Drama",
    rating: 0,
  });

  useEffect(() => {
    props.resetAllAction();
    props.fetchGenereAction();
  }, []);

  const changehandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const updateRating = (index, rating) => {
    changehandler({ target: { name: "rating", value: rating } });
  };

  const successMessage = () =>
    props.success ? (
      <div className="form-control alert-success">Movie added successfully</div>
    ) : (
      <></>
    );
  const errorMessage = () =>
    props.error ? (
      <div className="form-control alert-danger">{props.message}</div>
    ) : (
      <></>
    );

  const onSubmit = async (e) => {
    e.preventDefault();
    props.movieAddAction({ title, genere, rating });
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
                  {props.generes &&
                    props.generes.map(({ genere }) => (
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

const mapStateToProps = (state) => ({
  success: state.movie.success,
  error: state.movie.error,
  generes: state.genere.generes,
});

export default connect(mapStateToProps, {
  movieAddAction,
  resetAllAction,
  fetchGenereAction,
})(AddMovie);
