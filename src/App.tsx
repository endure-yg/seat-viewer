import { Box, createTheme, ThemeProvider } from "@mui/material";
import { AppMenu } from "./components/AppMenu";
import { AppRouter } from "./components/AppRouter";

const darkTheme = createTheme({
  palette: {
    primary: {
      main: "#302984",
    },
    secondary: {
      main: "#a23bb0",
    },
  },
  typography: {
    fontFamily: "Poppins, sans-serif",
  },
});

export const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
        <AppMenu />
        <Box sx={{ display: "flex", flex: 1 }}>
          <AppRouter />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default App;
