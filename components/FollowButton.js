import React, { useCallback, useState } from 'react';
import {Button} from 'antd';
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux';
import { FOLLOW_REQUEST, UNFOLLOW_REQUEST } from '../reducers/user';




const FollowButton = ({post}) => {
    const { me,followLoading, unfollowLoading } = useSelector((state)=> state.user)
    const isFollwings = me && me.Followings.find((v)=> v.id === post.User.id)
    const dispatch = useDispatch();
    const onClickButton = useCallback(() => {
        if(isFollwings) {
            dispatch({
                type: UNFOLLOW_REQUEST,
                data : post.User.id,
            })
        } else {
            dispatch({
                type: FOLLOW_REQUEST,
                data : post.User.id,
            })
        }
    },[isFollwings])
    if ( me.id === post.User.id) {
        return null;
    }
    return (
        <Button loading={followLoading || unfollowLoading} onClick={onClickButton}>
            {isFollwings ? '언팔로우' : '팔로우'}

        </Button>
    );
};

FollowButton.propTypes = {
    post:PropTypes.object.isRequired,
}

export default FollowButton