import { createTheme } from "@mui/material"

export const Theme = createTheme({
  typography: {
    fontFamily: `'Mulish', sans-serif`,
  },
  palette: {
    primary: {
      main: "#2622B5",
    },
    secondary: {
      main: "#5287ED",
    },
    grey: {
      100: "#F8F9FB",
      200: "#EFF1F4",
      300: "#EAEEF3",
      500: "#858798",
      700: "#DCDFEE",
      900: "#232747",
      600: "#EAEEF3",
    },
  },
})
