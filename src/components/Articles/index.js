import React, {useState, useEffect} from "react";
import {ConfigProvider, Pagination} from "antd";
import zhCN from 'antd/es/locale/zh_CN';
import axios from 'axios'

import ArticleTable from "./Table";

const url = process.env.REACT_APP_URL

const style = {
    main: {
        margin: '10px'
    },
    pagination: {
        float: 'right',
        margin: '15px'
    }
}

const fetchArticle = page => {
    return axios.get(url + '/articles', {
        params: {
            page: page
        }
    })
}

const Articles = props => {
    const [articles, setArticles] = useState([])
    useEffect(() => {
        if (articles.length === 0)
            fetchArticle(1).then(resp => {
                setArticles(resp.data.articles)
                setPages(resp.data.pages)
            })
    }, [articles])

    const [pages, setPages] = useState(1)

    const changePage = page => {
        setArticles([])
        fetchArticle(page).then(resp => {
            setArticles(resp.data.articles)
            setPages(resp.data.pages)
        })
    }
    return (
        <div style={style.main}>
            <ArticleTable data={articles}/>
            <ConfigProvider locale={zhCN}>
                <Pagination style={style.pagination}
                            total={pages * 8}
                            pageSize={8}
                            onChange={changePage}
                            showQuickJumper/>
            </ConfigProvider>
        </div>
    )
}

export default Articles