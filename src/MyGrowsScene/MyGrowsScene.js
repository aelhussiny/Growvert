import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { loadModules } from "esri-loader";

import {} from "./styles";

const MyGrowsScene = (props) => {
    const creatorId = props.creatorId;

    useEffect(() => {
        document.getElementById(`grow-scene-${creatorId}`).style.height =
            document.getElementById(`grow-scene-${creatorId}`).clientWidth +
            "px";
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
                    container: `grow-scene-${creatorId}`,
                });

                view.when(() => {
                    const growsTask = new QueryTask({
                        url: window.config.growsLayer.url,
                    });

                    growsTask
                        .execute({
                            where: `creator_id = '${creatorId}' and end_time > DATE '${new Date().getFullYear()}-${(
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
                                            url: `https://hydroponics-app-f7956.web.app/img/${result.fields
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
                                                .name.toLowerCase().replace(/ /g,"")}.svg`,
                                            width: "16px",
                                            height: "16px",
                                        },
                                    })
                                );
                            });

                            view.graphics.addMany(graphics);

                            view.goTo(graphics);
                        });
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div id={`grow-scene-${creatorId}`} style={{ marginTop: "10px" }}></div>
    );
};

export default withRouter(MyGrowsScene);
