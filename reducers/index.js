import {HYDRATE} from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

const rootReducer = (state,action) => {
    switch(action.type) {
        case HYDRATE:
        console.debug('HYDRATE',action);
        return action.payload;
        default: {
            const combineReducer = combineReducers({
                user,
                post,
            });
            return combineReducer(state,action);
        }

    }
}

export default rootReducer;
