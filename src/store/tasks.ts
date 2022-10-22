export const sum = (salary: number, n: number) => {
    return salary + n
}
export const sub = (salary: number, n: number) => {
    return salary - n
}
export const div = (salary: number, n: number) => {
    return salary / n
}
export const mult = (salary: number, n: number) => {
    return salary * n
}

export type ActionType = {
    type: "SUM" | "SUB" | "SUB" | "DIV" | "MULT"
    n: number
}
export type StateType = number

export const salaryReduser = (state: number, action: ActionType): StateType => {
    switch (action.type) {
        case "SUM":
            return state + action.n
        case "SUB":
            return state - action.n
        case "DIV":
            return state / action.n
        case "MULT":
            return state * action.n
        default:
            return state
    }
}