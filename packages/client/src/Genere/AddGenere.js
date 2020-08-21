import React, { useState } from "react";
import Layout from "../Layout";
import { addGenere } from "../Apis/geners";

function AddGenere() {
  const [genere, setGenere] = useState("");


  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const changehandler = (e) => {
    setSuccess(false);
    setError({status: false, message:""});
    setGenere(e.target.value);
  };

  const successMessage = () =>
    success ? (
      <div className="form-control alert-success">Genere added successfully</div>
    ) : (
      <></>
    );
  const errorMessage = () =>
    error.status ? <div className="form-control alert-danger">{JSON.stringify(error.message)}</div> : <></>;

  const onSubmit = async (e) => {
    e.preventDefault();
    setSuccess(false);
    setError(false);
    addGenere(genere)
      .then((success) => setSuccess(true))
      .catch((error) => setError({status:true, message: error}));
  };
  return (
    <div>
      <Layout>
        <div className="pt-5 container">
          <h4 className="mt-5 text-center text-white">Add Genere</h4>
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

export default AddGenere;
