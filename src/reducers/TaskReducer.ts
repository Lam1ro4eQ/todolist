import {TasksType} from "../Todolist";
import {v1} from "uuid";
import {AddTodoListACType} from "./TodoListReducer";
import {FilterValuesType} from "../App";


const initialState: TasksType = {}


export const TaskReducer = (state = initialState, action: tsarACType): TasksType => {
    switch (action.type) {

        case 'ADD_TASKSLIST': {
            return {...state, [action.payload.newTodoListID]: []}
        }

        case "REMOVE_TASKS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(filtered => filtered.id != action.payload.id)
            }
        }

        case "ADD_TASK": {
            let newTitle = {id: v1(), title: action.payload.newTaskTitle, isDone: false};
            return {...state, [action.payload.todolistID]: [newTitle, ...state[action.payload.todolistID]]}
        }

        case "CHANGE_STATUS": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {
                    ...el, isDone: action.payload.isDone
                } : el)
            }
        }

        case "EDIT_TASK": {
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.newTitle
                } : el)
            }
        }

        case 'ADD_TODOLIST': {
            return {...state, [action.payload.newTodoListID]: []}
        }

        default:
            return state
    }
}

type tsarACType =
    addTasksListACType
    | removeTasksACType
    | AddTasksACType
    | ChangeStatusACType
    | EditTaskACType
    | AddTodoListACType

type addTasksListACType = ReturnType<typeof addTasksListAC>
export const addTasksListAC = (newTodoListID: string) => {
    return {
        type: "ADD_TASKSLIST",
        payload: {
            newTodoListID: newTodoListID
        }
    } as const
}

type removeTasksACType = ReturnType<typeof removeTasksAC>
export const removeTasksAC = (todolistID: string, id: string) => {
    return {
        type: "REMOVE_TASKS",
        payload: {
            todolistID: todolistID,
            id: id
        }
    } as const
}

type AddTasksACType = ReturnType<typeof addTasksAC>
export const addTasksAC = (todolistID: string, newTaskTitle: string) => {
    return {
        type: 'ADD_TASK',
        payload: {
            todolistID, newTaskTitle
        }
    } as const
}

type ChangeStatusACType = ReturnType<typeof changeStatusAC>
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: 'CHANGE_STATUS',
        payload: {
            todolistID, taskId, isDone
        }
    } as const
}

type EditTaskACType = ReturnType<typeof editTaskAC>
export const editTaskAC = (todolistID: string, taskId: string, newTitle: string) => {
    return {
        type: "EDIT_TASK",
        payload: {
            todolistID, taskId, newTitle
        }
    } as const
}