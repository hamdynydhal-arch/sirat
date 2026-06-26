import { useInstallPrompt } from '../hooks/useInstallPrompt';

/* ─── Shared styles ─── */
const overlay: React.CSSProperties = {
  position: 'fixed',
  inset: 0,
  backgroundColor: 'rgba(17, 28, 23, 0.55)',
  backdropFilter: 'blur(3px)',
  zIndex: 1000,
  display: 'flex',
  alignItems: 'flex-end',
  justifyContent: 'center',
  padding: '0 0 env(safe-area-inset-bottom, 0)',
  animation: 'fadeIn 0.2s ease',
};

const sheet: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '20px 20px 0 0',
  padding: '1.5rem 1.25rem 2rem',
  width: '100%',
  maxWidth: '480px',
  direction: 'rtl',
  animation: 'slideUp 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  boxShadow: '0 -8px 32px rgba(17,28,23,0.15)',
};

const logoBox: React.CSSProperties = {
  width: '64px',
  height: '64px',
  backgroundColor: '#2C5346',
  borderRadius: '16px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
  boxShadow: '0 4px 16px rgba(44,83,70,0.35)',
  flexShrink: 0,
};

const primaryBtn: React.CSSProperties = {
  width: '100%',
  padding: '0.85rem',
  backgroundColor: '#2C5346',
  color: '#F5F0E6',
  border: 'none',
  borderRadius: '12px',
  fontFamily: 'Tajawal, sans-serif',
  fontSize: '16px',
  fontWeight: 700,
  cursor: 'pointer',
  transition: 'background-color 0.2s',
};

const ghostBtn: React.CSSProperties = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: 'transparent',
  color: '#6B8F7E',
  border: 'none',
  borderRadius: '12px',
  fontFamily: 'Tajawal, sans-serif',
  fontSize: '14px',
  cursor: 'pointer',
  marginTop: '0.5rem',
};

/* ─── App logo ─── */
function AppLogo() {
  return (
    <div style={logoBox}>
      <span style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '32px', color: '#F5F0E6', lineHeight: 1 }}>س</span>
      <div style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', width: '20px', height: '1.5px', backgroundColor: '#C49A52' }} />
      <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '5px', height: '5px', borderRadius: '50%', backgroundColor: '#C49A52' }} />
    </div>
  );
}

/* ─── Android / Chrome prompt ─── */
function AndroidSheet({ onInstall, onDismiss }: { onInstall: () => void; onDismiss: () => void }) {
  return (
    <div style={overlay} onClick={onDismiss}>
      <div style={sheet} onClick={e => e.stopPropagation()}>
        {/* Handle bar */}
        <div style={{ width: '40px', height: '4px', backgroundColor: '#EAE3D3', borderRadius: '2px', margin: '0 auto 1.25rem' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <AppLogo />
          <div>
            <div style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '18px', fontWeight: 700, color: '#111C17', lineHeight: 1.3 }}>
              ثبّت تطبيق سِراط
            </div>
            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', marginTop: '0.25rem' }}>
              للوصول السريع بدون متصفح
            </div>
          </div>
          <button
            onClick={onDismiss}
            aria-label="إغلاق"
            style={{
              marginRight: 'auto', background: 'none', border: 'none', cursor: 'pointer',
              color: '#9CB8B0', fontSize: '20px', lineHeight: 1, padding: '0.25rem',
              flexShrink: 0,
            }}
          >✕</button>
        </div>

        {/* Benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.5rem' }}>
          {[
            { icon: '⚡', text: 'يفتح فوراً من شاشتك الرئيسية' },
            { icon: '📴', text: 'يعمل بدون اتصال بالإنترنت' },
            { icon: '🔔', text: 'تجربة تطبيق أصيلة بدون شريط المتصفح' },
          ].map(b => (
            <div key={b.text} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <span style={{ fontSize: '18px', flexShrink: 0 }}>{b.icon}</span>
              <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '14px', color: '#111C17' }}>{b.text}</span>
            </div>
          ))}
        </div>

        <button style={primaryBtn} onClick={onInstall}>تثبيت التطبيق</button>
        <button style={ghostBtn} onClick={onDismiss}>ليس الآن</button>
      </div>
    </div>
  );
}

/* ─── iOS Safari prompt ─── */
function IOSSheet({ onDismiss }: { onDismiss: () => void }) {
  return (
    <div style={overlay} onClick={onDismiss}>
      <div style={sheet} onClick={e => e.stopPropagation()}>
        {/* Handle bar */}
        <div style={{ width: '40px', height: '4px', backgroundColor: '#EAE3D3', borderRadius: '2px', margin: '0 auto 1.25rem' }} />

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.25rem' }}>
          <AppLogo />
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '18px', fontWeight: 700, color: '#111C17', lineHeight: 1.3 }}>
              أضف سِراط لشاشتك
            </div>
            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', marginTop: '0.25rem' }}>
              خطوتان فقط في Safari
            </div>
          </div>
          <button
            onClick={onDismiss}
            aria-label="إغلاق"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#9CB8B0', fontSize: '20px', lineHeight: 1, padding: '0.25rem', flexShrink: 0 }}
          >✕</button>
        </div>

        {/* Steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {[
            {
              num: '١',
              icon: '⎋',
              text: 'اضغط على أيقونة المشاركة',
              sub: 'الزر الموجود في شريط أدوات Safari أسفل الشاشة',
            },
            {
              num: '٢',
              icon: '⊞',
              text: 'اختر "إضافة إلى الشاشة الرئيسية"',
              sub: 'ستجدها بالتمرير لأسفل في قائمة الخيارات',
            },
          ].map(step => (
            <div
              key={step.num}
              style={{
                display: 'flex', gap: '1rem', alignItems: 'flex-start',
                padding: '0.85rem 1rem',
                backgroundColor: '#F5F0E6',
                borderRadius: '12px',
              }}
            >
              {/* Step number */}
              <div style={{
                width: '28px', height: '28px', borderRadius: '50%',
                backgroundColor: '#2C5346', color: '#F5F0E6',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'El Messiri, sans-serif', fontSize: '14px', fontWeight: 700,
                flexShrink: 0,
              }}>
                {step.num}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.2rem' }}>
                  <span style={{ fontSize: '18px' }}>{step.icon}</span>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '14px', fontWeight: 700, color: '#111C17' }}>
                    {step.text}
                  </span>
                </div>
                <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '12px', color: '#6B8F7E' }}>{step.sub}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Arrow pointing down to Safari bar */}
        <div style={{
          textAlign: 'center', padding: '0.75rem',
          backgroundColor: '#EAF2EE', borderRadius: '10px', marginBottom: '0.75rem',
        }}>
          <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#2C5346' }}>
            ⬇ ابحث عن زر المشاركة في أسفل شاشة Safari
          </span>
        </div>

        <button style={ghostBtn} onClick={onDismiss}>فهمت، شكراً</button>
      </div>
    </div>
  );
}

/* ─── Main export ─── */
export default function InstallPrompt() {
  const { promptState, install, dismiss } = useInstallPrompt();

  if (promptState === 'android') return <AndroidSheet onInstall={install} onDismiss={dismiss} />;
  if (promptState === 'ios') return <IOSSheet onDismiss={dismiss} />;
  return null;
}
