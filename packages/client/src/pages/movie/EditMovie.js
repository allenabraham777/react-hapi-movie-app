import React, { useState, useEffect } from "react";
import Layout from "../../Layout";
import StarComponent from "../../components/StarComponent";
import { movieEditAction, movieFetchByIdAction } from "../../action/movie";
import { fetchGenereAction } from "../../action/genere";
import { useParams, useHistory } from "react-router-dom";
import { connect } from "react-redux";

function EditMovie(props) {
  const [values, setValues] = useState({ title: "", genere: "", rating: 0 });
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const init = async () => {
      await props.movieFetchByIdAction(id);
      props.fetchGenereAction();
    };
    init();
  }, [id]);

  const changehandler = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const updateRating = (index, rating) => {
    changehandler({ target: { name: "rating", value: rating } });
  };

  const successMessage = () =>
    props.success ? (
      <div className="form-control alert-success">
        Movie updated successfully
      </div>
    ) : (
      <></>
    );
  const errorMessage = () =>
    props.error ? (
      <div className="form-control alert-danger">{`${props.message.error}. Redirecting....`}</div>
    ) : (
      <></>
    );

  const onSubmit = async (e) => {
    e.preventDefault();
    props.movieEditAction({ id, value: values });
  };
  if (!loaded && props.movie.title) {
    setLoaded(true);
    setValues({
      title: props.movie.title,
      genere: props.movie.genere,
      rating: props.movie.rating,
    });
  }
  const { title, genere, rating } = values;
  const history = useHistory();
  (props.error) && setTimeout(() => history.push("/movies"), 2000);
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
                    value={genere}
                    required
                  >
                    {props.generes &&
                      props.generes.map((gen) => (
                        <option value={gen.genere} key={gen.genere}>
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

const mapStateToProps = (state) => ({
  movie: state.movie.movie,
  success: state.movie.success,
  error: state.movie.error,
  message: state.movie.message,
  generes: state.genere.generes,
});

export default connect(mapStateToProps, {
  movieEditAction,
  movieFetchByIdAction,
  fetchGenereAction,
})(EditMovie);
