'use client';

import Link from 'next/link';
import { ArrowRight, ArrowLeft, type LucideIcon } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLocale } from '@/components/providers/LocaleProvider';

interface RecoveryCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  status?: 'available' | 'coming';
  comingSoonLabel?: string;
}

export function RecoveryCard({
  title,
  description,
  icon: Icon,
  href,
  status = 'available',
  comingSoonLabel,
}: RecoveryCardProps) {
  const { direction } = useLocale();
  const Arrow = direction === 'rtl' ? ArrowLeft : ArrowRight;

  const cardContent = (
    <div className="flex items-center gap-4">
      <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-[#1F6F78]/10 flex items-center justify-center">
        <Icon className="w-5 h-5 text-[#1F6F78]" />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-[#0F1C2E]">{title}</h3>
          {status === 'coming' && comingSoonLabel && (
            <Badge
              variant="secondary"
              className="text-[10px] px-2 py-0.5 bg-slate-100 text-slate-500"
            >
              {comingSoonLabel}
            </Badge>
          )}
        </div>
        <p className="text-sm text-slate-500 mt-0.5 leading-relaxed">{description}</p>
      </div>
      {status === 'available' && (
        <Arrow className="w-5 h-5 text-slate-300 flex-shrink-0" />
      )}
    </div>
  );

  if (status === 'available' && href) {
    return (
      <Link href={href} className="block">
        <Card className="cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 border border-slate-200 hover:border-[#1F6F78]/40">
          <CardContent className="p-6">{cardContent}</CardContent>
        </Card>
      </Link>
    );
  }

  return (
    <Card className="border border-slate-200 opacity-70">
      <CardContent className="p-6">{cardContent}</CardContent>
    </Card>
  );
}
