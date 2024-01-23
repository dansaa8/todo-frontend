import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, deleteTask } from '../api/taskapi';
import { DataGrid, GridColDef, GridCellParams } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import AddTask from './AddTask';

function TaskList() {
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();
    const { mutate } = useMutation(deleteTask, {
        onSuccess: () => {
            setOpen(true);
            queryClient.invalidateQueries({ queryKey: ['tasks'] });
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name',width: 200 },
        { field: 'deadline', headerName: 'Deadline',width: 200 },
        {
            field: 'delete',
            headerName: '',
            width: 90,
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params: GridCellParams) => (
                <button 
                onClick={() => {
                    if (window.confirm(`Are you sure you want to delete ${params.row.name}?`)) { 
                    mutate(`${import.meta.env.VITE_API_URL}/api/tasks/${params.row.id}`)}
                }}>
                    Delete
                </button>
            )
        }
    ]

    const { data, error, isSuccess } = useQuery({
        queryKey: ["tasks"],
        queryFn: getTasks
    });

    if (!isSuccess) {
        return <span>Loading...</span>
    }
    else if (error) {
        return <span>Error when fetching tasks...</span>
    }
    else {
        return (
            <>
            <AddTask />
            <DataGrid          
            rows={data}
            columns={columns}
            disableRowSelectionOnClick={true}
            getRowId={row => row.id} />
            <Snackbar 
            open={open}
            autoHideDuration={2000}
            onClose={() => setOpen(false)}
            message="Task deleted" />
            </>
            );
    }
}

export default TaskList;