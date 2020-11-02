
import axios from 'axios';
import { all,put,delay,takeLatest,fork,call } from "redux-saga/effects";
import {LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, 
        LOG_OUT_FAILURE , LOG_OUT_SUCCESS ,LOG_OUT_REQUEST,
        SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
        FOLLOW_REQUEST, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
        FOLLOW_SUCCESS, FOLLOW_FAILURE } from '../reducers/User';

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
             type:LOG_IN_FAILURE,
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
             type:LOG_OUT_FAILURE,
             error: err.response.data
         })
     }
}

function signUpAPI(data) {
        return axios.post('http://localhost:3065/user',data);
}


function* signUp(action) {
    try { //요청에 성공 했다.
        const result = yield call(signUpAPI, action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : SIGN_UP_SUCCESS,
           // data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:SIGN_UP_FAILURE,
             error: err.response.data,
         })
     }
}


function followAPI() {
    return axios.post('/api/follow') // 요청한다. 서버에
}


function* follow(action) {
   //const result = yield call(signUpAPI) // call 동기(기다림) fork 비동기(안기다림)
   yield delay(1000);
    try { //요청에 성공 했다.
        yield put ({
            type : FOLLOW_SUCCESS,
            data : action.data
           // data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:FOLLOW_FAILURE,
             error: err.response.data
         })
     }
}

function unfollowAPI() {
    return axios.post('/api/unfollow') // 요청한다. 서버에
}


function* unFollow(action) {
   //const result = yield call(signUpAPI) // call 동기(기다림) fork 비동기(안기다림)
   yield delay(1000);
    try { //요청에 성공 했다.
        yield put ({
            type : UNFOLLOW_SUCCESS,
            data : action.data
           // data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:UNFOLLOW_FAILURE,
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
function* watchFollow() {
    yield takeLatest(FOLLOW_REQUEST, follow);
}
function* watchunFollow() {
    yield takeLatest(UNFOLLOW_REQUEST, unFollow);
}



export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchunFollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
    ])
}