import {FilterValuesType, TodolistsType} from "../App";


export const TodoListReducer = (state: Array<TodolistsType>, action: TsarACType): Array<TodolistsType> => {
    switch (action.type) {

        case 'ADD_TODOLIST': {
            const newTodoList = {
                id: action.payload.newTodoListID,
                title: action.payload.titleTodo,
                filter: 'all' as FilterValuesType
            }
            return [...state, newTodoList]
        }

        case 'CHANGE_FILTER': {
            return state.map(el => el.id === action.payload.ChangeTodolistID ? {...el, filter: action.payload.value} : el)
        }

        default:
            return state
    }
}

type TsarACType = AddTodoListACType | ChangeFilterACType

type AddTodoListACType = ReturnType<typeof addTodoListAC>
export const addTodoListAC = (titleTodo: string, newTodoListID: string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            titleTodo: titleTodo,
            newTodoListID: newTodoListID
        }
    } as const
}

type ChangeFilterACType = ReturnType<typeof changeFilterAC>
export const changeFilterAC = (ChangeTodolistID: string, value: FilterValuesType) => {
    return {
        type: "CHANGE_FILTER",
        payload: {
            ChangeTodolistID: ChangeTodolistID,
            value: value
        }
    } as const
}