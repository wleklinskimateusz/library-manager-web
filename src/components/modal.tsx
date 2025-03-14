"use client";

import { Dialog, DialogContent } from "./ui/dialog";

import { useRouter } from "next/navigation";

export function Modal({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  return (
    <Dialog
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
}
