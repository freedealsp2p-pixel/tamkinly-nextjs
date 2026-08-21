/**
 * Shared OG Image Generation Utility for Tamkinly
 * Used by both [slug]/opengraph-image.tsx and individual blog article directories
 * Ensures consistent styling across all dynamically generated OG images
 */

import { ImageResponse } from 'next/og';
import type { BlogArticle } from './blog-articles';

// Standard size for OG images
export const OG_SIZE = { width: 1200, height: 630 };

// Brand colors
const COLORS = {
  bg: '#0F1C2E',
  bgLight: '#1a2d47',
  accent: '#3DD4B0',
  accentDark: '#2bb89a',
  accentDarker: '#1a9d80',
  teal: '#1F6F78',
  white: '#ffffff',
  gray: '#94a3b8',
  grayDark: '#64748b',
  serifFont: 'Georgia, serif',
  sansFont: 'system-ui, sans-serif',
};

/**
 * Generate a blog article OG image
 * Works for both dynamic [slug] routes and individual article directories
 */
export function generateBlogArticleImage(article: BlogArticle | undefined, fallbackTitle?: string): ImageResponse {
  const title = article?.title || fallbackTitle || 'Tamkinly Blog';
  const category = article?.category || 'Blog';
  const description = article?.description || 'Science-backed identity transformation tools';
  const shortDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;
  const tier = article?.tier;
  const readTime = article?.readTime;

  // Category badge color
  const getCategoryColor = (cat: string): string => {
    if (cat.includes('FREE')) return '#3DD4B0';
    if (cat.includes('BASIC')) return '#2A8A94';
    if (cat.includes('MASTERY')) return '#7AEEE0';
    if (cat.includes('Worksheet')) return '#1F6F78';
    return COLORS.accent;
  };

  const catColor = getCategoryColor(category);

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        background: COLORS.bg,
        overflow: 'hidden',
      }}>
        {/* Left side - Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
        }}>
          {/* Category badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: '20px',
            background: `${catColor}20`,
            marginBottom: '24px',
            alignSelf: 'flex-start',
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: catColor,
              fontFamily: COLORS.sansFont,
            }}>
              {category}
            </span>
            {readTime && (
              <span style={{
                fontSize: '13px',
                color: COLORS.grayDark,
                fontFamily: COLORS.sansFont,
              }}>
                · {readTime}
              </span>
            )}
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: title.length > 60 ? '34px' : '42px',
            fontWeight: 'bold',
            color: COLORS.white,
            fontFamily: COLORS.serifFont,
            marginBottom: '16px',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}>
            {title}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '18px',
            color: COLORS.gray,
            fontFamily: COLORS.sansFont,
            lineHeight: 1.5,
            marginBottom: '24px',
          }}>
            {shortDesc}
          </p>

          {/* Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '32px',
              height: '32px',
              borderRadius: '8px',
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accentDark})`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: COLORS.bg,
                fontFamily: COLORS.serifFont,
              }}>T</span>
            </div>
            <span style={{
              fontSize: '14px',
              color: COLORS.grayDark,
              fontFamily: COLORS.sansFont,
            }}>
              tamkinly.com
            </span>
          </div>
        </div>

        {/* Right side - Decorative */}
        <div style={{
          width: '400px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
        }}>
          {/* Concentric circles */}
          <div style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: `3px solid ${catColor}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: `3px solid ${catColor}33`,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: `linear-gradient(135deg, ${catColor}44, ${catColor}22)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <span style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  color: catColor,
                  fontFamily: COLORS.serifFont,
                }}>T</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accentDark}, ${COLORS.accentDarker})`,
        }} />
      </div>
    ),
    { ...OG_SIZE },
  );
}

/**
 * Generate a page-level OG image (for Products, Blog listing, Methodology, etc.)
 * More prominent design with page-specific branding
 */
export function generatePageImage(options: {
  title: string;
  subtitle: string;
  description: string;
  tags?: string[];
  accentColor?: string;
}): ImageResponse {
  const { title, subtitle, description, tags, accentColor = COLORS.accent } = options;

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: `linear-gradient(135deg, ${COLORS.bg} 0%, ${COLORS.bgLight} 50%, ${COLORS.bg} 100%)`,
        padding: '60px',
      }}>
        {/* Decorative circles */}
        <div style={{
          position: 'absolute',
          top: '-100px',
          right: '-100px',
          width: '400px',
          height: '400px',
          borderRadius: '50%',
          background: `${accentColor}14`,
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: `${accentColor}0D`,
        }} />

        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '30px',
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '20px',
            background: `linear-gradient(135deg, ${accentColor}, ${COLORS.accentDark})`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: `0 20px 40px ${accentColor}4D`,
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: COLORS.bg,
              fontFamily: COLORS.serifFont,
            }}>T</span>
          </div>
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: title.length > 30 ? '42px' : '52px',
          fontWeight: 'bold',
          color: COLORS.white,
          fontFamily: COLORS.serifFont,
          marginBottom: '16px',
          textAlign: 'center',
        }}>
          {title}
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: '24px',
          color: accentColor,
          fontFamily: COLORS.sansFont,
          marginBottom: '24px',
          textAlign: 'center',
        }}>
          {subtitle}
        </p>

        {/* Description */}
        <p style={{
          fontSize: '20px',
          color: `${COLORS.white}B3`,
          fontFamily: COLORS.sansFont,
          textAlign: 'center',
          maxWidth: '700px',
          lineHeight: 1.5,
        }}>
          {description}
        </p>

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{
            display: 'flex',
            marginTop: '40px',
            gap: '16px',
          }}>
            {tags.map((tag, i) => (
              <div key={i} style={{
                padding: '10px 24px',
                borderRadius: '8px',
                background: `${accentColor}26`,
                color: accentColor,
                fontSize: '16px',
                fontFamily: COLORS.sansFont,
              }}>
                {tag}
              </div>
            ))}
          </div>
        )}

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '6px',
          background: `linear-gradient(90deg, ${accentColor}, ${COLORS.accentDark}, ${COLORS.accentDarker})`,
        }} />
      </div>
    ),
    { ...OG_SIZE },
  );
}
