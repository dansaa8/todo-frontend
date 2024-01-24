import { Task } from '../types';
import DialogContent from "@mui/material/DialogContent";
import { DesktopDateTimePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import 'dayjs/locale/de';



type DialogFormProps = {
    task: Task;
    handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    handleDateChange: (newDate: Date | null) => void;
}

function TaskDialogContent({ task, handleChange, handleDateChange }: DialogFormProps) {
    return (
        <>
         <DialogContent>
          <input
            placeholder="Name"
            name="name"
            value={task.name}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='de'>
            <DesktopDateTimePicker
              label="Deadline"
              value={task.deadline}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
        </DialogContent>
        </>
    );
}

export default TaskDialogContent;

