import { defineType, defineField } from "sanity";

export default defineType({
  name: "event",
  title: "Event",
  type: "document",
  fields: [
    defineField({
      name: "image",
      title: "Event Image",
      type: "image",
      options: {
        hotspot: true, // allows cropping in Studio
      },
    }),
  ],
});
