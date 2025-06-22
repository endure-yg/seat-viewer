import { Box, Typography } from "@mui/material";

export const Homepage = () => {
  return (
    <Box
      sx={{
        //display: "flex",
        margin: "1rem",
        // flex: 1,
      }}
    >
      <Typography variant="h4" sx={{ mb: "2rem" }}>
        2025 Youth Gathering Seat Viewer Application
      </Typography>
      <Typography variant="h6" sx={{ mb: "2rem" }}>
        To view your Mass Event seat assignments, click "Seat Assignments by
        Congregation" and type in your Congregation ID.
      </Typography>
      <Typography variant="h6">
        To see how each Dome section is organized and the seat
        types (like ADA), click "Sections with Seat Type"
      </Typography>
    </Box>
  );
};
