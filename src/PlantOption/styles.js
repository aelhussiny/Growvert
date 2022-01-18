import styled from "styled-components";

const Container = styled.div`
    background: #3f3f3f;
    border-radius: 10px;
    border: 1px solid white;
    padding: 25px;
    display: flex;
    flex-direction: row;
    width: calc(100% - 50px);
    margin-bottom: 20px;
    cursor: pointer;
`;

const InfoContainer = styled.div`
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    margin-left: 15px;
`;

const Title = styled.p`
    color: white;
    font-size: 14px;
    font-weight: bold;
    margin: 0;
`;

const InfoPiece = styled.div`
    color: #B5B5B5;
    font-size: 12px;
    margin: 0;
`;

export { Container, InfoContainer, Title, InfoPiece };