import styled from "styled-components";
import Menu from "@material-ui/core/Menu";

const NavbarContainer = styled.div`
    width: 100%;
    position: sticky;
    top: 0;
    z-index: 15;
`;

const LinkDiv = styled.div`
    display: flex;
    height: Calc(100% - 3px);
    align-items: center;
    cursor: pointer;
    &&:hover {
        border-bottom: solid #5bc2f3 3px;
    }
    border-bottom: ${(props)=>props.active ? "solid #5bc2f3 3px" : "none"}
`;

const StyledMenu = styled(Menu)`
    & .MuiPaper-root {
        background: #3F3F3F;
        color: #6FC6DF;
    }
`;

export { NavbarContainer, LinkDiv, StyledMenu };
