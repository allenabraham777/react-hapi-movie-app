import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./pages/Home";
import AddMovie from "./pages/movie/AddMovie";
import EditMovie from "./pages/movie/EditMovie";
import AddGenere from "./pages/genere/AddGenere";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies/add"  component={AddMovie} />
        <Route path="/movies/edit/:id"  component={EditMovie} />
        <Route path="/generes/add"  component={AddGenere} />
      </Switch>
    </Router>
  );
};

export default Routes;
