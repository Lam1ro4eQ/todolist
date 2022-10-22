import {ActionType, div, mult, salaryReduser, StateType, sub, sum} from "./tasks";


test("salary", () => {
    // 1) тестовые данные
    const salary: number = 800
    const n: number = 200
    //2) выполнение тестируемого кода
    const result = sum(salary,n)
    //3) проверка результата
    expect(result).toBe(1000)

})
test("sub", () => {
    // 1) тестовые данные
    //2) выполнение тестируемого кода
    //3) проверка результата
    expect(sub(1200,200)).toBe(1000)
    expect(sub(0,0)).toBe(0)

})

test("div", () => {
    // 1) тестовые данные
    const salary: number = 800
    const n: number = 2
    //2) выполнение тестируемого кода
    const result = div(salary,n)
    //3) проверка результата
    expect(result).toBe(400)

})

test("mult", () => {
    // 1) тестовые данные
    const salary: number = 800
    const n: number = 2
    //2) выполнение тестируемого кода
    const result = mult(salary,n)
    //3) проверка результата
    expect(result).toBe(1600)
})

test("case SUM of salaryReduser", () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: "SUM",
        n: 200
    }
    const testAction:ActionType = {
        type: "SUB",
        n: 200
    }
    const result = salaryReduser(salary,action)
    expect(result).toBe(1000)
    expect( salaryReduser(salary,testAction)).toBe(600)
})

test("case DIV of salaryReduser", () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: "DIV",
        n: 2
    }
    const result = salaryReduser(salary,action)
    expect(result).toBe(400)
})

test("case MULT of salaryReduser", () => {
    const salary: StateType = 800
    const action: ActionType = {
        type: "MULT",
        n: 2
    }
    const result = salaryReduser(salary,action)
    expect(result).toBe(1600)
})