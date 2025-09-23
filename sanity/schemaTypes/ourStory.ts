import { defineType, defineField } from "sanity";

const ourStory = defineType({
  name: "ourStory",
  title: "Our Story",
  type: "document",
  fields: [
    defineField({
      name: "missionTitle",
      title: "Mission Title",
      type: "string",
      initialValue: "Our Mission",
    }),
    defineField({
      name: "missionText",
      title: "Mission Text",
      type: "text",
    }),
    defineField({
      name: "visionTitle",
      title: "Vision Title",
      type: "string",
      initialValue: "Our Vission",
    }),
    defineField({
      name: "visionText",
      title: "Vission Text",
      type: "text",
    }),
    defineField({
      name: "storyTitle",
      title: "Story Title",
      type: "string",
      initialValue: "Our Story",
    }),
    defineField({
      name: "storyText",
      title: "Story Text",
      type: "text",
    }),
  ],
});

export default ourStory;
