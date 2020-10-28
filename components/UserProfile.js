import React, { useCallback } from 'react';
import {Button, Card} from 'antd';
import Avatar from 'antd/lib/avatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { loginoutRequestAction } from '../reducers/user';

const UserProfile = () => {
    const dispacth = useDispatch();
    const {me} = useSelector((state) => state.user)

    const onLogOut = useCallback(() => {
        dispacth(loginoutRequestAction());
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