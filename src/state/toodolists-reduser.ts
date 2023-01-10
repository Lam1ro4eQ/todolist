import {FilterValuesType, TodolistsType} from "../App";


export const todolistReducer = (state: Array<TodolistsType>, action: Actionstypes):Array<TodolistsType> => {
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

type Actionstypes = RemoveTodolistACType | AddTodolistACType | ChangeTodolistFilterACType

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

