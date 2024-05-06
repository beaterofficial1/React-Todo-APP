import { createContext, useContext } from "react";

export const todoContext = createContext({
  todos: [
    {
      id: 123456789,
      todo: "this is my todo",
      complete: false,
    },
  ],

  deleteTodo: (id) => {},
  toggleCompleteTodo: (id) => {},
  addTodo: (id, todo) => {},
  updateTodo: (id, todo) => {},
});

export const TodoContextProvider = todoContext.Provider;

export const useTodoContext = () => {
  return useContext(todoContext);
};
