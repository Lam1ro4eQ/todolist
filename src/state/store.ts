import {combineReducers, legacy_createStore} from "redux";
import {TaskReducer} from "../reducers/TaskReducer";
import {TodoListReducer} from "../reducers/TodoListReducer";

// Объединяем редюсеры с помощью комбайн редюсера
// Мы задаем структуру нашего единственного объекта-состояния
const rootReducer = combineReducers({
    tasks: TaskReducer,
    todolists: TodoListReducer
})
// непосредственно создаем стор
export const store = legacy_createStore(rootReducer);
// определить автоматически тип всего объекта состояния
export type AppRootStateType = ReturnType<typeof rootReducer>
// а это чтобы можно было обращаться в консоли браузера к store  влюбой момент
//@ts-ignore
window.store = store;










// {
//     state: {
//         tasks: {},
//         todolosts: []
//     }
//     getState()
//     dispatch()
//     subscribe()
// }
