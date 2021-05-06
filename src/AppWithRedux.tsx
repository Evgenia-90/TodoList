import React from "react";
import "./App.css";
import { TaskType, Todolist } from "./Todolist";
import { AddItemForm } from "./AddItemForm";
import { AppBar, Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@material-ui/core";
import { Menu } from "@material-ui/icons";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "./state/todolists-reducer";
import { useDispatch, useSelector } from "react-redux";
import { AppRootStateType } from "./state/store";

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

  const dispatch = useDispatch()

  function changeFilter(value: FilterValuesType, todoListId: string) {
    const action = changeTodolistFilterAC(value, todoListId)
    dispatch(action);
  }

  let removeTodoList = (todoListId: string) => {
    const action = removeTodolistAC(todoListId)
    dispatch(action);
  }

  function changeTodoListTitle(id: string, newTitle: string) {
    const action = changeTodolistTitleAC(id, newTitle)
    dispatch(action);
  }

  function addTodoList(title: string) {
    const action = addTodolistAC(title)
    dispatch(action);
  }

 
 const todolists = useSelector<AppRootStateType, Array<TodoListType>>( state => state.todolists)


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
         
            return (<Grid item>
              <Paper style={{ padding: "10px" }}>
                <Todolist
                  key={tl.id}
                  id={tl.id}
                  title={tl.title}
                  changeFilter={changeFilter}
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

export default AppWithRedux;
