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
import FormControl from "@material-ui/core/FormControl";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Radio from "@material-ui/core/Radio";

const SelectPTypeWStep = (props) => {
    const [value, setValue] = React.useState(1);

    return (
        <Container>
            <Header>Type Selection</Header>
            <Content style={{ textAlign: "center" }}>
                <p style={{ color: "white" }}>
                    Please select the type of hydroponic planting you want to
                    do.
                </p>
                <FormControl component="fieldset">
                    <RadioGroup
                        value={value}
                        name="radio-buttons-group"
                        onChange={(a, b) => {
                            setValue(parseInt(b));
                            props.onChange(parseInt(b));
                        }}
                    >
                        <FormControlLabel
                            value={1}
                            control={<Radio />}
                            label="Tower"
                        />
                        <FormControlLabel
                            value={2}
                            control={<Radio />}
                            label="Stack"
                        />
                        <FormControlLabel
                            value={3}
                            control={<Radio />}
                            label="Wick"
                        />
                    </RadioGroup>
                </FormControl>
            </Content>
            <Footer style={{ justifyItems: "right" }}>
                <CompletionButton onClick={props.onComplete}>
                    Next
                </CompletionButton>
            </Footer>
        </Container>
    );
};

export default withRouter(SelectPTypeWStep);
