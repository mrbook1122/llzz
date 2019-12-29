import React, {useEffect, useState} from "react";
import {Table, Divider, Button, Tag} from 'antd';
import {createHashHistory} from "history";
import {connect} from 'react-redux'
import axios from 'axios'

import {SET_CURRENT_KEY, SET_PATH} from "../../actions";

const history = createHashHistory()

const ArticleTable = props => {
    const columns = [
        {
            title: '序号',
            dataIndex: 'index',
            width: '70px',
            align: 'center'
        },
        {
            title: '标题',
            dataIndex: 'title',
            ellipsis: true,
            width: 250,
            align: 'center'
        },
        {
            title: '发表时间',
            align: 'center',
            width: '100px',
            dataIndex: 'publish_time',
        },
        {
            title: '状态',
            dataIndex: 'status',
            align: 'center',
            width: '100px',
            render: (status) => (
                status === 1 ?
                    <Tag color={'green'} style={{marginLeft: '10px'}}>已发表</Tag> :
                    <Tag color={'orange'} style={{marginLeft: '10px'}}>编辑中</Tag>
            )
        },
        {
            title: '操作',
            key: 'action',
            width: '150px',
            align: 'center',
            render: (text, record) => {
                const edit = () => {
                    history.push('/publish')
                    props.dispatch({
                        type: SET_CURRENT_KEY,
                        key: record.key
                    })
                    props.dispatch({
                        type: SET_PATH,
                        path: '/publish'
                    })
                }

                return (
                    <span>
                        <Button type={"primary"} onClick={edit}>编辑</Button>
                            <Divider type="vertical"/>
                        <Button type={"danger"} onClick={() => {props.deleteArticle(record.key)}}>删除</Button>
                    </span>
                )
            },
        },
    ];
    return (
        <Table columns={columns} dataSource={props.data}
               loading={props.data.length === 0}
               pagination={false}/>
    )
}


export default connect()(ArticleTable)