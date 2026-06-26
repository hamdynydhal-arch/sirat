import { useDailyRecord } from '../hooks/useDailyRecord';

export default function DailyRoutine() {
  const { todayRecord, togglePrayer, toggleHabit } = useDailyRecord();

  const prayersDone = todayRecord.prayers.filter(p => p.done).length;
  const habitsDone = todayRecord.habits.filter(h => h.done).length;

  const card: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.25rem',
    boxShadow: '0 1px 4px rgba(17,28,23,0.08)',
    border: '1px solid #EAE3D3',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h1 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.5rem', color: '#111C17', margin: 0, marginBottom: '0.2rem' }}>
          الروتين اليومي
        </h1>
        <p style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B8F7E', margin: 0, fontSize: '14px' }}>
          تتبع صلواتك وعاداتك اليومية
        </p>
      </div>

      {/* Prayers */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', color: '#2C5346', margin: 0 }}>
            الصلوات الخمس
          </h2>
          <span style={{
            fontFamily: 'Tajawal, sans-serif', fontSize: '13px',
            backgroundColor: '#EAF2EE', color: '#2C5346',
            padding: '0.25rem 0.75rem', borderRadius: '20px',
            whiteSpace: 'nowrap',
          }}>
            {prayersDone} / {todayRecord.prayers.length}
          </span>
        </div>

        {/* Prayer cards — 5 cols always, but smaller padding on mobile */}
        <div className="prayers-grid">
          {todayRecord.prayers.map(prayer => (
            <button
              key={prayer.id}
              onClick={() => togglePrayer(prayer.id)}
              style={{
                border: 'none',
                borderRadius: '10px',
                padding: '0.75rem 0.25rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.4rem',
                backgroundColor: prayer.done ? '#2C5346' : '#F5F0E6',
                color: prayer.done ? '#F5F0E6' : '#6B8F7E',
                transition: 'all 0.2s',
                boxShadow: prayer.done ? '0 4px 12px rgba(44,83,70,0.3)' : 'none',
                transform: prayer.done ? 'translateY(-2px)' : 'none',
                minWidth: 0,
              }}
            >
              <div style={{
                width: '30px', height: '30px', borderRadius: '50%',
                backgroundColor: prayer.done ? 'rgba(255,255,255,0.2)' : '#EAE3D3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '14px', flexShrink: 0,
              }}>
                {prayer.done ? '✓' : '☽'}
              </div>
              <span style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '13px', fontWeight: 600, textAlign: 'center', lineHeight: 1.2 }}>
                {prayer.name}
              </span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <div style={{ height: '6px', backgroundColor: '#EAE3D3', borderRadius: '3px' }}>
            <div style={{ width: `${(prayersDone / 5) * 100}%`, height: '100%', backgroundColor: '#2C5346', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', margin: '0.5rem 0 0 0', textAlign: 'center' }}>
            {prayersDone === 5 ? '🎉 أحسنت! أكملت جميع الصلوات اليوم' : `تبقّى ${5 - prayersDone} صلوات`}
          </p>
        </div>
      </div>

      {/* Habits */}
      <div style={card}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', color: '#2C5346', margin: 0 }}>
            العادات اليومية
          </h2>
          <span style={{
            fontFamily: 'Tajawal, sans-serif', fontSize: '13px',
            backgroundColor: '#FBF5E8', color: '#C49A52',
            padding: '0.25rem 0.75rem', borderRadius: '20px',
            whiteSpace: 'nowrap',
          }}>
            {habitsDone} / {todayRecord.habits.length}
          </span>
        </div>

        {/* Habits — 1 col mobile, 2 col desktop */}
        <div className="habits-grid">
          {todayRecord.habits.map(habit => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              style={{
                border: '2px solid',
                borderColor: habit.done ? '#C49A52' : '#EAE3D3',
                borderRadius: '10px',
                padding: '0.85rem 1rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: habit.done ? '#FBF5E8' : '#fff',
                transition: 'all 0.2s',
                textAlign: 'right',
                width: '100%',
              }}
            >
              <div style={{
                width: '26px', height: '26px', borderRadius: '6px', flexShrink: 0,
                backgroundColor: habit.done ? '#C49A52' : '#EAE3D3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: habit.done ? '#fff' : '#9CB8B0',
                fontSize: '13px',
                transition: 'all 0.2s',
              }}>
                {habit.done ? '✓' : ''}
              </div>
              <div style={{ flex: 1, fontFamily: 'Tajawal, sans-serif', fontSize: '14px', color: '#111C17' }}>
                {habit.icon} {habit.name}
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1rem' }}>
          <div style={{ height: '6px', backgroundColor: '#EAE3D3', borderRadius: '3px' }}>
            <div style={{ width: `${(habitsDone / 8) * 100}%`, height: '100%', background: 'linear-gradient(90deg, #C49A52, #D4AD6A)', borderRadius: '3px', transition: 'width 0.5s ease' }} />
          </div>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', margin: '0.5rem 0 0 0', textAlign: 'center' }}>
            {habitsDone === 8 ? '🌟 ممتاز! أكملت جميع عاداتك اليومية' : `أكملت ${habitsDone} من ٨ عادات`}
          </p>
        </div>
      </div>
    </div>
  );
}
