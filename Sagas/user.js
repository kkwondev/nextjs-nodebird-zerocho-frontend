
import axios from 'axios';
import { all,put,takeLatest,fork,call } from "redux-saga/effects";
import {LOG_IN_SUCCESS, LOG_IN_FAILURE, LOG_IN_REQUEST, 
        LOG_OUT_FAILURE , LOG_OUT_SUCCESS ,LOG_OUT_REQUEST,
        SIGN_UP_REQUEST, SIGN_UP_SUCCESS, SIGN_UP_FAILURE, 
        FOLLOW_REQUEST, UNFOLLOW_REQUEST, UNFOLLOW_SUCCESS, UNFOLLOW_FAILURE,
        FOLLOW_SUCCESS, FOLLOW_FAILURE, LOAD_USER_REQUEST, LOAD_USER_SUCCESS, LOAD_USER_FAILURE, 
        CHANGE_NICKNAME_REQUEST, CHANGE_NICKNAME_SUCCESS, CHANGE_NICKNAME_FAILURE,
         LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, LOAD_FOLLOWERS_SUCCESS, 
         LOAD_FOLLOWERS_FAILURE, LOAD_FOLLOWINGS_SUCCESS, LOAD_FOLLOWINGS_FAILURE, 
         REMOVE_FOLLOWER_REQUEST, REMOVE_FOLLOWER_SUCCESS, REMOVE_FOLLOWER_FAILURE, LOAD_MY_INFO_REQUEST, LOAD_MY_INFO_SUCCESS, LOAD_MY_INFO_FAILURE } from '../reducers/User';



    

    function loadUserAPI(data) {
        return axios.get(`/user/${data}`);
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

    function loadMyinfoAPI() {
        return axios.get('/user');
    }
        
    function* loadMyinfo() {
        try {
            const result = yield call(loadMyinfoAPI);
            yield put({
            type: LOAD_MY_INFO_SUCCESS,
            data: result.data,
            });
        } catch (err) {
            console.error(err);
            yield put({
            type: LOAD_MY_INFO_FAILURE,
            error: err.response.data,
            });
        }
    }

    function loadFollowersAPI(data) {
        return axios.get('/user/followers',data);
        }
        
        function* loadFollowers(action) {
        try {
            const result = yield call(loadFollowersAPI, action.data);
            yield put({
            type: LOAD_FOLLOWERS_SUCCESS,
            data: result.data,
            });
        } catch (err) {
            console.error(err);
            yield put({
            type: LOAD_FOLLOWERS_FAILURE,
            error: err.response.data,
                });
            }
        }
    function loadFollowingsAPI(data) {
        return axios.get('/user/followings',data);
        }
        
        function* loadFollowings(action) {
        try {
            const result = yield call(loadFollowingsAPI, action.data);
            yield put({
            type: LOAD_FOLLOWINGS_SUCCESS,
            data: result.data,
            });
        } catch (err) {
            console.error(err);
            yield put({
            type: LOAD_FOLLOWINGS_FAILURE,
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
    


function followAPI(data) {
    return axios.patch(`/user/${data}/follow`) // 요청한다. 서버에
}


function* follow(action) {
    try { //요청에 성공 했다.
        const result = yield call(followAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : FOLLOW_SUCCESS,
           data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:FOLLOW_FAILURE,
             error: err.response.data
         })
     }
    }

function unfollowAPI(data) {
    return axios.delete(`/user/${data}/follow`) // 요청한다. 서버에
}


function* unFollow(action) {
    try { //요청에 성공 했다.
         const result = yield call(unfollowAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : UNFOLLOW_SUCCESS,
            data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:UNFOLLOW_FAILURE,
             error: err.response.data
         })
     }
}

function removeFollowerAPI(data) {
    return axios.delete(`/user/follower/${data}`) // 요청한다. 서버에
}


function* removeFollower(action) {
    try { //요청에 성공 했다.
         const result = yield call(removeFollowerAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : REMOVE_FOLLOWER_SUCCESS,
            data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:REMOVE_FOLLOWER_FAILURE,
             error: err.response.data
         })
     }
}
function changeNicknameAPI(data) {
    return axios.patch('/user/nickname', { nickname:data }) // 요청한다. 서버에
}


function* changeNickname(action) {
    try { //요청에 성공 했다.
        const result = yield call(changeNicknameAPI,action.data)
        yield put ({
            type : CHANGE_NICKNAME_SUCCESS,
           data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:CHANGE_NICKNAME_FAILURE,
             error: err.response.data
         })
     }
}


function* watchloadUser() {
    yield takeLatest(LOAD_USER_REQUEST, loadUser);
}
function* watchLoadMyinfo() {
    yield takeLatest(LOAD_MY_INFO_REQUEST, loadMyinfo);
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

function* watchChangeNickname() {
    yield takeLatest(CHANGE_NICKNAME_REQUEST, changeNickname);
}

function* watchLoadFollowers() {
    yield takeLatest(LOAD_FOLLOWERS_REQUEST, loadFollowers);
}
function* watchLoadFollowings() {
    yield takeLatest(LOAD_FOLLOWINGS_REQUEST, loadFollowings);
}

function* watchremoveFollower() {
    yield takeLatest(REMOVE_FOLLOWER_REQUEST, removeFollower);
}



export default function* userSaga() {
    yield all([
        fork(watchFollow),
        fork(watchunFollow),
        fork(watchLogIn),
        fork(watchLogOut),
        fork(watchSignUp),
        fork(watchloadUser),
        fork(watchLoadMyinfo),
        fork(watchChangeNickname),
        fork(watchLoadFollowers),
        fork(watchLoadFollowings),
        fork(watchremoveFollower),
    ])
}