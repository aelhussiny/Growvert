import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import Link from "@material-ui/core/Link";

import { Container, InfoContainer, Title, InfoPiece } from "./styles";

const PlantOption = (props) => {
    return (
        <Link
            onClick={(e) => {
                e.preventDefault();
                props.onSelect({
                    plantType: props.data.plant_type,
                    growPeriod: props.data.GROW_PERIOD,
                    exYield: props.data.EX_YIELD,
                });
            }}
        >
            <Container>
                <img
                    src={`https://hydroponics-app-f7956.web.app/img/${props.data.CROP.toLowerCase().replace(
                        / /g,
                        ""
                    )}.svg`}
                    alt={props.data.CROP}
                    width="50"
                />
                <InfoContainer>
                    <Title>{props.data.CROP}</Title>
                    {(() => {
                        if (props.data.recommended) {
                            return (
                                <InfoPiece style={{ color: "#9FC73B" }}>
                                    Recommended
                                </InfoPiece>
                            );
                        }
                    })()}
                    <InfoPiece>
                        Growth Period: {props.data.GROW_PERIOD} Days
                    </InfoPiece>
                    <InfoPiece>Expected Yield: {props.data.EX_YIELD}</InfoPiece>
                </InfoContainer>
            </Container>
        </Link>
    );
};

export default withRouter(PlantOption);
