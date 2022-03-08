import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Filters({
  handleSorting,
  handleOnChangeFilters,
  handleSubmitFilters,
  filters
}) {
  return (
    <>
      <Stack spacing={2} direction="row" sx={{ mb: 2 }}>
        <Button
          id="byRatings"
          variant={filters.sorting === "byRatings" ? "contained" : "outlined"}
          onClick={handleSorting}
        >
          By ratings
        </Button>
        <Button
          id="byLetters"
          variant={filters.sorting === "byLetters" ? "contained" : "outlined"}
          onClick={handleSorting}
        >
          By letters
        </Button>
        <Button
          id="byDate"
          variant={filters.sorting === "byDate" ? "contained" : "outlined"}
          onClick={handleSorting}
        >
          By date
        </Button>
        <Button id="clear" variant="contained" onClick={handleSorting}>
          Clear
        </Button>
      </Stack>

      <Box
        component="form"
        noValidate
        autoComplete="off"
        onSubmit={handleSubmitFilters}
      >
        <Stack spacing={2} direction="row" sx={{ mb: 4 }}>
          <TextField
            id="minRating"
            label="Min rating"
            variant="outlined"
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={filters.minRating}
            onChange={handleOnChangeFilters}
          />
          <TextField
            id="minYear"
            label="Min year"
            variant="outlined"
            size="small"
            inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
            value={filters.minYear}
            onChange={handleOnChangeFilters}
          />
          <Button type="submit" id="submit" variant="contained">
            Submit
          </Button>
        </Stack>
      </Box>
    </>
  );
}
