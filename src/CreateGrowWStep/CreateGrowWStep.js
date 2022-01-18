import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { loadModules } from "esri-loader";

import CircularProgress from "@material-ui/core/CircularProgress";

import { Container, Header, Content } from "./styles";

const PlantRecWStep = (props) => {
    useEffect(() => {
        loadModules([
            "esri/tasks/QueryTask",
            "esri/geometry/Polygon",
            "esri/request",
        ]).then(async ([QueryTask, Polygon, esriRequest]) => {
            const heightTask = new QueryTask({
                url: window.config.roofLayer.url,
            });
            const heightResult = await heightTask.execute({
                geometry: props.AoI,
                outFields: window.config.roofLayer.heightField,
                geometryType: "esriGeometryPolygon",
                inSR: props.AoI.spatialReference,
            });
            const heightVal = Math.ceil(
                heightResult.features[0].attributes[
                    window.config.roofLayer.heightField
                ]
            );

            esriRequest(`${window.config.growsLayer.url}/addFeatures`, {
                query: {
                    f: "json",
                    features: JSON.stringify([
                        {
                            geometry: new Polygon(props.AoI),
                            attributes: {
                                start_time: new Date().getTime(),
                                end_time: new Date(
                                    new Date().getTime() +
                                        props.plantInfo.growPeriod *
                                            24 *
                                            60 *
                                            60 *
                                            1000
                                ).getTime(),
                                plant_type: props.plantInfo.plantType,
                                expected_yield: props.plantInfo.exYield,
                                height: heightVal,
                                plantation_type: props.PType,
                                creator_id: props.creatorId,
                            },
                        },
                    ]),
                },
                method: "post",
            }).then((result) => {
                props.history.push(
                    `/grow/${result.data.addResults[0].objectId}`
                );
            });
        });
    }, []);

    return (
        <Container>
            <Header>Creating Grow</Header>
            <Content style={{ textAlign: "center" }}>
                <span>
                    <p style={{ color: "white" }}>
                        Congratulations! We're starting your grow.
                    </p>
                    <CircularProgress />
                </span>
            </Content>
        </Container>
    );
};

export default withRouter(PlantRecWStep);
