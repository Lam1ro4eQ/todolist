import {FilterValuesType, TodolistsType} from "../App";


export const TodoListReducer = (state: Array<TodolistsType>, action: tsarACType): Array<TodolistsType> => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            const newTodoList = {
                id: action.payload.newTodoListID,
                title: action.payload.titleTodo,
                filter: 'all' as FilterValuesType
            }
            return [...state, newTodoList]
        }
        default:
            return state
    }
}

type tsarACType = addTodoListACType

type addTodoListACType = ReturnType<typeof addTodoListAC>

export const addTodoListAC = (titleTodo: string, newTodoListID: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            titleTodo: titleTodo,
            newTodoListID: newTodoListID
        }
    } as const
}