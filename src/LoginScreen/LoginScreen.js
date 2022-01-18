import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import Navbar from "../Navbar";
import app from "../firebase";
import { AuthContext } from "../Auth";
import logo from "../img/logo.svg";

import Link from "@material-ui/core/Link";

import {
    Container,
    StyledForm,
    StyledLabel,
    StyledButton,
    FormContainer,
} from "./styles";

const LoginScreen = ({ history }) => {
    const handleLogin = useCallback(
        async (event) => {
            event.preventDefault();
            const { email, password } = event.target.elements;
            try {
                await app
                    .auth()
                    .signInWithEmailAndPassword(email.value, password.value);
                history.push("/");
            } catch (err) {
                alert(err);
            }
        },
        [history]
    );

    const { currentUser } = useContext(AuthContext);

    if (currentUser) {
        return <Redirect to="/" />;
    }

    return (
        <Container>
            <Navbar history={history} />
            <FormContainer>
                <img src={logo} alt="Logo" width="150" style={{marginBottom: "20px", marginTop: "20px"}} />
                <StyledForm onSubmit={handleLogin}>
                    <StyledLabel>eMail Address: </StyledLabel>
                    <input
                        style={{ padding: "10px" }}
                        name="email"
                        type="email"
                        required
                        placeholder="eMail"
                    />
                    <br />
                    <StyledLabel>Password:</StyledLabel>
                    <input
                        style={{ padding: "10px" }}
                        name="password"
                        type="password"
                        required
                        placeholder="Password"
                    />
                    <br />
                    <StyledButton type="submit">Login</StyledButton>
                    <Link
                        href="/forgotpass"
                        onClick={(e) => {
                            e.preventDefault();
                            history.push("/forgotpass");
                        }}
                        style={{ textAlign: "center", marginTop: "10px" }}
                    >
                        <span style={{ color: "#6FC6DF" }}>
                            Did you forget your password?
                        </span>
                    </Link>
                </StyledForm>

                <p style={{ color: "white" }}>
                    No account yet?{" "}
                    <Link
                        href="/register"
                        onClick={(e) => {
                            e.preventDefault();
                            history.push("/register");
                        }}
                    >
                        <span style={{ color: "#6FC6DF" }}>Create one now</span>
                    </Link>
                </p>
            </FormContainer>
        </Container>
    );
};

export default withRouter(LoginScreen);
