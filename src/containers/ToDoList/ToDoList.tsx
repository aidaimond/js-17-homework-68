import React, {useEffect} from 'react';
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import ToDoForm from "../../components/ToDoForm/ToDoForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTasks} from "./toDoThunks";
import Spinner from "../../components/Spinner/Spinner";

const ToDoList = () => {

  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks);
  const tasksLoading = useAppSelector((state) => state.tasks.tasksLoading);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <>
      <ToDoForm/>
      {tasksLoading === 'pending' ? <Spinner/> :
        tasks ? tasks.map((task) => (
            <ToDoItem
              key={Math.random()}
              task={task}
            />
          )) : null}
    </>
  );
};

export default ToDoList;