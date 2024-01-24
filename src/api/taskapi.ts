import { TaskResponse, Task, TaskEntry } from '../types';
import axios from 'axios';

const URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

export const getTasks = async (): Promise<TaskResponse[]> => {
    const response = await axios.get(URL);
    console.log(response);
    return response.data as TaskResponse[];
}

export const deleteTask = async (id: number): Promise<TaskResponse> => {
    const response = await axios.delete(URL + `/${id}`);
    return response.data;
}

export const addTask = async (task: Task): Promise<TaskResponse> => {
    const response = await axios.post(URL, 
    task, { 
        headers: {
            'ContentType': 'application/json',
        },
    });
    return response.data;
}

export const updateTask = async (taskEntry: TaskEntry): Promise<TaskResponse> => {
    const response = await axios.put(URL + `/${taskEntry.id}`, taskEntry.task, {
        headers: {
            'Content-Type': 'application/json'
        },
    });
    return response.data;
}