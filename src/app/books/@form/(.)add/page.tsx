import { Modal } from "@/components/modal";
import { AddNew } from "@/features/books/components/add-new";
import { DialogHeader, DialogTitle } from "@/components/ui/dialog";
export default function AddBookModalPage() {
  return (
    <Modal>
      <DialogHeader>
        <DialogTitle>Add New Book</DialogTitle>
      </DialogHeader>
      <AddNew />
    </Modal>
  );
}
