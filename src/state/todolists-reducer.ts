import { title } from "process";
import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../App";
import { Todolist } from "../Todolist";

export type RemoveTodolistActionType = {
    type: "REMOVE-TODOLIST",
    id: string
}
export type AddTodolistActionType = {
    type: "ADD-TODOLIST",
    title: string
    todolistId: string
}
export type ChangeTodolistTitleActionType = {
    type: "CHANGE-TODOLIST-TITLE",
    id: string,
    title: string
}
export type ChangeTodolistFilterActionType = {
    type: "CHANGE-TODOLIST-FILTER",
    id: string,
    filter: FilterValuesType
}
type ActionsTypes = RemoveTodolistActionType | AddTodolistActionType |
                    ChangeTodolistTitleActionType | ChangeTodolistFilterActionType
// export const userReducer = (state: StateType, action: ActionType) => {
//     switch (action.type) {
//         case "BLABLA1":

//         case "YO":
    
//         default:
//             throw new Error("I don´t understand this action type")
//     }
// }

export const todolistsReducer = (state: Array<TodoListType>, action: ActionsTypes): Array<TodoListType> => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(tl => tl.id != action.id)
        }
        case "ADD-TODOLIST": {
            return [...state, {
                id: action.todolistId,
                title: action.title,
                filter: "all"
            }]
        }
        case "CHANGE-TODOLIST-TITLE": {
            const Todolist = state.find(tl => tl.id === action.id);
            if (Todolist) {
              Todolist.title = action.title;
            }
            return [...state]
        }
        case "CHANGE-TODOLIST-FILTER": {
            const Todolist = state.find(tl => tl.id === action.id);
            if (Todolist) {
              Todolist.filter = action.filter;
            }
            return [...state]
        }
        default:
            throw new Error("I don't understand this type")
    }
 }

export const removeTodolistAC = (todolistId: string): RemoveTodolistActionType => {
    return { type: 'REMOVE-TODOLIST', id: todolistId}
 }

export const addTodolistAC = (title: string): AddTodolistActionType => {
    return { type: 'ADD-TODOLIST', title, todolistId: v1()}
 }

 export const changeTodolistTitleAC = (id: string, title: string): ChangeTodolistTitleActionType => {
    return { type: 'CHANGE-TODOLIST-TITLE', id: id, title: title}
 }

 export const changeTodolistFilterAC = (id: string, filter: FilterValuesType): ChangeTodolistFilterActionType => {
    return { type: 'CHANGE-TODOLIST-FILTER',id: id, filter: filter }
 }
 