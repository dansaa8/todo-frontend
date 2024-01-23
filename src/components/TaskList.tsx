import { useQuery } from '@tanstack/react-query';
import { TaskResponse } from "../types";
import { getTasks } from '../api/taskapi';
import { DataGrid, GridColDef } from '@mui/x-data-grid';

function TaskList() {

    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name',width: 200 },
        { field: 'deadline', headerName: 'Deadline',width: 200 },
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
            <DataGrid          
            rows={data}
            columns={columns}
            getRowId={row => row.id}>
       
            </DataGrid>
            );
    }
}

export default TaskList;