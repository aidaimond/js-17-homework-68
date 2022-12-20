export interface Task {
  task: string;
  done: boolean;
}

export interface TaskId {
  task: string;
  done: boolean;
  id: string;
}

export interface TasksList {
  [id: string]: Task;
}