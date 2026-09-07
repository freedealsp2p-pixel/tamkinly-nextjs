/**
 * Blog Authors Data Configuration
 * Centralized author profiles powering /blog/author/[slug] pages.
 * Add a new author here; the author page, JSON-LD and byline links
 * pick it up automatically.
 */

export interface BlogAuthor {
  slug: string;
  name: string; // English display name
  nameAr: string; // Arabic display name
  role: string;
  roleAr: string;
  bio: string;
  bioAr: string;
  initials: string;
  initialsAr: string;
  sameAs: string[];
}

export const BLOG_AUTHORS: BlogAuthor[] = [
  {
    slug: 'tamkinly-team',
    name: 'Tamkinly Team',
    nameAr: 'فريق تمكينلي',
    role: 'Identity Science & Behavior Change',
    roleAr: 'علم الهوية وتغيير السلوك',
    bio: 'The Tamkinly Team is the identity-science team behind Tamkinly\'s apps, guides and articles. We translate peer-reviewed research from psychology and behavioral science into practical tools that help you close the gap between who you are and who you want to become. Every article is researched, written and reviewed collaboratively — then tested against the real journeys of Tamkinly users. Our promise: no pressure, no self-judgment, no temporary motivation.',
    bioAr: 'فريق تمكينلي هو فريق علم الهوية الذي يقف وراء تطبيقات تمكنلي وأدلتها ومقالاتها. نحوّل الأبحاث المحكّمة من علم النفس وعلوم السلوك إلى أدوات عملية تساعدك على إغلاق الفجوة بين من أنت ومن تريد أن تصبح. كل مقال يُبحث ويُكتب ويُراجع بشكل جماعي — ثم يُختبر مقابل رحلات حقيقية لمستخدمي تمكنلي. وعدنا: بلا ضغط، بلا حكم على الذات، بلا تحفيز مؤقت.',
    initials: 'TT',
    initialsAr: 'تم',
    sameAs: ['https://tamkinly.com'],
  },
];

export function getAuthorBySlug(slug: string): BlogAuthor | undefined {
  return BLOG_AUTHORS.find((a) => a.slug === slug);
}

export function getAllAuthorSlugs(): string[] {
  return BLOG_AUTHORS.map((a) => a.slug);
}
