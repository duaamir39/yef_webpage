import { defineType, defineField } from 'sanity'

const careerHero = defineType({
  name: 'careerHero',
  title: 'Career Hero Section',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'subheading',
      title: 'Subheading',
      type: 'text',
      rows: 3
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required()
    })
  ],
})

export default careerHero;
