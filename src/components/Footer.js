import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function Footer() {
  const date = new Date();
  return (
    <Box component="footer" sx={{ mt: 12, mb: 4 }}>
      <p>
        &copy; {date.getFullYear()}{' '}
        <a href="https://remybeumier.be" target="_blank" rel="noreferrer">
          Rémy Beumier
        </a>
      </p>
    </Box>
  );
}
