import {v1} from "uuid";
import {FilterValuesType, TodolistsType} from "../App";
import {addTodolistAC, changeTodolistFilterAC, removeTodolistAC, todolistReducer} from "./toodolists-reduser";

let todolistId1:string
let todolistId2:string
let startState: Array<TodolistsType> // задали переменные и в beforeEach дали значения

beforeEach(()=>{
    todolistId1 = v1();
    todolistId2 = v1();

    const startState: Array<TodolistsType> = [
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to buy", filter: "all"}
    ]
}) // сама вызывается перед каждым тестом

test('correct todolist should be removed', () => {

    // const endState = todolistReducer(startState,{type:"REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistReducer(startState, removeTodolistAC(todolistId1))

    expect(endState.length).toBe(1)
    expect(endState[0].id).toBe(todolistId2)
})

test('correct todolist should be add', () => {

    const newIdTodolist = v1()
    let newTitle = "newTodolistTitle"
    // const endState = todolistReducer(startState,{type:"REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistReducer(startState, addTodolistAC(newIdTodolist,newTitle))

    expect(endState.length).toBe(3)
    expect(endState[2].title).toBe("newTodolistTitle")
})

test('correct todolist filter', () => {

    let newFilter:FilterValuesType = "active"
    // const endState = todolistReducer(startState,{type:"REMOVE-TODOLIST", id: todolistId1})
    const endState = todolistReducer(startState, changeTodolistFilterAC(todolistId1,newFilter))

    expect(endState.length).toBe(2)
    expect(endState[0].filter).toBe("active")
})