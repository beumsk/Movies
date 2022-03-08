import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Link from "@mui/material/Link";
import SearchCustom from "./SearchCustom";

const links = [
  { to: "/", text: "Home" },
  { to: "/movies", text: "Movies" },
  { to: "/series", text: "Series" }
];

export default function TopBar({
  handleOnSubmitSearch,
  handleOnChangeSearch,
  searchTerm
}) {
  return (
    <AppBar
      position="sticky"
      color="secondary"
      sx={{ background: "#666", top: 0 }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
        {links.map((x) => (
          <Link
            key={x.text}
            component={RouterLink}
            to={x.to}
            variant="h6"
            noWrap
            sx={{ textDecoration: "none", color: "inherit" }}
          >
            {x.text}
          </Link>
        ))}
        <Box component="form" onSubmit={handleOnSubmitSearch}>
          <SearchCustom
            placeholder="Search movies or series…"
            searchTerm={searchTerm}
            handleOnChangeSearch={handleOnChangeSearch}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
