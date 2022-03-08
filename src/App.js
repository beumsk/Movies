import React from "react";
import "./styles.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Search from "./pages/Search";
// import Movies from "./pages/Movies";
// import Series from "./pages/Series";
import Home from "./pages/HomeRedux";
import Movies from "./pages/MoviesRedux";
import Movie from "./pages/MovieRedux";
import Series from "./pages/SeriesRedux";
import Serie from "./pages/SerieRedux";
import Actor from "./pages/ActorRedux";
import Search from "./pages/SearchRedux";
import PageNotFound from "./pages/PageNotFound";

export default function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Home />
        </Route>
        <Route path="/movies" exact>
          <Movies />
        </Route>
        <Route path="/series" exact>
          <Series />
        </Route>
        <Route path="/movies/:id">
          <Movie />
        </Route>
        <Route path="/series/:id">
          <Serie />
        </Route>
        <Route path="/actors/:id">
          <Actor />
        </Route>
        <Route path="/search/:id">
          <Search />
        </Route>
        <Route>
          <PageNotFound />
        </Route>
      </Switch>
    </Router>
  );
}
