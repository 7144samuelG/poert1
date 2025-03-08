"use client";
import Image from "next/image";
import Link from "next/link";
import { NavBar } from "./navbar";
import { TemplateGallery } from "./template-gallery";
export default function Home() {
  return (
    <div className=" min-h-screen flex flex-col">
      <div className="fixed top-0 left-0 right-0 h-16 bg-white z-10 p-4">
        <NavBar />
      </div>
      <div className="mt-16">
        <TemplateGallery />
      </div>{" "}
    </div>
  );
}
