import React, { useEffect } from "react";
import Layout from "../Layout";
import ListTable from "../components/ListTable";
import { connect } from "react-redux";
import { movieFetchAction } from "../action/movie";
import { fetchGenereAction } from "../action/genere";

function Home(props) {
  useEffect(() => {
    props.movieFetchAction();
    props.fetchGenereAction();
  }, []);
  return (
    <Layout>
      <div className="container pt-5">
        <h4 className="mt-5 text-white">Movie App</h4>
        <ListTable />
      </div>
    </Layout>
  );
}

export default connect(null, { movieFetchAction, fetchGenereAction })(Home);
