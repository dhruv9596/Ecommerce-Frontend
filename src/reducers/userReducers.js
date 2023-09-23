import {
    LOGIN_REQUEST,
    LOGIN_FAIL,
    LOGIN_SUCCESS,
    CLEAR_ERRORS
} from '../constants/userConstants.js';




export const userReducer = (state = { user: {} }, action) => {
    switch( action.type ){
        case LOGIN_REQUEST:
            return {
                loading :  true,
                isAuthenticated : false,
            };
        case LOGIN_SUCCESS:
            return {
                ...state,
                loading: false,
                user: action.payload,
                user : null,
                error : action.payload,
            };
        case LOGIN_FAIL:
            return {
                loading :  false,
                error : action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                error : null,
            };

        default:
            return state;
    }
};