import React, { useCallback } from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";

export type FilterValuesType = "all" | "active" | "completed";
export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export type TasksStateType = {
  [key: string]: Array<TaskType>
}

function AppWithRedux() {
  console.log("App is called");

  const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)
  const todolists = useSelector<AppRootStateType, Array<TodoListType>>(state => state.todolists)
  const dispatch = useDispatch()

  const removeTask = useCallback(function (id: string, todoListId: string) {
    const action = removeTaskAC(id, todoListId);
    dispatch(action);
  }, [dispatch])

  const addTask = useCallback(function (title: string, todoListId: string) {
    const action = addTaskAC(title, todoListId);
    dispatch(action);
  }, [dispatch])

  const changeStatus = useCallback((id: string, isDone: boolean, todoListId: string) => {
    const action = changeTaskStatusAC(id, isDone, todoListId)
    dispatch(action);
  }, [dispatch])

  const changeFilter = useCallback((value: FilterValuesType, todoListId: string) => {
    const action = changeTodolistFilterAC(value, todoListId)
    dispatch(action);
  }, [dispatch])

  const changeTaskTitle = useCallback((id: string, newTitle: string, todoListId: string) => {
    const action = changeTaskTitleAC(id, newTitle, todoListId)
    dispatch(action);
  }, [dispatch])

  const removeTodoList = useCallback((todoListId: string) => {
    const action = removeTodolistAC(todoListId)
    dispatch(action);
  }, [dispatch])

  const changeTodoListTitle = useCallback((id: string, newTitle: string) => {
    const action = changeTodolistTitleAC(id, newTitle)
    dispatch(action);
  }, [dispatch])

  const addTodoList = useCallback((title: string) => {
    const action = addTodolistAC(title)
    dispatch(action);
  }, [dispatch])

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
        <Grid container style={{ padding: "20px" }}>
          <AddItemForm addItem={addTodoList} />
        </Grid>
        <Grid container spacing={3}>
          {todolists.map((tl) => {

            let allTodolistTasks = tasks[tl.id];
            let tasksForTodolist = allTodolistTasks;

            return (<Grid item>
              <Paper style={{ padding: "10px" }}>
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
                  changeTaskTitle={changeTaskTitle}
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
};

export default AppWithRedux;
