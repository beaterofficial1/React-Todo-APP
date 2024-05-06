import { useState, useRef } from "react";
import { useTodoContext } from "../Contexts";

const TodoList = ({ todo }) => {
  const { updateTodo, toggleCompleteTodo, deleteTodo } = useTodoContext();
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  const [todoMessage, setTodoMessage] = useState(todo.todo);

  const editTodo = (e) => {
    updateTodo(todo.id, { ...todo, todo: todoMessage });
    setIsTodoEditable(false);
  };

  const toggleCompleted = () => {
    toggleCompleteTodo(todo.id);
  };

  const inputRef = useRef(null);

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      className={`todo px-1 py-1 rounded-lg flex items-center my-3 duration-200 ${
        isTodoEditable ? "border-[#9597DF] border px-2" : "border-transparent"
      } ${todo.complete ? "line-through bg-green-900" : "bg-[#302D36]"}`}
    >
      <input
        type="checkbox"
        className={`w-10 h-[1.3em]  ${
          isTodoEditable ? "cursor-not-allowed" : ""
        }`}
        checked={todo.complete}
        onChange={toggleCompleted}
        disabled={isTodoEditable ? true : false}
      />
      <input
        type="text"
        readOnly={!isTodoEditable}
        value={todoMessage}
        ref={inputRef}
        onChange={(e) => setTodoMessage(e.target.value)}
        className={`w-full py-2 mx-2 text-xl text-white bg-transparent focus-visible:outline-none ${
          isTodoEditable ? "cursor-auto" : "cursor-default"
        }`}
      />
      <button
        className="editBtn w-10 text-2xl rounded h-10 text-center"
        onClick={() => {
          if (todo.completed) return;

          focusInput();

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.complete}
      >
        {isTodoEditable ? (
          <i
            className={`fa-solid fa-check hover:text-white duration-200 ${
              todo.complete ? "cursor-not-allowed" : ""
            }`}
          ></i>
        ) : (
          <i
            className={`fa-solid fa-pen-to-square hover:text-white duration-200 ${
              todo.complete ? "cursor-not-allowed" : ""
            }`}
          ></i>
        )}
      </button>
      <button
        onClick={() => deleteTodo(todo.id)}
        className={`editBtn w-10 text-2xl rounded h-10 text-center`}
      >
        <i className={`fa-solid fa-trash hover:text-white duration-200`}></i>
      </button>
    </div>
  );
};

export default TodoList;
