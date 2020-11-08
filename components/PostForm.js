import {useCallback, useEffect, useRef} from 'react';
import {Button, Form,Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {addPost, ADD_POST_REQUEST} from '../reducers/post';
import {UPLOAD_IMAGES_REQUEST,REMOVE_IMAGE} from '../reducers/post';


const PostForm = () => {
    const { imagePaths,addPostDone } = useSelector(state => state.post);
    const [text,onChangeText,setText] = useInput();
    const dispatch = useDispatch();

    useEffect(() => {
        if(addPostDone) {
            setText('');
        }
    },[addPostDone])
    const onsubmit = useCallback (() => {
        if(!text) {
            return alert('내용이 입력 되지 않았습니다.')
        }
        const formData = new FormData();
        imagePaths.forEach((p) => {
            formData.append('image', p)
        })
        formData.append('content', text)
        return dispatch({
            type:ADD_POST_REQUEST,
            data:formData,
        });
    }, [text,imagePaths]);

    const imageInput = useRef()
    const onCilckimage = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current])

    const onChangeImages = useCallback((e)=> {
        console.log('images', e.target.files);
        const imageFormData = new FormData();
        [].forEach.call(e.target.files, (f) => {
            imageFormData.append('image',f)
        });
       dispatch({
           type:UPLOAD_IMAGES_REQUEST,
           data:imageFormData,
       })
    },[])

    const onremoveImage = useCallback((index) => () => {
        dispatch({
            type:REMOVE_IMAGE,
            data:index
        })
    })
    return (
        <Form style={{margin: '10px 0 20px'}} name='image' encType='multipart/form-data' onFinish={onsubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140} 
                placeholder='어떤 신기한 일이 있었나요?' 
            />
            <div>
                <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
                <Button onClick={onCilckimage}>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType='submit'>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v, i) => (
                    <div key={v} style={{display: 'inline-block'}}>
                        <img src={`http://localhost:3065/${v}`} style={{width: '200px'}} alt={v}/>
                        <div>
                            <Button onClick={onremoveImage(i)}>제거</Button>
                        </div>
                    </div>
                ))}
            </div>
        </Form>
    );
}

export default PostForm;