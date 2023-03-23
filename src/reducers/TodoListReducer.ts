import {FilterValuesType, TodolistsType} from "../App";

const initialState: Array<TodolistsType> = []

export const TodoListReducer = (state = initialState, action: TsarACType): Array<TodolistsType> => {
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

        case 'EDIT_TODOLIST_ITEM': {
            return  state.map(el => el.id === action.payload.todolistID ? {...el, title: action.payload.newTitle} : el)
        }

        case 'DELETE_TODO_TITLE': {
            return state.filter(f => f.id != action.payload.todolistID)
        }

        default:
            return state
    }
}

type TsarACType = AddTodoListACType | ChangeFilterACType | EditTotolistTitleACType | DeleteTotolistTitleACType

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

type EditTotolistTitleACType = ReturnType<typeof editTotolistTitleAC>
export const editTotolistTitleAC = (todolistID: string, newTitle: string) => {
    return {
        type: "EDIT_TODOLIST_ITEM",
        payload: {
            todolistID, newTitle
        }
    } as const
}

type DeleteTotolistTitleACType = ReturnType<typeof deleteTotolistTitleAC>
export const deleteTotolistTitleAC = (todolistID: string) => {
    return {
        type: "DELETE_TODO_TITLE",
        payload: {
            todolistID
        }
    } as const
}