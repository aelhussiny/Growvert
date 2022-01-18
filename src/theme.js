import { createTheme } from "@material-ui/core/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3F3F3F",
            dark: "#2D2D2D",
            contrastText: "#6FC6DF",
        },
        secondar: {
            main: "#6FC6DF",
        },
        uiRed: "#F50057",
        esriGreen: "#9FC73B",
        esriBlue: "#6FC6DF",
    },
});

export { theme };
