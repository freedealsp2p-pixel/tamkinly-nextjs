import { ImageResponse } from 'next/og';

export const PAGE_OG_SIZE = { width: 1200, height: 630 };

interface PageOgConfig {
  title: string;
  subtitle: string;
  accentColor?: string;
  icon?: string;
}

export function createPageOgImage(config: PageOgConfig) {
  const { title, subtitle, accentColor = '#3DD4B0', icon = 'T' } = config;
  const shortSubtitle = subtitle.length > 100 ? subtitle.substring(0, 100) + '...' : subtitle;

  return new ImageResponse(
    (
      <div style={{
        width: '100%', height: '100%', display: 'flex', flexDirection: 'column',
        background: '#0F1C2E', overflow: 'hidden', position: 'relative',
      }}>
        <div style={{
          flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center',
          padding: '80px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '12px',
              background: 'linear-gradient(135deg, #3DD4B0, #2bb89a)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#0F1C2E', fontFamily: 'Georgia, serif' }}>{icon}</span>
            </div>
            <span style={{
              fontSize: '14px', color: accentColor, fontFamily: 'system-ui, sans-serif',
              letterSpacing: '2px', textTransform: 'uppercase', fontWeight: 600,
            }}>Tamkinly</span>
          </div>
          <h1 style={{
            fontSize: '52px', fontWeight: 'bold', color: '#ffffff', fontFamily: 'Georgia, serif',
            marginBottom: '20px', lineHeight: 1.2,
          }}>{title}</h1>
          <p style={{
            fontSize: '22px', color: '#94a3b8', fontFamily: 'system-ui, sans-serif',
            lineHeight: 1.4,
          }}>{shortSubtitle}</p>
        </div>
        <div style={{
          position: 'absolute', bottom: '0', left: '0', right: '0', height: '4px',
          background: 'linear-gradient(90deg, #3DD4B0, #2bb89a, #1a9d80)',
        }} />
      </div>
    ),
    { ...PAGE_OG_SIZE },
  );
}
