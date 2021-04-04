import React, { useState } from "react";
import "./App.css";
import { Todolist } from "./Todolist";
import { v1 } from "uuid";

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

function App() {

  function removeTask(id: string, todoListId: string) {
      let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((t) => t.id != id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({...tasksObj});
  }

  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({...tasksObj});
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId]; 
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({...tasksObj});
    }
  }

  function changeFilter(value: FilterValuesType, todoListId: string) {
    let todolist = todoLists.find((tl) => tl.id === todoListId);
    if (todolist) {
      todolist.filter = value;
      setTodoLists([...todoLists]);
    }
  }

  let todoListId1 = v1(); // 3ghg-333h-33jj-3kkh-ff55
  let todoListId2 = v1();

  let [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    { id: todoListId1, title: "What to learn", filter: "active" },
    { id: todoListId2, title: "What to buy", filter: "completed" },
  ]);

let removeTodoList = (todoListId: string) => {
    let filteredTodolist = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodolist);
    delete tasksObj[todoListId];
    setTasks({...tasksObj});
}

  let [tasksObj, setTasks] = useState({
    [todoListId1]: [
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "Rest API", isDone: false },
      { id: v1(), title: "GraphQL", isDone: false }
    ],
    [todoListId2]: [
      { id: v1(), title: "Book", isDone: false },
      { id: v1(), title: "Milk", isDone: true }
    ],
  });

  return (
    <div className="App">
      {todoLists.map((tl) => {
        let tasksForTodolist = tasksObj[tl.id];

        if (tl.filter === "active") {
          tasksForTodolist = tasksForTodolist.filter((t: { isDone: boolean; }) => t.isDone === false);
        }
        if (tl.filter === "completed") {
          tasksForTodolist = tasksForTodolist.filter((t: { isDone: boolean; }) => t.isDone === true);
        }
        return (
          <Todolist
            key={tl.id}
            id={tl.id}
            title={tl.title}
            tasks={tasksForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeTaskStatus={changeStatus}
            filter={tl.filter}
            removeTodoList={removeTodoList}
          />
        );
      })}
    </div>
  );
}

export default App;
