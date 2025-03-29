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
        console.log({user})
        if(!user){
            throw new ConvexError("unauthorized");
        };
          const organizationid=(user.organization_id??undefined) as 
        |string|undefined
        return await ctx.db.insert("documents",{
            title:args.title??"Untitled content",
            ownerid:user.subject,
            organizationId:organizationid,
            intialContent:args.initialContent
        })
    }
})
export const get=query({
    args:{
        paginationOpts:paginationOptsValidator,
        search:v.optional(v.string())
    },
    handler:async(ctx,{paginationOpts,search})=>{
        const user=await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("unauthorized");
        };
        const organizationid=(user.organization_id??undefined) as 
        |string|undefined;

        if(search && organizationid){
            return  await ctx.db.query("documents")
            .withSearchIndex("by_title",(q)=>q.search("title",search).eq("organizationId",organizationid)).paginate(paginationOpts)
        }
        if(organizationid){
            return await ctx.db.query("documents")
            .withIndex("by_organization_id",(q)=>q.eq("organizationId",organizationid))
            .paginate(paginationOpts)
        }
        if(search){
          return  await ctx.db.query("documents")
            .withSearchIndex("by_title",(q)=>q.search("title",search).eq("ownerid",user.subject)).paginate(paginationOpts)
        }
        return await ctx.db.query("documents")
        .withIndex("by_owner_id",(q)=>q.eq("ownerid",user.subject))
        .paginate(paginationOpts)
    }
})
export const removeById=mutation({
    args:{
        documentid:v.id("documents")
    },
    handler:async(ctx,args)=>{
        const user=await ctx.auth.getUserIdentity();
        if(!user){
            throw new ConvexError("unauthorized");
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
export const getById=query({
    args:{
        id:v.id("documents")
    },
    handler:async(ctx,{id})=>{
        const document=await ctx.db.get(id);

         if(!document){
            throw new ConvexError("document not found")
         }
        return document;
    }
})

export const getByIds=query({
    args:{
        ids:v.array(v.id("documents"))
    },
    handler:async(ctx,{ids})=>{
        const documents=[];
        for(const id of ids){
            const document=await ctx.db.get(id);
            if(document){
                documents.push({id:document._id,name:document.title})
            }else{
                documents.push({id,name:["Removed"]})
            }
        }
        return documents;
    }
})