import { TaskResponse, Task, TaskEntry } from "../types";
import axios, { AxiosRequestConfig }  from "axios";

const getAxiosConfig = (): AxiosRequestConfig => {
  const token = sessionStorage.getItem("jwt");
  
  return {
    headers: {
      'Authorization': token,
      'Content-Type': 'application/json',
    },
  };
};

const URL = `${import.meta.env.VITE_API_URL}/api/tasks`;

export const getTasks = async (): Promise<TaskResponse[]> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.get(URL, getAxiosConfig());
  return response.data as TaskResponse[];
};

export const deleteTask = async (id: number): Promise<TaskResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.delete(URL + `/${id}`, getAxiosConfig());
  return response.data;
};

export const addTask = async (task: Task): Promise<TaskResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.post(URL, task, getAxiosConfig());
  return response.data;
};

export const updateTask = async (taskEntry: TaskEntry): Promise<TaskResponse> => {
  const token = sessionStorage.getItem("jwt");
  const response = await axios.put(URL + `/${taskEntry.id}`, taskEntry.task, getAxiosConfig());
  return response.data;
};
