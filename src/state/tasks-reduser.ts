import {TasksType} from "../Todolist";
import {v1} from "uuid";


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




        default:
            return state
    }
}



type ActionsTypes = removeTaskACType | addTaskACType | changeTaskStatusACType | changeEditTitleACType

type removeTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (taskID: string, todolistId: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todolistId: todolistId,
            taskID: taskID
        }
    } as const
}

type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string, todolistId: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todolistId: todolistId,
            title: title
        }
    } as const
}

type changeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (taskID: string, isDone: boolean, todolistId: string) => {
    return {
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskID:taskID,
            isDone:isDone,
            todolistId:todolistId
        }
    } as const
}

type changeEditTitleACType = ReturnType<typeof changeEditTitleAC>
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




