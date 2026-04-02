'use client';

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
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
import { Menu, ShoppingCart, Search, Globe } from "lucide-react";

// Search pages data
const searchablePages = [
  { titleKey: "navigation.home", path: "/", keywords: ["home", "main", "start", "landing"] },
  { titleKey: "navigation.products", path: "/products", keywords: ["pricing", "buy", "purchase", "planner", "bundle", "premium", "trial"] },
  { titleKey: "navigation.apps", path: "/apps", keywords: ["tools", "applications", "quiz", "assessment"] },
  { titleKey: "navigation.quiz", path: "/quiz", keywords: ["quiz", "assessment", "test", "identity", "gap"] },
  { titleKey: "navigation.methodology", path: "/methodology", keywords: ["method", "approach", "how", "process"] },
  { titleKey: "navigation.about", path: "/about", keywords: ["about", "team", "founder", "story", "mission"] },
  { titleKey: "navigation.contact", path: "/contact", keywords: ["contact", "support", "help", "email"] },
  { titleKey: "navigation.resources", path: "/resources", keywords: ["resources", "blog", "articles", "guides"] },
  { titleKey: "navigation.blog", path: "/blog", keywords: ["blog", "articles", "posts", "news"] },
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
  const { locale, setLocale, direction } = useLocale();
  const t = useTranslations("language");

  const switchLocale = (newLocale: 'en' | 'ar') => {
    setLocale(newLocale);
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
                  src="/logo-icon.png?v=7"
                  alt="Tamkinly Logo"
                  width={40}
                  height={40}
                  className="object-contain"
                  unoptimized
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
                className="px-4 py-3 text-base font-medium text-slate-700 hover:text-primary hover:bg-accent/10 rounded-lg transition-colors"
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

  // Handle search
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setSearchResults([]);
      setShowResults(false);
      return;
    }

    const lowerQuery = query.toLowerCase();
    const results = searchablePages.filter(page => 
      t(page.titleKey).toLowerCase().includes(lowerQuery) ||
      page.keywords.some(keyword => keyword.includes(lowerQuery))
    );
    
    setSearchResults(results);
    setShowResults(true);
  };

  // Navigate to result
  const handleSelectResult = (path: string) => {
    setShowResults(false);
    setSearchQuery("");
    router.push(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white/95 backdrop-blur-md supports-[backdrop-filter]:bg-white/90 border-b border-slate-100/80 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="relative w-10 h-10 flex items-center justify-center group-hover:scale-105 transition-transform">
              <Image 
                src="/logo-icon.png?v=7" 
                alt="Tamkinly Logo" 
                width={40}
                height={40}
                className="object-contain"
                priority
                unoptimized
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
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-primary transition-colors rounded-lg hover:bg-accent/10"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search Input with Results */}
          <div className="hidden lg:flex items-center relative">
            <div className="relative">
              <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                type="search"
                placeholder={t("common.search")}
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onFocus={() => searchQuery && setShowResults(true)}
                onBlur={() => setTimeout(() => setShowResults(false), 200)}
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
                    className="w-full px-4 py-3 text-start hover:bg-accent/10 transition-colors flex items-center gap-3"
                  >
                    <Search className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-700">{t(result.titleKey)}</span>
                  </button>
                ))}
              </div>
            )}
            
            {/* No Results */}
            {showResults && searchQuery && searchResults.length === 0 && (
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
