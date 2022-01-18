import styled from "styled-components";

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
    padding-right: 20px;
`;

const GrowsColumn = styled.div`
    height: 100%;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
`;

export { Container, PageContainer, InfoColumn, GrowsColumn };
