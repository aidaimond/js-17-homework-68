import React, {useState} from 'react';
import {Task} from "../../types";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {createTask, fetchTasks} from "../../containers/ToDoList/toDoThunks";
import ButtonSpinner from "../Spinner/ButtonSpinner";

const ToDoForm = () => {
  const [toDoForm, setToDoForm] = useState<Task>({
    task: '',
    done: false,
  });

  const dispatch = useAppDispatch();

  const formLoading = useAppSelector((state) => state.tasks.formLoading);

  const formChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setToDoForm(prev => ({...prev, task: value}));
  };

  const onFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await dispatch(createTask(toDoForm));
    await dispatch(fetchTasks());
    setToDoForm({
      task: '',
      done: false,
    });
  };

  return (
    <form onSubmit={onFormSubmit}>
      <div className="form-group">
        <label htmlFor="task">Task description</label>
        <input
          id="task" type="text" name="task"
          className="form-control"
          onChange={formChanged}
          value={toDoForm.task}
        />
        <button
          disabled={toDoForm.task === ''}
          type="submit" className="btn btn-primary my-4"
        >
          {formLoading === 'pending' ? <ButtonSpinner/> : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default ToDoForm;