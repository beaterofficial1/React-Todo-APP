import { useEffect, useState } from "react";
import TodoList from "./Components/TodoList";
import { TodoContextProvider } from "./Contexts";
import TodoForm from "./Components/TodoForm";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  const updateTodo = (id, todo) => {
    setTodos((prev) => prev.map((x) => (x.id === id ? todo : x)));
  };

  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((x) => x.id != id)); // Not include that todo id and return whole array
  };

  const toggleCompleteTodo = (id) => {
    setTodos((prev) =>
      prev.map((x) => (x.id === id ? { ...x, complete: !x.complete } : x))
    );
  };

  useEffect(() => {
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContextProvider
      value={{ todos, updateTodo, toggleCompleteTodo, deleteTodo, addTodo }}
    >
      <div className="font-beater bg-[#121215] text-[#9597DF] h-screen w-full">
        <div className="rounded-lg container m-auto max-w-[1050px] w-full px-4">
          {/* Row 1 */}
          <h1 className="text-white font-medium text-6xl py-4">
            to<span className="text-[#8965FB]">do.</span>
          </h1>

          {/* Box 1 */}
          <div className="first bg-[#18181C] rounded-2xl px-6 shadow-lg shadow-black py-6">
            <h1 className="text-2xl font-semibold">Create new todo</h1>
            <TodoForm />

            <h1 className="text-2xl font-semibold">Tasks</h1>
            <ul className="h-96 overflow-x-hidden overflow-y-scroll mt-2">
              {todos.map((x) => (
                <li className="list-none" key={x.id}>
                  <TodoList todo={x} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </TodoContextProvider>
  );
}

export default App;
