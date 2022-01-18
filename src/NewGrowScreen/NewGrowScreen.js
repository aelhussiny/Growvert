import React, { useEffect, useContext, useState } from "react";
import { withRouter, Redirect } from "react-router";
import { AuthContext } from "../Auth";

import { Container } from "./styles";
import Navbar from "../Navbar";
import NewGrowMap from "../NewGrowMap";
import GrowWizard from "../GrowWizard";
import DrawPolygonWStep from "../DrawPolygonWStep";
import SelectPTypeWStep from "../SelectPTypeWStep";
import PlantRecWStep from "../PlantRecWStep";
import CreateGrowWStep from "../CreateGrowWStep";

const NewGrowScreen = (props) => {
    const { currentUser } = useContext(AuthContext);

    const [selectState, setSelectState] = useState(-1);
    const [AoI, setAoI] = useState(null);
    const [plantationType, setPlantationType] = useState(1);
    const [plantInfo, setPlantInfo] = useState(null);

    if (!currentUser) {
        return <Redirect to="/" />;
    }

    const selectionComplete = (area) => {
        setSelectState(1);
        setAoI(area);
    };

    return (
        <Container>
            <Navbar history={props.history} />
            <NewGrowMap
                selectState={selectState}
                onSelectionComplete={selectionComplete}
            />
            <GrowWizard>
                <DrawPolygonWStep
                    onSelectClicked={() => {
                        setSelectState(0);
                    }}
                    selectState={selectState}
                />
                <SelectPTypeWStep
                    onChange={(type) => {
                        setPlantationType(type);
                    }}
                />
                <PlantRecWStep
                    AoI={AoI}
                    PType={plantationType}
                    onPlantSelection={setPlantInfo}
                />
                <CreateGrowWStep
                    AoI={AoI}
                    PType={plantationType}
                    plantInfo={plantInfo}
                    creatorId={currentUser.uid}
                    history={props.history}
                />
            </GrowWizard>
        </Container>
    );
};

export default withRouter(NewGrowScreen);
