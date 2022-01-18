import React, { useState, useEffect, useContext } from "react";
import app from "../firebase";
import { AuthContext } from "../Auth";
import { withRouter, useParams } from "react-router";
import Navbar from "../Navbar";
import { loadModules } from "esri-loader";

import Link from "@material-ui/core/Link";
import UpdateBadge from "../UpdateBadge";

import {
    Container,
    PageContainer,
    InfoColumn,
    UpdatesColumn,
    TitleContainer,
    StyledButton,
    StylediFrame,
    ModalStyled,
} from "./styles";
import OneGrowScene from "../OneGrowScene";

const GrowScreen = ({ history }) => {
    const { growId } = useParams();
    const [growData, setGrowData] = useState(null);
    const [updateData, setUpdateData] = useState([]);
    const [dataCollectionIsOpen, setDataCollectionIsOpen] = useState(false);
    const [fields, setFieldsData] = useState([]);

    const { currentUser } = useContext(AuthContext);

    const handleDataCollectionClose = () => {
        setDataCollectionIsOpen(false);
        getGrowUpdates();
    };

    const openDataCollection = () => {
        setDataCollectionIsOpen(true);
    };

    const getGrowUpdates = async () => {
        loadModules(["esri/tasks/QueryTask"]).then(([QueryTask]) => {
            let queryTask = new QueryTask({
                url: window.config.updates.url,
            });
            queryTask
                .execute({
                    where: `grow_id = ${growId}`,
                    outFields: "*",
                    returnGeometry: false,
                })
                .then((result) => {
                    setUpdateData(
                        result.features.sort(
                            (a, b) =>
                                b.attributes.CreationDate -
                                a.attributes.CreationDate
                        )
                    );
                });
        });
    };

    useEffect(() => {
        const getGrowData = async () => {
            loadModules(["esri/tasks/QueryTask"]).then(([QueryTask]) => {
                let queryTask = new QueryTask({
                    url: window.config.growsLayer.url,
                });
                queryTask
                    .execute({
                        where: `OBJECTID = '${growId}'`,
                        outFields: "*",
                        returnGeometry: true,
                    })
                    .then(async (result) => {
                        const data = result.features[0];
                        const db = app.firestore();
                        let dbUserData = await db
                            .collection("users")
                            .doc(data.attributes.creator_id)
                            .get();
                        if (dbUserData.exists) {
                            dbUserData = dbUserData.data();
                            data.attributes.creator = dbUserData;
                        }
                        setFieldsData(result.fields);
                        setGrowData(data);
                    });
            });
        };
        if (growId) {
            getGrowData();
            getGrowUpdates();
        }
    }, [growId]);

    if (growData && fields.length > 0 && growData.attributes.creator) {
        const growUpdateBadges = updateData.map((update) => (
            <UpdateBadge
                key={`grow_${growId}_update_${update.attributes.objectid}`}
                history={history}
                data={update}
            />
        ));
        return (
            <Container>
                <Navbar history={history} />
                <PageContainer>
                    <InfoColumn>
                        <h1 style={{ color: "#9FC73B" }}>
                            <img
                                src={`https://hydroponics-app-f7956.web.app/img/${fields
                                    .filter(
                                        (field) => field.name === "plant_type"
                                    )[0]
                                    .domain.codedValues.filter(
                                        (codedValue) =>
                                            codedValue.code ===
                                            growData.attributes.plant_type
                                    )[0]
                                    .name.toLowerCase().replace(/ /g,"")}.svg`}
                                alt={
                                    fields
                                        .filter(
                                            (field) =>
                                                field.name === "plant_type"
                                        )[0]
                                        .domain.codedValues.filter(
                                            (codedValue) =>
                                                codedValue.code ===
                                                growData.attributes.plant_type
                                        )[0].name
                                }
                                width="30px"
                                style={{ marginRight: "5px" }}
                            />
                            {
                                fields
                                    .filter(
                                        (field) => field.name === "plant_type"
                                    )[0]
                                    .domain.codedValues.filter(
                                        (codedValue) =>
                                            codedValue.code ===
                                            growData.attributes.plant_type
                                    )[0].name
                            }
                        </h1>
                        <Link
                            href={`/profile/${growData.attributes.creator_id}`}
                            onClick={(e) => {
                                e.preventDefault();
                                history.push(
                                    `/profile/${growData.attributes.creator_id}`
                                );
                            }}
                        >
                            <h3>Grower: {`${growData.attributes.creator.fname} ${growData.attributes.creator.lname}`}</h3>
                        </Link>
                        <h3>
                            Area: {growData.attributes.Shape__Area.toLocaleString(
                                undefined,
                                {
                                    maximumFractionDigits: 2,
                                }
                            )}{" "}
                            sqm
                        </h3>
                        <h3>
                            Type: {
                                fields
                                    .filter(
                                        (field) =>
                                            field.name === "plantation_type"
                                    )[0]
                                    .domain.codedValues.filter(
                                        (codedValue) =>
                                            codedValue.code ===
                                            growData.attributes.plantation_type
                                    )[0].name
                            }
                        </h3>
                        <h3>
                            Period: {new Date(
                                growData.attributes.start_time
                            ).toLocaleDateString()}{" "}
                            -{" "}
                            {new Date(
                                growData.attributes.end_time
                            ).toLocaleDateString()}
                        </h3>
                        <h3>Expected Yield: {growData.attributes.expected_yield}</h3>
                        <OneGrowScene
                            id={`grow_${growId}`}
                            data={growData}
                            fields={fields}
                        />
                    </InfoColumn>
                    <UpdatesColumn>
                        <TitleContainer>
                            <h3
                                style={{
                                    textAlign: "center",
                                    color: "#6FC6DF",
                                }}
                            >
                                Updates
                            </h3>
                            {(() => {
                                if (
                                    currentUser &&
                                    currentUser.uid ===
                                        growData.attributes.creator_id
                                ) {
                                    return (
                                        <StyledButton
                                            onClick={() => {
                                                openDataCollection();
                                            }}
                                        >
                                            Add Update
                                        </StyledButton>
                                    );
                                }
                            })()}
                        </TitleContainer>
                        {(() => {
                            if (growUpdateBadges.length > 0)
                                return growUpdateBadges;
                            else
                                return (
                                    <p
                                        style={{
                                            color: "white",
                                            textAlign: "center",
                                        }}
                                    >
                                        No Updates Yet
                                    </p>
                                );
                        })()}
                    </UpdatesColumn>
                </PageContainer>
                <ModalStyled
                    open={dataCollectionIsOpen}
                    onClose={handleDataCollectionClose}
                >
                    <StylediFrame
                        src={window.config.updates.survey.replace(
                            "{growid}",
                            growId
                        )}
                    ></StylediFrame>
                </ModalStyled>
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

export default withRouter(GrowScreen);
