"use client";

import { useMutation } from "convex/react";
import { Id } from "../../convex/_generated/dataModel";

import { api } from "../../convex/_generated/api";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";

interface RenamedialogProps {
  id: Id<"documents">;
  initialTitle: string;
  children: React.ReactNode;
}
export const RenameDialog = ({
  id,
  initialTitle,
  children,
}: RenamedialogProps) => {
  const update = useMutation(api.document.updateById);
  const [isUpdating, setIsUpdating] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [open, setOpen] = useState(false);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsUpdating(true);
    update({ documentid: id, title: title.trim() })
      .then(() => {
        setOpen(false);
        toast.success("document updated")
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => {
        setIsUpdating(false);
      });
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent onClick={(e) => e.stopPropagation()}>
        <form onSubmit={onSubmit}>
          <DialogHeader>
            <DialogTitle>Rename Document</DialogTitle>
            <DialogDescription>
              Enter a new name for this document
            </DialogDescription>
          </DialogHeader>
          <div className="my-4">
            <Input
              value={title}
              placeholder="document name"
              onChange={(e) => setTitle(e.target.value)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="ghost"
              disabled={isUpdating}
              onClick={(e) => {
                e.stopPropagation();
                setOpen(false);
              }}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              onClick={(e) => e.stopPropagation()}
              disabled={isUpdating}
            >
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
