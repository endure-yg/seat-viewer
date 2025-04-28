import { Box, Typography } from "@mui/material";

export const Section = () => {
  return (
    <Box
      sx={{
        display: "flex",
        flex: 1,
        margin: "1rem",
      }}
    >
      <Typography variant="h4">Section Lookup</Typography>
    </Box>
  );
};
