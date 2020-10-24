import {useCallback, useRef} from 'react';
import {Button, Form,Input} from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import {addPost} from '../reducers/post'


const PostForm = () => {
    const { imagePaths } = useSelector(state => state.post);
    const dispatch = useDispatch();
    const [text,onChangeText,setText] = useInput();
    const onsubmit = useCallback (() => {
        dispatch(addPost);
        setText('');
    }, []);

    const imageInput = useRef()
    const onCilckimage = useCallback(() => {
        imageInput.current.click();
    },[imageInput.current])
    return (
        <Form style={{margin: '10px 0 20px'}} encType='multpart/form-data' onFinish={onsubmit}>
            <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140} 
                placeholder='어떤 신기한 일이 있었나요?' 
            />
            <div>
                <input type="file" multiple hidden ref={imageInput}/>
                <Button onClick={onCilckimage}>이미지 업로드</Button>
                <Button type="primary" style={{float:'right'}} htmlType='submit'>짹짹</Button>
            </div>
            <div>
                {imagePaths.map((v) => {
                    <div key={v} style={{display: 'inline-block'}}>
                        <img src={v} style={{width: '200px'}} alt={v}/>
                        <div>
                            <Button>제거</Button>
                        </div>
                    </div>
                })}
            </div>

        </Form>
    );
}

export default PostForm;