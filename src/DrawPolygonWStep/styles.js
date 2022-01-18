import styled from "styled-components";
import Button from "@material-ui/core/Button";

const Container = styled.div`
    background: white;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
`;

const Header = styled.div`
    background: #2d2d2d;
    color: white;
    padding: 10px;
`;

const Content = styled.div`
    flex-grow: 1;
    background: #3f3f3f;
    padding: 10px;
`;

const Footer = styled.div`
    background: #2d2d2d;
    padding: 10px;
    flex-direction: row;
`;

const SelectionButton = styled(Button)`
    background-color: #6fc6df !important;
    height: 40px;
    & .MuiButton-label {
        font-weight: bold;
    }
`;

const CompletionButton = styled(Button)`
    background-color: #6fc6df !important;
    height: 40px;
    width: 100% !important;
    & .MuiButton-label {
        font-weight: bold;
    }
`;

export {
    Container,
    Header,
    Content,
    Footer,
    SelectionButton,
    CompletionButton,
};
