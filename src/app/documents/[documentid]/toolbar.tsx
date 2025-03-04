"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { useEditorStore } from "@/store/use-editor";
import { type Level } from "@tiptap/extension-heading";
import {  SketchPicker, type ColorResult } from "react-color";
import {
  LucideIcon,
  Redo2Icon,
  Undo2Icon,
  PrinterIcon,
  SpellCheckIcon,
  BoldIcon,
  ItalicIcon,
  Underline,
  MessageSquarePlusIcon,
  ListTodoIcon,
  RemoveFormattingIcon,
  ChevronDownIcon,
  HighlighterIcon,
  Link2Icon,
  ImageIcon,
  UploadIcon,
  SearchIcon,
  AlignLeftIcon,
  AlignRightIcon,
  AlignCenterIcon,
  AlignJustifyIcon,
  ListIcon,
  ListOrdered,
  MinusIcon,
  PlusIcon,
  ListCollapseIcon,
} from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

interface ToolBarButtonProps {
  onClick?: () => void;
  isActive?: boolean;
  icon: LucideIcon;
}

const LineHeightButton=()=>{
  const { editor } = useEditorStore();
  const lineHeight=[
    {
      label:"Default",
      value:"normal",
    },
    {
      label:"Single",
      value:"1",
    },
    {
      label:"1.15",
      value:"1.15",
    },
    {
      label:"1.5",
      value:"1.5",
    },
    {
      label:"Double",
      value:"2",
    },

  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
        <ListCollapseIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
       {
        lineHeight.map(({label,value})=>(
          <button key={value} onClick={()=>editor?.chain().focus().setLineHeight(value).run()}
          
          className={cn("flex items-center gap-x-2 px-2 py-1 hover:bg-neutral-200/80",
            editor?.getAttributes("paragarph").lineHeight===value&&"bg-neutral-200/80"
          )}
          >
          
            <span className="text-sm">{label}</span>
          </button>
        ))
       }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const FontSizeButton=()=>{
  const { editor } = useEditorStore();

  const currentFontSize=editor?.getAttributes("textStyle").fontSize
  ?editor?.getAttributes("textStyle").fontSize.replace("px",""):"16"

  const [fontSize,setFontSize]=useState(currentFontSize);
  const [inputValue,setInputValue]=useState(fontSize);
  const [isEditing,setIsEditing]=useState(false);
  const updateFontSize=(newfontize:string)=>{
    const size=parseInt(newfontize);
    if(!isNaN(size) && size>0){
      editor?.chain().focus().setFontSize(`${size}px`).run();
      setFontSize(newfontize);
      setInputValue(newfontize);
      setIsEditing(false);
    }
  }
  const handleInputChaneg=(e:React.ChangeEvent<HTMLInputElement>)=>{
    setInputValue(e.target.value);
  }
  const handleInputBlutr=()=>{
    updateFontSize(inputValue)
  }
  const handleKeyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
    e.preventDefault();
    if(e.key==="Enter"){
      updateFontSize(inputValue);
      editor?.commands.focus();
    }
  }
  const increment=()=>{
    const newsize=parseInt(fontSize)+1;
    updateFontSize(newsize.toString())
  }
  const decrement=()=>{
    if(fontSize>0){

      const newsize=parseInt(fontSize)-1;
      updateFontSize(newsize.toString())
    }
  }
  
  return (
    <div className="flex items-center gap-x-0.5">
      <button 
      onClick={decrement}
      className="h-7 w-7 shrink-0 flex justify-center items-center rounded-sm hover:bg-neutral-200/80 ">
        <MinusIcon className="size-4"/>
      </button>
      {
        isEditing?(
          <input type="text"
          
           value={inputValue}
           onChange={handleInputChaneg}
           onBlur={handleInputBlutr}
           onKeyDown={handleKeyDown}
           className="h-7 w-10 text-center border border-neutral-400 rounded-sm bg-transparent focus:outline-none focus:ring-0 text-sm"
          />
        ):(
          <button 
           onClick={()=>{setIsEditing(true)

             setFontSize(currentFontSize)
           }}
          className="h-7 w-10 text-center border border-neutral-400 rounded-sm bg-transparent cursor-text text-sm">
            {currentFontSize}
          </button>
        )
      }
      <button 
      onClick={increment}
      className="h-7 w-7 shrink-0 flex justify-center items-center rounded-sm hover:bg-neutral-200/80 ">
        <PlusIcon className="size-4"/>
      </button>
    </div>
  );
}

const ListButton=()=>{
  const { editor } = useEditorStore();
  const lists=[
    {
      label:"Bullet List",
      icon:ListIcon,
      isActive:()=>editor?.isActive("bulletList"),
      onClick:()=>editor?.chain().focus().toggleBulletList().run()
    },
    {
      label:"Ordered List",
      icon:ListOrdered,
      isActive:()=>editor?.isActive("orderedList"),
      onClick:() => editor?.chain().focus().toggleOrderedList().run()
    },
  

  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
         <ListIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
       {
        lists.map(({label,icon:Icon,isActive,onClick})=>(
          <button key={label} onClick={onClick}
          
          className={cn("flex items-center gap-x-2 px-2 py-1 hover:bg-neutral-200/80",
            isActive()&&"bg-neutral-200/80"
          )}
          >
            <Icon className="size-4"/>
            <span className="text-sm">{label}</span>
          </button>
        ))
       }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const AlignButton=()=>{
  const { editor } = useEditorStore();
  const alignments=[
    {
      label:"Align Left",
      value:"left",
      icon:AlignLeftIcon
    },
    {
      label:"Align Right",
      value:"right",
      icon:AlignRightIcon
    },
    {
      label:"Align Center",
      value:"center",
      icon:AlignCenterIcon
    },
    {
      label:"Align Justify",
      value:"justify",
      icon:AlignJustifyIcon
    }

  ]
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
         <AlignLeftIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
       {
        alignments.map(({label,value,icon:Icon})=>(
          <button key={value} onClick={()=>editor?.chain().focus().setTextAlign(value).run()}
          
          className={cn("flex items-center gap-x-2 px-2 py-1 hover:bg-neutral-200/80",
            editor?.isActive({textAlign:value})&&"bg-neutral-200/80"
          )}
          >
            <Icon className="size-4"/>
            <span className="text-sm">{label}</span>
          </button>
        ))
       }
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const ImageButton=()=>{
  const { editor } = useEditorStore();
  const[isDialogOpen,setIsDialogOpen]=useState(false);
  const [imageUrl,setImageUrl]=useState("");
  const onChange=(src:string)=>{
     editor?.chain().focus().setImage({ src }).run();
   
  }
  const onUpload=()=>{
    const input=document.createElement("input");
    input.type="file";
    input.accept="image/*";
    input.onchange=(e)=>{
      const file=(e.target as HTMLInputElement).files?.[0];
      if(file){
        const imageUrl=URL.createObjectURL(file);
        onChange(imageUrl)
      }
    }
    input.click()
  };
  const handleIMageUrlSubmit=()=>{
    if(imageUrl){
      onChange(imageUrl);
      setImageUrl("");
      setIsDialogOpen(false);
    }
  }
  return (
    <>
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
         <ImageIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
      <DropdownMenuItem onClick={onUpload}>
        <UploadIcon className="size-4 mr-2"/>
        upload
      </DropdownMenuItem>
      <DropdownMenuItem onClick={()=>setIsDialogOpen(true)}>
        <SearchIcon className="size-4 mr-2"/>
        paste image url
      </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>insert imageurl</DialogTitle>
        </DialogHeader>
        <Input placeholder="enter image url" value={imageUrl}
        
            onChange={(e)=>setImageUrl(e.target.value)}

            onKeyDown={(e)=>{
              if(e.key==="Enter"){
                handleIMageUrlSubmit()
              }
            }}
        />
      <DialogFooter>
        <Button onClick={handleIMageUrlSubmit}>submit</Button>
      </DialogFooter>
      </DialogContent>
    </Dialog>
    </>
  );
}
const LinkButton=()=>{
  const { editor } = useEditorStore();
  const [value,setValue]=useState("");
  const onChange=(href:string)=>{
     editor?.chain().focus().extendMarkRange('link').setLink({ href }).run();
     setValue("");
   
  }
  return (
    <DropdownMenu onOpenChange={(open)=>{
      if(open){
        setValue(editor?.getAttributes("link").href||"")
      }
    }}>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
         <Link2Icon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2.5 flex items-center gap-x-2">
       <Input placeholder="paste link" value={value} onChange={(e)=>setValue(e.target.value)}/>
       <Button onClick={()=>onChange(value)}>Apply</Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
const HighlightButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("highlight").color || "ffffff";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setHighlight({color:color.hex}).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
         <HighlighterIcon className="size-4"/>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const ColorButton = () => {
  const { editor } = useEditorStore();
  const value = editor?.getAttributes("textStyle").color || "#000000";
  const onChange = (color: ColorResult) => {
    editor?.chain().focus().setColor(color.hex).run();
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex flex-col justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="text-xs">A</span>
          <div className="h-0.5 w-full" style={{ backgroundColor: value }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-0">
        <SketchPicker color={value} onChange={onChange} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const ToolBarButton = ({
  onClick,
  isActive,
  icon: Icon,
}: ToolBarButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "text-sm h-7 min-w-7 flex items-center justify-center rounded-sm hover:bg-neutral-200/80",
        isActive && "bg-neutral-200/80"
      )}
    >
      <Icon className="size-4" />
    </button>
  );
};

const FamilyFontButton = () => {
  const { editor } = useEditorStore();
  const fonts = [
    {
      label: "Arial",
      value: "Arial",
    },
    {
      label: "Times New Roman",
      value: "Times New Roman",
    },
    {
      label: "Courier New",
      value: "Courier New",
    },
    {
      label: "Georgia",
      value: "Georgia",
    },
    {
      label: "Verdana",
      value: "Verdana",
    },
  ];
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 w-[120px] shrink-0 flex justify-between items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">
            {editor?.getAttributes("textStyle").fontFamily || "Arial"}
          </span>
          <ChevronDownIcon className="shrink-0 ml-2 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {fonts.map(({ label, value }) => (
          <button
            onClick={() => editor?.chain().focus().setFontFamily(value).run()}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 hover:bg-neutral-200/80 rounded-sm",

              editor?.getAttributes("textStyle").fontFamily === value &&
                "bg-neutral-200/80"
            )}
            style={{ fontFamily: value }}
            key={value}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
const HeaderButton = () => {
  const { editor } = useEditorStore();
  const headings = [
    {
      label: "Normal Text",
      value: 0,
      fontSize: "16px",
    },
    {
      label: "Heading 1",
      value: 1,
      fontSize: "32px",
    },
    {
      label: "Heading 2 ",
      value: 2,
      fontSize: "24px",
    },
    {
      label: "Heading 3 ",
      value: 3,
      fontSize: "20px",
    },
    {
      label: "Heading 4 ",
      value: 4,
      fontSize: "18px",
    },
  ];
  const getCurrentHeading = () => {
    for (let level = 1; level <= 4; level++) {
      if (editor?.isActive("heading", { level })) {
        return `Heading ${level}`;
      }
    }
    return "Normal Text";
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className="h-7 min-w-7 shrink-0 flex justify-center items-center rounded-sm hover:bg-neutral-200/80 px-1.5 overflow-hidden text-sm">
          <span className="truncate">{getCurrentHeading()}</span>
          <ChevronDownIcon className="shrink-0 ml-2 size-4" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-1 flex flex-col gap-y-1">
        {headings.map(({ label, value, fontSize }) => (
          <button
            onClick={() => {
              if (value === 0) {
                editor?.chain().focus().setParagraph().run();
              } else {
                editor
                  ?.chain()
                  .focus()
                  .toggleHeading({ level: value as Level })
                  .run();
              }
            }}
            className={cn(
              "flex items-center gap-x-2 px-2 py-1 hover:bg-neutral-200/80 rounded-sm",

              (value === 0 && !editor?.isActive("heading")) ||
                (editor?.isActive("heading", { level: value }) &&
                  "bg-neutral-200/80")
            )}
            style={{ fontSize: value }}
            key={value}
          >
            <span className="text-sm">{label}</span>
          </button>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const ToolBar = () => {
  const { editor } = useEditorStore();

  const sections: {
    label: string;
    icon: LucideIcon;
    onClick: () => void;
    isActive?: boolean;
  }[][] = [
    [
      {
        label: "undo",
        icon: Undo2Icon,
        onClick: () => editor?.chain().focus().undo().run(),
      },
      {
        label: "redo",
        icon: Redo2Icon,
        onClick: () => editor?.chain().focus().redo().run(),
      },
      {
        label: "Print",
        icon: PrinterIcon,
        onClick: () => window.print(),
      },
      {
        label: "spell Check",
        icon: SpellCheckIcon,
        onClick: () => {
          const current = editor?.view.dom.getAttribute("spellCheck");
          editor?.view.dom.setAttribute(
            "spellcheck",
            current === "false" ? "true" : "false"
          );
        },
      },
    ],
    [
      {
        label: "bold",
        icon: BoldIcon,
        isActive: editor?.isActive("bold"),
        onClick: () => editor?.chain().focus().toggleBold().run(),
      },
      {
        label: "italic",
        icon: ItalicIcon,
        isActive: editor?.isActive("italic"),
        onClick: () => editor?.chain().focus().toggleItalic().run(),
      },
      {
        label: "underline",
        icon: Underline,
        isActive: editor?.isActive("underline"),
        onClick: () => editor?.chain().focus().toggleUnderline().run(),
      },
    ],

    [
      {
        label: "comments",
        icon: MessageSquarePlusIcon,
        isActive: false,
        onClick: () => console.log("message"),
      },
      {
        label: "list to do",
        icon: ListTodoIcon,
        isActive: editor?.isActive("taskList"),
        onClick: () => editor?.chain().focus().toggleTaskList().run(),
      },
      {
        label: "remove formatting",
        icon: RemoveFormattingIcon,
        onClick: () => editor?.chain().focus().unsetAllMarks().run(),
      },
    ],
  ];
  return (
    <div className="bg-[F1F4F9] px-2.5 py-0.5 min-h-[40px] flex items-center gap-x-0.5 overflow-x-auto">
      {sections[0].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <FamilyFontButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <HeaderButton />
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      {sections[1].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
      <ColorButton />
      <HighlightButton/>
      <Separator orientation="vertical" className="h-6 bg-neutral-300" />
      <LinkButton/>
      <ImageButton/>
      <AlignButton/>
      <ListButton/>
      <FontSizeButton/>
      <LineHeightButton/>
      {sections[2].map((item) => (
        <ToolBarButton key={item.label} {...item} />
      ))}
    </div>
  );
};
