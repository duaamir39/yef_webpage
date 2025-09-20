import { type SchemaTypeDefinition } from 'sanity'
import blog from './blog'
import teamMember from './teamMember'
import gallery from "./gallery"
import achievement from "./achievement";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, teamMember,gallery, achievement],
}


