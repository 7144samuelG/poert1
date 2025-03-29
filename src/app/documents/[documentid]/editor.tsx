"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import TaskItem from "@tiptap/extension-task-item";
import TaskList from "@tiptap/extension-task-list";
import Table from "@tiptap/extension-table";
import TableCell from "@tiptap/extension-table-cell";
import TableHeader from "@tiptap/extension-table-header";
import TableRow from "@tiptap/extension-table-row";
import Image from '@tiptap/extension-image'
import ImageResize from "tiptap-extension-resize-image"
import Underline from '@tiptap/extension-underline'
import { useEditorStore } from "@/store/use-editor";
import FontFamily from '@tiptap/extension-font-family'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import TextAlign from '@tiptap/extension-text-align'
import { useLiveblocksExtension} from "@liveblocks/react-tiptap";
import {FontSizeExtension} from "@/extensions/font-size"
import { LineHeightExtension } from "@/extensions/line-height";
import { Ruler } from "./ruler";
import { Threads } from "./threads";
import { useStorage } from "@liveblocks/react";

interface DocumentProps{
  initialContet:string | undefined;
}

export const Editor = ({initialContet}:DocumentProps) => {

  const liveblock=useLiveblocksExtension({
    initialContent:initialContet,
    offlineSupport_experimental:true
  });
  const leftMargin=useStorage((root)=>root.leftMargin);
  const rightMargin=useStorage((root)=>root.rightMargin);

  const {setEditor}=useEditorStore();

  const editor = useEditor({

    immediatelyRender:false,
    onCreate({editor}) {
      setEditor(editor)
    },
    onDestroy() {
      setEditor(null)
    },
    onUpdate({editor}) {
      setEditor(editor)
    },
    onSelectionUpdate({editor}) {
      setEditor(editor)
    },
    onTransaction({editor}) {
      setEditor(editor)
    },
     onFocus({editor}) {
      setEditor(editor)
    },
    onBlur({editor}) {
      setEditor(editor)
    },
     onContentError({editor}) {
      setEditor(editor)
    },
    editorProps: {
      attributes: {
        style: `padding-left:${leftMargin ?? 56}px;padding-right:${rightMargin ?? 56}px;`,
        class:
          "focus-outline-none print:border-0 bg-white border border-[#C7C7C7] flex flex-col w-[816px] h-[1054px] pt-10 pb-10 pr-14 cursor-text",
      },
    },
    extensions: [
      StarterKit.configure({
        history:false
      }),
      liveblock,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
      }),
      TaskList,
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      Highlight.configure({ multicolor: true }),
       Underline,
      TaskItem.configure({
        nested: true,
      }),
      Table.configure({
        resizable: true,
      }),
      LineHeightExtension,
      TableRow,
      TableHeader,
      TableCell,
      FontSizeExtension,
      Image,
      ImageResize,
      TextStyle, 
      FontFamily,
      Color
    ],
  });
  return (
    <div className="size-full overflow-x-auto bg-[#F9FBFD] print:p-0 print:bg-white print:overflow-visible">
     <Ruler/>
      <div className="min-w-max flex justify-center w-[816px] py-4 print:py-0 mx-auto print:w-full print:min-w-0">
        
        <EditorContent editor={editor} />
        <Threads editor={editor}/>
      </div>
    </div>
  );
};
