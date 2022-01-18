import React, { useCallback, useContext } from "react";
import { withRouter, Redirect } from "react-router";
import Navbar from "../Navbar";
import app from "../firebase";
import { AuthContext } from "../Auth";

import {
    Container,
    StyledForm,
    StyledLabel,
    StyledButton,
    FormContainer,
} from "./styles";

const RegisterScreen = ({ history }) => {
    const handleRegister = useCallback(
        async (event) => {
            event.preventDefault();
            const {
                fname,
                lname,
                email,
                password,
                confirmpassword,
            } = event.target.elements;
            if (confirmpassword.value !== password.value) {
                alert("Confirm password must match password");
            } else {
                try {
                    let userCredential = await app
                        .auth()
                        .createUserWithEmailAndPassword(
                            email.value,
                            password.value
                        );
                    const db = app.firestore();
                    db.collection("users").doc(userCredential.user.uid).set({
                        fname: fname.value,
                        lname: lname.value,
                    });
                } catch (err) {
                    alert(err);
                }
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
                <p style={{ color: "white" }}>Let's get to know you!</p>
                <StyledForm onSubmit={handleRegister}>
                    <StyledLabel>First Name: </StyledLabel>
                    <input
                        style={{ padding: "10px" }}
                        name="fname"
                        type="text"
                        required
                        placeholder="First Name"
                    />
                    <br />
                    <StyledLabel>Last Name: </StyledLabel>
                    <input
                        style={{ padding: "10px" }}
                        name="lname"
                        type="text"
                        required
                        placeholder="Last Name"
                    />
                    <br />
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
                        minLength="6"
                    />
                    <br />
                    <StyledLabel>Confirm Password:</StyledLabel>
                    <input
                        style={{ padding: "10px" }}
                        name="confirmpassword"
                        type="password"
                        required
                        placeholder="Confirm Password"
                        minLength="6"
                    />
                    <br />
                    <StyledButton type="submit">Register</StyledButton>
                </StyledForm>
            </FormContainer>
        </Container>
    );
};

export default withRouter(RegisterScreen);
