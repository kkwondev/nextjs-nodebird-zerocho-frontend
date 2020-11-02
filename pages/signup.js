import React, { useCallback, useEffect, useState } from 'react';
import AppLayout from '../components/AppLayout';
import Head from 'next/head'
import Form from 'antd/lib/form/Form';
import { Input,Checkbox,Button } from 'antd';
import useInput from '../hooks/useInput';
import { LOG_OUT_SUCCESS, SIGN_UP_REQUEST } from '../reducers/user';
import { useDispatch, useSelector } from 'react-redux';
import Router from 'next/router';



const Signup = () => {
    const dispatch = useDispatch();
    const {signUpLoading, signUpDone, signUpError} = useSelector((state) => state.user)
    const [email, onChangeEmail] = useInput('');
    const [nickname, onChangeNickname] = useInput('');
    const [password,onChangePassword] = useInput('');
    
    useEffect(()=> {
        if(signUpDone) {
            Router.push('/')
            dispatch({
                type:LOG_OUT_SUCCESS,
            })
        }
    },[signUpDone])

    useEffect(()=> {
        console.debug(signUpError);
        if(signUpError) {
            alert(signUpError);
        }
    },[signUpError])


    const [passwordCheck,setPasswordCheck] = useState('');
    const [passwordError,setPasswordError] = useState(false);
    const onChangePasswordCheck = useCallback((e) => {
        setPasswordCheck(e.target.value)
        setPasswordError(e.target.value !== password);
    },[password])

    const [term,setTerm] = useState('');
    const [termError,setTermError] = useState(false);
    const onChangeTerm = useCallback((e) => {
        setTerm(e.target.checked);
        setTermError(false);
    },[])
    const onsubmit = useCallback(() => {
        if (password !== passwordCheck) {
            return setPasswordError(true)
        }
        if (!term) {
            return setTermError(true);
        }
        dispatch({
            type:SIGN_UP_REQUEST,
            data: {email,password, nickname}
        })
    },[email,password,passwordCheck,term])
    return (
        <>
        <Head>
            <title>회원가입 | nodebird</title>
        </Head>
        <AppLayout>
            <Form onFinish={onsubmit}>
                <div>
                    <label htmlFor="user-email">아이디</label>
                    <br/>
                    <Input name="user-email" type="email" value={email} required onChange={onChangeEmail} />
                </div>
                <div>
                    <label htmlFor="user-nickname">닉네임</label>
                    <br/>
                    <Input name="user-nickname" value={nickname} required onChange={onChangeNickname} />
                </div>
                <div>
                    <label htmlFor="user-password">비밀번호</label>
                    <br/>
                    <Input name="user-password" type="password" value={password} required onChange={onChangePassword} />
                </div>
                <div>
                    <label htmlFor="user-password-check">비밀번호 체크</label>
                    <br/>
                    <Input name="user-password-check" type="password" value={passwordCheck} required onChange={onChangePasswordCheck} />
                </div>
                <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>경원이의 말을 잘들어야 합니다.</Checkbox>
                {termError && <div>약관동의 하세요</div>}
                {passwordError && <div>비밀번호가 일치하지 않습니다.</div>}
                <div>
                    <Button type="primary" htmlType="submit" type="email" loading={signUpLoading}>가입하기</Button>
                </div>
            </Form>
        </AppLayout>
        </>
    );
}
export default React.memo(Signup);