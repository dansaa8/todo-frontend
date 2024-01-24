import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogTitle from '@mui/material/DialogTitle';
import { Task, TaskResponse, TaskEntry } from '../types';
import TaskDialogContent from './TaskDialogContent';
import { updateTask } from '../api/taskapi';
import { useMutation, useQueryClient } from '@tanstack/react-query';



type FormProps = {
    taskdata: TaskResponse;
}

function EditTask({ taskdata }: FormProps) {
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState<Task>( {
        name: '',
        deadline: null
    }); 

    const queryClient = useQueryClient();

    const { mutate } = useMutation(updateTask, {
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
        },
        onError: (err) => {
            console.log(err);
        }
    });

    const handleClickOpen = () => {
        setTask({
            name: taskdata.name,
            deadline: null
        });

        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSave = () => {
        const id = taskdata.id;
        const taskEntry: TaskEntry = {task, id}
        mutate(taskEntry);
        setTask({ name: '', deadline: null});
        setOpen(false);
    }

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
        <button onClick={handleClickOpen}>
            Edit
        </button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Edit Task</DialogTitle>
            <TaskDialogContent task={task} handleChange={handleChange} handleDateChange={handleDateChange}/>
            <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default EditTask;