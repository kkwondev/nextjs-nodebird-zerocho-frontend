import React, { useState } from 'react';
import Protypes from 'prop-types';
import Link from 'next/link';
import {Input, Menu, Row,Col} from 'antd';
import LoginForm from './LoginForm';
import UserProfile from './UserProfile';
import styled, { createGlobalStyle } from 'styled-components';
import { useSelector } from 'react-redux';


const SearchInput = styled(Input.Search)`
    line-height:48px;
`;
const Global = createGlobalStyle`
    .ant-row {
        margin-right: 0 !important;
        margin-left:0 !important;
    }
    .ant-col:first-child {
        padding-left:0 !important;
    }
    .ant-col:last-child {
        padding-right: 0 !important;
    }
`;


const AppLayout = ({children}) => {
    const { me, logInDone } = useSelector(state => state.user);
    return (
        <div>
            <Global/>
            <Menu mode="horizontal">

                <Menu.Item>
                    <Link href="/"><a>노드버드</a></Link>
                </Menu.Item>
                <Menu.Item>
                    <Link href="/profile"><a>프로필</a></Link>
                </Menu.Item>
                <Menu.Item>
                   <SearchInput enterButton/>
                </Menu.Item>
                {!me && (
                <Menu.Item>
                    <Link href="/signup"><a>회원가입</a></Link>
                </Menu.Item>
                )}  
            </Menu>
            <Row gutter={8}>
                <Col xs={24} md={6}>
                    {me ? <UserProfile/> : <LoginForm />}
                </Col>
                <Col xs={24} md={12}>
                    {children}
                </Col>
                <Col xs={24} md={6}>
                    {/* rel 보완 때문에 적음 */}
                    <a href="http://www.kkwon.co.kr" target="_blank" rel="noreferrer noopener">Made by kkwon</a>
                </Col>
            </Row>
        </div>
    );
}

AppLayout.prototype = {
    children: Protypes.node.isRequired
}

export default React.memo(AppLayout);