import {Button, Card,Popover,Avatar,List,Comment} from 'antd';
import PropTypes from 'prop-types';
import {RetweetOutlined,HeartOutlined,MessageOutlined,EllipsisOutlined,HeartTwoTone } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

import FollowButton from './FollowButton';
import PostCardContent from './PostCardContent';
import PostImages from './PostImages';
import CommentForm from './CommentForm';
import { useCallback, useEffect, useState } from 'react';
import { REMOVE_POST_REQUEST,LIKE_POST_REQUEST,UNLIKE_POST_REQUEST,REMOVE_COMMENT_REQUEST } from '../reducers/post';

const PostCard = ({post}) => {

    const [commentFormOpened, setCommentFromOpened] = useState(false)
    const [postItems, setPostItems] = useState([])
    const id = useSelector(state => state.user.me?.id);
    const {removePostLoading} = useSelector((state) => state.post)
    const comments = useSelector((state) => post.Comments);
    const dispatch = useDispatch()
    // 좋아요 액션 타입 
    const onLike = useCallback(() => {
        dispatch({
            type:LIKE_POST_REQUEST,
            data:post.id
        })
    },[])
    const onunLike = useCallback(() => {
        dispatch({
            type:UNLIKE_POST_REQUEST,
            data:post.id
        })
    },[])

    // 댓글창
    const onToggleComment = useCallback(() => {
        setCommentFromOpened((prev)=> !prev);
    }, [])
    // 게시글 삭제 액션 타입
    const onRemovePost = useCallback(() => {
        dispatch({
            type:REMOVE_POST_REQUEST,
            data:post.id,
        })
    }, [])
    // const onRemoveComment = useCallback(() => {
    //     dispatch({
    //         type:REMOVE_COMMENT_REQUEST,
    //         data:post.Comments,
    //     })
    // }, [])

    const onRemoveComment = (post_id) => {
        dispatch({
            type:REMOVE_COMMENT_REQUEST,
            data: post_id
        })
    }
    
    const liked = post.Likers.find((v) => v.id === id);

    useEffect(() => {

        const myList = post.Comments.filter(function(e){
            return e.UserId === id
        })
        
        if(myList.length > 0) {
            setPostItems(myList)
        }
    }, [post.Comments])

    return (
        <div style={{marginBottom: 20}}>
            <Card
            cover={post.Images[0] && <PostImages images={post.Images}/>}
            actions={[
                <RetweetOutlined key="retwwet"/>,
                liked
                    ? <HeartTwoTone twoToneColor="#eb2f96" key="heart" onClick={onunLike}/>
                    : <HeartOutlined key="heart"onClick={onLike}/>,
                 <MessageOutlined key="comment" onClick={onToggleComment} />,
     
                <Popover key="more" content={(
                    <Button.Group>
                        {id && post.User.id == id  
                        ? (
                        <>
                        <Button>수정</Button>
                        <Button type="danger" loading={removePostLoading} onClick={onRemovePost}>삭제</Button>
                        </>
                         ) :
                        <Button>신고</Button>}                    
                    </Button.Group>
                )}>
                    <EllipsisOutlined />
                </Popover>
            ]}
            extra={id &&(<FollowButton post={post}/>)}
            >
                <Card.Meta
                avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                title={post.User.nickname}
                description={<PostCardContent postData={post.content} />}
                />
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
                            ? (<Button style={{position:"absolute", top:"50%",right:"30px",transform:"translateY(-50%)"}} onClick={e => onRemoveComment(item.id)}>삭제</Button>
                            ) : null}
                            </Comment>
                        </li>
                    )}
                    // renderItem={(item) => (
                        
                    //         <li style={{position:"relative"}}>
                    //             <Comment
                    //             author={item.User.nickname}
                    //             avatar={<Avatar>{item.User.nickname[0]}</Avatar>}
                    //             content={item.content}
                    //             >
                    //             {item.User.id === id
                    //             ? (<Button style={{position:"absolute", top:"50%",right:"30px",transform:"translateY(-50%)"}} onClick={onRemoveComment}>삭제</Button>
                    //             ) : null}
                    //             </Comment>
                    //         </li>
                    //     )}
                    />
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