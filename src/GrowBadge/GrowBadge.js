import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import Link from "@material-ui/core/Link";

import { Container, InfoContainer, Title, InfoPiece } from "./styles";

const GrowBadge = (props) => {
    return props.fields && (props.fields.length > 0) ? (
        <Link
            href={`/grow/${props.data.OBJECTID}`}
            onClick={(e) => {
                e.preventDefault();
                props.history.push(`/grow/${props.data.OBJECTID}`);
            }}
        >
            <Container>
                <img
                    src={`https://hydroponics-app-f7956.web.app/img/${
                        props.fields
                            .filter((field) => field.name === "plant_type")[0]
                            .domain.codedValues.filter(
                                (codedValue) =>
                                    codedValue.code === props.data.plant_type
                            )[0].name.toLowerCase().replace(/ /g,"")
                    }.svg`}
                    alt={
                        props.fields
                            .filter((field) => field.name === "plant_type")[0]
                            .domain.codedValues.filter(
                                (codedValue) =>
                                    codedValue.code === props.data.plant_type
                            )[0].name
                    }
                    width="50"
                />
                <InfoContainer>
                    <Title>
                        {
                            props.fields
                                .filter(
                                    (field) => field.name === "plant_type"
                                )[0]
                                .domain.codedValues.filter(
                                    (codedValue) =>
                                        codedValue.code ===
                                        props.data.plant_type
                                )[0].name
                        }
                    </Title>
                    <InfoPiece>
                        Area:{" "}
                        {props.data.Shape__Area.toLocaleString(undefined, {
                            maximumFractionDigits: 2,
                        })}{" "}
                        sqm
                    </InfoPiece>
                    <InfoPiece>
                        Plantation Type:{" "}
                        {
                            props.fields
                                .filter(
                                    (field) => field.name === "plantation_type"
                                )[0]
                                .domain.codedValues.filter(
                                    (codedValue) =>
                                        codedValue.code ===
                                        props.data.plantation_type
                                )[0].name
                        }
                    </InfoPiece>
                    <InfoPiece>
                        Growth Period:{" "}
                        {new Date(props.data.start_time).toLocaleDateString()} -{" "}
                        {new Date(props.data.end_time).toLocaleDateString()}
                    </InfoPiece>
                    <InfoPiece>
                        Expected Yield: {props.data.expected_yield}
                    </InfoPiece>
                </InfoContainer>
            </Container>
        </Link>
    ) : null;
};

export default withRouter(GrowBadge);
