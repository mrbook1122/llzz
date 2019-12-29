import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Button, Input, message} from 'antd'
import axios from 'axios'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import {connect} from 'react-redux'
import {createHashHistory} from "history";

import {initQuill} from "./funcs";
import {SET_CURRENT_KEY, SET_PATH} from "../../actions";
// import 'quill/dist/quill.core.css'

const history = createHashHistory()

const Editor = props => {
    const [quill, setQuill] = useState(null)
    useEffect(() => {
        // quill.insertEmbed(10, 'image', 'http://img4.imgtn.bdimg.com/it/u=1692593021,738807743&fm=15&gp=0.jpg')
        if (quill === null) {
            // 展示区域
            let display = new Quill('#display', {
                readOnly: true,
                theme: 'snow',
                modules: {
                    toolbar: false
                }
            })

            let quill = initQuill('#editor', display)

            /**
             * 当currentKey不为0时，初始化文章内容
             */
            axios.get('/admin/article/get/id/' + props.currentKey)
                .then(resp => {
                    quill.setContents(JSON.parse(resp.data.content))
                    setTitle(resp.data.title)
                }).catch(() => {
            })

            setQuill(quill)
        } else {
            if (props.currentKey !== 0) {
                axios.get('/admin/article/get/id/' + props.currentKey)
                    .then(resp => {
                        quill.setContents(JSON.parse(resp.data.content))
                        setTitle(resp.data.title)
                    }).catch(() => {
                })
            } else {
                quill.setContents(JSON.parse('{"ops":[{"insert":"\\n"}]}'))
                setTitle('')
            }
        }
    }, [props.currentKey])


    //文章标题
    const [title, setTitle] = useState('')

    /**
     * 判断标题和文章内容是否为null
     */
    const submit = type => {
        if (title.length === 0 || quill.getLength() === 1) {
            message.warn("标题或内容为空！")
            return
        }
        let url = props.currentKey === 0 ? '/admin/article/add' : '/admin/article/save'
        axios.post(url, {
            id: props.currentKey,
            content: JSON.stringify(quill.getContents()),
            type,
            title
        })
        history.push('/')
        props.dispatch({
            type: SET_CURRENT_KEY,
            key: 0
        })
        props.dispatch({
            type: SET_PATH,
            path: '/'
        })
    }

    return (
        <div>
            <div style={{margin: '20px'}}>
                <span>文章标题</span>
                <Input style={{width: '300px', marginLeft: '20px'}} value={title}
                       onChange={e => setTitle(e.target.value)}/>
                <div style={{float: 'right'}}>
                    <Button type={"primary"} onClick={() => submit('publish')}>发布</Button>
                    <Button style={{marginLeft: '20px'}} onClick={() => submit('draft')}>保存</Button>
                </div>
            </div>
            {/* <div id={'toolbar'} /> */}
            <div style={{margin: '20px', height: '300px'}}>
                <div id={'editor'}/>
            </div>
            {/*<h1>预览区域</h1>*/}
            <div id={'display'} style={{marginTop: '100px', border: 'none'}}/>
        </div>
    )
}

const mapStateToProps = state => ({
    currentKey: state.currentKey
})

export default connect(mapStateToProps)(Editor)