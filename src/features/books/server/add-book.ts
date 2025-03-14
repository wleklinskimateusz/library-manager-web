"use server";

import { ApiClient } from "@/server/api-client";
import { redirect } from "next/navigation";
export async function addBook(formData: FormData) {
  const isbn = formData.get("isbn");
  const title = formData.get("title");
  const author = formData.get("author");
  const publishedAt = Number(formData.get("publishedAt"));

  if (!title || !author || !publishedAt) {
    throw new Error("Missing required fields");
  }

  await new ApiClient().post("/books", {
    isbn,
    title,
    author,
    publishedAt,
  });

  redirect("/books");
}
