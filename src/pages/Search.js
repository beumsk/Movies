import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import DataCard from "../components/DataCard";
import Loader from "../components/Loader";
import Layout from "../components/Layout";

const TMDB_KEY = "04c35731a5ee918f014970082a0088b1";
const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_KEY + "&query=";

export default function Search() {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMovies(SEARCH_API + id);
  }, [id]);

  const getMovies = (API) => {
    fetch(API)
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((e) => console.error(e))
      .finally(() => setIsLoading(false));
  };

  return (
    <Layout>
      <Typography variant="h2" component="h1" gutterBottom>
        Search: {id}
      </Typography>
      {isLoading ? (
        <Loader />
      ) : (
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {movies?.length > 0 &&
            movies.map((movie) => (
              <Grid key={movie.id} item xs={12} sm={6} md={4} lg={3}>
                <DataCard {...movie} />
              </Grid>
            ))}
        </Grid>
      )}
    </Layout>
  );
}
