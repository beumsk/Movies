import { styled } from "@mui/material/styles";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import DataCard from "./DataCard";
import Loader from "./Loader";

const GridItemStyle = {
  flexGrow: 0,
  flexShrink: 0,
  flexBasis: "200px",
  maxWidth: "200px"
};

const BoxSlide = styled(Box)`
  margin-bottom: 32px;
  padding: 0 1px 16px 1px;
  overflow: auto;
  scrollbar-color: #666 transparent;
  ::-webkit-scrollbar {
    height: 8px;
  }
  ::-webkit-scrollbar-track {
    background: transparent;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 8px;
    background: #666;
  }
`;

function CardList({ type, title, error, data, loading }) {
  return (
    <>
      <Typography
        variant="h4"
        component="h2"
        gutterBottom
        sx={{ textAlign: "left" }}
      >
        {title}
      </Typography>
      <BoxSlide>
        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ flexWrap: "nowrap" }}>
          {error && <Alert severity="error">{error}</Alert>}
          {data &&
            data.map((d) => (
              <Grid key={d.id} item sx={GridItemStyle}>
                <DataCard type={type} {...d} />
              </Grid>
            ))}
          {loading && <Loader />}
        </Grid>
      </BoxSlide>
      <Typography sx={{ textAlign: "left", mb: 4 }}>
        {data?.length === 0 && `No ${title} for the request`}
      </Typography>
    </>
  );
}

export default CardList;
