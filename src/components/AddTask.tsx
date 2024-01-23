import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTask } from '../api/taskapi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import  { AdapterDayjs }  from '@mui/x-date-pickers/AdapterDayjs';
import { Task } from '../types';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';

function AddTask() {
    const queryClient = useQueryClient();

    const { mutate } = useMutation(addTask, {
        onSuccess: () => {
            queryClient.invalidateQueries(["tasks"]);
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const [open, setOpen] = useState(false);
    const [task, setTask] = useState<Task>({
        name: '',
        deadline: null 
    });

    const handleSave = () => {
        mutate(task);
        setTask({name: '', deadline: null});
        handleClose();
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTask({...task, [event.target.name]:
        event.target.value})
    };

    const handleDateChange = (newDate: Date | null) => {
        setTask({
            ...task,
            deadline: newDate,
        });
    };
        
    const handleClickOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }
    return (
        <>
        <button onClick={handleClickOpen}>New Task</button>
        <Dialog open={open} onClose={handleClose}>
            <DialogTitle>New Task</DialogTitle>
            <DialogContent>
                <input placeholder="Name" name="name"
                value={task.name} onChange={handleChange}/>
            </DialogContent>
            <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DatePicker label="Deadline" value={task.deadline} onChange={handleDateChange}
                 format="YYYY-MM-DD"
             
                />
                </LocalizationProvider>
            </DialogContent>
            <DialogActions>
                <button onClick={handleClose}>Cancel</button>
                <button onClick={handleSave}>Save</button>
            </DialogActions>
        </Dialog>
        </>
    );
}

export default AddTask;