import {all,fork} from 'redux-saga/effects';
import postSaga from './post';
import userSaga from './user';
import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3065/'



export default function* rootSaga() {
    yield all([
        fork(postSaga),
        fork(userSaga),
    ])
}