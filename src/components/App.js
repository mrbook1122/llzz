import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { HashRouter as Router, Route } from 'react-router-dom'

import Sider from "../Sider";
import Top from "./Top";
import Articles from "./Articles";
import Editor from "./Editor";

const Container = styled.div`
    display: flex;
    user-select: none;
`

const App = () => {
    const [isMobile, setIsMobile] = useState(false)
    //监听窗口大小的改变，判断是否是移动设备
    useEffect(() => {
        if (window.innerWidth < 500)
            setIsMobile(true)
        window.addEventListener('resize', windowSizeChange)
        return () => window.removeEventListener('resize', windowSizeChange)
    }, [isMobile])
    const windowSizeChange = () => {
        setIsMobile(window.innerWidth < 500)
    }
    return (
        <Container>
            <Router>
                <div style={{ position: 'relative' }}>
                    <Sider isMobile={isMobile} />
                </div>
                <div style={{ position: 'relative', flexGrow: 1 }}>

                    <Top />

                    <Route path='/' exact>
                        <Articles />
                    </Route>
                    <Route path='/publish'>
                        <Editor />
                    </Route>


                </div>
            </Router>
        </Container>
    )
}

export default App