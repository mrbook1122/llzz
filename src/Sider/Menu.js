import React, {useEffect, useState} from "react";
import {Menu, Icon} from "antd";
import {Link} from 'react-router-dom'
import {createHashHistory} from 'history'
import {connect} from 'react-redux'
import {SET_CURRENT_KEY, SET_PATH} from "../actions";

const history = createHashHistory()

const style = {
    menuStyle: {
        height: '100%',
        width: '100%'
    }
}

const MenuSider = props => {

    const clickItem = itemProps => {
        props.dispatch({
            type: SET_PATH,
            path: itemProps.key
        })
        props.dispatch({
            type: SET_CURRENT_KEY,
            key: 0
        })
    }

    return (
        <Menu theme={"dark"} style={style.menuStyle}
              onClick={clickItem}
              selectedKeys={[props.path]}>
            <Menu.Item key={'/'}>
                <Link to={'/'}>
                    <Icon type="file-text"/>
                    <span>文章管理</span>
                </Link>
            </Menu.Item>
            <Menu.Item key={'/publish'}>
                <Link to='publish'>
                    <Icon type="edit"/>
                    <span>发表文章</span>
                </Link>
            </Menu.Item>
        </Menu>
    )
}

const mapStateToProps = state => ({
    path: state.path
})

export default connect(mapStateToProps)(MenuSider)

