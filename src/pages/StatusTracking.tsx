import { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { type StatusEntry } from '../types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function formatDateArabic(dateStr: string): string {
  const d = new Date(dateStr);
  return `${d.getDate()}/${d.getMonth() + 1}`;
}

const moodLabels = ['', 'سيء جداً', 'سيء', 'عادي', 'جيد', 'ممتاز'];
const moodEmojis = ['', '😞', '😕', '😐', '😊', '😄'];

export default function StatusTracking() {
  const [entries, setEntries] = useLocalStorage<StatusEntry[]>('sirat_status', []);
  const today = getTodayDate();

  const todayEntry = entries.find(e => e.date === today) || {
    date: today, mood: 3, energy: 3, focus: 3, notes: '',
  };

  const [mood, setMood] = useState(todayEntry.mood);
  const [energy, setEnergy] = useState(todayEntry.energy);
  const [focus, setFocus] = useState(todayEntry.focus);
  const [notes, setNotes] = useState(todayEntry.notes);
  const [saved, setSaved] = useState(false);

  const save = () => {
    const entry: StatusEntry = { date: today, mood, energy, focus, notes };
    setEntries(prev => {
      const without = prev.filter(e => e.date !== today);
      return [...without, entry].sort((a, b) => a.date.localeCompare(b.date));
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const last14 = (() => {
    const days: { day: string; mood: number; energy: number; focus: number }[] = [];
    for (let i = 13; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      const e = entries.find(e => e.date === dateStr);
      days.push({
        day: formatDateArabic(dateStr),
        mood: e?.mood ?? 0,
        energy: e?.energy ?? 0,
        focus: e?.focus ?? 0,
      });
    }
    return days;
  })();

  const cardStyle: React.CSSProperties = {
    backgroundColor: '#fff',
    borderRadius: '12px',
    padding: '1.5rem',
    boxShadow: '0 1px 4px rgba(17,28,23,0.08)',
    border: '1px solid #EAE3D3',
  };

  const SliderRow = ({
    label, value, onChange, color,
  }: { label: string; value: number; onChange: (v: number) => void; color: string }) => (
    <div style={{ marginBottom: '1.25rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
        <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '15px', color: '#111C17' }}>{label}</span>
        <span style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '18px', color }}>
          {value}/٥
        </span>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        {[1, 2, 3, 4, 5].map(v => (
          <button
            key={v}
            onClick={() => onChange(v)}
            style={{
              flex: 1, height: '36px', border: 'none', borderRadius: '6px', cursor: 'pointer',
              backgroundColor: v <= value ? color : '#EAE3D3',
              transition: 'all 0.2s',
              opacity: v <= value ? 1 : 0.4,
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <h1 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.75rem', color: '#111C17', margin: 0, marginBottom: '0.25rem' }}>
          متابعة الحالة
        </h1>
        <p style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B8F7E', margin: 0 }}>
          سجّل حالتك اليومية لتتبع تطورك
        </p>
      </div>

      {/* Today entry */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', color: '#2C5346', margin: '0 0 1.25rem 0' }}>
          حالتي اليوم {moodEmojis[mood]}
        </h2>

        <SliderRow label="المزاج" value={mood} onChange={setMood} color="#2C5346" />
        <SliderRow label="مستوى الطاقة" value={energy} onChange={setEnergy} color="#C49A52" />
        <SliderRow label="التركيز" value={focus} onChange={setFocus} color="#3D6B5A" />

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '15px', color: '#111C17', marginBottom: '0.5rem' }}>ملاحظات</div>
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            placeholder="كيف كان يومك؟ ما الذي تعلمته؟"
            style={{
              width: '100%', minHeight: '100px', border: '1px solid #EAE3D3',
              borderRadius: '8px', padding: '0.75rem', fontFamily: 'Tajawal, sans-serif',
              fontSize: '14px', color: '#111C17', resize: 'vertical',
              backgroundColor: '#F5F0E6', outline: 'none', direction: 'rtl',
              boxSizing: 'border-box',
            }}
          />
        </div>

        <button
          onClick={save}
          style={{
            backgroundColor: saved ? '#3D6B5A' : '#2C5346',
            color: '#F5F0E6',
            border: 'none', borderRadius: '8px', padding: '0.75rem 1.5rem',
            fontFamily: 'Tajawal, sans-serif', fontSize: '15px', cursor: 'pointer',
            transition: 'all 0.2s', width: '100%',
          }}
        >
          {saved ? '✓ تم الحفظ!' : 'حفظ التسجيل'}
        </button>
      </div>

      {/* Mood labels */}
      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center' }}>
        {[1, 2, 3, 4, 5].map(v => (
          <div key={v} style={{ textAlign: 'center', flex: 1, maxWidth: '80px' }}>
            <div style={{ fontSize: '24px' }}>{moodEmojis[v]}</div>
            <div style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '12px', color: '#6B8F7E' }}>{moodLabels[v]}</div>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', color: '#2C5346', margin: '0 0 1.25rem 0' }}>
          مسار الحالة (١٤ يوم)
        </h2>
        <div className="chart-wrapper">
        <div className="chart-inner">
        <ResponsiveContainer width="100%" height={220}>
          <LineChart data={last14} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#EAE3D3" />
            <XAxis dataKey="day" tick={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, fill: '#6B8F7E' }} />
            <YAxis domain={[0, 5]} ticks={[1, 2, 3, 4, 5]} tick={{ fontFamily: 'Tajawal, sans-serif', fontSize: 11, fill: '#6B8F7E' }} />
            <Tooltip
              contentStyle={{ fontFamily: 'Tajawal, sans-serif', borderRadius: '8px', border: '1px solid #EAE3D3' }}
              labelStyle={{ fontFamily: 'El Messiri, sans-serif', color: '#2C5346' }}
            />
            <Legend wrapperStyle={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px' }} />
            <Line type="monotone" dataKey="mood" name="المزاج" stroke="#2C5346" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="energy" name="الطاقة" stroke="#C49A52" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
            <Line type="monotone" dataKey="focus" name="التركيز" stroke="#3D6B5A" strokeWidth={2} dot={{ r: 3 }} activeDot={{ r: 5 }} />
          </LineChart>
        </ResponsiveContainer>
        </div>
        </div>
      </div>

      {/* Recent entries */}
      {entries.length > 0 && (
        <div style={cardStyle}>
          <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', color: '#2C5346', margin: '0 0 1.25rem 0' }}>
            السجلات الأخيرة
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[...entries].reverse().slice(0, 5).map(e => (
              <div key={e.date} style={{
                padding: '0.75rem 1rem', backgroundColor: '#F5F0E6', borderRadius: '8px',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              }}>
                <div>
                  <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E' }}>{e.date}</span>
                  {e.notes && (
                    <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#111C17', margin: '0.25rem 0 0 0' }}>
                      {e.notes.substring(0, 60)}{e.notes.length > 60 ? '...' : ''}
                    </p>
                  )}
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', fontSize: '18px' }}>
                  {moodEmojis[e.mood]}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
