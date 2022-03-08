import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import CardList from "../components/CardList";
import Layout from "../components/Layout";
import { connect } from "react-redux";
import { searchMovies } from "../redux/moviesActions";
import { searchSeries } from "../redux/seriesActions";
import { searchActors } from "../redux/actorsActions";

function Search({
  moviesData,
  searchMovies,
  seriesData,
  searchSeries,
  actorsData,
  searchActors
}) {
  const { moviesSearch, loading: loadingM, error: errorM } = moviesData;
  const { seriesSearch, loading: loadingS, error: errorS } = seriesData;
  const { actorsSearch, loading: loadingA, error: errorA } = actorsData;
  const { id } = useParams();

  useEffect(() => {
    searchMovies(id);
    searchSeries(id);
    searchActors(id);
  }, [id]);

  return (
    <Layout>
      <Typography variant="h2" component="h1" gutterBottom>
        Search: {id}
      </Typography>

      <CardList
        title="Movies"
        type="movies"
        data={moviesSearch}
        error={errorM}
        loading={loadingM}
      />

      <CardList
        title="Series"
        type="series"
        data={seriesSearch}
        error={errorS}
        loading={loadingS}
      />

      <CardList
        title="Actors"
        type="actors"
        data={actorsSearch}
        error={errorA}
        loading={loadingA}
      />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    moviesData: state.movies,
    seriesData: state.series,
    actorsData: state.actors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    searchMovies: (searchTerm) => dispatch(searchMovies(searchTerm)),
    searchSeries: (searchTerm) => dispatch(searchSeries(searchTerm)),
    searchActors: (searchTerm) => dispatch(searchActors(searchTerm))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);
