 export type Task = {
   name: string;
   deadline: Date | null;
 }

 export type TaskEntry = {
  task: Task,
  id: number
 }

 export type TaskResponse = {
    name: string;
    id: number;
    deadline: Date;
    isCompleted: boolean;
    completedAt: Date | null;
 };