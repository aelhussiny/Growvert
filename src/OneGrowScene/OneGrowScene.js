import React, { useEffect } from "react";
import { withRouter } from "react-router";
import { loadModules } from "esri-loader";

import {} from "./styles";

const OneGrowScene = (props) => {
    useEffect(() => {
        document.getElementById(`grow-scene-${props.id}`).style.height =
            document.getElementById(`grow-scene-${props.id}`).clientWidth +
            "px";
        loadModules([
            "esri/views/SceneView",
            "esri/WebScene",
            "esri/geometry/Polygon",
            "esri/Graphic",
        ])
            .then(([SceneView, WebScene, Polygon, Graphic]) => {
                const scene = new WebScene({
                    portalItem: {
                        id: window.config.baseSceneId,
                    },
                });
                const view = new SceneView({
                    map: scene,
                    container: `grow-scene-${props.id}`,
                });

                view.when(() => {
                    const growPoint = props.data.geometry.centroid;
                    growPoint.z = props.data.attributes.height || 50;
                    view.graphics.add(
                        new Graphic({
                            geometry: growPoint,
                            symbol: {
                                type: "picture-marker",
                                url: `https://hydroponics-app-f7956.web.app/img/${
                                    props.fields
                                        .filter(
                                            (field) =>
                                                field.name === "plant_type"
                                        )[0]
                                        .domain.codedValues.filter(
                                            (codedValue) =>
                                                codedValue.code ===
                                                props.data.attributes.plant_type
                                        )[0].name.toLowerCase().replace(/ /g,"")
                                }.svg`,
                            },
                        })
                    );
                    view.goTo({ target: growPoint, zoom: 20 });
                });
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return <div id={`grow-scene-${props.id}`}></div>;
};

export default withRouter(OneGrowScene);
