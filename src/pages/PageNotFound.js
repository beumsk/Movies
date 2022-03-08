import { Link as RouterLink } from "react-router-dom";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Layout from "../components/Layout";

export default function PageNotFound() {
  return (
    <Layout>
      <Typography variant="h2" component="h1" gutterBottom>
        Page not found
      </Typography>
      <Typography gutterBottom>There is nothing to show here</Typography>
      <Button component={RouterLink} to="/" variant="contained">
        Go Home
      </Button>
    </Layout>
  );
}
