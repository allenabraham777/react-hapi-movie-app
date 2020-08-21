import React from "react";
import Layout from "./Layout";
import ListTable from "./Components/ListTable";

function Home() {
    
  return (
    <Layout>
      <div className="container pt-5">
        <h4 className="mt-5 text-white">Movie App</h4>
        <ListTable/>
      </div>
    </Layout>
  );
}

export default Home;
