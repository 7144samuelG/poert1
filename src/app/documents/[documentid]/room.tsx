"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";
import { useParams } from "next/navigation";
import { Fullscreenloader } from "@/components/full-screen-loader";
import { toast } from "sonner";
import { getDocuments, getUsers } from "./action";
import { Id } from "../../../../convex/_generated/dataModel";
type User={id:string;name:string,avatar:string}
export function Room({ children }: { children: ReactNode }) {
    const params=useParams();
    const [users,setUsers]=useState<User[]>([]);
    const fetchUsers=useMemo(
      ()=>async()=>{
        try{
          const list=await getUsers();
          setUsers(list)
        }
        catch{
          toast.error("failed to fetch users")
        }
      },[]
    )
    useEffect(()=>{
      fetchUsers();
    },[fetchUsers])
  return (
    <LiveblocksProvider 
    throttle={16}
     authEndpoint={
      async ()=>{
        const endpoint="/api/liveblocks-auth";
        const room=params.documentid as string;
        const response=await fetch(endpoint,{
          method:"POST",
          body:JSON.stringify({room})
        });
        return await response.json()
      }
     }
     resolveUsers={({userIds})=>{
      return userIds.map(
        (userId)=>users.find((user)=>user.id===userId)??undefined
      )
     }}
     resolveMentionSuggestions={({text})=>{
      let filteredusers=users;
      if(text){
        filteredusers=users.filter((user)=>user.name.toLocaleLowerCase().includes(text.toLowerCase()))
      };
      return filteredusers.map((user)=>user.id)
     }}
     resolveRoomsInfo={async ({roomIds})=>{
      const documents=await getDocuments(roomIds as Id<"documents">[]);
      return documents.map((document)=>(
        {
          id:document.id,
          name:document.name
        }
      ))
     }
     }
    >
      <RoomProvider id={params.documentid as string} initialStorage={{
        leftMargin:56,
        rightMargin:56
      }}>
        <ClientSideSuspense fallback={<Fullscreenloader label="room loading ..."/>}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}