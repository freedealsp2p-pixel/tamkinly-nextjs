import { ImageResponse } from 'next/og';
import { getBlogArticleBySlug } from '@/lib/blog-articles';

export const runtime = 'edge';
export const alt = 'Tamkinly Blog';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function BlogOgImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getBlogArticleBySlug(slug);

  const title = article?.title || 'Tamkinly Blog';
  const category = article?.category || 'Blog';
  const description = article?.description || 'Science-backed identity transformation tools';
  const shortDesc = description.length > 100 ? description.substring(0, 100) + '...' : description;

  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'row',
        background: '#0F1C2E',
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
            display: 'inline-flex',
            alignItems: 'center',
            padding: '8px 16px',
            borderRadius: '20px',
            background: 'rgba(61, 212, 176, 0.15)',
            marginBottom: '24px',
            alignSelf: 'flex-start',
          }}>
            <span style={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#3DD4B0',
              fontFamily: 'system-ui, sans-serif',
            }}>
              {category}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '42px',
            fontWeight: 'bold',
            color: '#ffffff',
            fontFamily: 'Georgia, serif',
            marginBottom: '16px',
            lineHeight: 1.2,
            letterSpacing: '-0.5px',
          }}>
            {title}
          </h1>

          {/* Description */}
          <p style={{
            fontSize: '18px',
            color: '#94a3b8',
            fontFamily: 'system-ui, sans-serif',
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
              background: 'linear-gradient(135deg, #3DD4B0, #2bb89a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#0F1C2E',
                fontFamily: 'Georgia, serif',
              }}>T</span>
            </div>
            <span style={{
              fontSize: '14px',
              color: '#64748b',
              fontFamily: 'system-ui, sans-serif',
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
          <div style={{
            width: '280px',
            height: '280px',
            borderRadius: '50%',
            border: '3px solid rgba(61, 212, 176, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <div style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              border: '3px solid rgba(61, 212, 176, 0.2)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(61, 212, 176, 0.3), rgba(61, 212, 176, 0.1))',
                display: 'flex',
                alignItems: 'center',
              }}>
                <span style={{
                  fontSize: '64px',
                  fontWeight: 'bold',
                  color: '#3DD4B0',
                  fontFamily: 'Georgia, serif',
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
          background: 'linear-gradient(90deg, #3DD4B0, #2bb89a, #1a9d80)',
        }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
