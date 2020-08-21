import React from "react";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import Home from "./Home";
import AddMovie from "./Movie/AddMovie";
import EditMovie from "./Movie/EditMovie";
import AddGenere from "./Genere/AddGenere";
import EditGenere from "./Genere/EditGenere";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/movies/add"  component={AddMovie} />
        <Route path="/movies/edit/:id"  component={EditMovie} />
        <Route path="/generes/add"  component={AddGenere} />
        <Route path="/generes/edit/:id"  component={EditGenere} />
      </Switch>
    </Router>
  );
};

export default Routes;
