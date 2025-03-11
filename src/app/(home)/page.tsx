"use client";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
import { usePaginatedQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { DocumentsTable } from "./documents-table";
export default function Home() {
  const { results, status, loadMore } = usePaginatedQuery(
    api.document.get,
    {},
    { initialNumItems: 5 }
  );
  return (
    <div className=" min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white z-10 p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
        <DocumentsTable
          documents={results}
          loadMore={loadMore}
          status={status}
        />{" "}
      </div>{" "}
    </div>
  );
}
