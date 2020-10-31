import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList';
import { useSelector } from 'react-redux';

const Profile = () => {
    const { me } = useSelector((state) => state.user)

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