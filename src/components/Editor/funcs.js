import Quill from "quill";
import axios from "axios";

/**
 * 初始化quill
 * @param id 例如#quill
 * @param display
 */
export const initQuill = (id, display) => {
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
    let quill = new Quill(id, {
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
                if (file !== undefined) {
                    let formData = new FormData()
                    formData.append('file', file)
                    axios.post('/image/upload', formData).then(resp => {
                        quill.insertEmbed(quill.getSelection().index, 'image', resp.data)
                    })
                }
                if (file !== undefined) {
                    // let url = URL.createObjectURL(file)
                    // console.log(quill)
                    // if (quill)
                    //     quill.insertEmbed(quill.getSelection().index, 'image', url)
                }
            })
        }
        fileInput = document.getElementsByClassName('ql-image')[1];

        fileInput.click();
    })

    quill.on('text-change', function (delta, oldDelta, source) {
        let json = quill.getContents()
        display.setContents(json)
    });

    return quill
}