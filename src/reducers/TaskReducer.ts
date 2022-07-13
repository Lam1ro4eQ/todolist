import {TasksType} from "../Todolist";

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

        default:
            return state
    }
}

type tsarACType = addTasksListACType | removeTasksACType

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