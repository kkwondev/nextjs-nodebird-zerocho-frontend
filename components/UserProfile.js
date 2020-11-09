import React, { useCallback } from 'react';
import Link from 'next/link';
import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { loginoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const dispacth = useDispatch();
    const {me,logOutLoading} = useSelector((state) => state.user)

    const onLogOut = useCallback(() => {
        dispacth(loginoutRequestAction());
    },[]);
    return(
        <Card
            actions={[
                <div key="twit">쨱쨱<br/>{me.Posts.length}</div>,
                <div key="followings"><Link href="/profile">팔로잉</Link><br/>{me.Followings.length}</div>,
                <div key="followings"><Link href="/profile">팔로워</Link><br/>{me.Followers.length}</div>,
            ]}>
            <Card.Meta
            avatar={<Avatar>{me.nickname[0]}</Avatar>}
            title={me.nickname}
            />
            <Button onClick={onLogOut} loading={logOutLoading}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;