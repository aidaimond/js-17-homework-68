import React, {useState} from 'react';
import {Task} from "../../types";
import {useAppDispatch} from "../../app/hooks";
import {createTask} from "../../containers/ToDoList/toDoThunks";

const ToDoForm = () => {
  const [toDoForm, setToDoForm] = useState<Task>({
    task: '',
    done: false,
  });

  const dispatch = useAppDispatch();

  const formChanged = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setToDoForm(prev => ({...prev, task: value}));
  };

  const onFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(createTask(toDoForm));
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
          Add
        </button>
      </div>
    </form>
  );
};

export default ToDoForm;