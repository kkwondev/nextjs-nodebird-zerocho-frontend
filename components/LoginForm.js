import React, { useCallback } from 'react';
import {Form,Input,Button} from 'antd';
import PropTypes from 'prop-types';
import Link from 'next/link';
import styled from 'styled-components';
import useInput from '../hooks/useInput';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const ButtonWraper = styled.div`
    margin-top:10px;
`;

const FormWrapper = styled(Form)`
    padding:10px;
`;

const LoginForm = () => {
    const dispatch = useDispatch();
    const {isLogginIn} = useSelector((state)=>state.user)
    const [id, onChangeId] = useInput('');
    const [password,onChangePassword] = useInput('');

    const onsubmitForm = useCallback(() => {
        console.log(id,password);
        console.debug(loginRequestAction())
        dispatch(loginRequestAction({id,password}))
    }, [id,password]);
    return (
        <FormWrapper onFinish={onsubmitForm}>
            <div>
                <label htmlFor="user-id">아이디</label>
                <br/>
                <Input name="user-id" value={id} onChange={onChangeId} required/>
            </div>
            <div>
            <label htmlFor="user-password">비밀번호</label>
                <br/>
                <Input 
                name="user-password" 
                value={password} 
                type="password" 
                onChange={onChangePassword} 
                required/>
            </div>
            <div>

            </div>
            <ButtonWraper>
                <Button type="primary" htmlType="submit" loading={isLogginIn}>로그인</Button>
                <Link href="/signup"><a><Button>회원가입</Button></a></Link>
            </ButtonWraper>
        </FormWrapper>
    );
}

export default React.memo(LoginForm);