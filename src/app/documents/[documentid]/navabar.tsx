"use client";

import Image from "next/image";
import Link from "next/link";
import { DocumentInput } from "./document-input";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@/components/ui/menubar";
import {
  BoldIcon,
  FileIcon,
  FileJsonIcon,
  FilePenIcon,
  FilePlusIcon,
  FileTextIcon,
  GlobeIcon,
  ItalicIcon,
  PrinterIcon,
  Redo2Icon,
  RemoveFormatting,
  StrikethroughIcon,
  TextIcon,
  TrashIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react";
import { BsFilePdf } from "react-icons/bs";
import { useEditorStore } from "@/store/use-editor";

export const NavBar = () => {
  const {editor}=useEditorStore();
  const insertTable=({rows,cols}:{rows:number,cols:number})=>{
    editor
    ?.chain()
    .focus()
    .insertTable({rows,cols,withHeaderRow:false})
    .run()
  }
  const onDownload=(blob:Blob,filename:string)=>{
    const url=URL.createObjectURL(blob);
    const a=document.createElement("a");
    a.href=url;
    a.download=filename;
    a.click();
  };

  const onSaveJson=()=>{
    if(!editor) return;
    const content=editor.getJSON();
    const blob=new Blob([JSON.stringify(content)],{
      type:"application/json"
    });
    onDownload(blob,"document.json")
  }
  const onSaveHtml=()=>{
    if(!editor) return;
    const content=editor.getHTML();
    const blob=new Blob([content],{
      type:"text/html"
    });
    onDownload(blob,"document.html")
  }
  const onSaveText=()=>{
    if(!editor) return;
    const content=editor.getText();
    const blob=new Blob([content],{
      type:"text/plain"
    });
    onDownload(blob,"document.text")
  }
  return (
    <nav className="flex items-center justify-between">
      <div className="flex gap-2 items-center">
        <Link href="/">
          <Image src="/logo.svg" alt="navbar" width={36} height={36} />
        </Link>
        <div className="flex flex-col">
          <DocumentInput />
          <div className="flex">
            <Menubar className="bg-transparent shadow-none p-0 border-none h-auto">
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  file
                </MenubarTrigger>
                <MenubarContent className="print:hidden">
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <FileIcon className="mr-2 size-4" />
                      Save
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={onSaveJson}>
                        <FileJsonIcon className="size-4 mr-2" />
                        JSON
                      </MenubarItem>
                      <MenubarItem onClick={onSaveHtml}>
                        <GlobeIcon className="size-4 mr-2" />
                        HTML
                      </MenubarItem>
                      <MenubarItem onClick={()=>window.print()}>
                        <BsFilePdf className="size-4 mr-2" />
                        PDF
                      </MenubarItem>
                      <MenubarItem onClick={onSaveText}>
                        <FileTextIcon className="size-4 mr-2" />
                        Text
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem>
                    <FilePlusIcon className="size-4 mr-2" />
                    new document
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <FilePenIcon className="size-4 mr-2" />
                    Rename
                  </MenubarItem>
                  <MenubarItem>
                    <TrashIcon className="size-4 mr-2" />
                    Remove
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    <PrinterIcon className="size-4 mr-2" />
                    Print <MenubarShortcut>p</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Edit
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onClick={()=>editor?.chain().focus().undo().run()}>
                    <Undo2Icon className="size-4 mr-2 "/>
                    Undo<MenubarShortcut>Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onClick={()=>editor?.chain().focus().redo().run()}>
                    <Redo2Icon className="size-4 mr-2 "/>
                    Redo<MenubarShortcut>Y</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>



              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Insert
                </MenubarTrigger>
              <MenubarContent>
                <MenubarSub>
                  <MenubarSubTrigger>Table</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarItem onClick={()=>insertTable({rows:1,cols:1})}>
                      1x1
                    </MenubarItem>
                     <MenubarItem onClick={()=>insertTable({rows:2,cols:2})}>
                      2x2
                    </MenubarItem>
                     <MenubarItem onClick={()=>insertTable({rows:3,cols:3})}> 
                      3x3
                    </MenubarItem>
                  </MenubarSubContent>
                </MenubarSub>
                </MenubarContent>
              </MenubarMenu>
              <MenubarMenu>
                <MenubarTrigger className="text-sm font-normal py-0.5 px-[7px] rounded-sm hover:bg-muted h-auto">
                  Format
                </MenubarTrigger>
                <MenubarContent>
                  <MenubarSub>
                    <MenubarSubTrigger>
                      <TextIcon className="mr-2 size-4"/>
                      Text
                    </MenubarSubTrigger>
                    <MenubarSubContent>
                      <MenubarItem onClick={()=>editor?.chain().focus().toggleBold().run()}>
                        <BoldIcon className="mr-2 size-4"/>
                        Bold<MenubarShortcut>B</MenubarShortcut>
                      </MenubarItem>
                       <MenubarItem onClick={()=>editor?.chain().focus().toggleItalic().run()}>
                        <ItalicIcon className="mr-2 size-4"/>
                        Italic<MenubarShortcut>I</MenubarShortcut>
                      </MenubarItem>
                       <MenubarItem onClick={()=>editor?.chain().focus().toggleUnderline().run()}>
                        <UnderlineIcon className="mr-2 size-4"/>
                        Underline<MenubarShortcut>U</MenubarShortcut>
                      </MenubarItem>
                       <MenubarItem onClick={()=>editor?.chain().focus().toggleStrike().run()}>
                        <StrikethroughIcon className="mr-2 size-4"/>
                         <span> Strikethrough &nbsp; &nbsp;</span><MenubarShortcut>S</MenubarShortcut>
                      </MenubarItem>
                    </MenubarSubContent>
                  </MenubarSub>
                  <MenubarItem onClick={()=>editor?.chain().focus().unsetAllMarks().run()}>
                    <RemoveFormatting className="mr-2 size-4"/>
                    ClearFormatting
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
      </div>
    </nav>
  );
};
