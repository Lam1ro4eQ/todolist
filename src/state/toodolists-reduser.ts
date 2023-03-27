import {FilterValuesType, TodolistsType} from "../App";
import {v1} from "uuid";

const initialState: Array<TodolistsType> = []

export const todolistReducer = (state = initialState, action: Actionstypes):Array<TodolistsType> => {
    switch (action.type) {
        // case 'XXX': {
        //     return state
        // }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: "all"}]
        }
        case 'CHANGE-TODOLIST-FILTER': {

            // return  (state.find(el => (el.id === action.payload.id)? el.filter = action.payload.filter : state ))
            return state.map(el => el.id == action.payload.id ? {...el, filter: action.payload.filter} : el)

        }
        default:
            return state
    }
}

export type Actionstypes = RemoveTodolistACType | AddTodolistACType | ChangeTodolistFilterACType

export type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: todolistId1
        }
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = ( newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            id: v1(),
            title: newTitle
        }
    } as const
}

type ChangeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: "CHANGE-TODOLIST-FILTER",
        payload: {
            id: todolistId,
            filter: newFilter
        }
    } as const
}

