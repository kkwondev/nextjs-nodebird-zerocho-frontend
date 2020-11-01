import produce from 'immer';


export const initialState = {
        logInLoading:false,
        logInDone:false,
        logInError:null,
        logOutLoading:false,
        logOutDone:false,
        logOutError:null,
        followLoading:false,
        followDone:false,
        followError:null,
        unfollowLoading:false,
        unfollowDone:false,
        unfollowError:null,
        signUpLoading:false,
        signUpDone:false,
        signUpError:null,
        changeNicknameLoading:false,
        changeNicknameDone:false,
        changeNicknameError:null,
        me: null,
        signUpdata : {},
        loginData : {},
}


export const LOG_IN_REQUEST = 'LOG_IN_REQUEST'
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS'
export const LOG_IN_FAILUTE = 'LOG_IN_FAILUTE'

export const LOG_OUT_REQUEST = 'LOG_OUT_REQUEST'
export const LOG_OUT_SUCCESS = 'LOG_OUT_SUCCESS'
export const LOG_OUT_FAILUTE = 'LOG_OUT_FAILUTE'

export const SIGN_UP_SUCCESS = 'SIGN_UP_SUCCESS'
export const SIGN_UP_FAILUTE = 'SIGN_UP_FAILUTE'
export const SIGN_UP_REQUEST = 'SIGN_UP_REQUEST'

export const CHANGE_NICKNAME_SUCCESS = 'CHANGE_NICKNAME_SUCCESS'
export const CHANGE_NICKNAME_FAILUTE = 'CHANGE_NICKNAME_FAILUTE'
export const CHANGE_NICKNAME_REQUEST = 'CHANGE_NICKNAME_REQUEST'

export const FOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const FOLLOW_FAILUTE = 'FOLLOW_FAILUTE'
export const FOLLOW_REQUEST = 'FOLLOW_REQUEST'

export const UNFOLLOW_SUCCESS = 'UNFOLLOW_SUCCESS'
export const UNFOLLOW_FAILUTE = 'UNFOLLOW_FAILUTE'
export const UNFOLLOW_REQUEST = 'UNFOLLOW_REQUEST'

export const ADD_POST_TO_ME = 'ADD_POST_TO_ME'
export const REMOVE_POST_OF_ME ='REMOVE_POST_OF_ME'

export const loginRequestAction = (data) => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}
export const loginoutRequestAction = (data) => {
    return {
        type: LOG_OUT_REQUEST,
        data,
    }
}

const dummyUser = (data) => ({
    ...data,
    nickname: '강경원',
    id:1,
    Posts:[{id:1}],
    Followings:[{ nickname: '윤민이'},{nickname:'ddd'},{nickname:'123'}],
    Followers:[{ nickname: '윤민이'},{nickname:'ddd'},{nickname:'123'}]
})

const reducer = (state = initialState ,action) => {
    return produce(state, (draft) => {
        switch (action.type) {
            case FOLLOW_REQUEST :
                draft.followLoading = true;
                draft.followError = false;
                draft.followDone = false;
                break;
            case FOLLOW_SUCCESS :
                draft.followLoading = false;
                draft.followdone = true;
                draft.me.Followings.push({id:action.data})
                break;
            case FOLLOW_FAILUTE :
                draft.followLoading = false;
                draft.followdone = false;
                break;

            case UNFOLLOW_REQUEST :
                draft.unfollowLoading = true;
                draft.unfollowError = null;
                draft.unfollowDone = false;
                break;
            case UNFOLLOW_SUCCESS :
                draft.unfollowLoading = false;
                draft.unfollowDone = true;
                draft.me.Followings = draft.me.Followings.filter((v)=> v.id !== action.data)
                break;
            case UNFOLLOW_FAILUTE :
                draft.unfollowLoading = false;
                draft.unfollowdone = false;
                break;
            case LOG_IN_REQUEST :
                draft.logInLoading = true;
                draft.logInError = false;
                draft.logInDone = false;
                break;
            case LOG_IN_SUCCESS :
                draft.logInLoading = false;
                draft.logIndone = true;
                draft.me = dummyUser(action.data);
                break;
            case LOG_IN_FAILUTE :
                draft.logInLoading = false;
                draft.logIndone = false;
                break;
                case LOG_OUT_REQUEST :
                draft.logOutLoading = true;
                draft.logOutDone = false;
                draft.logOutError = null;
                break;
                case LOG_OUT_SUCCESS :
                draft.logOutLoading = false;
                draft.logOutDone = true;
                draft.me = null;
                break;
                case LOG_OUT_FAILUTE :
                draft.logOutLoading = false;
                draft.logOutDone = false;
                break;
                case SIGN_UP_REQUEST :
                draft.signUpLoading = true;
                draft.signUpDone = false;
                draft.signUpError = null;
                break;
                case SIGN_UP_SUCCESS :
                draft.signUpLoading = false;
                draft.signUpDone = true;
                break;
                case SIGN_UP_FAILUTE :
                draft.signUpLoading = false;
                draft.signUpDone = false;
                draft.signUpError = action.error;
                    break;
                case CHANGE_NICKNAME_REQUEST :
                draft.changeNicknameLoading=true;
                draft.changeNicknameDone=false;
                draft.changeNicknameError= null;
                break;

                case CHANGE_NICKNAME_SUCCESS :
                draft.changeNicknameLoading=false;
                draft.changeNicknameDone=true;    

                case CHANGE_NICKNAME_FAILUTE :
                draft.changeNicknameLoading=false;
                draft.changeNicknameDone=false;
                break;  
                case ADD_POST_TO_ME :
                draft.me.Posts.unshift({id : action.data})
                break;
                    // return {
                    //     ...state,
                    //     me : {
                    //         ...state.me,
                    //         Posts: [{id:action.data}, ...state.me.Posts]
                    //     }
                    // }
                case REMOVE_POST_OF_ME :
                draft.me.Posts = draft.me.Posts.filter((v) => v.id !== action.data)
                break;
                    // return {
                    //     ...state,
                    //     me : {
                    //         ...state.me,
                    //         Posts: state.me.Posts.filter((v) => v.id !== action.data)
                    //     }
                    // }
                default:
                     break;
        }
    })
}
export default reducer;