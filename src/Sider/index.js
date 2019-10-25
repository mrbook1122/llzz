import React from "react";
import styled from "styled-components";

import Menu from './Menu'

const Container = styled.div`
    overflow: hidden;
    height: 100vh;
    width: ${props => props.isMobile ? 0 : '200px'};
    position: sticky;
    top: 0;
`

const Sider = props => {
    return (
        <Container isMobile={props.isMobile}>
            <Menu/>
        </Container>
    )
}

export default Sider