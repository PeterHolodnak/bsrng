import "./css/App.css";
import AddGame from "./components/AddGame";
import GamesList from "./components/GamesList";
import {
    Container,
    createTheme,
    Grid,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";

const useStyles = makeStyles({
    title: {
        textAlign: "center",
    },
});

function App() {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#476299",
            },
            secondary: {
                main: "#4f4475",
            },
            background: {
                paper: "#282c34",
                default: "#282c34",
            },
            text: {
                primary: "#c7c7c7",
                secondary: "#bdbdbd",
            },
        },
    });

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className="app">
                <Container>
                    <Grid container justifyContent="center">
                        <Grid item xs={12}>
                            <h1 className={classes.title}>BS RNG</h1>
                        </Grid>
                    </Grid>
                    <AddGame />
                    <GamesList />
                </Container>
            </div>
        </ThemeProvider>
    );
}

export default App;
