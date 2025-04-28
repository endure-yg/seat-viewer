import { Box, Typography } from "@mui/material";

export const Homepage = () => {
  return (
    <Box
      sx={{
        display: "flex",
        margin: "1rem",
        flex: 1,
      }}
    >
      <Typography variant="h4">
        Welcome to the 2025 Youth Gathering Seat Viewer application!
      </Typography>
    </Box>
  );
};
