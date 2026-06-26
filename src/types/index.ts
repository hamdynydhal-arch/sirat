export interface Prayer {
  id: string;
  name: string;
  done: boolean;
}

export interface Habit {
  id: string;
  name: string;
  icon: string;
  done: boolean;
}

export interface DailyRecord {
  date: string;
  prayers: Prayer[];
  habits: Habit[];
}

export interface StatusEntry {
  date: string;
  mood: number;
  energy: number;
  focus: number;
  notes: string;
}

export const PRAYERS_LIST: Omit<Prayer, 'done'>[] = [
  { id: 'fajr', name: 'الفجر' },
  { id: 'dhuhr', name: 'الظهر' },
  { id: 'asr', name: 'العصر' },
  { id: 'maghrib', name: 'المغرب' },
  { id: 'isha', name: 'العشاء' },
];

export const HABITS_LIST: Omit<Habit, 'done'>[] = [
  { id: 'quran', name: 'قراءة القرآن', icon: '📖' },
  { id: 'morning_adhkar', name: 'الأذكار الصباحية', icon: '🌅' },
  { id: 'evening_adhkar', name: 'الأذكار المسائية', icon: '🌙' },
  { id: 'reading', name: 'القراءة', icon: '📚' },
  { id: 'exercise', name: 'الرياضة', icon: '🏃' },
  { id: 'water', name: 'شرب الماء (٨ أكواب)', icon: '💧' },
  { id: 'sleep', name: 'النوم المبكر', icon: '😴' },
  { id: 'journal', name: 'تدوين اليوميات', icon: '✍️' },
];
