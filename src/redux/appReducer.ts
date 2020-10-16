import {RequestStatusType} from '../entities';

type InitialStateType = {
    status: RequestStatusType
    error: string | null
}

const initialState: InitialStateType = {
    status: 'idle',
    error: null
}

export const appReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'APP/SET_STATUS':
            return {...state, status: action.status}
        case 'APP/SET_ERROR':
            return {...state, error: action.error}
        default:
            return state
    }
}

// Action Creators
export const setStatusAC = (status: RequestStatusType) => ({type: 'APP/SET_STATUS', status} as const);
export const setErrorAC = (error: string | null) => ({type: 'APP/SET_ERROR', error} as const);

// Types
// type InitialStateType = typeof initialState

type ActionsType = ReturnType<typeof setStatusAC> | ReturnType<typeof setErrorAC>