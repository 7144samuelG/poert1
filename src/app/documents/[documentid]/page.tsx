import { Editor } from "./editor";
import { ToolBar } from "./toolbar";
const DocumentsPage = () => {
  return (
    <div className="min-h-screen bg-[#FAFBFD]">
      <ToolBar />
      <Editor />
    </div>
  );
};

export default DocumentsPage;
