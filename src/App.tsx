import "./css/App.scss";
import {
    Container,
    createTheme,
    Grid,
    makeStyles,
    ThemeProvider,
} from "@material-ui/core";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";

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
                paper: "#404a5e",
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
            <Router>
                <main className="app">
                    <Container>
                        <Grid container justifyContent="center">
                            <Grid item xs={12}>
                                <Link to="/">
                                    <h1 className={classes.title}>BS RNG</h1>
                                </Link>
                            </Grid>
                        </Grid>
                        <Switch>
                            <Route path="/" exact component={HomePage}></Route>
                            <Route
                                path="/game/:id"
                                exact
                                component={GamePage}
                            ></Route>
                        </Switch>
                    </Container>
                </main>
            </Router>
        </ThemeProvider>
    );
}

const useStyles = makeStyles({
    title: {
        textAlign: "center",
    },
});

export default App;
