import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI Identity Coach - Tamkinly';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const TIER_COLOR = '#7AEEE0';
const TIER = 'MASTERY';
const CATEGORY = 'AI Coaching';
const ICON = '\u{1F916}';
const TITLE = 'AI Identity Coach';
const TAGLINE = 'Your Personal AI-Powered Identity Transformation Coach';

export default async function AICoachOgImage() {
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
        {/* Left decorative panel */}
        <div style={{
          width: '420px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, rgba(122, 238, 224, 0.08), rgba(122, 238, 224, 0.02))',
          position: 'relative',
        }}>
          <div style={{
            width: '200px',
            height: '200px',
            borderRadius: '40px',
            background: `linear-gradient(135deg, ${TIER_COLOR}22, ${TIER_COLOR}11)`,
            border: `2px solid ${TIER_COLOR}44`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{
              fontSize: '80px',
              color: TIER_COLOR,
            }}>
              {ICON}
            </span>
          </div>
        </div>

        {/* Right side - Content */}
        <div style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '60px',
        }}>
          {/* Badge */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            marginBottom: '24px',
          }}>
            <span style={{
              display: 'flex',
              alignItems: 'center',
              padding: '6px 14px',
              borderRadius: '16px',
              background: `${TIER_COLOR}20`,
              fontSize: '13px',
              fontWeight: 700,
              color: TIER_COLOR,
              fontFamily: 'system-ui, sans-serif',
            }}>
              {TIER}
            </span>
            <span style={{
              fontSize: '13px',
              color: '#64748b',
              fontFamily: 'system-ui, sans-serif',
            }}>
              {CATEGORY}
            </span>
          </div>

          {/* Title */}
          <h1 style={{
            fontSize: '48px',
            fontWeight: 'bold',
            color: '#ffffff',
            fontFamily: 'Georgia, serif',
            marginBottom: '16px',
            lineHeight: 1.2,
          }}>
            {TITLE}
          </h1>

          {/* Tagline */}
          <p style={{
            fontSize: '22px',
            color: '#7AEEE0',
            fontFamily: 'system-ui, sans-serif',
            marginBottom: '24px',
          }}>
            {TAGLINE}
          </p>

          {/* Footer */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <div style={{
              width: '28px',
              height: '28px',
              borderRadius: '7px',
              background: 'linear-gradient(135deg, #3DD4B0, #2bb89a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: 'bold',
                color: '#0F1C2E',
                fontFamily: 'Georgia, serif',
              }}>T</span>
            </div>
            <span style={{
              fontSize: '13px',
              color: '#64748b',
              fontFamily: 'system-ui, sans-serif',
            }}>
              tamkinly.com
            </span>
          </div>
        </div>

        {/* Bottom accent bar */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          right: '0',
          height: '4px',
          background: 'linear-gradient(90deg, #7AEEE0, #3DD4B0, #2bb89a)',
        }} />
      </div>
    ),
    {
      ...size,
    }
  );
}
