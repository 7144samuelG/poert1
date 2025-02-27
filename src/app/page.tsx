"use client"
import Image from "next/image";
import Link from "next/link"
export default function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen"> click me <Link href="/documents/123">here</Link> </div>
  );
}
