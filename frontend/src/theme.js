import { createMuiTheme } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    type: "dark",
    primary: {
      main: "#7cabae",
      contrastText: "#fff"
    },
    error: {
      main: "#f57c00"
    }
  },
  typography: {
    button: {
      textTransform: "none"
    }
  },
  spacing: 4
});

export default theme;
