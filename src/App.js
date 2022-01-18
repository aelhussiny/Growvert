import "./App.css";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import { AuthProvider } from "./Auth";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { theme } from "./theme";
import { setDefaultOptions } from "esri-loader";

import LoginScreen from "./LoginScreen";
import AllGrowsScreen from "./AllGrowsScreen";
import ProfileScreen from "./ProfileScreen";
import RegisterScreen from "./RegisterScreen";
import ForgotPassScreen from "./ForgotPassScreen";
import GrowScreen from "./GrowScreen";
import NewGrowScreen from "./NewGrowScreen";

const App = () => {
    setDefaultOptions({ css: true });
    return (
        <AuthProvider>
            <MuiThemeProvider theme={theme}>
                <Router>
                    <div className="root">
                        <Route exact path="/">
                            <Redirect to="/all" />
                        </Route>
                        <Route exact path="/all" component={AllGrowsScreen} />
                        <Route exact path="/login" component={LoginScreen} />
                        <Route exact path="/profile/:profileId" component={ProfileScreen} />
                        <Route exact path="/register" component={RegisterScreen} />
                        <Route exact path="/forgotpass" component={ForgotPassScreen} />
                        <Route exact path="/grow/:growId" component={GrowScreen} />
                        <Route exact path="/new" component={NewGrowScreen} />
                    </div>
                </Router>
            </MuiThemeProvider>
        </AuthProvider>
    );
};

export default App;
