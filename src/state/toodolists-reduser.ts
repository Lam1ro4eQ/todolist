import {TodolistsType} from "../App";


export const todolistReducer = (state: Array<TodolistsType>, action: any) => {
    switch (action.type) {
        case 'XXX': {
            return state
        }
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.payload.id)
        }
        case 'ADD-TODOLIST': {
            return [...state, {id: action.payload.id, title: action.payload.title, filter: "all"}]
        }
        default:
            return state
    }
}

type RemoveTodolistACType = ReturnType<typeof removeTodolistAC>
export const removeTodolistAC = (todolistId1: string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: todolistId1
        }
    } as const
}

type AddTodolistACType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newIdTodolist: string, newTitle: string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            id: newIdTodolist,
            title: newTitle
        }
    } as const
}