import styled from "styled-components";
import Button from "@material-ui/core/Button";
import Modal from "@material-ui/core/Modal";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background: #2d2d2d;
`;

const PageContainer = styled.div`
    width: calc(100% - 40px);
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    padding: 0px 20px;
`;

const InfoColumn = styled.div`
    width: 33%;
    display: flex;
    height: 100%;
    flex-direction: column;

    & h1,
    & h3 {
        color: white;
        margin: 5px;
    }

    & h1 {
        margin-top: 10px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    margin-right: 20px;
`;

const UpdatesColumn = styled.div`
    height: 100%;
    flex-grow: 1;
    width: 67%;
    display: flex;
    flex-direction: column;
`;

const TitleContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
`;

const StyledButton = styled(Button)`
    background-color: #6fc6df !important;
    height: 40px;
    & .MuiButton-label {
        font-weight: bold;
    }
`;

const ModalStyled = styled(Modal)`
    display: flex;
    justify-content: center;
    height: 80%;
    padding-top: 5%;
`;

const StylediFrame = styled.iframe`
    width: 60%;
    height: 100%;
    border: none;
    background: #3F3F3F;
`;

export {
    Container,
    PageContainer,
    InfoColumn,
    UpdatesColumn,
    TitleContainer,
    StyledButton,
    ModalStyled,
    StylediFrame,
};
