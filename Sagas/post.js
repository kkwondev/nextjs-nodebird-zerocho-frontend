import axios from 'axios';
import { all,put,delay,takeLatest,fork } from "redux-saga/effects";

function addPostAPI(data) {
    return axios.post('/api/post',data) // 요청한다. 서버에
}


function* addPost(action) {
    // const result = yield call(addPostAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
    yield delay(1000);
    try { //요청에 성공 했다.
        yield put ({
            type : 'ADD_POST_SUCCES',
            data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:'ADD_POST_FAILUTE',
             data: err.response.data
         })
     }
}



function* watchAddPost() {
    yield takeLatest('ADD_POST_REQUEST', addPost);
}


export default function* postSaga() {
    yield all([
      fork(watchAddPost)  
    ])
}