import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Tamkinly - Transform Your Identity';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0F1C2E 0%, #1a2d47 50%, #0F1C2E 100%)',
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
          background: 'rgba(61, 212, 176, 0.08)',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-80px',
          left: '-80px',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(61, 212, 176, 0.05)',
        }} />

        {/* Logo area */}
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
            background: 'linear-gradient(135deg, #3DD4B0, #2bb89a)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 20px 40px rgba(61, 212, 176, 0.3)',
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: 'bold',
              color: '#0F1C2E',
              fontFamily: 'Georgia, serif',
            }}>T</span>
          </div>
        </div>

        {/* Title */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: '64px',
            fontWeight: 'bold',
            color: '#ffffff',
            fontFamily: 'Georgia, serif',
            marginBottom: '16px',
            letterSpacing: '-1px',
          }}>
            Tamkinly
          </h1>
          <p style={{
            fontSize: '28px',
            color: '#3DD4B0',
            fontFamily: 'system-ui, sans-serif',
            marginBottom: '12px',
          }}>
            Transform Your Identity
          </p>
          <p style={{
            fontSize: '20px',
            color: '#94a3b8',
            fontFamily: 'system-ui, sans-serif',
            maxWidth: '600px',
            lineHeight: 1.5,
          }}>
            Science-backed tools for self-discovery, habit change, and identity evolution
          </p>
        </div>

        {/* Bottom bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '6px',
          background: 'linear-gradient(90deg, #3DD4B0, #2bb89a, #1a9d80)',
        }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
