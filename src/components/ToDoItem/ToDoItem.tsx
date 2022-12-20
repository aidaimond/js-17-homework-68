import React from 'react';

interface Props {
  name: string;
  remove: React.MouseEventHandler;
}

const ToDoItem: React.FC<Props> = (props) => {
  return (
    <div className="input-group mb-3">
      <div className="input-group-text">
        <input className="form-check-input" type="checkbox" value=""/>
      </div>
      <h1 className="form-control">{props.name}</h1>
      <button onClick={props.remove}>Delete</button>
    </div>
  );
};

export default ToDoItem;