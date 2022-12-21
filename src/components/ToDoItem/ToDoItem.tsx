import React from 'react';
import {TaskMutation} from "../../types";
import {fetchTasks, removeTask, updateStatus} from "../../containers/ToDoList/toDoThunks";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import ButtonSpinner from "../Spinner/ButtonSpinner";

interface Props {
  task: TaskMutation;
}

const ToDoItem: React.FC<Props> = ({task}) => {

  const dispatch = useAppDispatch();
  const removeLoading = useAppSelector((state) => state.tasks.removeLoading);

  const checkStatus = async (e: React.ChangeEvent<HTMLInputElement>) => {
    await dispatch(updateStatus({id: task.id, task: {...task, done: e.target.checked}}));
    await dispatch(fetchTasks());
  };

  const remove = async (id: string) => {
    await dispatch(removeTask(id));
    await dispatch(fetchTasks());
  };

  return (
    <div className="input-group mb-3">
      <div className="input-group-text">
        <input
          className="form-check-input" type="checkbox"
          onChange={checkStatus} checked={task.done}
        />
      </div>
      <span className="form-control">{task.task}</span>
      <button className="btn btn-primary" onClick={() => remove(task.id)}>
        {removeLoading === 'pending' ? <ButtonSpinner/> : 'Delete'}
      </button>
    </div>
  );
};

export default ToDoItem;