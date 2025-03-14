import { Input } from "@/components/ui/input";

export function AddNew() {
  return (
    <form>
      <div>
        <label htmlFor="title">Title</label>
        <Input type="text" id="title" />
      </div>
      <div>
        <label htmlFor="author">Author</label>
        <Input type="text" id="author" />
      </div>
      <div>
        <label htmlFor="isbn">ISBN</label>
        <Input type="text" id="isbn" />
      </div>
      <div>
        <label htmlFor="publishedAt">Published At</label>
        <Input type="date" id="publishedAt" />
      </div>
      <button type="submit">Add Book</button>
    </form>
  );
}
