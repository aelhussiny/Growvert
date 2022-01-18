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

const ForgotPassScreen = ({ history }) => {
    const handleForgotPass = useCallback(
        async (event) => {
            event.preventDefault();
            const { email } = event.target.elements;
            try {
                await app
                    .auth()
                    .sendPasswordResetEmail(email.value);
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
                <StyledForm onSubmit={handleForgotPass}>
                    <StyledLabel>eMail Address: </StyledLabel>
                    <input
                        style={{ padding: "10px" }}
                        name="email"
                        type="email"
                        required
                        placeholder="eMail"
                    />
                    <br />
                    <StyledButton type="submit">Forgot Password</StyledButton>
                </StyledForm>
            </FormContainer>
        </Container>
    );
};

export default withRouter(ForgotPassScreen);
