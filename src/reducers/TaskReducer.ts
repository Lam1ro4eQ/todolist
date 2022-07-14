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

        default:
            return state
    }
}

type tsarACType = addTasksListACType | removeTasksACType | AddTasksACType

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