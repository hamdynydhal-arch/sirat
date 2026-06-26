import { useState } from 'react';
import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { path: '/', label: 'لوحة التحكم', icon: '⊞' },
  { path: '/routine', label: 'الروتين اليومي', icon: '✓' },
  { path: '/analysis', label: 'تحليل الأداء', icon: '◈' },
  { path: '/status', label: 'متابعة الحالة', icon: '◉' },
  { path: '/guidance', label: 'التوجيه', icon: '✦' },
];

export default function Layout() {
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    color: isActive ? '#C49A52' : '#F5F0E6',
    textDecoration: 'none',
    fontFamily: 'Tajawal, sans-serif',
    fontSize: '14px',
    fontWeight: 500 as const,
    padding: '0.4rem 0.75rem',
    borderRadius: '6px',
    backgroundColor: isActive ? 'rgba(196,154,82,0.15)' : 'transparent',
    borderBottom: isActive ? '2px solid #C49A52' : '2px solid transparent',
    transition: 'all 0.2s',
    whiteSpace: 'nowrap' as const,
  });

  const mobileNavLinkStyle = ({ isActive }: { isActive: boolean }) => ({
    display: 'flex',
    alignItems: 'center',
    gap: '0.75rem',
    color: isActive ? '#C49A52' : '#F5F0E6',
    textDecoration: 'none',
    fontFamily: 'Tajawal, sans-serif',
    fontSize: '16px',
    fontWeight: 500 as const,
    padding: '0.85rem 1.5rem',
    backgroundColor: isActive ? 'rgba(196,154,82,0.12)' : 'transparent',
    borderRight: isActive ? '3px solid #C49A52' : '3px solid transparent',
    transition: 'all 0.2s',
  });

  return (
    <div dir="rtl" style={{ minHeight: '100vh', backgroundColor: '#F5F0E6', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <header style={{
        backgroundColor: '#2C5346',
        color: '#F5F0E6',
        padding: '0 1rem',
        height: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 2px 8px rgba(17,28,23,0.3)',
        position: 'sticky',
        top: 0,
        zIndex: 200,
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexShrink: 0 }}>
          <div style={{
            width: '40px', height: '40px',
            backgroundColor: '#1E3B30',
            borderRadius: '8px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            border: '1px solid #3D6B5A',
            position: 'relative',
            flexShrink: 0,
          }}>
            <span style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '22px', color: '#F5F0E6', lineHeight: 1 }}>س</span>
            <div style={{ position: 'absolute', bottom: '6px', left: '50%', transform: 'translateX(-50%)', width: '14px', height: '1px', backgroundColor: '#C49A52' }} />
            <div style={{ position: 'absolute', bottom: '3px', left: '50%', transform: 'translateX(-50%)', width: '4px', height: '4px', borderRadius: '50%', backgroundColor: '#C49A52' }} />
          </div>
          <div>
            <div style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '22px', fontWeight: 700, color: '#F5F0E6', lineHeight: 1 }}>سِراط</div>
            <div style={{ fontFamily: 'Marcellus, serif', fontSize: '10px', color: '#C49A52', letterSpacing: '3px', lineHeight: 1 }}>SIRAT</div>
          </div>
        </div>

        {/* Desktop nav */}
        <nav className="desktop-nav" style={{ gap: '0.25rem' }}>
          {navItems.map(item => (
            <NavLink key={item.path} to={item.path} end={item.path === '/'} style={navLinkStyle}>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Hamburger */}
        <button
          className="hamburger-btn"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="القائمة"
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            padding: '0.5rem', display: 'flex', flexDirection: 'column',
            gap: '5px', alignItems: 'center', justifyContent: 'center',
          }}
        >
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#F5F0E6', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(45deg) translateY(7px)' : 'none' }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#F5F0E6', borderRadius: '2px', transition: 'all 0.2s', opacity: menuOpen ? 0 : 1 }} />
          <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#F5F0E6', borderRadius: '2px', transition: 'all 0.2s', transform: menuOpen ? 'rotate(-45deg) translateY(-7px)' : 'none' }} />
        </button>
      </header>

      {/* Mobile dropdown menu */}
      <div className={`mobile-menu${menuOpen ? ' open' : ''}`}>
        {navItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.path === '/'}
            style={mobileNavLinkStyle}
            onClick={() => setMenuOpen(false)}
          >
            <span style={{ fontSize: '18px', width: '24px', textAlign: 'center' }}>{item.icon}</span>
            {item.label}
          </NavLink>
        ))}
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          onClick={() => setMenuOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 99, background: 'rgba(0,0,0,0.3)', top: '64px' }}
        />
      )}

      {/* Main Content */}
      <main style={{
        flex: 1,
        padding: '1rem',
        maxWidth: '1200px',
        width: '100%',
        margin: '0 auto',
        boxSizing: 'border-box',
      }}>
        <Outlet />
      </main>

      {/* Footer */}
      <footer style={{ backgroundColor: '#1E3B30', color: '#F5F0E6', padding: '1rem', textAlign: 'center' }}>
        <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#9CB8B0', margin: 0 }}>
          سِراط — <span style={{ fontFamily: 'Marcellus, serif', color: '#C49A52' }}>SIRAT</span> — طريقك نحو الأفضل
        </p>
      </footer>
    </div>
  );
}
