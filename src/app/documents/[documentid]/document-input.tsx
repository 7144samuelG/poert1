import { BsCloudCheck, BsCloudSlash } from "react-icons/bs";
import { Id } from "../../../../convex/_generated/dataModel";
import { useRef, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { useDebounce } from "@/hooks/use-debounce";
import { toast } from "sonner";
import { useStatus } from "@liveblocks/react";
import { Loader } from "lucide-react";
interface DocumentInputProps {
  title: string;
  id: Id<"documents">;
}
export const DocumentInput = ({ title, id }: DocumentInputProps) => {
  const status = useStatus();

  const [value, setValue] = useState(title);
  const [isEditing, setIsEditng] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const mutate = useMutation(api.document.updateById);

  const debounceUpdate = useDebounce((newvalue: string) => {
    if (newvalue == title) return;
    setIsPending(true);
    mutate({ documentid: id, title: newvalue })
      .then(() => toast.success("document updated"))
      .catch(() => toast.error("something went wrong"))
      .finally(() => setIsPending(false));
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newvalue = e.target.value;
    setValue(newvalue);
    debounceUpdate(newvalue);
  };

  const handlesubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ documentid: id, title: value })
      .then(() => {
        toast.success("document updated");

        setIsEditng(false);
      })
      .catch(() => toast.error("something went wrong"))
      .finally(() => setIsPending(false));
  };

  const showloader =
    isPending || status === "connecting" || status === "reconnecting";
  const showError = status === "disconnected";
  return (
    <div className="flex items-center gap-2">
      {isEditing ? (
        <form onSubmit={handlesubmit} className="relative w-fit max-w-[50ch]">
          <span className="invisible whitespace-pre px-1.5 text-lg">
            {value || ""}
          </span>
          <input
            value={value}
            ref={inputRef}
            onChange={onChange}
            onBlur={() => setIsEditng(false)}
            className="absolute inset-0 text-lg text-black px-1.5 bg-transparent truncate"
          />
        </form>
      ) : (
        <span
          onClick={() => {
            setIsEditng(true);
            setTimeout(() => {
              inputRef.current?.focus();
            }, 0);
          }}
          className="text-lg px-1.5 cursor-pointer truncate"
        >
          {title} document
        </span>
      )}
      {showError && <BsCloudSlash className="size-4" />}
      {!showloader && !showError && <BsCloudCheck className="size-4" />}
      {showloader && (
        <Loader className="size-4 animate-spin text-muted-foreground" />
      )}
    </div>
  );
};
