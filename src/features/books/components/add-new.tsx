"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

import { addBook } from "../server/add-book";
import { useISBNLookup } from "../hooks/useISBNLookup";

export function AddNew() {
  const formRef = useRef<HTMLFormElement>(null);
  const { isLookupLoading, getLookupValues } = useISBNLookup({
    onError: (error) => {
      console.error(error);
    },
  });

  const handleLookup = async () => {
    const isbn = getInput(formRef.current, "isbn")?.value;
    if (!isbn) return;
    const data = await getLookupValues(isbn);
    if (!data) return;
    replaceInputValue(formRef.current, "title", data.title);
    replaceInputValue(formRef.current, "author", data.authors.join(", "));
    replaceInputValue(formRef.current, "publishedAt", data.publishedAt);
  };

  return (
    <form ref={formRef} action={addBook}>
      <div className="flex gap-2 justify-between items-end">
        <div>
          <label htmlFor="isbn">ISBN</label>
          <Input type="text" id="isbn" name="isbn" required />
        </div>
        <Button
          type="button"
          onClick={handleLookup}
          disabled={isLookupLoading}
          className="w-fit"
        >
          {isLookupLoading ? "Looking up..." : "Look up"}
        </Button>
      </div>
      <div>
        <label htmlFor="title">Title</label>
        <Input type="text" name="title" id="title" required />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Input type="text" name="author" id="author" required />
      </div>
      <div>
        <label htmlFor="publishedAt">Published At</label>
        <Input
          type="number"
          name="publishedAt"
          id="publishedAt"
          min={-3000}
          max={new Date().getFullYear()}
          step={1}
          required
        />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}

function getInput(container: HTMLFormElement | null, inputName: string) {
  if (!container) return null;
  return container.querySelector<HTMLInputElement>(
    `input[name='${inputName}']`
  );
}

function replaceInputValue(
  container: HTMLFormElement | null,
  inputName: string,
  value: string
) {
  if (!container) return;
  const input = getInput(container, inputName);
  if (!input) throw new Error(`Input with name ${inputName} not found`);
  input.value = value;
}
