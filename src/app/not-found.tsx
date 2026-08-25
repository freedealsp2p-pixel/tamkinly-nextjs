import Link from 'next/link';
import { Home, Search } from 'lucide-react';
import { cookies } from 'next/headers';

export default async function NotFound() {
  let locale = 'en';
  try {
    const cookieStore = await cookies();
    const localeCookie = cookieStore.get('NEXT_LOCALE')?.value;
    if (localeCookie === 'ar') locale = 'ar';
  } catch {}

  const isAr = locale === 'ar';
  const dir = isAr ? 'rtl' : 'ltr';

  const title = isAr ? 'الصفحة غير موجودة' : 'Page Not Found';
  const message = isAr
    ? 'الصفحة التي تبحث عنها غير موجودة أو تم نقلها. دعنا نساعدك في العودة.'
    : 'The page you are looking for does not exist or has been moved. Let us help you find your way back.';
  const goHome = isAr ? 'الرئيسية' : 'Go Home';
  const search = isAr ? 'البحث' : 'Search';

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4" dir={dir}>
      <div className="max-w-md w-full text-center">
        <div className="mb-6">
          <span className="text-[120px] sm:text-[160px] font-serif font-bold leading-none bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] bg-clip-text text-transparent">
            404
          </span>
        </div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-3">
          {title}
        </h1>
        <p className="text-slate-600 mb-8">
          {message}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href={isAr ? '/ar' : '/'}
            className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold px-6 h-11 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] transition-colors shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4" />
            {goHome}
          </Link>
          <Link
            href={isAr ? '/ar/search' : '/search'}
            className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold px-6 h-11 border-2 border-[#0F1C2E] text-[#0F1C2E] hover:bg-[#0F1C2E] hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            {search}
          </Link>
        </div>
      </div>
    </div>
  );
}
