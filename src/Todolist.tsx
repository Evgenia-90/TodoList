import { Button, Checkbox, CheckboxProps, FormControlLabel, IconButton, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import { Delete } from "@material-ui/icons";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./AppWithRedux";
import { EditableSpan } from "./EditableSpan";
import { AppRootStateType } from "./state/store";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "./state/tasks-reducer";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  filter: FilterValuesType;
  removeTodoList: (todoListId: string) => void;
  changeTodoListTitle: (id: string, newTitle: string) => void
};

export function Todolist(props: PropsType) {
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
  const dispatch = useDispatch()

  const onAllClickHandler = () => props.changeFilter("all", props.id);
  const onActiveClickHandler = () => props.changeFilter("active", props.id);
  const onCompletedClickHandler = () =>
    props.changeFilter("completed", props.id);
  const removeTodoList = () => {
    props.removeTodoList(props.id);
  };

  const changeTodoListTitle = (newTitle: string) => {
    props.changeTodoListTitle(props.id, newTitle);
  };

  let allTodolistTasks = tasks;
  let tasksForTodolist = allTodolistTasks;

  if (props.filter === "active") {
    tasksForTodolist = tasksForTodolist.filter((t: { isDone: boolean; }) => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksForTodolist = tasksForTodolist.filter((t: { isDone: boolean; }) => t.isDone === true);
  }

  return (
    <div>
      <h3>
        {" "}
        <EditableSpan
          title={props.title}
          onChange={changeTodoListTitle}
        />
        <IconButton onClick={removeTodoList}>
          <Delete />
        </IconButton>
      </h3>
      <AddItemForm addItem={(title) => {
        dispatch(addTaskAC(title, props.id));
      }} />
      <div>
        {tasksForTodolist.map((t) => {
          const onClickHandler = () => dispatch(removeTaskAC(t.id, props.id));
          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(changeTaskStatusAC(t.id, e.currentTarget.checked, props.id));
          };

          const onChangeTitleHandler = (newValue: string) => {
            dispatch(changeTaskTitleAC(t.id, newValue, props.id));
          };

          const GreenCheckbox = withStyles({
            root: {
              color: green[400],
              '&$checked': {
                color: green[600],
              },
            },
            checked: {},
          })((props: CheckboxProps) => <Checkbox color="default" {...props} />);

          return (
            <div key={t.id} className={t.isDone ? "is-done" : ""}>
              <FormControlLabel
                control={<GreenCheckbox checked={t.isDone} onChange={onChangeStatusHandler} name="checkedG" />}
                label=""
              />
              <EditableSpan title={t.title} onChange={onChangeTitleHandler} />
              <IconButton onClick={onClickHandler}>
                <Delete />
              </IconButton>
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={props.filter === "all" ? "contained" : "text"}
          onClick={onAllClickHandler}
        >
          All
        </Button>
        <Button
          color={"primary"}
          variant={props.filter === "active" ? "contained" : "text"}
          onClick={onActiveClickHandler}
        >
          Active
        </Button>
        <Button
          color={"secondary"}
          variant={props.filter === "completed" ? "contained" : "text"}
          onClick={onCompletedClickHandler}
        >
          Completed
        </Button>
      </div>
    </div>
  );
}
