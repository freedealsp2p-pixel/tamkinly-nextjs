import Link from 'next/link';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 Number */}
        <div className="mb-6">
          <span className="text-[120px] sm:text-[160px] font-serif font-bold leading-none bg-gradient-to-br from-[#0F1C2E] to-[#1F6F78] bg-clip-text text-transparent">
            404
          </span>
        </div>

        {/* Message */}
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-[#0F1C2E] mb-3">
          Page Not Found
        </h1>
        <p className="text-slate-600 mb-8">
          The page you are looking for does not exist or has been moved. Let us help you find your way back.
        </p>

        {/* Actions - using only Link components (no onClick for server compatibility) */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold px-6 h-11 bg-[#3DD4B0] text-[#0F1C2E] hover:bg-[#2BC49E] transition-colors shadow-lg hover:shadow-xl"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <Link
            href="/search"
            className="inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold px-6 h-11 border-2 border-[#0F1C2E] text-[#0F1C2E] hover:bg-[#0F1C2E] hover:text-white transition-colors"
          >
            <Search className="w-4 h-4" />
            Search
          </Link>
        </div>
      </div>
    </div>
  );
}
