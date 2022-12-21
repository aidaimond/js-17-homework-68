import {createAsyncThunk} from "@reduxjs/toolkit";
import {Task,TaskMutation, TasksList} from "../../types";
import axiosApi from "../../axiosApi";
import {RootState} from "../../app/store";

interface UpdateStatus {
  id: string;
  task: TaskMutation;
}

export const fetchTasks = createAsyncThunk<TaskMutation[]> (
  'tasks/fetchTasks',
  async () => {
    const tasksResponse = await axiosApi.get<TasksList | null>('/tasks.json');
    const response = tasksResponse.data;
    let newTasks: TaskMutation[] = [];
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

export const createTask = createAsyncThunk<void, Task> (
  'tasks/createTask',
  async (toDoForm) => {
    await axiosApi.post<Task>('/tasks.json', toDoForm);
  }
);

export const updateStatus = createAsyncThunk<void, UpdateStatus, {state: RootState}> (
  'tasks/updateStatus',
  async (arg, thunkAPI) => {
    await axiosApi.put ('/tasks/' + arg.id + '.json', arg.task);
  }
);

export const removeTask = createAsyncThunk<void, string> (
  'tasks/removeTask',
  async (id) => {
    await axiosApi.delete('/tasks/' + id + '.json');
  }
);