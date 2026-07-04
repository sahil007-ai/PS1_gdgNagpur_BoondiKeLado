import React, { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const INITIAL_RECORDS = [
  { id: 1, date: '2026-05-12', title_en: 'Complete Blood Count (CBC)',           title_hi: 'पूर्ण रक्त गणना (CBC)',            facility: 'Metro Diagnostics',         type_en: 'Lab Report',  type_hi: 'लैब रिपोर्ट',   tags_en: ['Blood Work', 'Anemia'],          tags_hi: ['रक्त कार्य', 'एनीमिया'],      icon: '🧪', color: '#E8F5E9', accent: '#4CAF50' },
  { id: 2, date: '2026-02-18', title_en: 'Chest X-Ray — Posterior-Anterior',     title_hi: 'छाती का X-Ray — PA व्यू',           facility: 'City General Hospital',     type_en: 'Radiology',   type_hi: 'रेडियोलॉजी',    tags_en: ['Pulmonary', 'Thoracic'],         tags_hi: ['फुफ्फुसीय', 'वक्षीय'],        icon: '🩻', color: '#E3F2FD', accent: '#2196F3' },
  { id: 3, date: '2025-11-04', title_en: 'ECG / Electrocardiogram',              title_hi: 'ECG / हृदय विद्युत लेख',            facility: 'Heart & Vascular Centre',   type_en: 'Cardiology',  type_hi: 'हृदय रोग विज्ञान', tags_en: ['ECG Scan', 'Rhythm Analysis'],    tags_hi: ['ECG स्कैन', 'लय विश्लेषण'], icon: '🫀', color: '#FCE4EC', accent: '#E91E63' },
];

export default function Dashboard({ user }) {
  const { t, lang } = useLang();
  const [records, setRecords] = useState(INITIAL_RECORDS);
  const [uploading, setUploading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setTimeout(() => {
      setRecords(prev => [{
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        title_en: file.name.replace(/[-_]/g,' ').replace(/\.[^.]+$/,'') || 'Processed Document',
        title_hi: file.name.replace(/[-_]/g,' ').replace(/\.[^.]+$/,'') || 'संसाधित दस्तावेज़',
        facility: t.ocr_facility,
        type_en: 'General Record', type_hi: 'सामान्य रिकॉर्ड',
        tags_en: ['OCR Extracted', 'AI Tagged'], tags_hi: ['OCR निकाला', 'AI टैग'],
        icon: file.type.includes('image') ? '🖼️' : '📄',
        color: '#F3E5F5', accent: '#9C27B0'
      }, ...prev]);
      setUploading(false);
    }, 2000);
    e.target.value = '';
  };

  const getTitle = (rec) => lang === 'hi' ? rec.title_hi : rec.title_en;
  const getType  = (rec) => lang === 'hi' ? rec.type_hi  : rec.type_en;
  const getTags  = (rec) => lang === 'hi' ? rec.tags_hi  : rec.tags_en;

  return (
    <div className="max-w-3xl mx-auto space-y-6 pb-10">

      {/* Header */}
      <div className="animate-float-in">
        <h2 id="dashboard-title" className="text-2xl font-black tracking-tight" style={{ color: '#1A3D35' }}>
          {t.dash_title}
        </h2>
        <p className="text-sm mt-0.5 font-medium" style={{ color: '#6B8F85' }}>{t.dash_subtitle}</p>
      </div>

      {/* Emergency strip */}
      <div className="clay animate-float-in flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5"
        style={{ background: 'linear-gradient(135deg,rgba(255,235,238,0.95),rgba(255,245,245,0.9))', border: '1.5px solid rgba(239,154,154,0.4)' }}>
        <div className="space-y-1">
          <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest" style={{ color: '#E53935' }}>
            <span className="w-2 h-2 rounded-full animate-pulse-soft" style={{ background: '#EF5350' }} />
            {t.dash_emergency_label}
          </span>
          <p className="text-sm font-semibold" style={{ color: '#3E1F1F' }}>
            {t.dash_blood}: <span className="font-black" style={{ color: '#E53935' }}>O+</span>
            &nbsp;·&nbsp; {t.dash_allergy}: <span className="font-bold" style={{ color: '#E53935' }}>Penicillin</span>
            &nbsp;·&nbsp; {t.dash_chronic}: <span style={{ color: '#6B4040' }}>None</span>
          </p>
        </div>
        <button id="view-qr-btn" onClick={() => setShowQR(true)}
          className="clay-btn text-xs font-bold px-4 py-2.5 whitespace-nowrap"
          style={{ background: 'white', color: '#E53935', border: '1.5px solid rgba(239,154,154,0.4)' }}>
          {t.dash_qr_btn}
        </button>
      </div>

      {/* Stats + Upload */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 animate-float-in">
        <div className="flex gap-3 text-xs">
          <div className="clay-sm px-4 py-2.5">
            <span style={{ color: '#6B8F85' }}>{t.dash_total}: </span>
            <span className="font-bold" style={{ color: '#1A3D35' }}>{records.length}</span>
          </div>
          <div className="clay-sm px-4 py-2.5">
            <span style={{ color: '#6B8F85' }}>{t.dash_role}: </span>
            <span className="font-bold" style={{ color: '#38B2AC' }}>{user?.role}</span>
          </div>
        </div>
        <label className={`clay-btn text-sm font-bold px-5 py-2.5 text-white cursor-pointer flex items-center gap-2 ${uploading ? 'opacity-75 pointer-events-none' : ''}`}
          style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)' }}>
          {uploading
            ? <><span className="w-4 h-4 border-2 border-white/60 border-t-white rounded-full animate-spin" /> {t.dash_processing}</>
            : <><span className="text-base">＋</span> {t.dash_upload}</>}
          <input type="file" className="hidden" disabled={uploading} onChange={handleFileUpload} accept=".pdf,image/*" />
        </label>
      </div>

      {/* Timeline */}
      <div className="relative pl-8 space-y-5">
        <div className="absolute left-[15px] top-4 bottom-0 w-0.5 rounded-full"
          style={{ background: 'linear-gradient(to bottom,#4ECBA0,rgba(78,203,160,0.1))' }} />

        {records.length === 0 ? (
          <div className="clay p-12 text-center">
            <span className="text-3xl block mb-2">📭</span>
            <p className="text-sm font-semibold" style={{ color: '#6B8F85' }}>{t.dash_empty}</p>
            <p className="text-xs mt-1" style={{ color: '#9BBAB4' }}>{t.dash_empty_sub}</p>
          </div>
        ) : records.map((rec, i) => (
          <div key={rec.id} className="relative animate-float-in" style={{ animationDelay: `${i * 60}ms` }}>
            {/* Node */}
            <div className="absolute -left-8 top-5 w-5 h-5 rounded-full flex items-center justify-center"
              style={{ background: 'white', boxShadow: `0 0 0 3px ${rec.accent}40, 3px 3px 8px rgba(0,0,0,0.08)` }}>
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: rec.accent }} />
            </div>

            <div className="clay p-5 hover:translate-y-[-2px] transition-transform duration-200 cursor-default group">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-xl flex-shrink-0"
                  style={{ background: rec.color, boxShadow: `3px 3px 10px ${rec.accent}20,-2px -2px 6px rgba(255,255,255,0.9)` }}>
                  {rec.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="text-[10px] font-bold font-mono uppercase tracking-widest px-2 py-0.5 rounded-full"
                      style={{ background: `${rec.accent}15`, color: rec.accent }}>
                      {rec.date}
                    </span>
                    <span className="text-[10px] font-medium" style={{ color: '#9BBAB4' }}>{getType(rec)}</span>
                  </div>
                  <h3 className="text-sm font-bold leading-tight group-hover:text-teal-700 transition-colors" style={{ color: '#1A3D35' }}>
                    {getTitle(rec)}
                  </h3>
                  <p className="text-xs mt-0.5 font-medium" style={{ color: '#7A9A94' }}>{rec.facility}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {getTags(rec).map((tag, idx) => (
                      <span key={idx} className="text-[10px] font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: 'rgba(200,235,225,0.5)', color: '#3B8B80', border: '1px solid rgba(78,203,160,0.2)' }}>
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
                <button className="clay-sm px-3 py-2 text-[10px] font-bold flex-shrink-0 hover:text-teal-600 transition-colors" style={{ color: '#6B8F85' }}>
                  {t.dash_view}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* QR Modal */}
      {showQR && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 backdrop-blur-sm" style={{ background: 'rgba(20,50,45,0.35)' }} onClick={() => setShowQR(false)} />
          <div className="clay animate-float-in max-w-xs w-full p-8 relative z-10 text-center space-y-5">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full"
                style={{ background: 'rgba(78,203,160,0.12)', color: '#38B2AC' }}>
                {t.qr_badge}
              </span>
              <h3 className="text-lg font-black mt-3" style={{ color: '#1A3D35' }}>{t.qr_title}</h3>
            </div>
            <div className="inline-block p-4 rounded-3xl"
              style={{ background: 'white', boxShadow: '5px 5px 15px rgba(0,0,0,0.08),-3px -3px 8px rgba(255,255,255,0.9)' }}>
              <div className="w-44 h-44 relative flex items-center justify-center">
                <div className="absolute inset-0 grid grid-cols-7 gap-1 p-1 opacity-60">
                  {Array.from({ length: 49 }).map((_, i) => (
                    <div key={i} className="rounded-[2px]"
                      style={{ background: ((i * 7 + 3) % 4 === 0 || i < 7 || i % 7 === 0 || i > 41 || i % 7 === 6) ? '#1A3D35' : 'transparent' }} />
                  ))}
                </div>
                <span className="relative text-[9px] font-black font-mono px-2 py-1 rounded"
                  style={{ background: '#4ECBA0', color: 'white' }}>
                  HEAL-{user?.idNumber?.slice(-4) || '4321'}
                </span>
              </div>
            </div>
            <div className="space-y-1 text-xs" style={{ color: '#6B8F85' }}>
              <p className="font-semibold" style={{ color: '#1A3D35' }}>{t.qr_for}</p>
              <p>{t.qr_blood}</p>
            </div>
            <button id="close-qr-btn" onClick={() => setShowQR(false)}
              className="clay-btn w-full py-3 text-sm font-bold"
              style={{ color: '#3B8B80', background: 'rgba(78,203,160,0.1)' }}>
              {t.qr_close}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
