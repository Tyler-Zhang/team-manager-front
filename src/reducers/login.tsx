import { SessionStore } from '../types'
import { AnyAction } from 'redux'
import { LOGIN_REQUESTED, LOGIN_SUCESS } from '../constants/const'

const sessions = (state: SessionStore, action: AnyAction) => {
    switch (action.type) {
        case LOGIN_REQUESTED:
            return state
        case LOGIN_SUCESS:
            return {...state, sessionToken: action.payload.sessionToken}
        default: 
            return state
    }
}

export default sessions