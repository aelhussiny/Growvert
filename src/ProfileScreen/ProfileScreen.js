import React, { useState, useEffect } from "react";
import app from "../firebase";
import { withRouter, useParams } from "react-router";
import { loadModules } from "esri-loader";
import Navbar from "../Navbar";

import { Container, PageContainer, InfoColumn, GrowsColumn } from "./styles";
import GrowBadge from "../GrowBadge";
import MyGrowsScene from "../MyGrowsScene";

import Link from "@material-ui/core/Link";
import EmailIcon from "@material-ui/icons/Email";

const ProfileScreen = ({ history }) => {
    const { profileId } = useParams();
    const [profileData, setProfileData] = useState(null);
    const [growsData, setGrowsData] = useState([]);
    const [fieldsData, setFieldsData] = useState([]);

    useEffect(() => {
        const getProfileData = async () => {
            const db = app.firestore();
            let dbUserData = await db.collection("users").doc(profileId).get();
            if (dbUserData.exists) {
                dbUserData = dbUserData.data();
                setProfileData(dbUserData);
            }
        };
        const getGrowData = async () => {
            loadModules(["esri/tasks/QueryTask"]).then(([QueryTask]) => {
                let queryTask = new QueryTask({
                    url: window.config.growsLayer.url,
                });
                queryTask
                    .execute({
                        where: `${window.config.growsLayer.creatorField} = '${profileId}'`,
                        orderByFields: "start_time desc",
                        outFields: "*",
                    })
                    .then((result) => {
                        setGrowsData(result.features);
                        setFieldsData(result.fields);
                    });
            });
        };
        if (profileId) {
            getProfileData();
            getGrowData();
        }
    }, [profileId]);

    if (profileData) {
        const growBadges = growsData.map((grow) => (
            <GrowBadge
                key={"grow_" + grow.attributes.OBJECTID}
                history={history}
                data={grow.attributes}
                fields={fieldsData}
            />
        ));
        return (
            <Container>
                <Navbar history={history} />
                <PageContainer>
                    <InfoColumn>
                        <h1
                            style={{ color: "#6FC6DF" }}
                        >{`${profileData.fname} ${profileData.lname}`}</h1>

                        <Link
                            href={`mailto:${profileData.email}`}
                            style={{ color: "white", display: "flex" }}
                        >
                            {" "}
                            <EmailIcon style={{ marginRight: "3px" }} />
                            eMail Me
                        </Link>

                        <MyGrowsScene creatorId={profileId} />
                    </InfoColumn>
                    <GrowsColumn>
                        <h3
                            style={{ textAlign: "center", color: "#9FC73B" }}
                        >{`${profileData.fname}'s Grows`}</h3>
                        {(() => {
                            if (growBadges.length > 0) return growBadges;
                            else
                                return (
                                    <p
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                        }}
                                    >
                                        No Grows Found.{" "}
                                        <Link
                                            href="new"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                history.push("/new");
                                            }}
                                            style={{ textDecoration: "none" }}
                                        >
                                            <span style={{ color: "#6FC6DF" }}>
                                                Start one now
                                            </span>
                                        </Link>
                                    </p>
                                );
                        })()}
                    </GrowsColumn>
                </PageContainer>
            </Container>
        );
    } else {
        return (
            <Container>
                <Navbar history={history} />
            </Container>
        );
    }
};

export default withRouter(ProfileScreen);
