import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, deleteTask } from "../api/taskapi";
import { DataGrid, GridColDef, GridCellParams } from "@mui/x-data-grid";
import Snackbar from "@mui/material/Snackbar";
import AddTask from "./AddTask";
import EditTask from "./EditTask";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

type TaskListProps = {
  logOut?: () => void;
}

function TaskList({ logOut }: TaskListProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

    const { data, error, isSuccess } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });
  
  const { mutate } = useMutation(deleteTask, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const columns: GridColDef[] = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "deadline", headerName: "Deadline", width: 200 },
    {
      field: "edit",
      headerName: "",
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <EditTask taskdata={params.row} />
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            if (
              window.confirm(
                `Are you sure you want to delete ${params.row.name}?`
              )
            ) {
              mutate(params.row.id);
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  if (!isSuccess) {
    return <span>Loading...</span>;
  } else if (error) {
    return <span>Error when fetching tasks...</span>;
  } else {
    return (
      <>
      <Stack direction="row" alignItems="center"
      justifyContent="space-between">
        <AddTask />
        <Button onClick={logOut}>Log out</Button>
      </Stack>
        <DataGrid
          rows={data}
          columns={columns}
          disableRowSelectionOnClick={true}
          getRowId={(row) => row.id}
        />
        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Task deleted"
        />
      </>
    );
  }
}

export default TaskList;
