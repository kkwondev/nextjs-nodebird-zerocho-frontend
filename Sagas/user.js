
import axios from 'axios';
import { all,put,delay,takeLatest,fork } from "redux-saga/effects";


function logInAPI(data) {
    return axios.post('/api/login',data) // 요청한다. 서버에
}


function* logIn(action) {
    // const result = yield call(logInAPI,action.data) // call 동기(기다림) fork 비동기(안기다림)
    yield delay(1000);
    try { //요청에 성공 했다.
        console.debug('saga login')
        yield put ({
            type : 'LOG_IN_SUCCESS',
           // data: result.data // 요청한 데이터를 받는다. 서버에서
           data : action.data
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({ // put -> dispatch 라고 생각해
             type:'LOG_IN_FAILUTE',
             data: err.response.data
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
            type : 'LOG_OUT_SUCCESS',
           // data: result.data // 요청한 데이터를 받는다. 서버에서
        });
     } catch (err) { // 요청에 실패했다.
         yield put ({
             type:'LOG_OUT_FAILUTE',
             data: err.response.data
         })
     }
}


function* watchLogIn() {
    yield takeLatest('LOG_IN_REQUEST', logIn);
}

function* watchLogOut() {
    yield takeLatest('LOG_OUT_REQUEST', logOut);
}


export default function* userSaga() {
    yield all([
        fork(watchLogIn),
        fork(watchLogOut),
    ])
}