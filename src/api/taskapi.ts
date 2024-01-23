import { TaskResponse, Task } from '../types';
import axios from 'axios';

export const getTasks = async (): Promise<TaskResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
    console.log(response);
    return response.data as TaskResponse[];
}

export const deleteTask = async (link: string): Promise<TaskResponse> => {
    const response = await axios.delete(link);
    return response.data;
}

export const addTask = async (task: Task): Promise<TaskResponse> => {
    const response = await axios.post(`${import.meta.env.VITE_API_URL}/api/tasks`, 
    task, { 
        headers: {
            'ContentType': 'application/json',
        },
    });
    return response.data;
}