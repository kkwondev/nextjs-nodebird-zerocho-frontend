import React, { useCallback, useMemo } from 'react';
import {Form,Input} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import { CHANGE_NICKNAME_REQUEST } from '../reducers/user';
import useInput from '../hooks/useInput';


const NicknameEditForm = () => {
    const style = useMemo(()=> ({
        marginBottom:20,
        border:'1px solid #d9d9d9',
        padding:20
    }),[]);
const { me } = useSelector((state)=> state.user)
const [ nickname, ChangeNickname ] = useInput(me?.nickname || '');
const dispatch = useDispatch();
const onSubmit = useCallback(()=> {
    dispatch({
        type:CHANGE_NICKNAME_REQUEST,
        data:nickname,
    })
},[nickname])
    return(
        <Form style={style}>
            <Input.Search 
            value={nickname}
            addonBefore="닉네임" 
            enterButton="수정"
            onSearch={onSubmit}
            onChange={ChangeNickname}/>
        </Form>
    );
};

export default NicknameEditForm;