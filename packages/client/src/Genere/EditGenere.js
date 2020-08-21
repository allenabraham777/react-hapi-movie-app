import React, { useState, useEffect } from "react";
import Layout from "../Layout";
import { editGenere } from "../Apis/geners";
import { useParams } from "react-router-dom";

function EditGenere() {
  const [genere, setGenere] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const { id } = useParams();

  useEffect(() => {
    setGenere(id);
  }, [id]);

  const changehandler = (e) => {
    setSuccess(false);
    setError(false);
    setGenere(e.target.value);
  };

  const successMessage = () =>
    success ? (
      <div className="form-control alert-success">
        Genere edited successfully
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
    editGenere(genere, id)
      .then((success) => setSuccess(true))
      .catch((error) => setError(error));
  };
  return (
    <div>
      <Layout>
        <div className="pt-5 container">
          <h4 className="mt-5 text-center text-white">
            Edit Genere - {id}
          </h4>
          <div className="row">
            <form onSubmit={onSubmit} className="col-md-6 offset-md-3">
              <div className="form-group">
                {successMessage()}
                {errorMessage()}
                <label className="text-white">Genere</label>
                <input
                  type="text"
                  onChange={changehandler}
                  name="genere"
                  value={genere}
                  className="form-control"
                  required
                />
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

export default EditGenere;
