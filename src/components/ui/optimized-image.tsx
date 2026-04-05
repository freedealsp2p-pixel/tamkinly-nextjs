/**
 * OptimizedImage component with WebP support and fallback
 * Provides automatic WebP format with PNG/JPG fallback
 */
'use client';

import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  style?: React.CSSProperties;
  loading?: 'lazy' | 'eager';
  decoding?: 'async' | 'sync' | 'auto';
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  fill = false,
  style,
  loading = 'lazy',
  decoding = 'async',
}: OptimizedImageProps) {
  const [error, setError] = useState(false);

  // Generate WebP src by replacing extension
  const getWebpSrc = (originalSrc: string) => {
    if (originalSrc.includes('?')) {
      return originalSrc.replace(/\.(jpg|jpeg|png)(\?)/, '.webp$2');
    }
    return originalSrc.replace(/\.(jpg|jpeg|png)$/, '.webp');
  };

  const webpSrc = getWebpSrc(src);
  const shouldUseWebp = !error && (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'));

  if (fill) {
    return (
      <img
        src={shouldUseWebp ? webpSrc : src}
        alt={alt}
        loading={priority ? 'eager' : loading}
        decoding={decoding}
        onError={() => setError(true)}
        className={className}
        style={style}
      />
    );
  }

  return (
    <img
      src={shouldUseWebp ? webpSrc : src}
      alt={alt}
      width={width}
      height={height}
      loading={priority ? 'eager' : loading}
      decoding={decoding}
      onError={() => setError(true)}
      className={className}
      style={style}
    />
  );
}
