"use client";
import { SignIn } from "@clerk/clerk-react";
import Image from "next/image";

export const WelcomePage = () => {
  return (
    <div className="">
      <div className="flex items-center justify-center space-x-7">
        <div className="">
          <div className="flex items-center space-x-3 gap-5">
            <Image src="/logo.svg" alt="navbar" width={56} height={56} />
            <h1 className="font-bold text-lg  text-muted-foreground ">
              SGN Docs
            </h1>
          </div>
          <div className="">
            <h1 className="text-[3rem] font-bold">
              Online,
              <br /> collaborative <br />
              documents,
            </h1>
            <h3 className="">Effortlessly create documents</h3>
            <p className="w-[700px] text-start text-muted-foreground py-2">
              Never start a document from scratch - get started with templates
              and building blocks to get a professional look from the start.
            </p>
          </div>
        </div>
        <SignIn />
      </div>
      <div className="flex justify-center py-5">
        <h3 className="font-mediyum text-muted-foreground">
          Collaborate on and refine your document, from anywhere
        </h3>
      </div>
    </div>
  );
};
