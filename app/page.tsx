"use client"
import { useIsFetching, useQuery } from "@tanstack/react-query";

interface Todo {
  // userId: number;
  id: number;
  title: string;
  // completed: boolean;
}

export default function Home() {
  const isFetching = useIsFetching()
  const { data: todosData, isLoading, isError, isSuccess } = useQuery<Todo[]>({
    queryKey: ["todos"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/todos").then((res) =>
        res.json()
      ),
    select: (todos) =>
      todos.map((todo) => ({id: todo.id, title: todo.title})),
  });

  const {
    data: usersData
  } = useQuery<Todo[]>({
    queryKey: ["users"],
    queryFn: () =>
      fetch("https://jsonplaceholder.typicode.com/users").then((res) =>
        res.json()
      ),
    enabled: !!todosData,
  });

  if(isLoading) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Loading...
      </main>
    );
  }

  if(isError) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        Error...
      </main>
    );
  }

  console.log(todosData);
  

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl">TODOS</h1>
      <div className="flex flex-col gap-2">
        {todosData?.slice(0,5).map((todo: any) => (
          <div key={todo.id}>{todo.title}</div>
        ))}
      </div>

      <h1 className="text-xl mt-5">Users</h1>
      <div className="flex flex-col gap-2">
        {usersData?.map((user: any) => (
          <div key={user.id}>{user.name}</div>
        ))}
      </div>
    </main>
  );
}
