import { create } from "zustand";
export const useTodoStore = create((set) => ({
  // état global
  todos: [],
  loading: false,
  // actions
  setTodos: (todos) => set({ todos }),
  setLoading: (loading) => set({ loading }),
  addTodo: (todo) =>
    set((state) => ({
      todos: [...state.todos, todo],
    })),
  removeTodo: (id) =>
    set((state) => ({
      todos: state.todos.filter((t) => t.id !== id),
    })),
}));
