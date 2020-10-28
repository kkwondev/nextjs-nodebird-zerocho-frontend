export const initialState = {
        isLoggingIn : false, // 로그인 시도중
        isLoggedIn : false,
        isLoggingOut :false, // 로그아웃 시도중
        me: null,
        signUpdata : {},
        loginData : {},
}

export const loginRequestAction = (data) => {
    return {
        type: 'LOG_IN_REQUEST',
        data,
    }
}
export const loginoutRequestAction = (data) => {
    return {
        type: 'LOG_OUT_REQUEST',
        data,
    }
}

const reducer = (state = initialState ,action) => {
    switch (action.type) {
        case 'LOG_IN_REQUEST' :
            console.debug('reducer login')
            return {
                ...state,
                isLoggingIn:true,
            }
            case 'LOG_IN_SUCCESS' :
                return {
                    ...state,
                    isLoggingIn:false,
                    isLoggedIn:true,
                    me:{...action.data,nickname: '경원이'},
                }
            case 'LOG_IN_FAILUTE' :
                return {
                    ...state,
                    isLoggingIn:false,
                    isLoggedIn:false,
                }
            case 'LOG_OUT_REQUEST' :
                return {
                    ...state,
                    isLoggingOut:true,
                    }
            case 'LOG_OUT_SUCCESS' :
                return {
                    ...state,
                    isLoggingOut:false,
                    isLoggedIn:false,
                    me:null
                    }
            case 'LOG_OUT_FAILUTES' :
                return {
                    ...state,
                    isLoggingOut:false,
                    }
            default:
                 return state;
    }
}
export default reducer;