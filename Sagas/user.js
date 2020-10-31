
//import axios from 'axios';
import { all,put,delay,takeLatest,fork } from "redux-saga/effects";
import {LOG_IN_SUCCESS, LOG_IN_FAILUTE, LOG_IN_REQUEST, 
        LOG_OUT_FAILUTE , LOG_OUT_SUCCESS ,LOG_OUT_REQUEST,
        SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILUTE } from '../reducers/User';

function logInAPI(data) {
    return axios.post('/api/login',data) // 요청한다. 서버에
}



function* logIn(action) {
    // const result = yield call(logInAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
    yield delay(1000);
    try { //요청에 성공 했다.
        console.debug('saga login')
        yield put ({
            type : LOG_IN_SUCCESS,
           // data: result.data // 요청한 데이터를 받는다. 서버에서
           data : action.data
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({ // put -> dispatch 라고 생각해
             type:LOG_IN_FAILUTE,
             error: err.response.data
         })
     }
}

function logOutAPI() {
    return axios.post('/api/logout') // 요청한다. 서버에
}


function* logOut() {
   //const result = yield call(logOutAPI) // call 동기(기다림) fork 비동기(안기다림)
   yield delay(1000);
    try { //요청에 성공 했다.
        yield put ({
            type : LOG_OUT_SUCCESS,
           // data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:LOG_OUT_FAILUTE,
             error: err.response.data
         })
     }
}


function signUpAPI() {
    return axios.post('/api/logout') // 요청한다. 서버에
}


function* signUp() {
   //const result = yield call(signUpAPI) // call 동기(기다림) fork 비동기(안기다림)
   yield delay(1000);
    try { //요청에 성공 했다.
        yield put ({
            type : SIGN_UP_SUCCESS,
           // data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:SIGN_UP_FAILUTE,
             error: err.response.data
         })
     }
}

function* watchLogIn() {
    yield takeLatest(LOG_IN_REQUEST, logIn);
}

function* watchLogOut() {
    yield takeLatest(LOG_OUT_REQUEST, logOut);
}
function* watchSignUp() {
    yield takeLatest(SIGN_UP_REQUEST, signUp);
}



export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp)
    ])
}