
import axios from 'axios';
import { all,put,delay,takeLatest,fork,call } from "redux-saga/effects";
import {LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, 
        LOG_OUT_FAILURE , LOG_OUT_SUCCESS ,LOG_OUT_REQUEST,
        SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
        FOLLOW_REQUEST, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
        FOLLOW_SUCCESS, FOLLOW_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE } from '../reducers/User';



    

function loadUserAPI() {
    return axios.get('/user');
    }
    
    function* loadUser(action) {
    try {
        const result = yield call(loadUserAPI, action.data);
        yield put({
        type: LOAD_USER_SUCCESS,
        data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOAD_USER_FAILURE,
        error: err.response.data,
        });
    }
    }
    
    function logInAPI(data) {
    return axios.post('/user/login', data);
    }
    
    function* logIn(action) {
    try {
        const result = yield call(logInAPI, action.data);
        yield put({
        type: LOG_IN_SUCCESS,
        data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOG_IN_FAILURE,
        error: err.response.data,
        });
    }
    }
    
    function logOutAPI() {
    return axios.post('/user/logout');
    }
    
    function* logOut() {
    try {
        yield call(logOutAPI);
        yield put({
        type: LOG_OUT_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: LOG_OUT_FAILURE,
        error: err.response.data,
        });
    }
    }
    
    function signUpAPI(data) {
    return axios.post('/user', data);
    }
    
    function* signUp(action) {
    try {
        const result = yield call(signUpAPI, action.data);
        console.log(result);
        yield put({
        type: SIGN_UP_SUCCESS,
        });
    } catch (err) {
        console.error(err);
        yield put({
        type: SIGN_UP_FAILURE,
        error: err.response.data,
        });
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
function* watchloadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
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
        fork(watchloadUser),
    ])
}