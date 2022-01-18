import React, { useState, useEffect } from "react";
import { withRouter } from "react-router";

import { Container, InfoContainer, Title, InfoPiece } from "./styles";

const UpdateBadge = (props) => {
    const [attachmentUrl, setAttachmentUrl] = useState(null);

    useEffect(() => {
        const loadAttachment = async () => {
            fetch(
                `${window.config.updates.url}/${props.data.attributes.objectid}/attachments?f=json`
            )
                .then((response) => response.json())
                .then((result) => {
                    if (result.attachmentInfos.length > 0) {
                        setAttachmentUrl(
                            `${window.config.updates.url}/${props.data.attributes.objectid}/attachments/${result.attachmentInfos[0].id}`
                        );
                    }
                });
        };
        if (props.data.attributes.objectid) {
            loadAttachment();
        }
    }, [props.data.attributes.objectid]);

    return (
        <Container>
            <InfoContainer>
                <Title>{props.data.attributes.title}</Title>
                <InfoPiece>
                    {new Date(
                        props.data.attributes.CreationDate
                    ).toLocaleDateString()} at {new Date(
                        props.data.attributes.CreationDate
                    ).toLocaleTimeString()}
                </InfoPiece>
                {(() => {
                    if (attachmentUrl) {
                        return (
                            <img
                                src={attachmentUrl}
                                style={{ width: "100%" }}
                            />
                        );
                    }
                })()}
                {(() => {
                    if (props.data.attributes.message) {
                        return (
                            <InfoPiece>
                                {props.data.attributes.message}
                            </InfoPiece>
                        );
                    } else return null;
                })()}
            </InfoContainer>
        </Container>
    );
};

export default withRouter(UpdateBadge);
