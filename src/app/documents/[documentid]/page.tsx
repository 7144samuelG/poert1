import { Editor } from "./editor";
import { NavBar } from "./navabar";
import { ToolBar } from "./toolbar";
const DocumentsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 right-0 left-0 z-10 print-hidden bg-[#FAFBFD]">
        <NavBar />
        <ToolBar />
      </div>
      <div className="pt-[114px] print:pt-0">
        <Editor />
      </div>
    </div>
  );
};

export default DocumentsPage;
