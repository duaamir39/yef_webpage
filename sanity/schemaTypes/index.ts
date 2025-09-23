import { type SchemaTypeDefinition } from "sanity";
import blog from "./blog";
import teamMember from "./teamMember";
import gallery from "./gallery";
import achievement from "./achievement";

import ourStory from "./ourStory";
import career from "./career";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [blog, teamMember, ourStory, career, gallery, achievement],
};
