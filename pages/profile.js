import React from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import NicknameEditForm from '../components/NicknameEditForm'
import FollowList from '../components/FollowList';

const Profile = () => {
    const followerList =[
        {
            nickname:'강경원',
        },
        {
            nickname:'react'
        },
        {
            nickname:'바보'
        }
    ]
    const followingList =[
        {
            nickname:'강경원',
        },
        {
            nickname:'react'
        },
        {
            nickname:'바보'
        }
    ]

    return (
        <>
        <Head>
            <title>내프로필 | nodebird</title>
        </Head>
        <AppLayout>
            <NicknameEditForm/>
            <FollowList 
            header="팔로잉 목록" 
            data={followingList}/>
            <FollowList header="팔로워 목록" data={followerList}/>
        </AppLayout>
        </>
    );
}
export default React.memo(Profile);