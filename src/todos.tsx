import { useQuery } from "@tanstack/react-query";
import { fetchTodos } from "./apis/api";
import { Todo } from "../types/types";

function Todos() {
  const { data: todos, isLoading, error } = useQuery<Todo[], Error>({
    queryKey: ['todos'], 
    queryFn: fetchTodos,
  });

  if (isLoading) {
    return (
      <div>Loading...</div>
    )
  };

  if (error) {
    return (
      <div>Error222: {error.message}</div>
    );
  }

  return (
    <div>
      <ul>
        {todos?.map((todo: any) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Todos;