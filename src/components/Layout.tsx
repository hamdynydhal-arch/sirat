import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'لوحة التحكم', icon: '⊞' },
  { path: '/routine', label: 'الروتين اليومي', icon: '✓' },
  { path: '/analysis', label: 'تحليل الأداء', icon: '◈' },
  { path: '/status', label: 'متابعة الحالة', icon: '◉' },
  { path: '/guidance', label: 'التوجيه', icon: '✦' },
];

export default function Layout() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#F5F0E6', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#2C5346',
        color: '#F5F0E6',
        padding: '0 2rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(17,28,23,0.3)',
        direction: 'rtl',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          {/* Logo */}
          <div style={{
            width: '40px',
            height: '40px',
            backgroundColor: '#1E3B30',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '1px solid #3D6B5A',
            position: 'relative',
          }}>
            <span style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '22px', color: '#F5F0E6', lineHeight: 1 }}>س</span>
            <div style={{
              position: 'absolute',
              bottom: '6px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '14px',
              height: '1px',
              backgroundColor: '#C49A52',
            }}></div>
            <div style={{
              position: 'absolute',
              bottom: '3px',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '4px',
              height: '4px',
              borderRadius: '50%',
              backgroundColor: '#C49A52',
            }}></div>
          </div>
          <div>
            <div style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '22px', fontWeight: 700, color: '#F5F0E6', lineHeight: 1 }}>
              سِراط
            </div>
            <div style={{ fontFamily: 'Marcellus, serif', fontSize: '10px', color: '#C49A52', letterSpacing: '3px', lineHeight: 1 }}>
              SIRAT
            </div>
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '0.25rem' }}>
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/'}
              style={({ isActive }) => ({
                color: isActive ? '#C49A52' : '#F5F0E6',
                textDecoration: 'none',
                fontFamily: 'Tajawal, sans-serif',
                fontSize: '14px',
                fontWeight: 500,
                padding: '0.4rem 0.75rem',
                borderRadius: '6px',
                backgroundColor: isActive ? 'rgba(196,154,82,0.15)' : 'transparent',
                borderBottom: isActive ? '2px solid #C49A52' : '2px solid transparent',
                transition: 'all 0.2s',
                whiteSpace: 'nowrap',
              })}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      {/* Main Content */}
      <main style={{ flex: 1, padding: '2rem', maxWidth: '1200px', width: '100%', margin: '0 auto', direction: 'rtl' }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{
        backgroundColor: '#1E3B30',
        color: '#F5F0E6',
        padding: '1rem 2rem',
        textAlign: 'center',
        direction: 'rtl',
      }}>
        <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#9CB8B0', margin: 0 }}>
          سِراط — <span style={{ fontFamily: 'Marcellus, serif', color: '#C49A52' }}>SIRAT</span> — طريقك نحو الأفضل
        </p>
      </footer>
    </div>
  );
}
