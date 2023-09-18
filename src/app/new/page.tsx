import { prisma } from "@/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import React from "react";

async function createTodo(data: FormData) {
  "use server"
  const title = data.get("title")?.valueOf();
  if(typeof title !== "string" || title.length === 0) {
    throw new Error('Invalid Title')
  }

  await prisma.todo.create({data: {title, complete: false}})
  redirect('/')
}

const New = () => {
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">New</h1>
      </header>
      <form action={createTodo} className="flex gap-2 flex-col">
        <input
          type="text"
          name="title"
          className="border border-slate-300 px-2 py-1 rounded outline-none focus-within:border-slate-100 bg-transparent"
        />
        <div className="flex gap-1 justify-end">
            <Link href=".." className="border border-slate-300 text-slate-300 rounded outline-none px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700">Cancel</Link>
            <button type="submit" className="border border-slate-300 text-slate-300 rounded outline-none px-2 py-1 hover:bg-slate-700 focus-within:bg-slate-700">Create</button>
        </div>
      </form>
    </>
  );
};

export default New;
