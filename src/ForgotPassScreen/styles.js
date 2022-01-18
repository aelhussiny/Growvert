import styled from "styled-components";

const Container = styled.div`
    width: 100%;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    background: #2D2D2D;
`;

const FormContainer = styled.div`
    flex-direction: column;
    width: 100%;
    display: flex;
    flex-grow: 1;
    align-items: center;
    align-content: center;
    justify-items: center;
    justify-content: center;
`;
const StyledForm = styled.form`
    display: flex;
    flex-direction: column;
    background: #474747;
    padding: 25px;
    width: 40%;
    margin-bottom: 10%;
    @media (max-width: 768px) {
        width: calc(100% - 70px);
        padding: 20px;
        margin-bottom: 40%;
    }
`;

const StyledLabel = styled.label`
    font-weight: bold;
    color: #9FC73B;
`;

const StyledButton = styled.button`
    padding: 10px;
    background: #6FC6DF;
    color: white;
    text-transform: uppercase;
    font-weight: bold;
    cursor: pointer;
    border: none;
`;

export { Container, StyledForm, StyledLabel, StyledButton, FormContainer };
