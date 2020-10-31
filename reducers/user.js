export const initialState = {
        logInLoading:false,
        logInDone:false,
        logInError:null,
        logOutLoading:false,
        logOutDone:false,
        logOutError:null,
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

export const UNFOLLOW_SUCCESS = 'FOLLOW_SUCCESS'
export const UNFOLLOW_FAILUTE = 'FOLLOW_FAILUTE'
export const UNFOLLOW_REQUEST = 'FOLLOW_REQUEST'

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
    switch (action.type) {
        case LOG_IN_REQUEST :
            return {
                ...state,
                logInLoading:true,
                logInError:false,
                logInDone:false
            }
            case LOG_IN_SUCCESS :
                return {
                    ...state,
                    logInLoading:false,
                    logIndone:true,
                    me: dummyUser(action.data)
                }
            case LOG_IN_FAILUTE :
                return {
                    ...state,
                    logInLoading:false,
                    logIndone:false,
                }
            case LOG_OUT_REQUEST :
                return {
                    ...state,
                    logOutLoading:true,
                    logOutDone:false,
                    logOutError:null
                    }
            case LOG_OUT_SUCCESS :
                return {
                    ...state,
                    logOutLoading:false,
                    logOutDone:true,
                    me:null
                    }
            case LOG_OUT_FAILUTE :
                return {
                    ...state,
                    logOutLoading:false,
                    logOutDone:false,
                    }
            case SIGN_UP_REQUEST :
                return {
                    ...state,
                    signUpLoading:true,
                    signUpDone:false,
                    signupError:null
                    }
            case SIGN_UP_SUCCESS :
                return {
                    ...state,
                    signUpLoading:false,
                    signuUpDone:true,

                    }
            case SIGN_UP_FAILUTE :
                return {
                    ...state,
                    signUpLoading:false,
                    signUpDone:false,
                    }
            case CHANGE_NICKNAME_REQUEST :
                return {
                    ...state,
                    changeNicknameLoading:true,
                    changeNicknameDone:false,
                    changeNicknameError:null
                    }
            case CHANGE_NICKNAME_SUCCESS :
                return {
                    ...state,
                    changeNicknameLoading:false,
                    changeNicknameDone:true,

                    }
            case CHANGE_NICKNAME_FAILUTE :
                return {
                    ...state,
                    changeNicknameLoading:false,
                    changeNicknameDone:false,
                    }
            case ADD_POST_TO_ME :
                return {
                    ...state,
                    me : {
                        ...state.me,
                        Posts: [{id:action.data}, ...state.me.Posts]
                    }
                }
            case REMOVE_POST_OF_ME :
                return {
                    ...state,
                    me : {
                        ...state.me,
                        Posts: state.me.Posts.filter((v) => v.id !== action.data)
                    }
                }
            default:
                 return state;
    }
}
export default reducer;