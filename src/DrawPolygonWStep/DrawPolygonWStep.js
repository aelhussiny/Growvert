import React, { useState } from "react";
import { withRouter } from "react-router";

import {
    Container,
    Header,
    Content,
    Footer,
    SelectionButton,
    CompletionButton,
} from "./styles";

const DrawPolygonWStep = (props) => {
    return (
        <Container>
            <Header>Area Selection</Header>
            <Content style={{ textAlign: "center" }}>
                <p style={{ color: "white" }}>
                    Hi! Select an area to get started.
                </p>
                {(() => {
                    if (props.selectState === 0) {
                        return (
                            <p style={{ color: "white" }}>
                                Now Draw on the Map
                            </p>
                        );
                    } else if (props.selectState === 1) {
                        return (
                            <span>
                                <p style={{ color: "white" }}>
                                    An Area is Selected
                                </p>
                                <SelectionButton
                                    onClick={props.onSelectClicked}
                                >
                                    New Selection
                                </SelectionButton>
                            </span>
                        );
                    } else {
                        return (
                            <SelectionButton onClick={props.onSelectClicked}>
                                Select
                            </SelectionButton>
                        );
                    }
                })()}
            </Content>
            {(() => {
                if (props.selectState === 1) {
                    return (
                        <Footer style={{ justifyItems: "right" }}>
                            <CompletionButton onClick={props.onComplete}>
                                Next
                            </CompletionButton>
                        </Footer>
                    );
                }
            })()}
        </Container>
    );
};

export default withRouter(DrawPolygonWStep);
