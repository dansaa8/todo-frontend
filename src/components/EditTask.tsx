import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Task, TaskResponse, TaskEntry } from "../types";
import TaskDialogContent from "./TaskDialogContent";
import { updateTask } from "../api/taskapi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";

type FormProps = {
  taskdata: TaskResponse;
};

function EditTask({ taskdata }: FormProps) {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<Task>({
    name: "",
    deadline: null,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(updateTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClickOpen = () => {
    setTask({
      name: taskdata.name,
      deadline: null,
    });

    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSave = () => {
    const id = taskdata.id;
    const taskEntry: TaskEntry = { task, id };
    mutate(taskEntry);
    setTask({ name: "", deadline: null });
    setOpen(false);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleDateChange = (newDate: Date | null) => {
    setTask({
      ...task,
      deadline: newDate,
    });
  };

  return (
    <>
      <Tooltip title="Edit task">
        <IconButton aria-label="edit" size="small" onClick={handleClickOpen}>
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Task</DialogTitle>
        <TaskDialogContent
          task={task}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        />
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default EditTask;
