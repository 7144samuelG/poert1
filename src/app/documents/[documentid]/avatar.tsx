"use client"
import { Separator } from "@/components/ui/separator";
import {useOthers, useSelf } from "@liveblocks/react/suspense";
import { ClientSideSuspense } from "@liveblocks/react";
const AVATAR_SIZE=36;
interface AvatarProps{
    src:string;
    name:string;
};
export const Avatars=()=>{
    return(
        <ClientSideSuspense fallback={null}>
            <AvatarSstack/>
        </ClientSideSuspense>
    )
}

const AvatarSstack=()=>{
    const users=useOthers();
    const currentuser=useSelf();
    if(users.length===0)return null;
    return(
        <>
          <div className="flex items-center">
            {
                currentuser&&(
                    <div className="relative ml-2">
                        <Avatar src={currentuser.info.avatar} name="you"/>
                    </div>
                )
            }
            <div className="flex">
                {
                    users.map(({id,info})=>{
                        return(
                            <Avatar key={id} src={info.avatar} name={info.name}/>
                        )
                    })
                }
            </div>
          </div>
          <Separator orientation="vertical" className="h-6"/>
        </>
    )
}
const Avatar=({src,name}:AvatarProps)=>{
    return(
        <div
          style={{
            width:AVATAR_SIZE,
            height:AVATAR_SIZE
          }}
         className="group -ml-2 flex shrink-0 place-content-center relative border-4 border-white rounded-full bg-gray-400">
            <div className="opacity-0 hover:opacity-100 absolute top-full py-1 px-2 text-white text-xs  rounded-lg mt-2.5 z-10 bg-black whitespace-nowrap transition-opacity">
                {name}
            </div>
            <img alt={name} src={src} className=""/>       
      </div>
    )
}