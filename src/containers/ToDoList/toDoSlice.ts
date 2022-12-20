import {Task, TaskId} from "../../types";
import {createSlice} from "@reduxjs/toolkit";
import {fetchTasks} from "./toDoThunks";

export interface TasksState {
  tasks: TaskId [];
}

const initialState: TasksState = {
  tasks: [],
};


export const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      // state.fetchLoading = 'pending';
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.tasks = action.payload;
      // state.fetchLoading = 'success';
    });
    builder.addCase(fetchTasks.rejected, (state) => {
      // state.fetchLoading = 'failure';
    });
  }
});



export const tasksReducer = tasksSlice.reducer;