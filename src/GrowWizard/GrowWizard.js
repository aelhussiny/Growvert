import React, { useState } from "react";
import { withRouter } from "react-router";

import { Container } from "./styles";

const GrowWizard = (props) => {
    const [step, setStep] = useState(0);

    const next = () => {
        setStep(step + 1);
    };

    return (
        <Container>
            {React.Children.map(props.children, (child, i) => {
                return i === step
                    ? React.cloneElement(child, { onComplete: next })
                    : null;
            })}
        </Container>
    );
};

export default withRouter(GrowWizard);
