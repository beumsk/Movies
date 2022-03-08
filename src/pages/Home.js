import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import DataCard from "../components/DataCard";
import Filters from "../components/Filters";
import Loader from "../components/Loader";
import Layout from "../components/Layout";
const TMDB_KEY = "04c35731a5ee918f014970082a0088b1";
const FEATURED_API =
  "https://api.themoviedb.org/3/discover/movie" +
  "?sort_by=popularity.desc&api_key=" +
  TMDB_KEY;

function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [movies, setMovies] = useState([]);
  const [filters, setFilters] = useState({
    sorting: null,
    minRating: "",
    minYear: ""
  });
  const [m, setM] = useState([]);
  const [page, setPage] = useState(2);

  useEffect(() => {
    getMovies(FEATURED_API + "&page=1");
  }, []);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
        setM(data.results);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  };

  const updateMovies = (API) => {
    setFilters({ sorting: null, minRating: "", minYear: "" });
    setIsUpdating(true);
    setPage(page + 1);
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        // add filters logic to setMovies()
        setMovies([...m, ...data.results]);
        setM([...m, ...data.results]);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsUpdating(false));
  };

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
      setMovies(m.filter((x) => x.vote_average > filters.minRating));
    } else if (filters.minYear) {
      setMovies(
        m.filter(
          (x) => new Date(x.release_date).getFullYear() > filters.minYear
        )
      );
    }
  };

  const handleSorting = (e) => {
    if (e.target.id === "clear") {
      setFilters({ sorting: null, minRating: "", minYear: "" });
      setMovies(m);
    } else {
      setFilters({ sorting: e.target.id, minRating: "", minYear: "" });
      if (e.target.id === "byRatings") {
        setMovies([...movies].sort((a, b) => b.vote_average - a.vote_average));
      } else if (e.target.id === "byLetters") {
        setMovies([...movies].sort((a, b) => (a.title > b.title ? 1 : -1)));
      } else if (e.target.id === "byDate") {
        setMovies(
          [...movies].sort(
            (a, b) => new Date(b.release_date) - new Date(a.release_date)
          )
        );
      }
    }
  };

  return (
    <Layout>
      <Typography variant="h2" component="h1" gutterBottom>
        Movies
      </Typography>
      <Filters
        handleSorting={handleSorting}
        handleOnChangeFilters={handleOnChangeFilters}
        handleSubmitFilters={handleSubmitFilters}
        filters={filters}
      />

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {movies?.length > 0 &&
              movies.map((movie) => (
                <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                  <DataCard {...movie} />
                </Grid>
              ))}
          </Grid>
          {isUpdating ? (
            <Loader />
          ) : (
            <Button
              variant="contained"
              sx={{ my: 4 }}
              onClick={() => updateMovies(`${FEATURED_API}&page=${page}`)}
            >
              Load more
            </Button>
          )}
        </>
      )}
    </Layout>
  );
}

export default Home;
