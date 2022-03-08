import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";
import CardList from "../components/CardList";
import { connect } from "react-redux";
import { getMovies, bestMovies } from "../redux/moviesActions";
import { getSeries, bestSeries } from "../redux/seriesActions";

function Home({
  moviesData,
  getMovies,
  seriesData,
  getSeries,
  bestMovies,
  bestSeries
}) {
  const { movies, moviesBest, loading: loadingM, error: errorM } = moviesData;
  const { series, seriesBest, loading: loadingS, error: errorS } = seriesData;

  useEffect(() => {
    getMovies();
    getSeries();
    bestMovies();
    bestSeries();
  }, []);

  return (
    <Layout>
      <Typography variant="h2" component="h1" gutterBottom>
        Movies & Series
      </Typography>

      <CardList
        title="Popular Movies"
        type="movies"
        data={movies}
        error={errorM}
        loading={loadingM}
      />

      <CardList
        title="Popular Series"
        type="series"
        data={series}
        error={errorS}
        loading={loadingS}
      />

      <CardList
        title="Best Rated Movies"
        type="movies"
        data={moviesBest}
        error={errorM}
        loading={loadingM}
      />

      <CardList
        title="Best Rated Series"
        type="series"
        data={seriesBest}
        error={errorS}
        loading={loadingS}
      />
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    moviesData: state.movies,
    seriesData: state.series
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getMovies: () => dispatch(getMovies()),
    getSeries: () => dispatch(getSeries()),
    bestMovies: () => dispatch(bestMovies()),
    bestSeries: () => dispatch(bestSeries())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Home);
