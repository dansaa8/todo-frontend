import { TaskResponse } from '../types';
import axios from 'axios';

export const getTasks = async (): Promise<TaskResponse[]> => {
    const response = await axios.get(`${import.meta.env.VITE_API_URL}/api/tasks`);
    console.log(response);
    return response.data as TaskResponse[];
}