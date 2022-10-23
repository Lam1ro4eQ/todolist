import {userReduser} from "./user-reduser";
import {type} from "os";
import {useReducer} from "react";
test('user reduser should increment only age', () => {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'};

    const endState = userReduser(startState, {type: 'INCREMENT-AGE'});

    expect(endState.age).toBe(21)
    expect(endState.childrenCount).toBe(2);
})

test('user reduser should increment only childrenCount', ()=> {
    const startState = {age: 20, childrenCount: 2, name: 'Dimych'}

    const endState = userReduser(startState,{type: 'INCREMENT-CHILDREN-COUNT'})

    expect(endState.age).toBe(20)
    expect(endState.childrenCount).toBe(3)

})

test('user reduser should change name of user',() => {
    const startState = {age:20, childrenCount:2, name: 'Dimych'}
    const newName = 'Viktor';
    const endState = userReduser(startState,{type: "CHANGE-NAME", newName: newName})

    expect(endState.name).toBe('Viktor')
})

