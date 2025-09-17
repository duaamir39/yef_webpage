export default {
 name: 'teamMember',
 title: 'Team Member',
 type: 'document',
 fields: [
 {
 name: 'name',
 title: 'Name',
 type: 'string',
 description: 'The full name of the team member.',
 },
 {
 name: 'slug',
 title: 'Slug',
 type: 'slug',
 options: {
 source: 'name', 
 maxLength: 96,
 },
 description: 'A URL-friendly identifier for the team member.',
 },
 {
 name: 'title',
 title: 'Title',
 type: 'string',
 description: 'The role or position of the team member (e.g., Founder, Board Member).',
 },
 {
 name: 'image',
 title: 'Image',
 type: 'image',
 options: {
 hotspot: true,
 },
 description: 'A professional headshot of the team member.',
 },
 {
 name: 'bio',
 title: 'Biography',
 type: 'array',
 of: [{type: 'block'}],
 description: 'A detailed biography of the team member. This is a rich text editor.',
 },
 ],
};
