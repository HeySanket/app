import React, { useEffect, useState } from "react";
import ToDoList from "./ToDoList";
import "./todo.css";
import axiox from "axios";
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
  const [btnDisable, setBtnDisable] = useState(true);
  const [validation, setSalidation] = useState({
    heading: false,
    description: false,
    color: false,
  });
  const [errorMsg, setErrorMsg] = useState({
    heading: "",
    description: "",
    color: "",
  });

  const changeEvent = (e) => {
    const { name, value } = e.target;
    checkError(name, value)
    if (editTodo) {
      setToDo({ ...todo, [name]: value });
    } else {
      setToDo({ ...todo, [name]: value });
    }
  };

  const rerorMsgA = (name, value, text) => {
    setSalidation({ ...validation, [name]: text });
    setErrorMsg({ ...errorMsg, [name]: text });
  };

  const checkError = (name, value) => {
    switch (name) {
      case "heading":
        {
          if (value.length == "") {
            rerorMsgA(name, true, "it should not empty");
            setBtnDisable(true);
          } else if (value.length < 3) {
            rerorMsgA(name, true, "required more then 3");
            setBtnDisable(true);
          } else {
            setBtnDisable(false);
            rerorMsgA(name, false, "");
          }
        }
        break;
      case "description":
        {
          if (value.length == "") {
            rerorMsgA(name, true, "it should not empty");
            setBtnDisable(true);
          } else if (value.length < 10) {
            rerorMsgA(name, true, "required more then 10");
            setBtnDisable(true);
          } else {
            rerorMsgA(name, false, "");
            setBtnDisable(false);
          }
        }
        break;
      case "color":
        {
          if (value.length == "") {
            rerorMsgA(name, true, "it should not empty");
          } else {
            rerorMsgA(name, false, "");
          }
        }
        break;
    }
  };

  const callApi = async () => {
    const res = await axiox.get(`${process.env.REACT_APP_TODO_API_KEY}`);
    setToDos(res.data.data);
  };

  const formEvent = (e) => {
    e.preventDefault();

    if (editTodo) {
      // let updatedToDo = todos.map((val, i) => {
      //   if (val.toDoId == editTodoID) {
      //     return { val, ...todo };
      //   } else {
      //     return val;
      //   }
      // });
      // setToDos(updatedToDo);
      // setEditToDo(false);
      // setToDo({
      //   heading: "",
      //   description: "",
      //   color: "",
      // });
      axiox
        .put(`${process.env.REACT_APP_TODO_API_KEY}${editTodoID}`, todo)
        .then((res) => {
          console.log(res);
          callApi();
        })
        .catch((error) => {
          console.log(error);
        });
      setToDo({
        heading: "",
        description: "",
        color: "",
      });
      setEditToDo(false);
    } else {
      // setToDos([...todos, todo]);
      axiox
        .post(`${process.env.REACT_APP_TODO_API_KEY}`, todo)
        .then((res) => {
          console.log(res);
          callApi();
        })
        .catch((error) => {
          // console.log(error);
          alert("All field required");
        });
      setToDo({
        heading: "",
        description: "",
        color: "",
      });
    }
  };

  const toDoEdit = (id) => {
    let edited = todos.find((ele) => {
      if (ele._id == id) {
        return ele;
      }
    });
    setEditToDo(true);
    setEditToDoID(id);
    setToDo(edited);
  };

  const toDoDelete = (id) => {
    // setToDos((prev) =>
    //   prev.filter((val, i) => {
    //     if (i != id) {
    //       return val;
    //     }
    //   })
    // );

    axiox
      .delete(`${process.env.REACT_APP_TODO_API_KEY}${id}`)
      .then((res) => {
        console.log(res);
        callApi();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const formHideShoe = () => {
    setHideShoeForm(!hideShoeForm);
  };
  const down = <img className="upDown" src="images/down.png" />;
  const up = <img className="upDown" src="images/up.png" />;

  useEffect(() => {
    callApi();
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
                {validation.heading && (
                  <span className="error">{errorMsg.heading}</span>
                )}
                <input
                  type="text"
                  name="description"
                  className="d_block"
                  placeholder="Description"
                  value={todo.description}
                  onChange={changeEvent}
                />
                {validation.description && (
                  <span className="error">{errorMsg.description}</span>
                )}
                <input
                  type="color"
                  name="color"
                  placeholder="color"
                  className="d_block"
                  value={todo.color}
                  onChange={changeEvent}
                />

                <button
                  disabled={btnDisable}
                  className={`btn ${btnDisable && "btnDisable"}`}
                >
                  {editTodo ? "Edit" : "Create"}
                </button>
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
