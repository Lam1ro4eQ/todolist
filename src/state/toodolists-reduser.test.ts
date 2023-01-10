import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {addTodolistAC, changeTodolistFilterAC, removeTodolistAC, todolistReducer} from "./toodolists-reduser";

test('correct todolist should be removed', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    // const endState = todolistReducer(startState,{type:"REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be add', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    const newIdTodolist = v1()
    let newTitle = "newTodolistTitle"
    // const endState = todolistReducer(startState,{type:"REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistReducer(startState, addTodolistAC(newIdTodolist,newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("newTodolistTitle")
})

test('correct todolist filter', () => {
    let todolistId1 = v1();
    let todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
    let newFilter:FilterValuesType = "active"
    // const endState = todolistReducer(startState,{type:"REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1,newFilter))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("active")
})