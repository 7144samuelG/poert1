"use client"
import { Preloaded, usePreloadedQuery } from "convex/react";
import { Editor } from "./editor";
import { NavBar } from "./navabar";
import { Room } from "./room";
import { ToolBar } from "./toolbar";
import { api } from "../../../../convex/_generated/api";
interface DocumentProps{
    preloadeddocument:Preloaded<typeof api.document.getById>
}
export const Document = ({preloadeddocument}:DocumentProps) => {
  const document=usePreloadedQuery(preloadeddocument);//keep reactivity of convex
  return (
    <Room>
      <div className="min-h-screen bg-[#FAFBFD]">
        <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 right-0 left-0 z-10 print-hidden bg-[#FAFBFD]">
          <NavBar data={document} />
          <ToolBar />
        </div>
        <div className="pt-[114px] print:pt-0">
          <Editor initialContet={document.intialContent} />
        </div>
      </div>
    </Room>
  );
};


