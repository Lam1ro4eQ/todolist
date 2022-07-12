import {TaskType} from "../Todolist";

export const TaskReducer = (state: Array<TaskType>, action: tsarACType) => {
    switch (action.type) {
        case 'ADD_TODOLIST': {
            return state
        }
        default:
            return state
    }
}

type tsarACType = addtodoListACType

type addtodoListACType = ReturnType<typeof addtodoListAC>

const addtodoListAC = () => {
    return {
        type: "ADD_TODOLIST",
        payload: {
        }
    } as const
}