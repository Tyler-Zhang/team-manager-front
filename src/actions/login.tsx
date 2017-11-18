import { LOGIN_REQUESTED, LOGIN_SUCESS, LOGIN_ERROR }  from '../constants/const'
import { LoginResponse } from '../types';

export const fetchLoginRequest = () => ({
    type: LOGIN_REQUESTED
})

export const fetchLoginSuccess = (payload: LoginResponse) => ({
    type: LOGIN_SUCESS,
    payload
})

export const fetchLoginError = () => ({
    type: LOGIN_ERROR
})