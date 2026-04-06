'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale, useTranslations } from "@/components/providers/LocaleProvider";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Menu, ShoppingCart, Search, Globe, Loader2 } from "lucide-react";

// Search pages data - comprehensive list for better search
const searchablePages = [
  { titleKey: "navigation.home", path: "/", keywords: ["home", "main", "start", "landing", "الرئيسية"] },
  { titleKey: "navigation.products", path: "/products", keywords: ["pricing", "buy", "purchase", "planner", "bundle", "premium", "trial", "المنتجات", "الأسعار"] },
  { titleKey: "navigation.apps", path: "/apps", keywords: ["tools", "applications", "quiz", "assessment", "التطبيقات", "الأدوات"] },
  { titleKey: "navigation.quiz", path: "/quiz", keywords: ["quiz", "assessment", "test", "identity", "gap", "اختبار", "تقييم", "فجوة"] },
  { titleKey: "navigation.methodology", path: "/methodology", keywords: ["method", "approach", "how", "process", "المنهجية"] },
  { titleKey: "navigation.about", path: "/about", keywords: ["about", "team", "founder", "story", "mission", "من نحن"] },
  { titleKey: "navigation.contact", path: "/contact", keywords: ["contact", "support", "help", "email", "تواصل"] },
  { titleKey: "navigation.resources", path: "/resources", keywords: ["resources", "blog", "articles", "guides", "الموارد"] },
  { titleKey: "navigation.blog", path: "/blog", keywords: ["blog", "articles", "posts", "news", "المدونة"] },
  // Popular Apps
  { titleKey: "search.identityQuiz", path: "/apps/identity-gap-quiz", keywords: ["identity", "quiz", "gap", "assessment", "هوية", "اختبار"] },
  { titleKey: "search.habitTracker", path: "/apps/habit-tracker", keywords: ["habit", "tracker", "habits", "عادات", "متتبع"] },
  { titleKey: "search.goalSystem", path: "/apps/goal-system", keywords: ["goal", "goals", "system", "أهداف", "نظام"] },
  { titleKey: "search.aiCoach", path: "/apps/ai-identity-coach", keywords: ["ai", "coach", "artificial", "intelligence", "ذكاء", "مدرب"] },
  { titleKey: "search.dailyReflection", path: "/apps/daily-reflection", keywords: ["daily", "reflection", "journal", "يومي", "تأمل"] },
];

// Custom hook to safely detect client-side mounting
function useHydrated() {
  const [hydrated, setHydrated] = useState(false);
  
  useEffect(() => {
    const timer = setTimeout(() => setHydrated(true), 0);
    return () => clearTimeout(timer);
  }, []);
  
  return hydrated;
}

// Language Switcher Component
function LanguageSwitcher() {
  const { locale, direction } = useLocale();
  const t = useTranslations("language");
  const pathname = usePathname();
  const router = useRouter();

  const switchLocale = (newLocale: 'en' | 'ar') => {
    const pathWithoutLocale = pathname.replace(/^\/ar/, '') || '/';
    if (newLocale === 'ar') {
      router.push(`/ar${pathWithoutLocale === '/' ? '' : pathWithoutLocale}`);
    } else {
      router.push(pathWithoutLocale);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="text-slate-600 hover:text-primary">
          <Globe className="h-5 w-5" />
          <span className="sr-only">{t("switch")}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={direction === 'rtl' ? 'start' : 'end'}>
        <DropdownMenuItem
          onClick={() => switchLocale('en')}
          className={locale === 'en' ? 'bg-accent/10' : ''}
        >
          {t("en")}
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => switchLocale('ar')}
          className={locale === 'ar' ? 'bg-accent/10' : ''}
        >
          {t("ar")}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Mobile menu component
function MobileMenu({ isOpen, setIsOpen }: { isOpen: boolean; setIsOpen: (open: boolean) => void }) {
  const hydrated = useHydrated();
  const t = useTranslations();
  const { locale, direction } = useLocale();
  const pathname = usePathname();

  if (!hydrated) {
    return (
      <Button variant="ghost" size="icon" className="md:hidden text-primary opacity-0" aria-hidden>
        <Menu className="h-6 w-6" />
      </Button>
    );
  }

  const navItems = [
    { href: "/", label: t("navigation.home") },
    { href: "/products", label: t("navigation.products") },
    { href: "/apps", label: t("navigation.apps") },
    { href: "/methodology", label: t("navigation.methodology") },
    { href: "/about", label: t("navigation.about") },
    { href: "/contact", label: t("navigation.contact") },
  ];

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild className="md:hidden">
        <Button variant="ghost" size="icon" className="text-primary">
          <Menu className="h-6 w-6" />
        </Button>
      </SheetTrigger>
      <SheetContent side={direction === 'rtl' ? 'left' : 'right'} className="w-[300px] sm:w-[350px] pt-6 overflow-y-auto">
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2.5">
              <div className="relative w-10 h-10 flex items-center justify-center">
                <Image
                  src="/logo-icon.png"
                  alt="Tamkinly Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  priority
                />
              </div>
              <span className="font-serif text-xl font-bold text-primary">
                Tamkinly
              </span>
            </Link>
          </div>

          <nav className="flex flex-col space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`px-4 py-3 text-base font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'text-primary bg-accent/10'
                    : 'text-slate-700 hover:text-primary hover:bg-accent/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-auto pt-8 space-y-3 pb-4">
            {/* Language Switcher for Mobile */}
            <div className="flex justify-center gap-2 px-4">
              <LanguageSwitcher />
            </div>

            <Link href="/cart" onClick={() => setIsOpen(false)}>
              <Button variant="outline" className="w-full justify-start border-primary/20 text-primary hover:bg-primary/5">
                <ShoppingCart className="h-4 w-4 mx-2 rtl:mr-0 rtl:ml-2" />
                {t("navigation.cart")} (0)
              </Button>
            </Link>
            <Link href="/quiz" onClick={() => setIsOpen(false)}>
              <Button className="w-full bg-accent text-primary hover:bg-accent/90 font-semibold">
                {t("hero.cta")}
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof searchablePages>([]);
  const [showResults, setShowResults] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isSearching, setIsSearching] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations();
  const { direction } = useLocale();

  const navItems = [
    { href: "/", label: t("navigation.home") },
    { href: "/products", label: t("navigation.products") },
    { href: "/apps", label: t("navigation.apps") },
    { href: "/methodology", label: t("navigation.methodology") },
    { href: "/about", label: t("navigation.about") },
    { href: "/contact", label: t("navigation.contact") },
  ];

  // Handle search with debounce and loading state
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setSelectedIndex(-1);

    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      setIsSearching(false);
      return;
    }

    // Show loading state
    setIsSearching(true);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const results = searchablePages.filter(page =>
        t(page.titleKey).toLowerCase().includes(lowerQuery) ||
        page.keywords.some(keyword => keyword.includes(lowerQuery))
      );

      setSearchResults(results);
      setShowResults(true);
      setIsSearching(false);
    }, 150);
  }, [t]);

  // Navigate to result
  const handleSelectResult = useCallback((path: string) => {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
    setSelectedIndex(-1);
    setIsSearching(false);
    searchInputRef.current?.blur();
    router.push(path);
  }, [router]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showResults || searchResults.length === 0) {
      // If there's a query but no results shown, try searching on Enter
      if (e.key === 'Enter' && searchQuery.trim()) {
        e.preventDefault();
        handleSearch(searchQuery);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev < searchResults.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev =>
          prev > 0 ? prev - 1 : searchResults.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelectResult(searchResults[selectedIndex].path);
        } else if (searchResults.length > 0) {
          // Navigate to first result if none selected
          handleSelectResult(searchResults[0].path);
        }
        break;
      case 'Escape':
        e.preventDefault();
        setShowResults(false);
        setSelectedIndex(-1);
        searchInputRef.current?.blur();
        break;
    }
  }, [showResults, searchResults, selectedIndex, searchQuery, handleSearch, handleSelectResult]);

  // Close search on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchInputRef.current && !searchInputRef.current.contains(e.target as Node)) {
        setShowResults(false);
        setSelectedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 border-b border-slate-100/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image 
                src="/logo-icon.png" 
                alt="Tamkinly Logo" 
                width={40}
                height={40}
                className="object-contain"
                priority
              />
            </div>
            <span className="font-serif text-xl font-bold text-primary group-hover:text-secondary transition-colors">
              Tamkinly
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                  pathname === item.href
                    ? 'text-primary font-semibold bg-accent/10'
                    : 'text-slate-600 hover:text-primary hover:bg-accent/10'
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Input with Results */}
          <div className="hidden lg:flex items-center relative">
            <div className="relative">
              {isSearching ? (
                <Loader2 className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 animate-spin" />
              ) : (
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              )}
              <Input
                ref={searchInputRef}
                type="search"
                placeholder={t("common.search")}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                onKeyDown={handleKeyDown}
                className="w-48 ps-9 h-9 bg-slate-50 border-slate-200 focus:border-accent focus:ring-accent/20 text-sm"
              />
            </div>
            
            {/* Search Results Dropdown */}
            {showResults && searchResults.length > 0 && (
              <div className="absolute top-full mt-2 start-0 w-64 bg-white rounded-lg shadow-lg border border-slate-200 overflow-hidden z-50">
                {searchResults.map((result, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectResult(result.path)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`w-full px-4 py-3 text-start transition-colors flex items-center gap-3 ${
                      selectedIndex === idx
                        ? 'bg-accent/20 text-primary'
                        : 'hover:bg-accent/10 text-slate-700'
                    }`}
                  >
                    <Search className="h-4 w-4 text-slate-400 flex-shrink-0" />
                    <span className="truncate">{t(result.titleKey)}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* No Results */}
            {showResults && searchQuery && searchResults.length === 0 && !isSearching && (
              <div className="absolute top-full mt-2 start-0 w-64 bg-white rounded-lg shadow-lg border border-slate-200 p-4 z-50">
                <p className="text-slate-500 text-sm">{t("common.noResults")} &quot;{searchQuery}&quot;</p>
              </div>
            )}
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3 rtl:space-x-reverse">
            {/* Language Switcher */}
            <LanguageSwitcher />
            
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative text-slate-600 hover:text-primary">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -end-1 h-5 w-5 rounded-full bg-accent text-[10px] font-bold text-primary flex items-center justify-center shadow-sm">
                  0
                </span>
              </Button>
            </Link>
            <Link href="/quiz">
              <Button className="bg-accent text-primary hover:bg-accent/90 font-semibold shadow-sm hover:shadow-md transition-all">
                {t("hero.cta")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
        </div>
      </div>
    </header>
  );
}
