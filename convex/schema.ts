import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
export default defineSchema({
  documents: defineTable({
    title: v.string(),
    intialContent: v.optional(v.string()),
    ownerid: v.string(),
    roomId: v.optional(v.string()),
    organizationId: v.optional(v.string()),
  })
   .index("by_owner_id",["ownerid"])
   .index("by_organization_id",["organizationId"])
   .searchIndex("by_title",{
    searchField:"title",
    filterFields:["title","organizationId"]
   }) 
  ,
});
