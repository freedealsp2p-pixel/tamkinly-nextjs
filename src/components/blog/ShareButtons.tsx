'use client';

import { Twitter, Linkedin, Facebook, Link2, Check } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';

interface ShareButtonsProps {
  url: string;
  title: string;
  description?: string;
}

export function ShareButtons({ url, title, description }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedDescription = encodeURIComponent(description || title);

  const shareLinks = [
    {
      name: 'Twitter / X',
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      color: 'hover:text-slate-900 hover:bg-slate-100',
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'hover:text-blue-600 hover:bg-blue-50',
    },
    {
      name: 'Facebook',
      icon: Facebook,
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'hover:text-blue-700 hover:bg-blue-50',
    },
  ];

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement('textarea');
      textarea.value = url;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy');
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="text-sm text-slate-500 font-medium mr-1">Share:</span>
      {shareLinks.map((link) => (
        <Button
          key={link.name}
          variant="ghost"
          size="sm"
          asChild
          className={`h-9 px-3 text-slate-500 ${link.color}`}
          aria-label={`Share on ${link.name}`}
        >
          <a href={link.href} target="_blank" rel="noopener noreferrer">
            <link.icon className="h-4 w-4" />
            <span className="hidden sm:inline ml-1.5 text-xs">{link.name}</span>
          </a>
        </Button>
      ))}
      <Button
        variant="ghost"
        size="sm"
        onClick={copyLink}
        className="h-9 px-3 text-slate-500 hover:text-green-600 hover:bg-green-50"
        aria-label="Copy link"
      >
        {copied ? <Check className="h-4 w-4 text-green-600" /> : <Link2 className="h-4 w-4" />}
        <span className="hidden sm:inline ml-1.5 text-xs">
          {copied ? 'Copied!' : 'Copy Link'}
        </span>
      </Button>
    </div>
  );
}
