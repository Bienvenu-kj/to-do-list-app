export type TaskStatus = 'incomplete' | 'completed';

export interface Task {
  id: number;
  taskName: string;
  status: TaskStatus;
  notification?: string;
}

export type TaskInput = Omit<Task, 'id' | 'status'>;
