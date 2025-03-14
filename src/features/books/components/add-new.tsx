"use client";

import { Button } from "@/components/ui/button";
import { useRef } from "react";

import { addBook } from "../server/add-book";
import { useISBNLookup } from "../hooks/useISBNLookup";
import { FormField } from "@/components/form-control";

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
    <form ref={formRef} action={addBook} className="flex flex-col gap-4">
      <div className="flex gap-2 justify-between items-end">
        <FormField
          label="ISBN"
          inputOptions={{ id: "isbn", name: "isbn", required: true }}
        />
        <Button
          type="button"
          variant="outline"
          onClick={handleLookup}
          disabled={isLookupLoading}
          className="w-fit"
        >
          {isLookupLoading ? "Looking up..." : "Look up"}
        </Button>
      </div>
      <FormField
        label="Title"
        inputOptions={{ name: "title", id: "title", required: true }}
      />
      <FormField
        label="Author"
        inputOptions={{ name: "author", id: "author", required: true }}
      />
      <FormField
        label="Published At"
        inputOptions={{
          type: "number",
          name: "publishedAt",
          id: "publishedAt",
          min: -3000,
          max: new Date().getFullYear(),
          step: 1,
        }}
      />
      <Button type="submit">Add Book</Button>
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
