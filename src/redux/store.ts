import {applyMiddleware, combineReducers, createStore} from 'redux';
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";
import thunkMiddleware from 'redux-thunk';
import {appReducer} from './appReducer';


export type AppRootStateType = ReturnType<typeof rootReducer>


const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer
})


export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));


// @ts-ignore
window.store = store;