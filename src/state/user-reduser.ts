type Statetype = {
    age: number
    childrenCount: number
    name: string
}
type Actiontype = {
    type: string
    [key: string]: any
    newName?:string
}

export const userReduser = (state: Statetype, action: Actiontype) => {
    switch (action.type) {
        case "INCREMENT-AGE":
            state.age = state.age + 1;
            return state;
        case "INCREMENT-CHILDREN-COUNT":
           return {...state, childrenCount: state.childrenCount + 1}
        case "CHANGE-NAME":
            return {...state, name: action.newName}
        default:
            throw new Error("I don't understand this type")
    }
}