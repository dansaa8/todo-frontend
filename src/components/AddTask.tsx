import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addTask } from "../api/taskapi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";
import { Task } from "../types";
import TaskDialogContent from "./TaskDialogContent";
import Button from "@mui/material/Button";

function AddTask() {
  const [open, setOpen] = useState(false);
  const [task, setTask] = useState<Task>({
    name: "",
    deadline: null,
  });

  const queryClient = useQueryClient();

  const { mutate } = useMutation(addTask, {
    onSuccess: () => {
      queryClient.invalidateQueries(["tasks"]);
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleSave = () => {
    mutate(task);
    setTask({ name: "", deadline: null });
    handleClose();
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
      <Button onClick={handleClickOpen}>New Task</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>New Task</DialogTitle>
        <TaskDialogContent
          task={task}
          handleChange={handleChange}
          handleDateChange={handleDateChange}
        ></TaskDialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={handleSave}
            disabled={task.deadline === null || task.name.trim() === ""}
          >
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddTask;
