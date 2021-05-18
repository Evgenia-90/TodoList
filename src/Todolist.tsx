import { Button, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AddItemForm } from "./AddItemForm";
import { FilterValuesType } from "./AppWithRedux";
import { EditableSpan } from "./EditableSpan";
import { AppRootStateType } from "./state/store";
import { Task } from "./Task";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

export type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>
  changeFilter: (value: FilterValuesType, todoListId: string) => void
  addTask: (title: string, todoListId: string) => void
  changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
  changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
  removeTask: (taskId: string, todoListId: string) => void
  removeTodoList: (id: string) => void;
  filter: FilterValuesType;
  changeTodoListTitle: (id: string, title: string) => void
};

export const Todolist = React.memo(function (props: PropsType) {
  console.log("Todolist is called");
  const addTask = useCallback((title: string) => {
    props.addTask(title, props.id);
  }, [props.addTask, props.id])
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.id])
  const dispatch = useDispatch()

  const onAllClickHandler = useCallback(() => props.changeFilter("all", props.id), [props.changeFilter, props.id]);
  const onActiveClickHandler = useCallback(() => props.changeFilter("active", props.id), [props.changeFilter, props.id]);
  const onCompletedClickHandler = useCallback(() => props.changeFilter("completed", props.id), [props.changeFilter, props.id]);

  const removeTodoList = useCallback(() => {
    props.removeTodoList(props.id);
  }, [props.removeTodoList, props.id]);

  const changeTodoListTitle = useCallback((title: string) => {
    props.changeTodoListTitle(props.id, title);
  }, [props.changeTodoListTitle, props.id]);

  let tasksForTodolist = props.tasks;

  if (props.filter === "active") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === false);
  }
  if (props.filter === "completed") {
    tasksForTodolist = props.tasks.filter(t => t.isDone === true);
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
      <AddItemForm addItem={addTask} />
      <div>
        {
          props.tasks.map(t => <Task
            task={t}
            changeTaskStatus={props.changeTaskStatus}
            changeTaskTitle={props.changeTaskTitle}
            removeTask={props.removeTask}
            todoListId={props.id}
            key={t.id}
          />)}
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
})

