import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { loadModules } from "esri-loader";
import Navbar from "../Navbar";

import { Container } from "./styles";

const AllGrowsScreen = (props) => {
    useEffect(() => {
        document.getElementById(`grow-scene-all`).style.height =
            document.getElementById(`grow-scene-all`).clientWidth + "px";
        loadModules([
            "esri/views/SceneView",
            "esri/WebScene",
            "esri/geometry/Polygon",
            "esri/Graphic",
            "esri/tasks/QueryTask",
        ])
            .then(([SceneView, WebScene, Polygon, Graphic, QueryTask]) => {
                const scene = new WebScene({
                    portalItem: {
                        id: window.config.baseSceneId,
                    },
                });
                const view = new SceneView({
                    map: scene,
                    container: `grow-scene-all`,
                });

                view.when(() => {
                    const growsTask = new QueryTask({
                        url: window.config.growsLayer.url,
                    });

                    growsTask
                        .execute({
                            where: `end_time > DATE '${new Date().getFullYear()}-${(
                                "" +
                                (new Date().getMonth() + 1)
                            ).padStart(2, "0")}-${
                                "" + (new Date().getDate() + 1)
                            }'`,
                            outFields: "*",
                            returnGeometry: true,
                        })
                        .then((result) => {
                            const graphics = [];
                            result.features.forEach((feature) => {
                                feature.geometry = feature.geometry.centroid;
                                feature.geometry.z = feature.attributes.height;
                                graphics.push(
                                    new Graphic({
                                        geometry: feature.geometry,
                                        symbol: {
                                            type: "picture-marker",
                                            url: `/img/${result.fields
                                                .filter(
                                                    (field) =>
                                                        field.name ===
                                                        "plant_type"
                                                )[0]
                                                .domain.codedValues.filter(
                                                    (codedValue) =>
                                                        codedValue.code ===
                                                        feature.attributes
                                                            .plant_type
                                                )[0]
                                                .name.toLowerCase()
                                                .replace(/ /g, "")}.svg`,
                                            width: "16px",
                                            height: "16px",
                                        },
                                        attributes: {
                                            id: feature.attributes.OBJECTID,
                                            USABLE: true,
                                        },
                                    })
                                );
                            });

                            view.graphics.addMany(graphics);

                            view.goTo(graphics);
                        });

                    view.on("click", (event) => {
                        view.hitTest(event).then(function (response) {
                            let plantResults = response.results.filter(
                                (a) => a.graphic.attributes.USABLE
                            );

                            if (plantResults.length > 0) {
                                props.history.push(
                                    `/grow/${plantResults[0].graphic.attributes.id}`
                                );
                            }
                        });
                    });
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <Container>
            <Navbar history={props.history} />
            <div
                id="grow-scene-all"
                style={{ flexGrow: 1, width: "100%" }}
            ></div>
        </Container>
    );
};

export default withRouter(AllGrowsScreen);
