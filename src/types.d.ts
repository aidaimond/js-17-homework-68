export interface Task {
  task: string;
  done: boolean;
}

export interface TaskMutation extends Task{
  id: string;
}

export interface TasksList {
  [id: string]: Task;
}