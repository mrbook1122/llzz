import React from "react";
import {Menu, Icon} from "antd";
import {Link} from 'react-router-dom'
import {createHashHistory} from 'history'

const history = createHashHistory()

const style = {
    menuStyle: {
        height: '100%',
        width: '100%'
    }
}

const MenuSider = props => {
    return (
        <Menu theme={"dark"} style={style.menuStyle}
        defaultSelectedKeys={[history.location.pathname]}>
            <Menu.Item key={'/'}>
                <Link to={'/'}>
                <Icon type="file-text" />
                <span>文章管理</span>
                </Link>
            </Menu.Item>
            <Menu.Item key={'/publish'}>
                <Link to='publish'>
                <Icon type="edit" />
                <span>发表文章</span>
                </Link>
            </Menu.Item>
        </Menu>
    )
}

export default MenuSider

