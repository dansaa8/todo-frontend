 export type TaskResponse = {
    name: string;
    id: number;
    deadline: Date;
    isCompleted: boolean;
    completedAt: Date | null;
 };