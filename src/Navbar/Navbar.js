import React, { useEffect, useContext, useState } from "react";
import app from "../firebase";
import { withRouter } from "react-router";
import { AuthContext } from "../Auth";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Link from "@material-ui/core/Link";
import MenuItem from "@material-ui/core/MenuItem";
import AccountCircle from "@material-ui/icons/AccountCircle";
import logo from "../img/logo.svg";

import { NavbarContainer, LinkDiv, StyledMenu } from "./styles.js";

const Navbar = (props) => {
    const { currentUser } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            const db = app.firestore();
            let dbUserData = await db
                .collection("users")
                .doc(currentUser.uid)
                .get();
            if (dbUserData.exists) {
                dbUserData = dbUserData.data();
                setUserData(dbUserData);
            }
        };
        if (currentUser) {
            getUserData();
        }
    }, [currentUser]);

    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleProfileMenuOpen = (event) => {
        if (!currentUser) {
            props.history.push("/login");
        } else {
            setAnchorEl(event.currentTarget);
        }
    };
    const isMenuOpen = Boolean(anchorEl);
    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    return (
        <NavbarContainer>
            <AppBar position="static" style={{ background: "#3F3F3F" }}>
                <Toolbar>
                    <Link
                        href="/"
                        onClick={(e) => {
                            e.preventDefault();
                            props.history.push("/");
                        }}
                        color="inherit"
                        variant="h6"
                        underline="none"
                        style={{ display: "flex", alignItems: "center" }}
                    >
                        <img
                            src={logo}
                            alt="Logo"
                            width="45"
                            style={{ marginRight: "10px" }}
                        />
                        <p>
                            <span style={{ color: "#6FC6DF" }}>Grow</span>
                            <span style={{ color: "#9FC73B" }}>Vert</span>
                        </p>
                    </Link>
                    <div
                        style={{
                            display: "flex",
                            flexGrow: 1,
                            justifyContent: "space-evenly",
                            height: "64px",
                        }}
                    >
                        <LinkDiv
                            active={props.history.location.pathname === "/all"}
                            onClick={(e) => {
                                e.preventDefault();
                                props.history.push("/all");
                            }}
                        >
                            <Link
                                href="all"
                                onClick={(e) => {
                                    e.preventDefault();
                                    props.history.push("/all");
                                }}
                                color="inherit"
                                variant="h6"
                                underline="none"
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                Active Grows
                            </Link>
                        </LinkDiv>
                        {(() => {
                            if (currentUser) {
                                return (
                                    <LinkDiv
                                        active={
                                            props.history.location.pathname ===
                                            "/new"
                                        }
                                        onClick={(e) => {
                                            e.preventDefault();
                                            props.history.push("/new");
                                        }}
                                        style={{
                                            borderBottomColor: "#9FC73B",
                                        }}
                                    >
                                        <Link
                                            href="new"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                props.history.push("/new");
                                            }}
                                            color="inherit"
                                            variant="h6"
                                            underline="none"
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                color: "#9FC73B",
                                            }}
                                        >
                                            New Grow
                                        </Link>
                                    </LinkDiv>
                                );
                            }
                        })()}
                    </div>
                    <div>
                        <IconButton
                            edge="end"
                            aria-label="account of current user"
                            aria-controls="profilemenu"
                            aria-haspopup="true"
                            onClick={handleProfileMenuOpen}
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
            <StyledMenu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                id="profilemenu"
                keepMounted
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <MenuItem
                    onClick={() => {
                        props.history.push(`/profile/${currentUser.uid}`);
                    }}
                >
                    {userData ? `${userData.fname}'s` : "Your"} Profile
                </MenuItem>
                <MenuItem
                    onClick={() => {
                        app.auth().signOut();
                        handleMenuClose();
                    }}
                    style={{ color: "#F50057" }}
                >
                    Sign Out
                </MenuItem>
            </StyledMenu>
        </NavbarContainer>
    );
};

export default withRouter(Navbar);
