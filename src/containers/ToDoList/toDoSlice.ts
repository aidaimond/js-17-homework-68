import {TaskMutation} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {createTask, fetchTasks, removeTask} from "./toDoThunks";

export interface TasksState {
  tasks: TaskMutation [];
  tasksLoading: 'idle' | 'pending' | 'success' | 'failure';
  formLoading: 'idle' | 'pending' | 'success' | 'failure';
  removeLoading: 'idle' | 'pending' | 'success' | 'failure';
}

const initialState: TasksState = {
  tasks: [],
  tasksLoading: 'idle',
  formLoading: 'idle',
  removeLoading: 'idle',
};

export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.tasksLoading= 'pending';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      state.tasksLoading = 'success';
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      state.tasksLoading = 'failure';
    });
    builder.addCase(createTask.pending, (state) => {
      state.formLoading = 'pending';
    });
    builder.addCase(createTask.fulfilled, (state) => {
      state.formLoading = 'success';
    });
    builder.addCase(createTask.rejected, (state) => {
      state.formLoading = 'failure';
    });
    builder.addCase(removeTask.pending, (state) => {
      state.removeLoading = 'pending';
    });
    builder.addCase(removeTask.fulfilled, (state) => {
      state.removeLoading = 'success';
    });
    builder.addCase(removeTask.rejected, (state) => {
      state.removeLoading = 'failure';
    });
  }
});

export const tasksReducer = tasksSlice.reducer;