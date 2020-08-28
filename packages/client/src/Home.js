import React, { useEffect } from "react";
import Layout from "./Layout";
import ListTable from "./Components/ListTable";
import { connect } from "react-redux";
import { movieFetchAction } from "./Action/movieAction";
import { fetchGenereAction } from "./Action/genereActions";

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
