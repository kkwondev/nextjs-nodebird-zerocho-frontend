import {Button, Card,Popover,Avatar,List,Comment,Form,Input} from 'antd';
import PropTypes from 'prop-types';
import {RetweetOutlined,HeartOutlined,MessageOutlined,EllipsisOutlined,HeartTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import  moment  from 'moment';

import useInput from '../hooks/useInput';
import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import { useCallback, useEffect, useState } from 'react';
import { REMOVE_POST_REQUEST,LIKE_POST_REQUEST,
    UNLIKE_POST_REQUEST,REMOVE_COMMENT_REQUEST,RETWEET_REQUEST,
    UPDATE_POST_REQUEST } from '../reducers/post';

const PostCard = ({post}) => {

    const [commentFormOpened, setCommentFromOpened] = useState(false)
    const [postUpdateOpened, setPostUpdateOpend] = useState(false)
    const [text,onChangeText,setText] = useInput();
    const id = useSelector(state => state.user.me?.id);
    const {removePostLoading,updatePostDone ,updatePostError} = useSelector((state) => state.post)
    const dispatch = useDispatch()
    // 좋아요 액션 타입 
    const onLike = useCallback(() => {
        if(!id) {
           return alert('로그인이 필요합니다.')
        }
       return dispatch({
            type:LIKE_POST_REQUEST,
            data:post.id
        })
    },[])
    const onunLike = useCallback(() => {
        if(!id) {
            return alert('로그인이 필요합니다.')
         }
        return dispatch({
            type:UNLIKE_POST_REQUEST,
            data:post.id
        })
    },[])
    // 수정창
    const onTogglePost = useCallback(() => {
        setPostUpdateOpend((prev)=> !prev);
    },)

    useEffect(()=> {
        if(updatePostDone || updatePostError) {
            setText('')
            setPostUpdateOpend(false);
        }
    },[updatePostDone,updatePostError])
    // 댓글창

    const onUpdate = useCallback(()=> {
        if(!id) {
            return alert('로그인이 필요합니다.')  
        }
        return dispatch({
            type:UPDATE_POST_REQUEST,
            data:{content : text, postId:post.id},
        })
    },[text])
    const onToggleComment = useCallback(() => {
        setCommentFromOpened((prev)=> !prev);
    }, [])

    // 게시글 삭제 액션 타입
    const onRemovePost = useCallback(() => {
        if(!id) {
            return alert('로그인이 필요합니다.')
         }
        return dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id,
        })
    }, [])

    const onRemoveComment = (id) => () => {
        if(!id) {
            return alert('로그인이 필요합니다.')
         }
        return dispatch({
            type:REMOVE_COMMENT_REQUEST,
            data:{commentId : id, postId:post.id}
        })
    }

    const onRetweet = useCallback(() => {
        if(!id) {
            return alert('로그인이 필요합니다.')
        }
        return dispatch({
            type:RETWEET_REQUEST,
            data:post.id,
        })
    },[])

    const liked = post.Likers.find((v) => v.id === id);

    return (
        <div style={{marginBottom: 20}}>
            <Card
            cover={post.Images[0] && <PostImages images={post.Images}/>}
            actions={[
                <RetweetOutlined key="retweet" onClick={onRetweet}/>,
                liked
                    ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onunLike}/>
                    : <HeartOutlined key="heart"onClick={onLike}/>,
                 <MessageOutlined key="comment" onClick={onToggleComment} />,
     
                <Popover key="more" content={(
                    <Button.Group>
                        {id && post.User.id == id  
                        ? (
                        <>
                        <Button onClick={onTogglePost}>수정</Button>
                        <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                        </>
                         ) :
                        <Button>신고</Button>}                    
                    </Button.Group>
                )}>
                    <EllipsisOutlined />
                </Popover>
            ]}
            title= {post.RetweetId ? `${post.User.nickname} 님이 리트윗하셨습니다.` : null}
            extra={id &&(<FollowButton post={post}/>)}
            >
                {post.RetweetId && post.RetweetId
                ?(
                    
                    <Card
                    cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images} />}
                  >
                   <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>   
                    <Card.Meta
                    avatar={<Avatar>{post.Retweet.User.nickname[0]}</Avatar>}
                    title={post.Retweet.User.nickname}
                    description={<PostCardContent postData={post.Retweet.content} />}
                    />
                    </Card>
                )
                :(
                <>
                <div style={{ float: 'right' }}>{moment(post.createdAt).format('YYYY.MM.DD')}</div>
                <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
                />
                </>
                )
                }
            </Card>
            {commentFormOpened && (
               <div>
                   <CommentForm post={post}/>
                    <List
                    header={`${post.Comments.length}개의 댓글`}
                    itemLayout="horizontal"
                    dataSource={post.Comments}
                    renderItem={(item) => (
                        
                        <li style={{position:"relative"}}>
                            <Comment
                            author={item.User.nickname}
                            avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                            content={item.content}
                            >
                            {item.User.id === id
                            ? (<Button style={
                                {position:"absolute", 
                                top:"50%",
                                right:"30px",
                                transform:"translateY(-50%)"}} 
                                onClick={onRemoveComment(item.id)}>삭제</Button>
                            ) : null}
                            </Comment>
                        </li>
                    )}
                    />
                </div>
            )}
            {postUpdateOpened &&(
                <div>
                    <Form encType="multipart/form-data" onFinish={onUpdate}>
                    <Input.TextArea
                value={text}
                onChange={onChangeText}
                maxLength={140} 
                placeholder='수정할 내용을 적으세요' 
            />
             <Button type="primary" style={{float:'right'}} htmlType='submit'>수정하기</Button>
                    </Form>
                </div>
            )}
        </div>
    );
}
PostCard.propTypes = {
    post: PropTypes.shape({
        id:PropTypes.number,
        User:PropTypes.object,
        content:PropTypes.string,
        createAt:PropTypes.object,
        Comments:PropTypes.arrayOf(PropTypes.object),
        Images: PropTypes.arrayOf(PropTypes.object),
    }).isRequired,
}

export default PostCard;