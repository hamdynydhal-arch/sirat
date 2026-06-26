import { useDailyRecord } from '../hooks/useDailyRecord';

export default function DailyRoutine() {
  const { todayRecord, togglePrayer, toggleHabit } = useDailyRecord();

  const prayersDone = todayRecord.prayers.filter(p => p.done).length;
  const habitsDone = todayRecord.habits.filter(h => h.done).length;

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 4px rgba(17,28,23,0.08)',
    border: '1px solid #EAE3D3',
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.75rem', color: '#111C17', margin: 0, marginBottom: '0.25rem' }}>
          الروتين اليومي
        </h1>
        <p style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B8F7E', margin: 0 }}>
          تتبع صلواتك وعاداتك اليومية
        </p>
      </div>

      {/* Prayers */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.25rem', color: '#2C5346', margin: 0 }}>
            الصلوات الخمس
          </h2>
          <span style={{
            fontFamily: 'Tajawal, sans-serif', fontSize: '13px',
            backgroundColor: '#EAF2EE', color: '#2C5346',
            padding: '0.25rem 0.75rem', borderRadius: '20px',
          }}>
            {prayersDone} / {todayRecord.prayers.length}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '0.75rem' }}>
          {todayRecord.prayers.map(prayer => (
            <button
              key={prayer.id}
              onClick={() => togglePrayer(prayer.id)}
              style={{
                border: 'none',
                borderRadius: '12px',
                padding: '1.25rem 0.5rem',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: prayer.done ? '#2C5346' : '#F5F0E6',
                color: prayer.done ? '#F5F0E6' : '#6B8F7E',
                transition: 'all 0.2s',
                boxShadow: prayer.done ? '0 4px 12px rgba(44,83,70,0.3)' : 'none',
                transform: prayer.done ? 'translateY(-2px)' : 'none',
              }}
            >
              <div style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: prayer.done ? 'rgba(255,255,255,0.2)' : '#EAE3D3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px',
              }}>
                {prayer.done ? '✓' : '☽'}
              </div>
              <span style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '15px', fontWeight: 600 }}>
                {prayer.name}
              </span>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ height: '6px', backgroundColor: '#EAE3D3', borderRadius: '3px' }}>
            <div style={{
              width: `${(prayersDone / 5) * 100}%`,
              height: '100%',
              backgroundColor: '#2C5346',
              borderRadius: '3px',
              transition: 'width 0.5s ease',
            }}></div>
          </div>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', margin: '0.5rem 0 0 0', textAlign: 'center' }}>
            {prayersDone === 5 ? '🎉 أحسنت! أكملت جميع الصلوات اليوم' : `تبقّى ${5 - prayersDone} صلوات`}
          </p>
        </div>
      </div>

      {/* Habits */}
      <div style={cardStyle}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
          <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.25rem', color: '#2C5346', margin: 0 }}>
            العادات اليومية
          </h2>
          <span style={{
            fontFamily: 'Tajawal, sans-serif', fontSize: '13px',
            backgroundColor: '#FBF5E8', color: '#C49A52',
            padding: '0.25rem 0.75rem', borderRadius: '20px',
          }}>
            {habitsDone} / {todayRecord.habits.length}
          </span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '0.75rem' }}>
          {todayRecord.habits.map(habit => (
            <button
              key={habit.id}
              onClick={() => toggleHabit(habit.id)}
              style={{
                border: '2px solid',
                borderColor: habit.done ? '#C49A52' : '#EAE3D3',
                borderRadius: '10px',
                padding: '1rem 1.25rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                backgroundColor: habit.done ? '#FBF5E8' : '#fff',
                transition: 'all 0.2s',
                textAlign: 'right',
              }}
            >
              <div style={{
                width: '28px', height: '28px', borderRadius: '6px', flexShrink: 0,
                backgroundColor: habit.done ? '#C49A52' : '#EAE3D3',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: habit.done ? '#fff' : '#9CB8B0',
                fontSize: '14px',
                transition: 'all 0.2s',
              }}>
                {habit.done ? '✓' : ''}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '15px', color: '#111C17', marginBottom: '2px' }}>
                  {habit.icon} {habit.name}
                </div>
              </div>
            </button>
          ))}
        </div>

        <div style={{ marginTop: '1.25rem' }}>
          <div style={{ height: '6px', backgroundColor: '#EAE3D3', borderRadius: '3px' }}>
            <div style={{
              width: `${(habitsDone / 8) * 100}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #C49A52, #D4AD6A)',
              borderRadius: '3px',
              transition: 'width 0.5s ease',
            }}></div>
          </div>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', margin: '0.5rem 0 0 0', textAlign: 'center' }}>
            {habitsDone === 8 ? '🌟 ممتاز! أكملت جميع عاداتك اليومية' : `أكملت ${habitsDone} من ٨ عادات`}
          </p>
        </div>
      </div>
    </div>
  );
}
