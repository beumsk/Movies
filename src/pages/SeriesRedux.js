import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import DataCard from "../components/DataCard";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import Filters from "../components/Filters";
import { connect } from "react-redux";
import { getSeries, updateSeries } from "../redux/seriesActions";

function Series({ seriesData, getSeries, updateSeries }) {
  const { series, loading, error } = seriesData;
  const [seriess, setSeriess] = useState([]);
  const [filters, setFilters] = useState({
    sorting: null,
    minRating: "",
    minYear: ""
  });
  const [s, setS] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    getSeries();
  }, []);

  useEffect(() => {
    setSeriess(series);
    setS(series);
  }, [series]);

  // only dispatch new set of movies, save the current list and add the new one
  function moreMovies() {
    setFilters({ sorting: null, minRating: "", minYear: "" });
    updateSeries(page);
    setPage(page + 1);
  }

  const handleOnChangeFilters = (e) => {
    if (e.target.id === "minRating") {
      setFilters({ sorting: null, minRating: e.target.value, minYear: "" });
    } else if (e.target.id === "minYear") {
      setFilters({ sorting: null, minRating: "", minYear: e.target.value });
    }
  };

  const handleSubmitFilters = (e) => {
    e.preventDefault();
    if (filters.minRating) {
      setSeriess(s.filter((x) => x.vote_average > filters.minRating));
    } else if (filters.minYear) {
      setSeriess(
        s.filter(
          (x) => new Date(x.release_date).getFullYear() > filters.minYear
        )
      );
    }
  };

  const handleSorting = (e) => {
    if (e.target.id === "clear") {
      setFilters({ sorting: null, minRating: "", minYear: "" });
      setSeriess(s);
    } else {
      setFilters({ sorting: e.target.id, minRating: "", minYear: "" });
      if (e.target.id === "byRatings") {
        setSeriess([...series].sort((a, b) => b.vote_average - a.vote_average));
      } else if (e.target.id === "byLetters") {
        setSeriess([...series].sort((a, b) => (a.title > b.title ? 1 : -1)));
      } else if (e.target.id === "byDate") {
        setSeriess(
          [...series].sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          )
        );
      }
    }
  };

  return (
    <Layout>
      <Typography variant="h2" component="h1" gutterBottom>
        Series
      </Typography>

      <Filters
        handleSorting={handleSorting}
        handleOnChangeFilters={handleOnChangeFilters}
        handleSubmitFilters={handleSubmitFilters}
        filters={filters}
      />

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {seriess &&
          seriess.map((movie) => (
            <Grid key={movie.id} item xs={6} sm={4} md={3} lg={2}>
              <DataCard type="series" {...movie} />
            </Grid>
          ))}
      </Grid>
      {loading ? (
        <Loader />
      ) : (
        <Button variant="contained" sx={{ my: 4 }} onClick={() => moreMovies()}>
          Load more
        </Button>
      )}
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    seriesData: state.series
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getSeries: () => dispatch(getSeries()),
    updateSeries: (page) => dispatch(updateSeries(page))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Series);
