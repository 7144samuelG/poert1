import { auth, currentUser } from "@clerk/nextjs/server";
import { ConvexHttpClient } from "convex/browser";
import { api } from "../../../../convex/_generated/api";
import {Liveblocks} from "@liveblocks/node"
const convex=new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
const liveblocks=new Liveblocks({
    secret:process.env.LIVEBLOCKS_SECRET_KEY!
})
export async function  POST(req:Request){
    const {sessionClaims}=await auth();
    if(!sessionClaims){
        return new Response("unauthorized",{status:401});
    }
    const user=await currentUser();
    if(!user){
         return new Response("unauthorized",{status:401});
    };
    const {room}=await req.json();
    const document=await convex.query(api.document.getById,{id:room});
    if(!document){
        return new Response("failed",{status:401});
    };
    const isowner=document.ownerid===user.id;

    const isorganizationMember=!!(document.organizationId && document.organizationId===sessionClaims.org_id);

    if(!isowner && !isorganizationMember){
        return new Response("failed",{status:401});
    };

    const session=liveblocks.prepareSession(user.id,{
        userInfo:{
            name:user.fullName??user.primaryEmailAddress?.emailAddress??"Anonymous",
            avatar:user.imageUrl
        }
    });

    session.allow(room,session.FULL_ACCESS);
    const {body,status}=await session.authorize();
    console.log(body,status)
    return new Response (body,{status})

}