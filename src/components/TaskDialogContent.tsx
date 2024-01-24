import { Task } from "../types";
import DialogContent from "@mui/material/DialogContent";
import {
  DesktopDateTimePicker,
  LocalizationProvider,
} from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/de";
import TextField from "@mui/material/TextField";
import Stack from "@mui/material/Stack";

type DialogFormProps = {
  task: Task;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleDateChange: (newDate: Date | null) => void;
};

function TaskDialogContent({
  task,
  handleChange,
  handleDateChange,
}: DialogFormProps) {
  return (
    <>
      <DialogContent>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Name"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="de">
            <DesktopDateTimePicker
              label="Deadline"
              value={task.deadline}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </Stack>
      </DialogContent>
    </>
  );
}

export default TaskDialogContent;
