import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts';
import { useDailyRecord } from '../hooks/useDailyRecord';

const dayLabels = ['الأحد', 'الاثنين', 'الثلاثاء', 'الأربعاء', 'الخميس', 'الجمعة', 'السبت'];

function getShortDayName(dateStr: string): string {
  const d = new Date(dateStr);
  return dayLabels[d.getDay()].substring(0, 3);
}

const card: React.CSSProperties = {
  backgroundColor: '#fff',
  borderRadius: '12px',
  padding: '1.25rem',
  boxShadow: '0 1px 4px rgba(17,28,23,0.08)',
  border: '1px solid #EAE3D3',
};

export default function PerformanceAnalysis() {
  const { getLastNDays } = useDailyRecord();

  const last7 = getLastNDays(7);
  const last30 = getLastNDays(30);

  const weeklyData = last7.map(day => {
    const prayersDone = day.prayers.filter(p => p.done).length;
    const habitsDone = day.habits.filter(h => h.done).length;
    return { day: getShortDayName(day.date), الصلوات: prayersDone, العادات: habitsDone };
  });

  const monthlyData = last30.map((day, i) => {
    const prayersDone = day.prayers.filter(p => p.done).length;
    const habitsDone = day.habits.filter(h => h.done).length;
    return { day: i + 1, الإنجاز: Math.round(((prayersDone + habitsDone) / 13) * 100) };
  });

  const avgCompletion = Math.round(
    last7.reduce((acc, day) => {
      const done = day.prayers.filter(p => p.done).length + day.habits.filter(h => h.done).length;
      return acc + (done / 13) * 100;
    }, 0) / 7
  );

  const bestStreak = (() => {
    let streak = 0, max = 0;
    for (const day of last30) {
      const done = day.prayers.filter(p => p.done).length + day.habits.filter(h => h.done).length;
      if (done > 0) { streak++; max = Math.max(max, streak); } else streak = 0;
    }
    return max;
  })();

  const prayersAvg = Math.round(
    last7.reduce((acc, day) => acc + day.prayers.filter(p => p.done).length, 0) / 7 * 10
  ) / 10;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div>
        <h1 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.5rem', color: '#111C17', margin: 0, marginBottom: '0.2rem' }}>
          تحليل الأداء
        </h1>
        <p style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B8F7E', margin: 0, fontSize: '14px' }}>
          رؤية شاملة لتقدمك على مدار الأسبوع والشهر
        </p>
      </div>

      {/* Summary cards — 1→2→3 cols */}
      <div className="three-col-grid">
        {[
          { label: 'متوسط الإنجاز الأسبوعي', value: `${avgCompletion}%`, color: '#2C5346' },
          { label: 'أطول سلسلة في الشهر', value: `${bestStreak} يوم`, color: '#C49A52' },
          { label: 'متوسط الصلوات يومياً', value: prayersAvg.toString(), color: '#3D6B5A' },
        ].map(stat => (
          <div key={stat.label} style={{ ...card, textAlign: 'center' }}>
            <div style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '2rem', fontWeight: 700, color: stat.color, lineHeight: 1 }}>
              {stat.value}
            </div>
            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', marginTop: '0.4rem' }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* Weekly bar chart */}
      <div style={card}>
        <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.05rem', color: '#2C5346', margin: '0 0 1rem 0' }}>
          الأداء الأسبوعي
        </h2>
        <div className="chart-wrapper">
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={weeklyData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE3D3" />
                <XAxis dataKey="day" tick={{ fontFamily: 'Tajawal, sans-serif', fontSize: 12, fill: '#6B8F7E' }} />
                <YAxis tick={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, fill: '#6B8F7E' }} />
                <Tooltip
                  contentStyle={{ fontFamily: 'Tajawal, sans-serif', borderRadius: '8px', border: '1px solid #EAE3D3', fontSize: '13px' }}
                  labelStyle={{ fontFamily: 'El Messiri, sans-serif', color: '#2C5346' }}
                />
                <Legend wrapperStyle={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px' }} />
                <Bar dataKey="الصلوات" fill="#2C5346" radius={[4, 4, 0, 0]} />
                <Bar dataKey="العادات" fill="#C49A52" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Monthly line chart */}
      <div style={card}>
        <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.05rem', color: '#2C5346', margin: '0 0 1rem 0' }}>
          منحنى الإنجاز الشهري (٣٠ يوم)
        </h2>
        <div className="chart-wrapper">
          <div className="chart-inner">
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={monthlyData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#EAE3D3" />
                <XAxis dataKey="day" tick={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, fill: '#6B8F7E' }} interval={4} />
                <YAxis domain={[0, 100]} tick={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, fill: '#6B8F7E' }} />
                <Tooltip
                  formatter={(v) => [`${v}%`, 'الإنجاز']}
                  contentStyle={{ fontFamily: 'Tajawal, sans-serif', borderRadius: '8px', border: '1px solid #EAE3D3', fontSize: '13px' }}
                  labelStyle={{ fontFamily: 'El Messiri, sans-serif', color: '#2C5346' }}
                />
                <Line
                  type="monotone" dataKey="الإنجاز" stroke="#2C5346" strokeWidth={2.5}
                  dot={{ fill: '#C49A52', strokeWidth: 0, r: 3 }}
                  activeDot={{ r: 5, fill: '#C49A52' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Habits breakdown */}
      <div style={card}>
        <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.05rem', color: '#2C5346', margin: '0 0 1rem 0' }}>
          تحليل العادات (آخر ٧ أيام)
        </h2>
        <div className="habits-grid">
          {last7[0]?.habits.map(habit => {
            const count = last7.filter(day => day.habits.find(h => h.id === habit.id)?.done).length;
            const pct = Math.round((count / 7) * 100);
            return (
              <div key={habit.id} style={{ padding: '0.75rem', backgroundColor: '#F5F0E6', borderRadius: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#111C17' }}>
                    {habit.icon} {habit.name}
                  </span>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#C49A52', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {count}/٧
                  </span>
                </div>
                <div style={{ height: '4px', backgroundColor: '#EAE3D3', borderRadius: '2px' }}>
                  <div style={{
                    width: `${pct}%`, height: '100%', borderRadius: '2px', transition: 'width 0.5s',
                    backgroundColor: pct >= 70 ? '#2C5346' : pct >= 40 ? '#C49A52' : '#D4856A',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
