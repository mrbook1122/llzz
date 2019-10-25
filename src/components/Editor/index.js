import React, {useState, useEffect} from "react";
import styled from "styled-components";
import {Button, Input} from 'antd'
import axios from 'axios'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
// import 'quill/dist/quill.core.css'

const url = process.env.REACT_APP_URL

const Editor = props => {
    const [quill, setQuill] = useState(null)
    useEffect(() => {
        if (document.getElementById('editor') && quill === null) {
            let toolbarOptions = [
                ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
                ['blockquote', 'code-block'],

                [{'header': 1}, {'header': 2}],               // custom button values
                [{'list': 'ordered'}, {'list': 'bullet'}],
                // text direction

                [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown

                [{'color': []}, {'background': []}],          // dropdown with defaults from theme
                [{'align': []}],

                ['clean'],                                         // remove formatting button
                ['image'], ['link']
            ];
            let delta = Quill.import('delta')
            let quill = new Quill('#editor', {
                modules: {
                    toolbar: toolbarOptions
                },
                theme: 'snow'
            })
            let toolbar = quill.getModule('toolbar')
            toolbar.addHandler('link', value => {
                console.log(value)
            })
            toolbar.addHandler('image', value => {
                let fileInput;
                if (document.getElementsByClassName('ql-image').length === 1) {
                    fileInput = document.createElement('input')
                    fileInput.type = 'file'
                    fileInput.accept = 'image/*'
                    fileInput.style.display = 'none'
                    fileInput.className = 'ql-image'
                    fileInput.id = 'file-input'
                    let currentNode = document.getElementsByClassName('ql-image')
                    currentNode[0].parentNode.append(fileInput)
                    fileInput.addEventListener('change', e => {
                        let file = e.target.files[0]
                    })
                }
                fileInput = document.getElementsByClassName('ql-image')[1];

                fileInput.click();
            })
            // quill.insertEmbed(10, 'image', 'http://img4.imgtn.bdimg.com/it/u=1692593021,738807743&fm=15&gp=0.jpg')
            let display = new Quill('#display', {
                readOnly: true,
                theme: 'snow',
                modules: {
                    toolbar: false
                }
            })
            quill.on('text-change', function (delta, oldDelta, source) {
                let json = JSON.stringify(quill.getContents())
                let a = JSON.parse(json)
                display.setContents(a.ops)
            });

            setQuill(quill)
        }
    })

    const uploadFile = file => {
        // if (file !== undefined) {
        //     axios.post(url + '/image/upload', {
        //         image: file
        //     }).then(resp => {
        //         //上传图片，返回图片url
        //     })
        // }
        // if (file !== undefined) {
        //     let url = URL.createObjectURL(file)
        //     console.log(quill)
        //     // if (quill)
        //     //     quill.insertEmbed(quill.getSelection().index, 'image', url)
        // }
        setQuill('a')
    }

    //文章标题
    const [title, setTitle] = useState('')

    const submit = type => {
        axios.post(url + '/article/save', {
            title: title,
            content: quill.getContents(),
            type: type
        })
    }

    return (
        <div>
            <div style={{margin: '20px'}}>
                <span>文章标题</span>
                <Input style={{width: '300px', marginLeft: '20px'}} value={title} onChange={e => setTitle(e.target.value)}/>
                <div style={{float: 'right'}}>
                    <Button type={"primary"} onClick={() => submit('publish')}>发布</Button>
                    <Button style={{marginLeft: '20px'}} onClick={() => submit('save')}>保存</Button>
                </div>
            </div>
            {/* <div id={'toolbar'} /> */}
            <div style={{margin: '20px', height: '300px'}}>
                <div id={'editor'}/>
            </div>
            <div id={'display'} style={{marginTop: '100px', border: 'none'}}/>
        </div>
    )
}

export default Editor