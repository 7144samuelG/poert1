import { auth } from "@clerk/nextjs/server";
import { Id } from "../../../../convex/_generated/dataModel";
import { preloadQuery } from "convex/nextjs";
import { api } from "../../../../convex/_generated/api";
import { Document } from "./document";

interface DocumentIdPageProps{
  params:Promise<{documentid:Id<"documents">}>
}
const DocumentIdPage =async ({params}:DocumentIdPageProps) => {
  const {documentid}=await params;
  const{getToken}=await auth();
  const token =await getToken({template:"convex"})??undefined;
  if(!token){
    throw new Error("unauthorized")
  };
  const preloadedDocument=await preloadQuery(
    api.document.getById,
    {id:documentid},
    {token}
  )
  return <Document preloadeddocument={preloadedDocument}/>;
};

export default DocumentIdPage;
