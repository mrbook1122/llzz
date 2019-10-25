import React from "react";
import {Table, Divider, Button, Tag} from 'antd';


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
        render: (stauts) => (
            stauts === 1 ?
                <Tag color={'green'} style={{marginLeft: '10px'}}>已发表</Tag> :
                <Tag color={'orange'} style={{marginLeft: '10px'}}>编辑中</Tag>
        )
    },
    {
        title: '操作',
        key: 'action',
        width: 150,
        align: 'center',
        render: () => (
            <span>
                <Button type={"primary"}>编辑</Button>
                    <Divider type="vertical"/>
                <Button type={"danger"}>删除</Button>
            </span>
        ),
    },
];


const ArticleTable = props => {
    return (
        <Table columns={columns} dataSource={props.data}
               loading={props.data.length === 0}
               pagination={false}/>
    )
}

export default ArticleTable