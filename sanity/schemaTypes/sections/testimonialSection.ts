import { defineType, defineField } from 'sanity'

export const testimonialSection = defineType({
  name: 'testimonialSection',
  title: 'Testimonials Section (سكشن الآراء)',
  type: 'object',
  fields: [
    defineField({ name: 'heading_en', title: 'Heading (EN)', type: 'string', initialValue: 'What My Clients Say', description: "عنوان القسم بالإنجليزي." }),
    defineField({ name: 'heading_ar', title: 'Heading (AR)', type: 'string', initialValue: 'ماذا يقول عملائي', description: "عنوان القسم بالعربي." }),
    defineField({ name: 'subtitle_en', title: 'Subtitle (EN)', type: 'string', initialValue: 'Success stories and experiences.', description: "وصف القسم بالإنجليزي." }),
    defineField({ name: 'subtitle_ar', title: 'Subtitle (AR)', type: 'string', initialValue: 'قصص نجاح وتجارب حقيقية', description: "وصف القسم بالعربي." }),
    defineField({ name: 'speed', title: 'Animation Speed', type: 'number', description: 'سرعة السلايدر في اللفة الكاملة (يفضل 40. الرقم الأصغر = أسرع).', initialValue: 40 }),
    defineField({
      name: 'selectedTestimonials', title: 'Select Testimonials (اختيار الآراء)', type: 'array', description: 'اضغط هنا لربط الآراء اللي كتبتها في صفحة (Testimonials) الأساسية عشان تظهر هنا.',
      of: [{ type: 'reference', to: [{ type: 'testimonial' }] }]
    })
  ],
  preview: { prepare() { return { title: '💬 سكشن آراء العملاء' } } }
})