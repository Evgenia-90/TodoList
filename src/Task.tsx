import { ChangeEvent, useCallback } from "react";
import { TaskType } from "./Todolist";
import { Checkbox, CheckboxProps, FormControlLabel, IconButton, withStyles } from "@material-ui/core";
import { green } from "@material-ui/core/colors";
import React from "react";
import { EditableSpan } from "./EditableSpan";
import { Delete } from "@material-ui/icons";

type TaskPropsType = {
    removeTask: (taskId: string, todoListId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todoListId: string) => void
    changeTaskTitle: (taskId: string, newTitle: string, todoListId: string) => void
    task: TaskType
    todoListId: string
}

export const Task = React.memo((props: TaskPropsType) => {
    const onClickHandler = () => props.removeTask(props.task.id, props.todoListId);
    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.changeTaskStatus(props.task.id, e.currentTarget.checked, props.todoListId);
    };

    const onChangeTitleHandler = useCallback((newValue: string) => {
        props.changeTaskTitle(props.task.id, newValue, props.todoListId);
    }, [props.task.id, props.changeTaskTitle, props.todoListId]);

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
        <div key={props.task.id} className={props.task.isDone ? "is-done" : ""}>
            <FormControlLabel
                control={<GreenCheckbox checked={props.task.isDone} onChange={onChangeStatusHandler} name="checkedG" />}
                label=""
            />
            <EditableSpan title={props.task.title} onChange={onChangeTitleHandler} />
            <IconButton onClick={onClickHandler}>
                <Delete />
            </IconButton>
        </div>
    );
})
