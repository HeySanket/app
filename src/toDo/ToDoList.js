import React from "react";
import { UpperCase } from "../componentes/reuseComp/UpperCase";

const ToDoList = ({ todos, search, toDoEdit, toDoDelete }) => {
  return (
    <div className="l_parent">
      {Array.isArray(todos) &&
        todos
          .filter((val, i) => {
            if (search == "") {
              return val;
            } else if (
              val.heading.toLowerCase().includes(search.toLowerCase())
            ) {
              return val;
            }
          })
          .map((mapVal, i) => {
            return (
              <div
                style={{ backgroundColor: mapVal.color }}
                className="card"
                key={i}
              >
                <h2>{UpperCase(mapVal?.heading)}</h2>
                <p>{mapVal?.description}</p>
                <button
                  className="editBtn"
                  onClick={() => toDoEdit(mapVal.toDoId)}
                >
                  Edit
                </button>
                <button className="deleteBtn" onClick={() => toDoDelete(i)}>
                  Delete
                </button>
              </div>
            );
          })}
    </div>
  );
};

export default ToDoList;
