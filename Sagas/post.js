import axios from 'axios';
import { all,put,takeLatest,fork,call } from "redux-saga/effects";
import { 
    ADD_POST_SUCCUESS, ADD_POST_FAILURE, ADD_POST_REQUEST,
    ADD_COMMENT_REQUEST, ADD_COMMENT_FAILURE ,ADD_COMMENT_SUCCESS, 
    REMOVE_POST_REQUEST, REMOVE_POST_SUCCESS, REMOVE_POST_FAILURE, 
    LOAD_POST_REQUEST, LOAD_POST_SUCCESS, LOAD_POST_FAILURE, 
    LIKE_POST_REQUEST, LIKE_POST_SUCCESS, LIKE_POST_FAILURE,
    UNLIKE_POST_REQUEST,UNLIKE_POST_SUCCESS, UNLIKE_POST_FAILURE, 
    REMOVE_COMMENT_REQUEST, REMOVE_COMMENT_FAILURE, REMOVE_COMMENT_SUCCESS 
    } from '../reducers/post';
import { ADD_POST_TO_ME, REMOVE_POST_OF_ME } from "../reducers/user";



function likePostAPI(data) {
    return axios.patch(`/post/${data}/like`) // 요청한다. 서버에
}

function* likePost(action) {
    try { //요청에 성공 했다.
        const result = yield call(likePostAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : LIKE_POST_SUCCESS,
            data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
        console.error(err)
         yield put ({
             type:LIKE_POST_FAILURE,
             data: err.response.data
         })
     }
}

function unLikePostAPI(data) {
    return axios.delete(`/post/${data}/like`) // 요청한다. 서버에
}

function* unLikePost(action) {
    try { //요청에 성공 했다.
        const result = yield call(unLikePostAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : UNLIKE_POST_SUCCESS,
            data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:UNLIKE_POST_FAILURE,
             data: err.response.data
         })
     }
}





function addPostAPI(data) {
    return axios.post('/post', { content: data }) // 요청한다. 서버에
}

function* addPost(action) {
    try { //요청에 성공 했다.
        const result = yield call(addPostAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : ADD_POST_SUCCUESS,
            data: result.data // 요청한 데이터를 받는다. 서버에서
        });
        yield put ({
            type : ADD_POST_TO_ME,
            data : result.data.id,
        })
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:ADD_POST_FAILURE,
             data: err.response.data
         })
     }
}

function removePostAPI(data) {
    return axios.delete(`/post/${data}`) // 요청한다. 서버에
}


function* removePost(action) {
    try { //요청에 성공 했다.
        const result = yield call(removePostAPI,action.data) // call 동기
        yield put ({
            type : REMOVE_POST_SUCCESS,
           data: result.data,
        });
        yield put ({
            type : REMOVE_POST_OF_ME,
            data : result.data.id,
        })
     } catch (err) { // 요청에 실패했다.
        console.error(err)
         yield put ({
             type:REMOVE_POST_FAILURE,
             data: err.response.data
         })
     }
}

function addCommentAPI(data) {
    return axios.post(`/post/${data.PostId}/comment`,data) // 요청한다. 서버에
}


function* addComment(action) {
    try { //요청에 성공 했다.
        const result = yield call(addCommentAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
        yield put ({
            type : ADD_COMMENT_SUCCESS,
            data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:ADD_COMMENT_FAILURE,
             data: err.response.data
         })
     }
}

function removeCommentAPI(data) {
    return axios.delete(`/post/comment/${data}`) // 요청한다. 서버에
}


function* removeComment(action) {
    try { //요청에 성공 했다.
        const result = yield call(removeCommentAPI,action.data) // call 동기
        yield put ({
            type : REMOVE_COMMENT_SUCCESS,
           data: result.data,
        });
     } catch (err) { // 요청에 실패했다.
        console.error(err)
         yield put ({
             type:REMOVE_COMMENT_FAILURE,
             data: err.response.data
         })
     }
}

function loadPostAPI(data) {
    return axios.get(`/posts`);
  }
  
  function* loadPost(action) {
    try {
      const result = yield call(loadPostAPI, action.data);
      yield put({
        type: LOAD_POST_SUCCESS,
        data: result.data,
      });
    } catch (err) {
      console.error(err);
      yield put({
        type: LOAD_POST_FAILURE,
        error: err.response.data,
      });
    }
  }



function* watchAddPost() {
    yield takeLatest(ADD_POST_REQUEST, addPost);
}
function* watchAddComment() {
    yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}
function* watchRemoveComment() {
    yield takeLatest(REMOVE_COMMENT_REQUEST, removeComment);
}
function* watchRemovePost() {
    yield takeLatest(REMOVE_POST_REQUEST, removePost);
}
function* watchLoadPost() {
    yield takeLatest(LOAD_POST_REQUEST, loadPost);
}
function* watchLikePost() {
    yield takeLatest(LIKE_POST_REQUEST, likePost);
}
function* watchunLikePost() {
    yield takeLatest(UNLIKE_POST_REQUEST, unLikePost);
}


export default function* postSaga() {
    yield all([
      fork(watchAddPost), 
      fork(watchAddComment), 
      fork(watchRemoveComment), 
      fork(watchRemovePost),
      fork(watchLoadPost),
      fork(watchLikePost),
      fork(watchunLikePost),
    ])
}