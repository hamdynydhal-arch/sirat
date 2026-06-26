import { useDailyRecord } from '../hooks/useDailyRecord';

const quotes = [
  { text: 'إِنَّ اللَّهَ لَا يُغَيِّرُ مَا بِقَوْمٍ حَتَّىٰ يُغَيِّرُوا مَا بِأَنفُسِهِمْ', source: 'سورة الرعد (١١)' },
  { text: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا', source: 'سورة الطلاق (٢)' },
  { text: 'وَاسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ', source: 'سورة البقرة (٤٥)' },
  { text: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا', source: 'سورة الشرح (٥)' },
];

function getTodayArabic(): string {
  const days = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];
  const months = ['يناير', 'فبراير', 'مارس', 'أبريل', 'مايو', 'يونيو', 'يوليو', 'أغسطس', 'سبتمبر', 'أكتوبر', 'نوفمبر', 'ديسمبر'];
  const now = new Date();
  return `${days[now.getDay()]}، ${now.getDate()} ${months[now.getMonth()]} ${now.getFullYear()}`;
}

const card: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '1.25rem',
  boxShadow: '0 1px 4px rgba(17,28,23,0.08)',
  border: '1px solid #EAE3D3',
};

export default function Dashboard() {
  const { todayRecord, getLastNDays } = useDailyRecord();
  const last7 = getLastNDays(7);

  const prayersDone = todayRecord.prayers.filter(p => p.done).length;
  const habitsDone = todayRecord.habits.filter(h => h.done).length;
  const totalItems = todayRecord.prayers.length + todayRecord.habits.length;
  const donePct = Math.round(((prayersDone + habitsDone) / totalItems) * 100);

  const weekAvg = Math.round(
    last7.reduce((acc, day) => {
      const total = day.prayers.length + day.habits.length;
      const done = day.prayers.filter(p => p.done).length + day.habits.filter(h => h.done).length;
      return acc + (done / total) * 100;
    }, 0) / 7
  );

  const quote = quotes[new Date().getDay() % quotes.length];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* Date header */}
      <div>
        <h1 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.5rem', color: '#111C17', margin: 0, marginBottom: '0.2rem' }}>
          لوحة التحكم
        </h1>
        <p style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B8F7E', margin: 0, fontSize: '14px' }}>{getTodayArabic()}</p>
      </div>

      {/* Quote */}
      <div style={{
        background: 'linear-gradient(135deg, #2C5346 0%, #1E3B30 100%)',
        borderRadius: '14px',
        padding: '1.25rem',
        color: '#F5F0E6',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-20px', left: '-20px', width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(196,154,82,0.1)' }} />
        <div style={{ position: 'absolute', bottom: '-20px', right: '-10px', width: '90px', height: '90px', borderRadius: '50%', backgroundColor: 'rgba(196,154,82,0.08)' }} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ color: '#C49A52', marginBottom: '0.5rem', fontSize: '18px' }}>✦</div>
          <p style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', lineHeight: 1.8, color: '#F5F0E6', margin: '0 0 0.5rem 0' }}>
            {quote.text}
          </p>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '12px', color: '#C49A52', margin: 0 }}>{quote.source}</p>
        </div>
      </div>

      {/* Stats grid — 2 cols mobile, 4 cols desktop */}
      <div className="stat-grid">
        {[
          { label: 'الصلوات اليوم', value: prayersDone, suffix: '/٥', pct: (prayersDone / 5) * 100, color: '#2C5346' },
          { label: 'العادات اليومية', value: habitsDone, suffix: '/٨', pct: (habitsDone / 8) * 100, color: '#C49A52' },
          { label: 'إنجاز اليوم', value: donePct, suffix: '%', pct: donePct, color: '#3D6B5A', gradient: true },
          { label: 'متوسط الأسبوع', value: weekAvg, suffix: '%', pct: weekAvg, color: '#3D6B5A' },
        ].map(s => (
          <div key={s.label} style={card}>
            <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '12px', color: '#6B8F7E', margin: '0 0 0.25rem 0' }}>{s.label}</p>
            <div style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '2rem', fontWeight: 700, color: s.color, lineHeight: 1 }}>
              {s.value}<span style={{ fontSize: '1rem', color: '#6B8F7E' }}>{s.suffix}</span>
            </div>
            <div style={{ marginTop: '0.6rem', height: '4px', backgroundColor: '#EAE3D3', borderRadius: '2px' }}>
              <div style={{
                width: `${s.pct}%`, height: '100%', borderRadius: '2px', transition: 'width 0.5s',
                background: s.gradient ? 'linear-gradient(90deg, #2C5346, #C49A52)' : s.color,
              }} />
            </div>
          </div>
        ))}
      </div>

      {/* Today progress — 1 col mobile, 2 col desktop */}
      <div className="two-col-grid">
        <div style={card}>
          <h3 style={{ fontFamily: 'El Messiri, sans-serif', color: '#2C5346', margin: '0 0 0.75rem 0', fontSize: '1rem' }}>الصلوات</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {todayRecord.prayers.map(prayer => (
              <div key={prayer.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', flexShrink: 0,
                  backgroundColor: prayer.done ? '#2C5346' : '#EAE3D3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}>
                  {prayer.done && <span style={{ color: '#F5F0E6', fontSize: '11px' }}>✓</span>}
                </div>
                <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '14px', color: prayer.done ? '#2C5346' : '#6B8F7E' }}>
                  {prayer.name}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div style={card}>
          <h3 style={{ fontFamily: 'El Messiri, sans-serif', color: '#2C5346', margin: '0 0 0.75rem 0', fontSize: '1rem' }}>العادات اليومية</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {todayRecord.habits.map(habit => (
              <div key={habit.id} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '4px', flexShrink: 0,
                  backgroundColor: habit.done ? '#C49A52' : '#EAE3D3',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'background-color 0.2s',
                }}>
                  {habit.done && <span style={{ color: '#fff', fontSize: '11px' }}>✓</span>}
                </div>
                <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '14px', color: habit.done ? '#111C17' : '#6B8F7E' }}>
                  {habit.icon} {habit.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
