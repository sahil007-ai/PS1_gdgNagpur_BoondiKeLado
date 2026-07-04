import React, { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const INITIAL_DOCTORS = [
  { id: 101, name: 'Dr. Sarah Jenkins', specialty_en: 'Cardiology',    specialty_hi: 'हृदय रोग',          hospital: 'Metro Heart Institute',      authorized: true,  avatar: '👩‍⚕️', color: '#FCE4EC', accent: '#E91E63' },
  { id: 102, name: 'Dr. Anand Kumar',   specialty_en: 'Endocrinology', specialty_hi: 'अंतःस्रावी विज्ञान',  hospital: 'Apollo Health Clinic',       authorized: false, avatar: '👨‍⚕️', color: '#E3F2FD', accent: '#2196F3' },
  { id: 110, name: 'Dr. Lisa Chen',     specialty_en: 'Neurology',     specialty_hi: 'तंत्रिका विज्ञान',   hospital: 'St. Jude Specialty Hospital', authorized: false, avatar: '👩‍⚕️', color: '#E8F5E9', accent: '#4CAF50' },
];

export default function ConsentManager() {
  const { t, lang } = useLang();
  const [doctors, setDoctors] = useState(INITIAL_DOCTORS);
  const [query, setQuery] = useState('');

  const toggle = (id) => setDoctors(ds => ds.map(d => d.id === id ? { ...d, authorized: !d.authorized } : d));
  const getSpecialty = (doc) => lang === 'hi' ? doc.specialty_hi : doc.specialty_en;

  const filtered = doctors.filter(d =>
    [d.name, d.specialty_en, d.specialty_hi, d.hospital].some(f => f.toLowerCase().includes(query.toLowerCase()))
  );
  const activeCount = doctors.filter(d => d.authorized).length;

  return (
    <div className="max-w-2xl mx-auto space-y-6 pb-10">

      {/* Header */}
      <div className="animate-float-in">
        <h2 id="consent-title" className="text-2xl font-black tracking-tight" style={{ color: '#1A3D35' }}>{t.consent_title}</h2>
        <p className="text-sm mt-0.5 font-medium" style={{ color: '#6B8F85' }}>{t.consent_subtitle}</p>
      </div>

      {/* Stats + Search */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 animate-float-in">
        <div className="flex gap-2.5 text-xs">
          <div className="clay-sm px-4 py-2.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full" style={{ background: '#4ECBA0' }} />
            <span style={{ color: '#6B8F85' }}>{t.consent_active}: </span>
            <span className="font-bold" style={{ color: '#1A3D35' }}>{activeCount}</span>
          </div>
          <div className="clay-sm px-4 py-2.5">
            <span style={{ color: '#6B8F85' }}>{t.consent_total}: </span>
            <span className="font-bold" style={{ color: '#1A3D35' }}>{doctors.length}</span>
          </div>
        </div>
        <input id="doctor-search" type="text" placeholder={t.consent_search}
          value={query} onChange={(e) => setQuery(e.target.value)}
          className="clay-input px-4 py-2.5 text-xs w-full sm:w-64 text-teal-900 placeholder-teal-300 font-medium" />
      </div>

      {/* Doctor cards */}
      <div className="space-y-3 animate-float-in">
        {filtered.length === 0
          ? <div className="clay p-10 text-center text-sm font-medium" style={{ color: '#9BBAB4' }}>{t.consent_empty}</div>
          : filtered.map((doc, i) => (
            <div key={doc.id}
              className="clay p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4 hover:translate-y-[-1px] transition-transform duration-200 animate-float-in"
              style={{ animationDelay: `${i * 60}ms` }}>

              {/* Avatar + info */}
              <div className="flex items-center gap-3.5 flex-1 min-w-0">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                  style={{ background: doc.color, boxShadow: `3px 3px 10px ${doc.accent}20,-2px -2px 6px rgba(255,255,255,0.9)` }}>
                  {doc.avatar}
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-sm truncate" style={{ color: '#1A3D35' }}>{doc.name}</h4>
                  <p className="text-xs font-medium mt-0.5 truncate" style={{ color: '#7A9A94' }}>
                    {getSpecialty(doc)} · <span style={{ color: doc.accent }}>{doc.hospital}</span>
                  </p>
                </div>
              </div>

              {/* Status + button */}
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="text-[10px] font-bold px-3 py-1.5 rounded-full whitespace-nowrap"
                  style={doc.authorized
                    ? { background: 'rgba(78,203,160,0.12)', color: '#2E8B6A', border: '1px solid rgba(78,203,160,0.25)' }
                    : { background: 'rgba(239,83,80,0.1)', color: '#C62828', border: '1px solid rgba(239,83,80,0.2)' }}>
                  {doc.authorized ? t.consent_status_active : t.consent_status_blocked}
                </span>
                <button id={`consent-toggle-${doc.id}`} onClick={() => toggle(doc.id)}
                  className="clay-btn text-xs font-bold px-4 py-2.5 whitespace-nowrap"
                  style={doc.authorized
                    ? { background: 'rgba(239,83,80,0.1)', color: '#C62828', border: '1px solid rgba(239,83,80,0.2)' }
                    : { background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', color: 'white' }}>
                  {doc.authorized ? t.consent_revoke : t.consent_grant}
                </button>
              </div>
            </div>
          ))
        }
      </div>

      {/* Info note */}
      <div className="clay-sm px-5 py-4 flex items-start gap-3 animate-float-in"
        style={{ background: 'rgba(78,203,160,0.07)', border: '1.5px solid rgba(78,203,160,0.18)' }}>
        <span className="text-lg flex-shrink-0 mt-0.5">🔒</span>
        <p className="text-xs font-medium leading-relaxed" style={{ color: '#5A7A72' }}>{t.consent_note}</p>
      </div>
    </div>
  );
}
