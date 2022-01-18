import React, { useEffect, useState } from "react";
import { withRouter } from "react-router";
import { loadModules } from "esri-loader";

import { MapContainer } from "./styles";

const NewGrowMap = React.memo(
    (props) => {
        const [view, setView] = useState(null);

        if (view && props.selectState === 0) {
            loadModules(["esri/views/draw/Draw", "esri/Graphic"]).then(
                ([Draw, Graphic]) => {
                    const draw = new Draw({ view });
                    view.focus();
                    view.graphics.removeAll();
                    let action = draw.create("polygon", { mode: "click" });

                    const createPolygonGraphic = (vertices) => {
                        view.graphics.removeAll();
                        let polygon = {
                            type: "polygon",
                            rings: vertices,
                            spatialReference: view.spatialReference,
                        };

                        let graphic = new Graphic({
                            geometry: polygon,
                            symbol: {
                                type: "simple-fill",
                                color: [5, 30, 45, 0.8],
                                style: "solid",
                                outline: {
                                    color: "white",
                                    width: 1,
                                },
                            },
                        });
                        view.graphics.add(graphic);
                    };

                    action.on(
                        ["vertex-add", "vertex-remove", "cursor-update"],
                        (evt) => {
                            createPolygonGraphic(evt.vertices);
                        }
                    );

                    action.on("draw-complete", (evt) => {
                        props.onSelectionComplete({
                            type: "polygon",
                            rings: evt.vertices,
                            spatialReference: view.spatialReference,
                        });
                    });
                }
            );
        }

        useEffect(() => {
            loadModules([
                "esri/views/MapView",
                "esri/WebMap",
                "esri/widgets/Locate",
                "esri/widgets/Expand",
                "esri/widgets/Search",
                "esri/tasks/QueryTask",
                "esri/Graphic",
            ])
                .then(
                    ([
                        MapView,
                        WebMap,
                        Locate,
                        Expand,
                        Search,
                        QueryTask,
                        Graphic,
                    ]) => {
                        const map = new WebMap({
                            portalItem: {
                                id: window.config.newGrowMapId,
                            },
                        });
                        const view = new MapView({
                            map: map,
                            container: `new-grow-map`,
                        });
                        setView(view);

                        view.when(() => {
                            const locate = new Locate({
                                view: view,
                                useHeadingEnabled: false,
                                goToOverride: function (view, options) {
                                    options.target.scale = 1500;
                                    return view.goTo(options.target);
                                },
                            });
                            view.ui.add(locate, "top-left");

                            const searchWidget = new Search({
                                view: view,
                            });

                            let searchExpand = new Expand({
                                view: view,
                                content: searchWidget,
                            });

                            view.ui.add(searchExpand, {
                                position: "top-left",
                                index: 2,
                            });

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
                                        feature.geometry =
                                            feature.geometry.centroid;
                                        feature.geometry.z =
                                            feature.attributes.height;
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
                                                                feature
                                                                    .attributes
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
                    }
                )
                .catch((err) => {
                    console.error(err);
                });
        }, []);

        return <MapContainer id={`new-grow-map`}></MapContainer>;
    },
    () => false
);

export default withRouter(NewGrowMap);
