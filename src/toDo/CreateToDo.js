import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";
import "./todo.css";
import error from "./ToDoError";
const CreateToDo = () => {
  const [todo, setToDo] = useState({
    heading: "",
    description: "",
    color: "",
    toDoId: "",
  });

  const [todos, setToDos] = useState([]);
  const [search, setSearch] = useState("");
  const [editTodo, setEditToDo] = useState(false);
  const [editTodoID, setEditToDoID] = useState(null);
  const [hideShoeForm, setHideShoeForm] = useState(true);
  const [inputError, setInputError] = useState({
    heading: "",
    description: "",
    color: "",
  });

  const changeEvent = (e) => {
    const { name, value } = e.target;
    if (editTodo) {
      setToDo({ ...todo, [name]: value });
    } else {
      setToDo({ ...todo, [name]: value, toDoId: new Date().getTime() });
    }
  };

  const formEvent = (e) => {
    e.preventDefault();
    setInputError(error(todo));
    if (
      (inputError.heading && inputError.description && inputError.color) ||
      Object.keys(error(todo)).length == 0
    ) {
      if (editTodo) {
        let updatedToDo = todos.map((val, i) => {
          if (val.toDoId == editTodoID) {
            return { val, ...todo };
          } else {
            return val;
          }
        });
        setToDos(updatedToDo);
        setEditToDo(false);
        setToDo({
          heading: "",
          description: "",
          color: "",
        });
      } else {
        setToDo({
          heading: "",
          description: "",
          color: "",
        });
        setToDos([...todos, todo]);
      }
    }
  };

  const toDoEdit = (id) => {
    let edited = todos.find((ele) => {
      if (ele.toDoId == id) {
        return ele;
      }
    });
    setEditToDo(true);
    setEditToDoID(id);
    setToDo(edited);
  };

  const toDoDelete = (id) => {
    setToDos((prev) =>
      prev.filter((val, i) => {
        if (i != id) {
          return val;
        }
      })
    );
  };

  const formHideShoe = () => {
    setHideShoeForm(!hideShoeForm);
  };
  const down = <img className="upDown" src="images/down.png" />;
  const up = <img className="upDown" src="images/up.png" />;

  useEffect(() => {
    document.title = "Create To Do";
    window.addEventListener("resize", () => {
      if (window.innerWidth > 600) {
        setHideShoeForm(true);
      } else {
        setHideShoeForm(false);
      }
    });
    if (window.innerWidth < 600 && hideShoeForm) {
      setHideShoeForm(false);
    }
  }, []);

  return (
    <div style={{ marginTop: 50 }} className="t_parent">
      <div className="r_shadow">
        <div className="r_width">
          <form className="todoForm" onSubmit={formEvent}>
            {hideShoeForm && (
              <div>
                <input
                  type="text"
                  name="heading"
                  className="d_block"
                  value={todo.heading}
                  placeholder="Heading"
                  onChange={changeEvent}
                />
                <span className="eRed">{inputError?.heading}</span>
                <input
                  type="text"
                  name="description"
                  className="d_block"
                  placeholder="Description"
                  value={todo.description}
                  onChange={changeEvent}
                />
                <span className="eRed">{inputError?.description}</span>
                <input
                  type="color"
                  name="color"
                  placeholder="color"
                  className="d_block"
                  value={todo.color}
                  onChange={changeEvent}
                />
                <span className="eRed">{inputError?.color}</span>
                <button className="btn">{editTodo ? "Edit" : "Create"}</button>
              </div>
            )}

            <div style={{ display: "flex", alignItems: "center" }}>
              <input
                type="text"
                name="search"
                className="d_block"
                placeholder="Search Todo Heading"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <div onClick={() => formHideShoe()} className="searchBtn">
                {hideShoeForm ? up : down}
              </div>
            </div>
          </form>
        </div>
      </div>

      <div>
        <ToDoList
          todos={todos}
          search={search}
          toDoDelete={toDoDelete}
          toDoEdit={toDoEdit}
        />
      </div>
    </div>
  );
};

export default CreateToDo;
