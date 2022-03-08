import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Layout from "../components/Layout";
import Loader from "../components/Loader";
import CardList from "../components/CardList";
import { connect } from "react-redux";
import { singleMovie } from "../redux/moviesActions";

const Img = styled("img")`
  width: 100%;
`;

const ImgContainer = styled("div")`
  position: relative;
  margin-top: -10px;
  margin-left: -26px;
  margin-right: -26px;
  @media screen and (min-width: 600px) {
    margin-left: -34px;
    margin-right: -34px;
  }
  @media screen and (min-width: 1200px) {
    margin-left: calc((100vw - 1200px) / -2 - 24px);
    margin-right: calc((100vw - 1200px) / -2 - 24px);
  }
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(to top, #333, transparent);
  }
`;

function Movie({ moviesData, singleMovie }) {
  const { id } = useParams();
  const { movie, loading, error } = moviesData;

  const director = movie?.credits?.crew?.find((x) => x.job === "Director")
    ?.name;

  useEffect(() => {
    singleMovie(id);
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ mb: 8 }}>
          <ImgContainer>
            <Img
              src={`https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`}
              alt=""
            />
          </ImgContainer>

          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ top: "-180px", position: "relative" }}>
            <Typography variant="h2" component="h1" gutterBottom>
              {movie.title}
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} md={8} sx={{ textAlign: "left" }}>
                <Typography>{movie.overview}</Typography>
                <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                  {movie.genres &&
                    movie.genres.map((x) => {
                      return (
                        <Chip key={x.id} label={x.name} variant="outlined" />
                      );
                    })}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
                <Box>
                  {director && (
                    <Typography variant="h5">Directed by {director}</Typography>
                  )}
                  {movie.runtime && (
                    <Typography>Runtime: {movie.runtime} min</Typography>
                  )}
                  {movie.release_date && (
                    <Typography>Release date: {movie.release_date}</Typography>
                  )}
                  {movie.vote_average && (
                    <Typography>Rating: {movie.vote_average}</Typography>
                  )}
                  {movie.budget > 0 && (
                    <Typography>Budget: {movie.budget}$</Typography>
                  )}
                  {movie.revenue > 0 && (
                    <Typography>Revenue: {movie.revenue}$</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <CardList
              title="Actors"
              type="actors"
              data={movie?.credits?.cast?.filter((x, i) => i < 10)}
            />

            <CardList
              title="Recommendations"
              type="movies"
              data={movie?.recommendations?.results?.filter((x, i) => i < 10)}
            />
          </Box>
        </Box>
      )}
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    moviesData: state.movies
  };
}

function mapDispatchToProps(dispatch) {
  return {
    singleMovie: (idd) => dispatch(singleMovie(idd))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
