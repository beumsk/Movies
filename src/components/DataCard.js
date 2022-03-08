import { Link as RouterLink } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";

const IMG_API = "https://image.tmdb.org/t/p/w300";

export default function DataCard({
  type,
  title,
  name,
  overview,
  character,
  poster_path,
  profile_path,
  vote_average,
  media_type,
  id
}) {
  return (
    <RouterLink
      to={`/${
        type !== "combined"
          ? type
          : media_type === "movie"
          ? "movies"
          : "series"
      }/${id}`}
    >
      <Card
        className="card-hover"
        sx={{
          maxWidth: "100%",
          mb: 0,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          height: "100%"
        }}
      >
        <CardActionArea>
          <CardMedia
            component="img"
            sx={{ aspectRatio: "2/3" }}
            image={
              poster_path || profile_path
                ? IMG_API + (type === "actors" ? profile_path : poster_path)
                : "/img/default-movie.png"
            }
            alt={title || name}
          />
          <CardContent className="card-hover-data">
            <Typography
              variant="h6"
              component="h2"
              title={title || name}
              gutterBottom
            >
              {title || name}
            </Typography>
            <Typography
              className="t-ellipsis-3"
              variant="body2"
              color="text.secondary"
              title={character || overview}
              gutterBottom
            >
              {character || overview}
            </Typography>
            <Typography variant="body1" component="p">
              {type !== "actors" && vote_average?.toFixed(1)}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </RouterLink>
  );
}
