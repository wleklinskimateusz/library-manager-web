"use server";

import { ApiClient } from "@/server/api-client";
import { redirect } from "next/navigation";
import { revalidateTag } from "next/cache";

export async function addBook(formData: FormData) {
  const isbn = formData.get("isbn");
  const title = formData.get("title");
  const author = formData.get("author");
  const publishedAt = Number(formData.get("publishedAt"));

  if (!title || !author || !isbn) {
    throw new Error("Missing required fields");
  }

  await new ApiClient().post("/books", {
    isbn,
    title,
    author,
    publishedAt,
  });

  revalidateTag("books");
  redirect("/books");
}
