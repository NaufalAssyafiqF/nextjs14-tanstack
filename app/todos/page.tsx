"use client"
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React from 'react'

const TodosPage = () => {
    const mutation: any = useMutation({
      mutationFn: (newTodo) => {
        return axios.post("http://localhost:3000/api/todos", newTodo);
      },
    });
  return (
    <div>
      {mutation.isPending ? (
        "Adding todo..."
      ) : (
        <>
          {mutation.isError ? (
            <div>An error occurred: {mutation.error.message}</div>
          ) : null}

          {mutation.isSuccess ? <div>Todo added!</div> : null}

          <button
            onClick={() => {
              mutation.mutate({ id: new Date(), title: "Do Laundry" });
            }}
          >
            Create Todo
          </button>
        </>
      )}
    </div>
  );
}

export default TodosPage