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
import { singleSerie } from "../redux/seriesActions";

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

function Serie({ seriesData, singleSerie }) {
  const { id } = useParams();
  const { serie, loading, error } = seriesData;

  useEffect(() => {
    singleSerie(id);
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ mb: 8 }}>
          <ImgContainer>
            <Img
              src={`https://image.tmdb.org/t/p/w1280${serie.backdrop_path}`}
              alt=""
            />
          </ImgContainer>

          {error && <Alert severity="error">{error}</Alert>}

          <Box sx={{ top: "-180px", position: "relative" }}>
            <Typography variant="h2" component="h1" gutterBottom>
              {serie.name}
            </Typography>

            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} md={8} sx={{ textAlign: "left" }}>
                <Typography>{serie.overview}</Typography>
                <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                  {serie.genres &&
                    serie.genres.map((x) => {
                      return (
                        <Chip key={x.id} label={x.name} variant="outlined" />
                      );
                    })}
                </Stack>
              </Grid>

              <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
                <Box>
                  {serie.created_by && (
                    <Typography variant="h5">
                      Created by{" "}
                      {serie.created_by?.map((x) => x.name).join(" & ")}
                    </Typography>
                  )}
                  {serie.episode_run_time && (
                    <Typography>
                      Runtime:{" "}
                      {serie.episode_run_time?.reduce(
                        (a, b) => parseFloat(a) + parseFloat(b),
                        0
                      )}{" "}
                      min
                    </Typography>
                  )}
                  {serie.first_air_date && (
                    <Typography>Start date: {serie.first_air_date}</Typography>
                  )}
                  {serie.last_air_date && (
                    <Typography>
                      Last episode date: {serie.last_air_date}
                    </Typography>
                  )}
                  {serie.vote_average && (
                    <Typography>Rating: {serie.vote_average}</Typography>
                  )}
                  {serie.number_of_seasons > 0 && (
                    <Typography>{serie.number_of_seasons} Seasons</Typography>
                  )}
                  {serie.number_of_episodes > 0 && (
                    <Typography>{serie.number_of_episodes} Episodes</Typography>
                  )}
                </Box>
              </Grid>
            </Grid>

            <CardList
              title="Actors"
              type="actors"
              data={serie?.credits?.cast?.filter((x, i) => i < 10)}
            />

            <CardList
              title="Recommendations"
              type="series"
              data={serie?.recommendations?.results?.filter((x, i) => i < 10)}
            />
          </Box>
        </Box>
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
    singleSerie: (idd) => dispatch(singleSerie(idd))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Serie);
