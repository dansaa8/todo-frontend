import { useQuery } from '@tanstack/react-query';
import { TaskResponse } from "../types";
import { getTasks } from '../api/taskapi';

function TaskList() {

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
            <table>
                <tbody>
                    {
                        data.map((task: TaskResponse) => 
                        <tr key={task.id}>
                            <td>{task.name}</td>
                        </tr>)
                    }
                </tbody>
            </table>
            );
    }
}

export default TaskList;