import { ImageResponse } from 'next/og';
import { APP_PAGES } from '@/lib/app-pages';

export const APP_OG_SIZE = { width: 1200, height: 630 };

// Map tier to accent color
export function getTierColor(tier: string): string {
  switch (tier) {
    case 'FREE': return '#3DD4B0';
    case 'BASIC': return '#2A8A94';
    case 'BASIC': return '#2A8A94';
    case 'PREMIUM': return '#1F6F78';
    case 'MASTERY': return '#7AEEE0';
    default: return '#3DD4B0';
  }
}

// Map category to an emoji icon
export function getCategoryIcon(category: string): string {
  const iconMap: Record<string, string> = {
    'Assessment': '🎯', 'Self-Discovery': '🔍', 'Journaling': '📝',
    'Productivity': '⚡', 'Planning': '📋', 'Transformation': '🔄',
    'Environment': '🌿', 'Mental Health': '🧠', 'Decision Making': '⚖️',
    'Progress Tracking': '📊', 'Worksheets': '📄', 'AI Coaching': '🤖',
    'Dashboard': '📈', 'Guide': '📖', 'Community': '👥', 'Support': '💬',
  };
  return iconMap[category] || '🎯';
}

export function getAppName(title: string): string {
  const pipeIndex = title.indexOf(' | ');
  return pipeIndex > 0 ? title.substring(0, pipeIndex) : title;
}

export function createAppOgImage(slug: string) {
  const appData = APP_PAGES.find(a => a.slug === slug);
  const title = appData?.title || 'Tamkinly App';
  const name = getAppName(title);
  const tagline = appData?.description || 'Transform your identity';
  const shortTagline = tagline.length > 80 ? tagline.substring(0, 80) + '...' : tagline;
  const tier = appData?.tier || 'FREE';
  const category = appData?.category || 'Tools';
  const tierColor = getTierColor(tier);
  const icon = getCategoryIcon(category);

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'row',
        background: '#0F1C2E', overflow: 'hidden',
      }}>
        <div style={{
          width: '420px', display: 'flex', alignItems: 'center', justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(61, 212, 176, 0.08), rgba(61, 212, 176, 0.02))',
          position: 'relative',
        }}>
          <div style={{
            width: '200px', height: '200px', borderRadius: '40px',
            background: 'linear-gradient(135deg, #3DD4B022, #3DD4B011)',
            border: '2px solid #3DD4B044',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontSize: '80px', color: tierColor }}>{icon}</span>
          </div>
        </div>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '60px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
            <span style={{
              display: 'flex', alignItems: 'center', padding: '6px 14px', borderRadius: '16px',
              background: tierColor + '20', fontSize: '13px', fontWeight: 700, color: tierColor,
              fontFamily: 'system-ui, sans-serif',
            }}>{tier}</span>
            <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>{category}</span>
          </div>
          <h1 style={{
            fontSize: '48px', fontWeight: 'bold', color: '#ffffff', fontFamily: 'Georgia, serif',
            marginBottom: '16px', lineHeight: 1.2,
          }}>{name}</h1>
          <p style={{
            fontSize: '22px', color: '#3DD4B0', fontFamily: 'system-ui, sans-serif', marginBottom: '24px',
          }}>{shortTagline}</p>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '7px',
              background: 'linear-gradient(135deg, #3DD4B0, #2bb89a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '16px', fontWeight: 'bold', color: '#0F1C2E', fontFamily: 'Georgia, serif' }}>T</span>
            </div>
            <span style={{ fontSize: '13px', color: '#64748b', fontFamily: 'system-ui, sans-serif' }}>tamkinly.com</span>
          </div>
        </div>
        <div style={{
          position: 'absolute', bottom: '0', left: '0', right: '0', height: '4px',
          background: 'linear-gradient(90deg, #3DD4B0, #2bb89a, #1a9d80)',
        }} />
      </div>
    ),
    { ...APP_OG_SIZE },
  );
}
