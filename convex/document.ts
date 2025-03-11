import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { paginationOptsValidator } from "convex/server";
export const create=mutation({
    args:{
        title:v.optional(v.string()),
        initialContent:v.optional(v.string())
    },
    handler:async(ctx,args)=>{
        const user=await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("unauthorized");
        }
        return await ctx.db.insert("documents",{
            title:args.title??"Untitled content",
            ownerid:user.subject,
            intialContent:args.initialContent
        })
    }
})
export const get=query({
    args:{
        paginationOpts:paginationOptsValidator,
    },
    handler:async(ctx,args)=>{
        return await ctx.db.query("documents").paginate(args.paginationOpts)
    }
})
export const removeById=mutation({
    args:{
        documentid:v.id("documents")
    },
    handler:async(ctx,args)=>{
        const user=await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("umauthorized");
        };

        const getdocument=await ctx.db.get(args.documentid);

        if(!getdocument){
            throw new ConvexError("document not found")
        }

        const owner=getdocument.ownerid===user.subject;

        if(!owner){
            throw new ConvexError("only owner can perform this action")
        }
        return await ctx.db.delete(args.documentid);
    }
})
export const updateById=mutation({
    args:{
        documentid:v.id("documents"),
        title:v.string()
    },
    handler:async(ctx,args)=>{
        const user=await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("umauthorized");
        };

        const getdocument=await ctx.db.get(args.documentid);

        if(!getdocument){
            throw new ConvexError("document not found")
        }

        const owner=getdocument.ownerid===user.subject;

        if(!owner){
            throw new ConvexError("only owner can perform this action")
        }
        return await ctx.db.patch(args.documentid,{title:args.title});
    }
})