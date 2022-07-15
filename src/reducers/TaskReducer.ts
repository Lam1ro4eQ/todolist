import {TasksType} from "../Todolist";
import {v1} from "uuid";

export const TaskReducer = (state: TasksType, action: tsarACType): TasksType => {
    switch (action.type) {

        case 'ADD_TASKSLIST': {
            return {...state, [action.payload.newTodoListID]: []}
        }

        case "REMOVE_TASKS": {
            // setTasks({...tasks, [todolistID]: tasks[todolistID].filter(filtered => filtered.id != id)});
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].filter(filtered => filtered.id != action.payload.id)
            }
        }

        case "ADD_TASK": {
            let newTitle = {id: v1(), title: action.payload.newTaskTitle, isDone: false};
            // setTasks({...tasks, [todolistID]: [newTitle, ...tasks[todolistID]]})
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

        default:
            return state
    }
}

type tsarACType = addTasksListACType | removeTasksACType | AddTasksACType | ChangeStatusACType

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