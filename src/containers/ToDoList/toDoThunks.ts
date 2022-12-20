import {createAsyncThunk} from "@reduxjs/toolkit";
import {Task, TaskId, TasksList} from "../../types";
import axiosApi from "../../axiosApi";

export const fetchTasks = createAsyncThunk<TaskId[]>(
  'tasks/fetchTasks',
  async () => {
    const tasksResponse = await axiosApi.get<TasksList | null>('/tasks.json');
    const response = tasksResponse.data;
    let newTasks: TaskId[] = [];
    if (response) {
      newTasks = Object.keys(response).map(id => {
        const task = response[id];
        return {
          ...task,
          id,
        }
      });
    }
    return newTasks;
  },
);

export const createTask = createAsyncThunk<void, Task>(
  'tasks/createTask',
  async (toDoForm) => {
    await axiosApi.post<Task>('/tasks.json', toDoForm);
    fetchTasks();
  }
);

export const removeTask = createAsyncThunk<void, string>(
  'tasks/removeTask',
  async (id) => {
    await axiosApi.delete('/tasks/' + id + '.json');
    fetchTasks();
  }
);