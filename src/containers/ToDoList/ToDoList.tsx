import React, {useEffect} from 'react';
import ToDoItem from "../../components/ToDoItem/ToDoItem";
import ToDoForm from "../../components/ToDoForm/ToDoForm";
import {useAppDispatch, useAppSelector} from "../../app/hooks";
import {fetchTasks, removeTask} from "./toDoThunks";

const ToDoList = () => {

  const dispatch = useAppDispatch();

  const tasks = useAppSelector((state) => state.tasks.tasks);

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);
  console.log(tasks);
  return (
    <>
      <ToDoForm/>
      {tasks ? tasks.map((task) => (
        <ToDoItem key={Math.random()} name={task.task} remove={() => dispatch(removeTask(task.id))}/>
      )) : null}
    </>
  );
};

export default ToDoList;