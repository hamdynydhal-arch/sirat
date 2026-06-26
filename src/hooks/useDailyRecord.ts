import { useLocalStorage } from './useLocalStorage';
import { type DailyRecord, PRAYERS_LIST, HABITS_LIST } from '../types';

function getTodayDate(): string {
  return new Date().toISOString().split('T')[0];
}

function createEmptyRecord(date: string): DailyRecord {
  return {
    date,
    prayers: PRAYERS_LIST.map(p => ({ ...p, done: false })),
    habits: HABITS_LIST.map(h => ({ ...h, done: false })),
  };
}

export function useDailyRecord() {
  const today = getTodayDate();
  const [records, setRecords] = useLocalStorage<Record<string, DailyRecord>>('sirat_records', {});

  const todayRecord = records[today] || createEmptyRecord(today);

  const togglePrayer = (prayerId: string) => {
    const record = records[today] || createEmptyRecord(today);
    const updated = {
      ...record,
      prayers: record.prayers.map(p =>
        p.id === prayerId ? { ...p, done: !p.done } : p
      ),
    };
    setRecords(prev => ({ ...prev, [today]: updated }));
  };

  const toggleHabit = (habitId: string) => {
    const record = records[today] || createEmptyRecord(today);
    const updated = {
      ...record,
      habits: record.habits.map(h =>
        h.id === habitId ? { ...h, done: !h.done } : h
      ),
    };
    setRecords(prev => ({ ...prev, [today]: updated }));
  };

  const getLastNDays = (n: number): DailyRecord[] => {
    const days: DailyRecord[] = [];
    for (let i = n - 1; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateStr = d.toISOString().split('T')[0];
      days.push(records[dateStr] || createEmptyRecord(dateStr));
    }
    return days;
  };

  return {
    todayRecord,
    togglePrayer,
    toggleHabit,
    getLastNDays,
    today,
  };
}
