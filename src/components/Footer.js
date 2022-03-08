import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export default function Footer() {
  const date = new Date();
  return (
    <Box sx={{ mt: 12, mb: 4 }}>
      <Typography>&copy; {date.getFullYear()} Rémy Beumier</Typography>
    </Box>
  );
}
