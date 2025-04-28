import { Box, Typography } from "@mui/material";

export const NotFound = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flex: 1,
        alignItems: "center",
      }}
    >
      <Typography variant="h4">404 Not Found</Typography>
    </Box>
  );
};
