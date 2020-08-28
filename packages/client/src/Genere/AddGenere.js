import React, { useState } from "react";
import Layout from "../Layout";
// import { addGenere } from "../Apis/geners";
import { connect } from "react-redux";
import { addGenereAction } from "../Action/genereActions";

function AddGenere(props) {
  const [genere, setGenere] = useState("");

  const changehandler = (e) => {
    setGenere(e.target.value);
  };

  const successMessage = () =>
    props.success ? (
      <div className="form-control alert-success">Genere added successfully</div>
    ) : (
      <></>
    );
  const errorMessage = () =>
    props.error ? <div className="form-control alert-danger">{JSON.stringify(props.message)}</div> : <></>;

  const onSubmit = async (e) => {
    e.preventDefault();
    props.addGenereAction(genere)
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

const mapStateToProps = state => ({
  success: state.genere.success,
  error: state.genere.error,
  message: state.genere.message
})

export default connect(mapStateToProps, {addGenereAction})(AddGenere);
