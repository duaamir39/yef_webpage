import { defineType, defineField } from "sanity";

const career = defineType({
  name: "career",
  title: "Careers & Internships",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Job Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "subtitle",
      title: "Short Heading",
      type: "string",
      description:
        "Small tagline under the job title (e.g. Work with React & Next.js)",
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Job Description",
      type: "text",
      rows: 5,
      description: "Write a detailed description of the job/internship role",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "badge",
      title: "Work Type",
      type: "string",
      description: "Example: Full-time, Remote, On-site",
    }),

    defineField({
      name: "category",
      title: "Category",
      type: "string",
      options: {
        list: [
          { title: "Technology", value: "technology" },
          { title: "Design", value: "design" },
          { title: "Marketing", value: "marketing" },
          { title: "Management", value: "management" },
          { title: "Internship", value: "internship" },
          { title: "Others", value: "others" },
        ],
        layout: "dropdown",
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "Location",
      title: "Duration / Location",
      type: "string",
      description:
        "Example: 3 Months, Internship, Entry-level, Contract, onsite, karachi",
    }),

    defineField({
      name: "image",
      title: "Job Image ",
      type: "image",
      description: "Upload an image that represents this job or internship",
      options: { hotspot: true },
    }),

    defineField({
      name: "applyLink",
      title: "Apply Link",
      type: "url",
      description:
        "Paste the Google Form or external link where applicants can apply",
      validation: (Rule) => Rule.uri({ scheme: ["http", "https"] }).required(),
    }),
  ],
});

export default career;
