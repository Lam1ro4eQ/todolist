import {TasksType} from "../Todolist";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./toodolists-reduser";


export const tasksReducer = (state: TasksType, action: ActionsTypes): TasksType => {

    switch (action.type) {

        case 'REMOVE-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .filter(f => f.id !== action.payload.taskID)
            }
        }

        case 'ADD-TASK': {
            return {
                ...state,
                [action.payload.todolistId]: [{
                    id: v1(),
                    title: action.payload.title,
                    isDone: false
                }, ...state[action.payload.todolistId]]

            }
        }

        case 'CHANGE-TASK-STATUS': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(m => m.id === action.payload.taskID
                        ? {...m, isDone: action.payload.isDone}
                        : m)
            }
        }

        case 'CHANGE-TASK-TITLE': {
            return {
                ...state,
                [action.payload.todolistId]: state[action.payload.todolistId]
                    .map(m => m.id === action.payload.taskID
                        ? {...m, title: action.payload.title}
                        : m)
            }
        }

        case 'ADD-TODOLIST': {
            return {
                ...state,
                [action.payload.id]: []
            }
        }

        case 'REMOVE-TODOLIST': {
            let copyState = {...state}
            delete copyState[action.payload.id]
            return copyState
            // const {[action.id]:[], ...rest} = {...state}
            // return rest  удаление способом деструктуризации
        }

        default:
            return state
    }
}


type ActionsTypes = RemoveTaskACType
    | AddTaskACType
    | ChangeTaskStatusACType
    | ChangeEditTitleACType
    | AddTodolistACType
    | RemoveTodolistACType

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId: todolistId,
            taskID: taskID
        }
    } as const
}

type AddTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}

type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskID: taskID,
            isDone: isDone,
            todolistId: todolistId
        }
    } as const
}

type ChangeEditTitleACType = ReturnType<typeof changeEditTitleAC>
export const changeEditTitleAC = (title: string, taskID: string, todolistId: string) => {
    return {
        type: "CHANGE-TASK-TITLE",
        payload: {
            title,
            taskID,
            todolistId
        }
    } as const
}




