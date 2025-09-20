import { type SchemaTypeDefinition } from 'sanity'
import blog from './blog'
import teamMember from './teamMember'
import gallery from "./gallery"
export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, teamMember,gallery],
}

