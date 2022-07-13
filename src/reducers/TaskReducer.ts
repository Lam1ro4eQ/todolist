import {TasksType} from "../Todolist";

export const TaskReducer = (state: TasksType, action: tsarACType): TasksType => {
    switch (action.type) {
        case 'ADD_TASKSLIST': {

            return {...state, [action.payload.newTodoListID]: []}
        }
        default:
            return state
    }
}

type tsarACType = addTasksListACType

type addTasksListACType = ReturnType<typeof addTasksListAC>

export const addTasksListAC = (newTodoListID: string) => {
    return {
        type: "ADD_TASKSLIST",
        payload: {
            newTodoListID: newTodoListID
        }
    } as const
}