import { type SchemaTypeDefinition } from 'sanity'
import blog from './blog'
import teamMember from './teamMember'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, teamMember],
}