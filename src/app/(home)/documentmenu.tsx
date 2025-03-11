import { Button } from "@/components/ui/button";
import { ExternalLinkIcon, FilePenIcon, MoreVertical, TrashIcon } from "lucide-react";
import { Id } from "../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { RemoveDialog } from "@/components/remove-dialog";
import { RenameDialog } from "@/components/rename-dialog";

interface Documentmenuprops {
  documentId: Id<"documents">;
  title: string;
  onNewTab: (id: Id<"documents">) => void;
}
export const DocumentMenu = ({
  documentId,
  title,
  onNewTab,
}: Documentmenuprops) => {
 
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="rounded-full" size="icon">
          <MoreVertical className="size-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <RenameDialog id={documentId}  initialTitle={title}>
          <DropdownMenuItem
            onSelect={(e)=>e.preventDefault()}
            onClick={(e)=>e.stopPropagation()}
          >
            <FilePenIcon/>
            Rename
          </DropdownMenuItem>
        </RenameDialog>
        <RemoveDialog id={documentId}>
          <DropdownMenuItem
            onSelect={(e)=>e.preventDefault()}
            onClick={(e)=>e.stopPropagation()}
          >
            <TrashIcon />
            Remove
          </DropdownMenuItem>
        </RemoveDialog>
        <DropdownMenuItem onClick={() => onNewTab(documentId)}>
          <ExternalLinkIcon className="size-4 mr-2" />
          open a new tab
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
