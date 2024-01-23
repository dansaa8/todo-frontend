 export type Task = {
   name: string;
   deadline: Date | null;
 }

 export type TaskResponse = {
    name: string;
    id: number;
    deadline: Date;
    isCompleted: boolean;
    completedAt: Date | null;
 };