export type SigninPayload = {
  username: string;
  password: string;
};

export type SigninResponse = {
  token: string;
  message: string;
  user: {
    username: string;
  };
};

export type SignupPayload = SigninPayload;

export type SignupResponse = {
  message: string;
  user: {
    id: number;
    username: string;
  };
};

export enum TASK_STATUS {
  INCOMPLETE = 0,
  COMPLETED = 1,
}

export type GetTaskParams = {
  page?: number;
  pageSize?: number;
  isCompleted?: TASK_STATUS;
  search?: string;
};

export type Task = {
  id: number;
  userId: number;
  title: string;
  description: string;
  isCompleted: boolean;
  due_date: string;
  createdAt: string;
  updatedAt: string;
};

export type GetTaskResponse = {
  message: string;
  tasks: Task[];
  pagination: {
    currentPage: number;
    pageSize: number;
    totalTasks: number;
    totalPages: number;
  };
};
export type GetTaskCountsResponse = {
  message: string;
  counts: {
    incomplete: number;
    completed: number;
  };
};

export type AddTaskPayload = {
  title: string;
  description: string;
  due_date: string;
};

export type UpdateTaskPayload = AddTaskPayload & {
  isCompleted: string;
  id: number;
};

export type AddTaskResponse = {
  message: string;
  task: Task;
};
