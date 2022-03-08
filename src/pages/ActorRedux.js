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
import { singleActor } from "../redux/actorsActions";

const Img = styled("img")`
  width: 100%;
`;

function Actor({ actorsData, singleActor }) {
  const { id } = useParams();
  const { actor, loading, error } = actorsData;

  const birthday = new Date(actor?.birthday);
  const dateDiff = new Date() - birthday;

  useEffect(() => {
    singleActor(id);
  }, [id]);

  return (
    <Layout>
      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ pt: 4, mb: 8 }}>
          {error && <Alert severity="error">{error}</Alert>}

          <Box>
            <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mb: 4 }}>
              <Grid item xs={12} sm={4} md={3}>
                <Img
                  src={`https://image.tmdb.org/t/p/w1280${actor.profile_path}`}
                  alt=""
                />
              </Grid>

              <Grid item xs={12} sm={8} md={9} sx={{ textAlign: "left" }}>
                <Typography variant="h2" component="h1" gutterBottom>
                  {actor.name}
                </Typography>

                <Typography>{actor.biography}</Typography>

                <Stack direction="row" spacing={1} sx={{ my: 2 }}>
                  {actor.birthday && (
                    <Typography>
                      Birthday: {actor.birthday} (
                      {Math.floor(dateDiff / (1000 * 60 * 60 * 24 * 365.25))}{" "}
                      y.o.)
                    </Typography>
                  )}
                </Stack>
              </Grid>
            </Grid>

            {actor?.combined_credits?.cast && (
              <CardList
                title="Known for"
                type="combined"
                // get rid of talk shows !
                data={[
                  ...actor.combined_credits.cast.filter(
                    (x) =>
                      x.character.toLowerCase() !== "self" &&
                      x.character.toLowerCase() !== "himself" &&
                      x.character !== "" &&
                      !x.overview.includes("talk show")
                  )
                ]
                  .sort((a, b) => b.popularity - a.popularity)
                  .filter((x, i) => i < 10)}
              />
            )}
          </Box>
        </Box>
      )}
    </Layout>
  );
}

function mapStateToProps(state) {
  return {
    actorsData: state.actors
  };
}

function mapDispatchToProps(dispatch) {
  return {
    singleActor: (idd) => dispatch(singleActor(idd))
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Actor);
