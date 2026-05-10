import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonials (آراء العملاء)',
  type: 'document',
  fields: [
    defineField({
      name: 'reviewType', title: 'Review Type (نوع الرأي)', type: 'string', description: 'هتكتب الرأي كنص، ولا هترفع سكرين شوت من الشات؟',
      options: { list: [{ title: 'نص عادي ونجوم', value: 'text' }, { title: 'صورة الشات (Screenshot)', value: 'image' }], layout: 'radio' }, initialValue: 'text'
    }),
    defineField({ name: 'name_en', title: 'Client Name (EN)', type: 'string', description: 'اسم العميل بالإنجليزي.' }),
    defineField({ name: 'name_ar', title: 'Client Name (AR)', type: 'string', description: 'اسم العميل بالعربي.' }),
    defineField({ name: 'role_en', title: 'Client Role (EN)', type: 'string', description: 'وظيفته بالإنجليزي. مثال: CEO' }),
    defineField({ name: 'role_ar', title: 'Client Role (AR)', type: 'string', description: 'وظيفته بالعربي. مثال: مدير تنفيذي' }),
    defineField({ name: 'text_en', title: 'Review Text (EN)', type: 'text', hidden: ({ document }) => document?.reviewType === 'image', description: 'كلام العميل بالإنجليزي.' }),
    defineField({ name: 'text_ar', title: 'Review Text (AR)', type: 'text', hidden: ({ document }) => document?.reviewType === 'image', description: 'كلام العميل بالعربي.' }),
    defineField({ name: 'rating', title: 'Rating (1 to 5)', type: 'number', initialValue: 5, validation: (Rule) => Rule.required().min(1).max(5), hidden: ({ document }) => document?.reviewType === 'image', description: 'عدد النجوم من 1 لـ 5.' }),
    defineField({ name: 'chatScreenshot', title: 'Chat Screenshot', type: 'image', options: { hotspot: true }, hidden: ({ document }) => document?.reviewType === 'text', description: 'ارفع صورة الشات هنا.' }),
  ],
  preview: { select: { title: 'name_en', subtitle: 'role_en', media: 'chatScreenshot' } },
})