import {Form, Input, Button} from 'antd';
import PropTypes from 'prop-types';
import { useCallback,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { ADD_COMMENT_REQUEST } from '../reducers/post';

const CommentForm = ({post}) => {
    const [commentText, onChangeCommentText,setCommentText] = useInput('');
    const id = useSelector((state) => state.user.me?.id)
    const { me } = useSelector((state) => state.user)
    const dispatch = useDispatch();
    const {addCommentDone,addCommentLoading} = useSelector((state) => state.post)

    useEffect(() => {
        if(addCommentDone) {
            setCommentText('');
        }
    },[addCommentDone])

    const onSubmitComment = useCallback(() => {
        dispatch({
          type: ADD_COMMENT_REQUEST,
          data: { content: commentText, userId: id,  postId: post.id },
        });
      }, [commentText, id]);
    return (
        <>
        {( me &&
          <Form onFinish={onSubmitComment}>
            <Form.Item style={{position:'relative', margin:0}}>
                <Input.TextArea value={commentText} onChange={onChangeCommentText} rows={4}/>
                <Button style={{position:'absolute', right:0 , bottom:-40, zIndex:1000}}type="primary" htmlType="submit" loading={addCommentLoading}>삐약</Button>
            </Form.Item>
        </Form>
        )}
        </>
        
    );
}
CommentForm.propTypes = {
    post:PropTypes.object.isRequired,
}

export default CommentForm;