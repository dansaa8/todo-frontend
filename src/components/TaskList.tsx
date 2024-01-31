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
  const [snackOpen, setSnackOpen] = useState(false);
  const queryClient = useQueryClient();

// data håller resultatet från queryn
// error innehåller något eventuellt error som uppstår under query exekvering
// isSuccess är en boolean som indikerar om queryn gick igenom eller inte
    const { data, error, isSuccess } = useQuery({ // hook som används för att fånga o hantera data från asynkron data källa.
    queryKey: ["tasks"], // Innehåller en unik identifierar för queryn. Sätts till "tasks". Används internt av react-query för att hantera & cacha queries
    queryFn: getTasks, // specifierar en function som definerar hur data hämtas för queryn.
  });

// deleteTask kallas på när mutate invokas
  const { mutate } = useMutation(deleteTask, { // Hook som används för att göra asynkrona mutationrequests(POST, PUT, DELETE osv..) o hantera state för mutationen
    onSuccess: () => { 
      setSnackOpen(true);
      queryClient.invalidateQueries({ queryKey: ["tasks"] });// Invaliderar queryn med key "tasks" vilket triggar en refetch av tasks.
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
      renderCell: (params: GridCellParams) => ( // Här defineras cell content logiken. Funktion som tar ett params argument, som innehåller info om nuvarnade cell
        <EditTask taskdata={params.row} /> // Skickar hela params.row objektet som en prop som heter taskdata till EditTask componenten.
        // EditTask tar emot hela data objektet som motsvarar raden som cellen är i.
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
        <DataGrid // tabell-liknande component för att visa data i gridformat
          rows={data} // varje objekt i data arrayen representerar en rad i griden
          columns={columns} // specificerar kolumnerna som ska visas i datagriden. 
          disableRowSelectionOnClick={true} // disablar rad selection när en rad klickas på.
          getRowId={(row) => row.id} // Denna prop specificerar hur en unik identiferare för varje rad i DataGrid.
        />
        <Snackbar
          open={snackOpen}
          autoHideDuration={2000}
          onClose={() => setSnackOpen(false)}
          message="Task deleted"
        />
      </>
    );
  }
}

export default TaskList;
