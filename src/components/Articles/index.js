import React, {useState, useEffect} from "react";
import {ConfigProvider, Pagination} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import axios from 'axios'

import ArticleTable from "./Table";

const style = {
    main: {
        margin: '10px'
    },
    pagination: {
        float: 'right',
        margin: '15px'
    }
}

const Articles = props => {

    /**
     * 删除一篇文章，需要重新刷新页面
     */
    const deleteArticle = (key) => {
        axios.post('/admin/article/delete', {}, {
            params: {
                id: key
            }
        }).then(resp => {
            setCurrentPage(1)
        })
    }

    //刷新文章列表
    const refreshList = page => {
        axios.get('/admin/articles/page/' + page)
            .then(resp => {
                setList(resp.data.articles)
                setPages(resp.data.pages)
            }).catch(err => {
        })
    }

    const [list, setList] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const [pages, setPages] = useState(0)
    useEffect(() => {
        refreshList(currentPage)
    }, [currentPage])

    /**
     * 更改当前选择的页面
     * @param page
     */
    const changePage = page => {
        setCurrentPage(page)
    }
    return (
        <div style={style.main}>
            <ArticleTable data={list} deleteArticle={deleteArticle}/>
            <ConfigProvider locale={zhCN}>
                <Pagination style={style.pagination}
                            total={pages * 8}
                            current={currentPage}
                            pageSize={8}
                            onChange={changePage}
                            showQuickJumper/>
            </ConfigProvider>
        </div>
    )
}

export default Articles