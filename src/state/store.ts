import {combineReducers, createStore} from "redux";
import {todolistsReducer} from "./todolistsReducer";
import {tasksReducer} from "./tasksReducer";

export type AppRootStateType = ReturnType<typeof rootReducer>

const rootReducer = combineReducers({
    todolists: todolistsReducer,
    tasks: tasksReducer
})

export const store = createStore(rootReducer);

// @ts-ignore
window.store = store;