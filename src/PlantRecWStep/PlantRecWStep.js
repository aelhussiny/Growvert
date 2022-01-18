import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";
import { loadModules } from "esri-loader";

import CircularProgress from "@material-ui/core/CircularProgress";

import {
    Container,
    Header,
    Content,
    Footer,
    SelectionButton,
    CompletionButton,
} from "./styles";
import PlantOption from "../PlantOption/PlantOption";

const PlantRecWStep = (props) => {
    const [plants, setPlants] = useState(null);

    useEffect(() => {
        loadModules([
            "esri/config",
            "esri/tasks/QueryTask",
            "esri/geometry/Polygon",
            "esri/request",
            "esri/geometry/geometryEngine",
        ]).then(
            async ([
                esriConfig,
                QueryTask,
                Polygon,
                esriRequest,
                geometryEngine,
            ]) => {
                esriConfig.apiKey =
                    "AAPK899137865cec4381bb28e1be78781355JyLIcqwK0HIoBzhsp1KZbYnO5LdjRFn9OHvAoZZfFFhjPoGLg6wQWpmiTBQGZMPv";

                const growMidDate = new Date(
                    new Date().getTime() + 10 * 24 * 60 * 60 * 1000
                );

                const AoI = new Polygon(props.AoI);
                const AoICenter = new Polygon(props.AoI).centroid;

                const tempTask = new QueryTask({
                    url: window.config.tempLayer.url,
                });
                const tempResult = await tempTask.execute({
                    geometry: props.AoI,
                    outFields:
                        window.config.tempLayer.fields[growMidDate.getMonth()],
                    geometryType: "esriGeometryPolygon",
                    inSR: props.AoI.spatialReference,
                });
                const tempVal =
                    tempResult.features[0].attributes[
                        window.config.tempLayer.fields[growMidDate.getMonth()]
                    ];

                const solarResult = await esriRequest(
                    `${window.config.solarLayer.url}/identify`,
                    {
                        query: {
                            f: "json",
                            geometryType: "esriGeometryPoint",
                            geometry: JSON.stringify({
                                type: "point",
                                x: AoICenter.x,
                                y: AoICenter.y,
                                spatialReference: props.AoI.spatialReference,
                            }),
                            renderingRules: `[{"rasterFunction":"Direct normal irradiation"}]`,
                            returnPixelValues: true,
                            returnUnformattedValues: true,
                            returnCatalogItems: false,
                        },
                    }
                );

                let solarVal = parseInt(solarResult.data.processedValues[0]);
                solarVal =
                    solarVal > window.config.solarLayer.cutoffs.medium &&
                    solarVal < window.config.solarLayer.cutoffs.high
                        ? "MEDIUM"
                        : solarVal > window.config.solarLayer.cutoffs.high
                        ? "HIGH"
                        : "LOW";

                const plantTask = new QueryTask({
                    url: window.config.plantLayer.url,
                });

                let plants = await plantTask.execute({
                    where: "1=1",
                    outFields: "*",
                });

                plants = plants.features;

                let plantationInfo = {
                    width: 1.35,
                    height: 1.35,
                    ports: 28,
                };

                if (props.PType === 2) {
                    plantationInfo = {
                        width: 1,
                        height: 0.55,
                        ports: 144,
                    };
                } else if (props.PType === 3) {
                    plantationInfo = {
                        width: 1,
                        height: 0.55,
                        ports: 18,
                    };
                }

                plants.forEach((plant) => {
                    plant.attributes.recommended =
                        plant.attributes.DAY_TEMP_HIGH_FAR >= tempVal &&
                        tempVal <= plant.attributes.DAY_TEMP_LOW_FAR &&
                        plant.attributes.SUN_INTENSITY === solarVal;

                    const plantationCount =
                        geometryEngine.planarArea(AoI, "square-meters") /
                        (plantationInfo.width * plantationInfo.height);
                    const capacity = plantationInfo.ports * plantationCount;
                    plant.attributes.EX_YIELD = Math.ceil(
                        (capacity * 1.3) - ((capacity * 1.3) * 0.02)
                    );
                });

                setPlants(plants);
            }
        );
    }, []);

    return (
        <Container>
            <Header>Plant Selection</Header>
            <Content style={{ textAlign: "center" }}>
                {(() => {
                    if (!plants) {
                        return (
                            <span>
                                <p style={{ color: "white" }}>
                                    Hang on! We're figuring out the best plants
                                    for you.
                                </p>
                                <CircularProgress />
                            </span>
                        );
                    } else {
                        return plants
                            .filter((a) => a.attributes.plant_type !== 0)
                            .sort((a, b) => {
                                if (
                                    a.attributes.recommended &&
                                    !b.attributes.recommended
                                ) {
                                    return -1;
                                } else if (
                                    b.attributes.recommended &&
                                    !a.attributes.recommended
                                ) {
                                    return 1;
                                } else {
                                    if (
                                        a.attributes.GROW_PERIOD <
                                        b.attributes.GROW_PERIOD
                                    ) {
                                        return -1;
                                    } else if (
                                        b.attributes.GROW_PERIOD <
                                        a.attributes.GROW_PERIOD
                                    ) {
                                        return 1;
                                    } else {
                                        if (
                                            a.attributes.CROP <
                                            b.attributes.CROP
                                        ) {
                                            return -1;
                                        } else if (
                                            b.attributes.CROP <
                                            a.attributes.CROP
                                        ) {
                                            return 1;
                                        } else {
                                            return 0;
                                        }
                                    }
                                }
                            })
                            .map((plant, i) => (
                                <PlantOption
                                    data={plant.attributes}
                                    key={`plant_option_${i}_${plant.attributes.plant_type}`}
                                    onSelect={(plantInfo) => {
                                        props.onPlantSelection({
                                            ...plantInfo,
                                        });
                                        props.onComplete();
                                    }}
                                />
                            ));
                    }
                })()}
            </Content>
        </Container>
    );
};

export default withRouter(PlantRecWStep);
