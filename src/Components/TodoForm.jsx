import { useState } from "react";
import { useTodoContext } from "../Contexts";

const TodoForm = () => {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodoContext();

  const handelSubmit = (e) => {
    e.preventDefault();

    if (!todo) return;
    addTodo({ todo, complete: false });
    setTodo("");
  };
  return (
    <form onSubmit={handelSubmit} className="flex items-center my-4">
      <input
        type="text"
        placeholder="What's on your mind?"
        className="w-full py-4 text-xl text-white focus-visible:outline-none p-4 rounded-l-lg bg-[#302D36]"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="bg-violet-600 rounded-r-lg text-white">
        <h3 className=" px-4 py-4 text-xl">Create</h3>
      </button>
    </form>
  );
};

export default TodoForm;
