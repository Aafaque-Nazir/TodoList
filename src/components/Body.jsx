import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Body = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [showFinished, setshowFinished] = useState(true);

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      setTodos(todos);
    }
  }, []);

  const toggleFinished = (e) => {
    setshowFinished(!showFinished);
  };

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  const handleAdd = () => {
    setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }]);
    setTodo("");
    console.log(todo);
    saveToLS();
  };

  const handleEdit = (e, id) => {
    let t = todos.filter((i) => i.id === id);
    setTodo(t[0].todo);
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleDelete = (e, id) => {
    // const isConfirmed = window.confirm("Are you sure you want to delete this?");
    // if (isConfirmed) {
    //   let newTodos = todos.filter(item => item.id !== id);
    //   setTodos(newTodos);
    // } else {
    //   alert("Deletion canceled");
    // }

    //   window.confirm("Are you sure you want to delete this?")
    // ? setTodos(todos.filter(item => item.id !== id))
    // : alert("Deletion canceled");
    let newTodos = todos.filter((item) => {
      return item.id !== id;
    });
    setTodos(newTodos);
    saveToLS();
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex((item) => {
      return item.id === id;
    });
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos);
    saveToLS();
  };

  return (
    <>
      <div className="container mx-auto mt-3 bg-green-200 rounded-xl px-4 py-6 w-full min-h-screen md:px-6 lg:px-8">

        <div className="Add-Todo">
          <h1 className="text-lg font-bold text-center sm:text-xl md:text-2xl">

            {" "}
            Tasky - Your Daily Partner
          </h1>
          <h2 className="text-2xl font-semibold mb-4 text-center mt-6 sm:text-3xl md:text-4xl md:mb-6 md:mt-8">

            Add ToDoS
          </h2>
          <input
            onChange={handleChange}
            value={todo}
            className="bg-white rounded-b-2xl w-full px-2 py-1 border-1 sm:w-4/5 sm:mr-4"

            placeholder="Add Todo "
            type="text"
            name="add"
            id="add"
          />
          <button
            onClick={handleAdd}
            disabled={todo.length <= 3}
            className="bg-green-700 hover:bg-green-900 w-full py-1.5 mt-2 cursor-pointer text-white rounded-b-2xl disabled:bg-green-950 sm:w-20"

          >
            SAVE
          </button>
          <h2 className="text-xl my-4 sm:text-2xl">Your Todos</h2>

          <input
            onChange={toggleFinished}
            type="checkbox"
            className="mb-4"
            checked={showFinished}
            name=""
            id=""
          />
          Show Finished TODOs
          <hr  className="opacity-50 my-2"/>
          <div className="todos">
            {todos.length === 0 && (
              <span className="text-center text-xl my-20 block sm:text-2xl">No TO-DOS FOUND</span>
            )}

            {todos.map((item, index) => {
              return (
                (showFinished || !item.isCompleted) && (
                  <div key={item.id} className="todo break-all mb-3 mt-1">
                    <div className="flex flex-col gap-2 sm:flex-row sm:gap-4">

                      <input
                        type="checkbox"
                        onChange={handleCheckbox}
                        checked={todo.isCompleted}
                        name={item.id}
                        className="form-checkbox h-4 w-3"
                        id=""
                      />
                      <div className={item.isCompleted ? "line-through" : ""}>
                        {item.todo}
                      </div>
                    </div>
                    <div className="buttons flex gap-2 mt-2 sm:mx-2">

                      <button
                        onClick={(e) => handleEdit(e, item.id)}
                        className="button"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={(e) => handleDelete(e, item.id)}
                        className="button"
                      >
                        <MdDelete />
                      </button>
                    </div>
                  </div>
                )
              );
            })}
          </div>
        </div>
      </div>
    </>
  )
}
export default Body 