const islamicContent = [
  {
    category: 'آيات قرآنية',
    color: '#2C5346',
    items: [
      {
        text: 'يَا أَيُّهَا الَّذِينَ آمَنُوا اسْتَعِينُوا بِالصَّبْرِ وَالصَّلَاةِ ۚ إِنَّ اللَّهَ مَعَ الصَّابِرِينَ',
        source: 'سورة البقرة (١٥٣)',
      },
      {
        text: 'وَمَن يَتَّقِ اللَّهَ يَجْعَل لَّهُ مَخْرَجًا ۝ وَيَرْزُقْهُ مِنْ حَيْثُ لَا يَحْتَسِبُ',
        source: 'سورة الطلاق (٢-٣)',
      },
      {
        text: 'أَلَا بِذِكْرِ اللَّهِ تَطْمَئِنُّ الْقُلُوبُ',
        source: 'سورة الرعد (٢٨)',
      },
      {
        text: 'فَإِنَّ مَعَ الْعُسْرِ يُسْرًا ۝ إِنَّ مَعَ الْعُسْرِ يُسْرًا',
        source: 'سورة الشرح (٥-٦)',
      },
    ],
  },
  {
    category: 'أحاديث نبوية',
    color: '#C49A52',
    items: [
      {
        text: 'إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ، وَإِنَّمَا لِكُلِّ امْرِئٍ مَا نَوَى',
        source: 'صحيح البخاري',
      },
      {
        text: 'خَيْرُكُمْ مَنْ تَعَلَّمَ الْقُرْآنَ وَعَلَّمَهُ',
        source: 'صحيح البخاري',
      },
      {
        text: 'أَحَبُّ الأَعْمَالِ إِلَى اللَّهِ أَدْوَمُهَا وَإِنْ قَلَّ',
        source: 'صحيح البخاري',
      },
      {
        text: 'مَنْ سَلَكَ طَرِيقاً يَلْتَمِسُ فِيهِ عِلْماً، سَهَّلَ اللَّهُ لَهُ بِهِ طَرِيقاً إِلَى الجَنَّةِ',
        source: 'صحيح مسلم',
      },
    ],
  },
  {
    category: 'نصائح وإرشادات',
    color: '#3D6B5A',
    items: [
      {
        text: 'ابدأ يومك بالشكر والذكر، فإن ذلك يُضيء لك الطريق ويبارك في وقتك',
        source: 'إرشاد ذاتي',
      },
      {
        text: 'الثبات على العادات الصغيرة خير من الاجتهاد في الكبيرة ثم الانقطاع',
        source: 'حكمة',
      },
      {
        text: 'راقب نيّتك قبل كل عمل، فالنية هي روح العمل وأساس قبوله',
        source: 'إرشاد ذاتي',
      },
      {
        text: 'كن رفيقاً بنفسك حين تخطئ، وعودتك إلى الطريق خير من البقاء في مكانك',
        source: 'حكمة',
      },
    ],
  },
];

const dailyRoutineGuide = [
  { time: 'قبل الفجر', title: 'التهجد والاستعداد', desc: 'استيقظ مبكراً، تجهّز للصلاة، واستقبل يومك بقلب صافٍ' },
  { time: 'الفجر', title: 'صلاة الفجر والأذكار', desc: 'أدِّ صلاة الفجر في وقتها، ثم اقرأ أذكار الصباح وبعض آيات القرآن' },
  { time: 'الصباح', title: 'القراءة والتعلم', desc: 'خصص وقتاً للقراءة وتطوير نفسك، وانتبه للرياضة الصباحية' },
  { time: 'الظهر', title: 'صلاة الظهر والراحة', desc: 'أدِّ الصلاة في وقتها، واستعد لاستكمال يومك بنشاط ويقظة' },
  { time: 'العصر', title: 'صلاة العصر والمراجعة', dest: 'صلِّ العصر واراجع ما أنجزته في يومك' },
  { time: 'المغرب', title: 'صلاة المغرب وأذكار المساء', desc: 'أدِّ صلاة المغرب وأذكار المساء مع غروب الشمس' },
  { time: 'العشاء', title: 'صلاة العشاء وتدوين اليوميات', desc: 'أدِّ صلاة العشاء، ودوّن ما مررت به اليوم، واستعد للنوم المبكر' },
];

export default function Guidance() {
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
          التوجيه
        </h1>
        <p style={{ fontFamily: 'Tajawal, sans-serif', color: '#6B8F7E', margin: 0 }}>
          حكمة ونور على طريقك
        </p>
      </div>

      {/* Hero quote */}
      <div style={{
        background: 'linear-gradient(135deg, #1E3B30 0%, #2C5346 50%, #3D6B5A 100%)',
        borderRadius: '16px',
        padding: '2.5rem 2rem',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(196,154,82,0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(196,154,82,0.08) 0%, transparent 50%)' }}></div>
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '3rem', color: '#C49A52', lineHeight: 1, marginBottom: '1rem' }}>س</div>
          <p style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.35rem', color: '#F5F0E6', lineHeight: 1.8, margin: '0 auto 1rem', maxWidth: '600px' }}>
            اهْدِنَا الصِّرَاطَ الْمُسْتَقِيمَ
          </p>
          <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '14px', color: '#C49A52', margin: 0 }}>سورة الفاتحة (٦)</p>
        </div>
      </div>

      {/* Daily guide */}
      <div style={cardStyle}>
        <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', color: '#2C5346', margin: '0 0 1.25rem 0' }}>
          دليل اليوم المثالي
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
          {dailyRoutineGuide.map((item, i) => (
            <div key={i} style={{ display: 'flex', gap: '1rem', paddingBottom: '1rem', position: 'relative' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 0 }}>
                <div style={{
                  width: '36px', height: '36px', borderRadius: '50%',
                  backgroundColor: '#2C5346', color: '#F5F0E6',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Marcellus, serif', fontSize: '13px',
                  flexShrink: 0,
                }}>
                  {i + 1}
                </div>
                {i < dailyRoutineGuide.length - 1 && (
                  <div style={{ width: '2px', flex: 1, backgroundColor: '#EAE3D3', marginTop: '4px', minHeight: '20px' }}></div>
                )}
              </div>
              <div style={{ paddingTop: '4px' }}>
                <span style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '12px', color: '#C49A52', backgroundColor: '#FBF5E8', padding: '2px 8px', borderRadius: '10px' }}>{item.time}</span>
                <h3 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '15px', color: '#111C17', margin: '0.25rem 0 0.25rem' }}>{item.title}</h3>
                <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '13px', color: '#6B8F7E', margin: 0, lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Islamic content cards */}
      {islamicContent.map(section => (
        <div key={section.category} style={cardStyle}>
          <h2 style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '1.1rem', color: section.color, margin: '0 0 1.25rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span>✦</span> {section.category}
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '1rem' }}>
            {section.items.map((item, i) => (
              <div key={i} style={{
                backgroundColor: '#F5F0E6',
                borderRadius: '10px',
                padding: '1.25rem',
                borderRight: `3px solid ${section.color}`,
              }}>
                <p style={{ fontFamily: 'El Messiri, sans-serif', fontSize: '15px', color: '#111C17', lineHeight: 1.8, margin: '0 0 0.75rem 0' }}>
                  {item.text}
                </p>
                <p style={{ fontFamily: 'Tajawal, sans-serif', fontSize: '12px', color: section.color, margin: 0 }}>
                  — {item.source}
                </p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
