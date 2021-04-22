import React, { useState } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { title } from "process";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import classes from "*.module.css";
import { Menu } from "@material-ui/icons";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksStateType = {
  [key: string]: Array<TaskType>
}

function App() {

  function removeTask(id: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter((t) => t.id != id);
    tasksObj[todoListId] = filteredTasks;
    setTasks({ ...tasksObj });
  }

  function addTask(title: string, todoListId: string) {
    let task = { id: v1(), title: title, isDone: false };
    let tasks = tasksObj[todoListId];
    let newTasks = [task, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasks({ ...tasksObj });
  }

  function changeStatus(taskId: string, isDone: boolean, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === taskId);
    if (task) {
      task.isDone = isDone;
      setTasks({ ...tasksObj });
    }
  }

  function changeTaskTitle(id: string, newTitle: string, todoListId: string) {
    let tasks = tasksObj[todoListId];
    let task = tasks.find((t) => t.id === id);
    if (task) {
      task.title = newTitle;
      setTasks({ ...tasksObj });
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
    { id: todoListId1, title: "What to learn", filter: "all" },
    { id: todoListId2, title: "What to buy", filter: "all" },
  ]);

  let removeTodoList = (todoListId: string) => {
    let filteredTodolist = todoLists.filter(tl => tl.id !== todoListId)
    setTodoLists(filteredTodolist);
    delete tasksObj[todoListId];
    setTasks({ ...tasksObj });
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    const Todolist = todoLists.find(tl => tl.id === id);
    if (Todolist) {
      Todolist.title = newTitle;
      setTodoLists([...todoLists])
    }
  }

  let [tasksObj, setTasks] = useState<TasksStateType>({
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

  function addTodoList(title: string) {
    let todolist: TodoListType = {
      id: v1(),
      filter: "all",
      title: title
    };
    setTodoLists([todolist, ...todoLists]);
    setTasks({
      ...tasksObj,
      [todolist.id]: []
    })
  }
  return (
    <div className="App">
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <Menu />
          </IconButton>
          <Typography variant="h6">
            News
    </Typography>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
      <Container fixed>
        <Grid container style={{padding: "20px"}}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todoLists.map((tl) => {
            let tasksForTodolist = tasksObj[tl.id];

            if (tl.filter === "active") {
              tasksForTodolist = tasksForTodolist.filter((t: { isDone: boolean; }) => t.isDone === false);
            }
            if (tl.filter === "completed") {
              tasksForTodolist = tasksForTodolist.filter((t: { isDone: boolean; }) => t.isDone === true);
            }
            return (<Grid item>
              <Paper style={{padding: "10px"}}>
                <Todolist
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeStatus}
                  changeTaskTitle={changeTaskTitle}
                  filter={tl.filter}
                  removeTodoList={removeTodoList}
                  changeTodoListTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
            );
          })}
        </Grid>
      </Container>
    </div>
  );
}

export default App;
