export const initialState = {
        isLoggedIn : false,
        me: null,
        signUpdata : {},
        loginData : {},
}

export const loginAction = (data) => {
    return {
        type: 'LOG_IN',
        data,
    }
}
export const loginoutAction = (data) => {
    return {
        type: 'LOG_OUT',
        data,
    }
}

const reducer = (state = initialState ,action) => {
    switch (action.type) {
        case 'LOG_IN' :
            return {
                ...state,
                ...state.user,
                isLoggedIn:true,
                me:action.data
            }
            case 'LOG_OUT' :
                return {
                    ...state,
                    ...state.user,
                    isLoggedIn:false,
                    me:null
                    }
            default:
                 return state;
    }
}
export default reducer;