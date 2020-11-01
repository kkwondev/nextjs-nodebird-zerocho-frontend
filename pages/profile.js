import React, { useEffect } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';
import  Router  from 'next/router';

const Profile = () => {
    const { me } = useSelector((state) => state.user)
// 로그인 안한상태에서 or 프로필 상태에서 홈으로 가기
    useEffect(()=> {
        if(!(me && me.id)) {
            alert('로그인을 하세요')
            Router.push('/')
        }
    },[me && me.id])
    if (!me) {
        return null;
    }

    return (
        <>
        <Head>
            <title>내프로필 | nodebird</title>
        </Head>
        <AppLayout>
            <NicknameEditForm/>
            <FollowList header="팔로잉 목록" data={me.Followings}/>
            <FollowList header="팔로워 목록" data={me.Followers}/>
        </AppLayout>
        </>
    );
}
export default React.memo(Profile);