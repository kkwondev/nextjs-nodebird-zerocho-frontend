import React, { useCallback } from 'react';
import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch } from 'react-redux';
import { loginoutAction } from '../reducers/user';

const UserProfile = () => {
    const dispacth = useDispatch();
    const onLogOut = useCallback(() => {
        dispacth(loginoutAction());
    },[]);
    return(
        <Card
            actions={[
                <div key="twit">쨱쨱<br/>0</div>,
                <div key="followings">팔로워<br/>0</div>,
                <div key="followings">팔로잉<br/>0</div>,
            ]}>
            <Card.Meta
            avatar={<Avatar>kkw</Avatar>}
            title="kkwon"
            />
            <Button onClick={onLogOut}>로그아웃</Button>
        </Card>
    );
}

export default UserProfile;