import React, { useState } from 'react';
import { useLang } from '../context/LanguageContext';

const ROLE_KEYS = ['auth_role_patient', 'auth_role_doctor', 'auth_role_admin'];

export default function Auth({ onLoginSuccess }) {
  const { t, lang, setLang } = useLang();

  const [step, setStep] = useState(1);
  const [idNumber, setIdNumber] = useState('');
  const [mobile, setMobile] = useState('');
  const [otp, setOtp] = useState('');
  const [roleIndex, setRoleIndex] = useState(0); // 0=Patient 1=Doctor 2=Admin
  const [loading, setLoading] = useState(false);

  const roleValues = ['Patient', 'Doctor', 'Admin'];

  const formatId = (val) => {
    const v = val.replace(/\D/g, '');
    return v.match(/.{1,4}/g)?.join(' ') ?? v;
  };

  const handleSendOTP = (e) => {
    e.preventDefault();
    if (idNumber.length !== 12 || mobile.length !== 10) {
      alert(t.auth_invalid_fields);
      return;
    }
    setLoading(true);
    setTimeout(() => { setLoading(false); setStep(2); }, 900);
  };

  const handleVerifyOTP = (e) => {
    e.preventDefault();
    if (otp.length !== 6) { alert(t.auth_invalid_otp); return; }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({ role: roleValues[roleIndex], idNumber });
    }, 1100);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4"
      style={{ background: 'linear-gradient(145deg, #E8F7F2 0%, #EBF4FF 50%, #F0FBF7 100%)' }}>

      {/* Blobs */}
      <div className="fixed top-[-80px] left-[-80px] w-80 h-80 rounded-full pointer-events-none"
        style={{ background: 'rgba(110,214,183,0.25)', filter: 'blur(70px)' }} />
      <div className="fixed bottom-[-80px] right-[-80px] w-96 h-96 rounded-full pointer-events-none"
        style={{ background: 'rgba(100,181,246,0.2)', filter: 'blur(80px)' }} />

      <div className="clay animate-float-in w-full max-w-sm p-8 relative z-10">

        {/* Language switcher */}
        <div className="flex justify-end mb-3">
          <div className="flex p-1 rounded-2xl gap-1" style={{ background: 'rgba(200,230,220,0.35)', boxShadow: 'inset 2px 2px 6px rgba(150,200,185,0.2)' }}>
            {['en', 'hi'].map((l) => (
              <button key={l} id={`lang-${l}`} onClick={() => setLang(l)}
                className={`px-3 py-1 text-xs font-bold rounded-xl transition-all duration-200 ${lang === l ? 'clay-btn text-white' : 'text-teal-700'}`}
                style={lang === l ? { background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '3px 3px 8px rgba(78,203,160,0.3)' } : {}}>
                {l === 'en' ? 'EN' : 'HI'}
              </button>
            ))}
          </div>
        </div>

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl mb-4"
            style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '6px 6px 18px rgba(78,203,160,0.35),-3px -3px 8px rgba(255,255,255,0.9)' }}>
            <span className="text-white font-black text-2xl tracking-tighter">H</span>
          </div>
          <h1 id="auth-brand" className="text-3xl font-black tracking-tight" style={{ color: '#1A3D35' }}>
            {t.auth_brand}
          </h1>
          <p className="text-sm mt-1 font-medium" style={{ color: '#6B8F85' }}>{t.auth_tagline}</p>
        </div>

        {/* Role Switcher */}
        {step === 1 && (
          <div className="flex p-1 mb-6 rounded-2xl gap-1"
            style={{ background: 'rgba(200,230,220,0.35)', boxShadow: 'inset 2px 2px 6px rgba(150,200,185,0.2)' }}>
            {ROLE_KEYS.map((key, i) => (
              <button key={key} id={`role-${roleValues[i].toLowerCase()}`} type="button" onClick={() => setRoleIndex(i)}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition-all duration-200 ${roleIndex === i ? 'clay-btn text-white' : 'text-teal-700 hover:text-teal-900'}`}
                style={roleIndex === i ? { background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)', boxShadow: '3px 3px 8px rgba(78,203,160,0.3),-1px -1px 4px rgba(255,255,255,0.8)' } : {}}>
                {t[key]}
              </button>
            ))}
          </div>
        )}

        {step === 1 ? (
          <form onSubmit={handleSendOTP} className="space-y-4">
            <div>
              <label htmlFor="id-input" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: '#5A7A72' }}>
                {t.auth_id_label}
              </label>
              <input id="id-input" type="text" inputMode="numeric" maxLength={14}
                placeholder={t.auth_id_placeholder}
                value={formatId(idNumber)}
                onChange={(e) => setIdNumber(e.target.value.replace(/\D/g,'').slice(0,12))}
                className="clay-input w-full px-4 py-3 text-center font-mono text-lg tracking-widest text-teal-900 placeholder-teal-300"
                required />
            </div>
            <div>
              <label htmlFor="mobile-input" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider" style={{ color: '#5A7A72' }}>
                {t.auth_mobile_label}
              </label>
              <input id="mobile-input" type="tel" maxLength={10}
                placeholder={t.auth_mobile_placeholder}
                value={mobile} onChange={(e) => setMobile(e.target.value.replace(/\D/g,'').slice(0,10))}
                className="clay-input w-full px-4 py-3 text-teal-900 placeholder-teal-300"
                required />
            </div>
            <button id="send-otp-btn" type="submit" disabled={loading}
              className="clay-btn w-full py-3.5 font-bold text-sm text-white mt-2 flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)' }}>
              {loading
                ? <span className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                : t.auth_send_otp}
            </button>
          </form>
        ) : (
          <form onSubmit={handleVerifyOTP} className="space-y-4">
            <div className="rounded-2xl px-4 py-3 text-center"
              style={{ background: 'rgba(78,203,160,0.08)', border: '1.5px solid rgba(78,203,160,0.2)' }}>
              <p className="text-xs font-medium" style={{ color: '#5A7A72' }}>{t.auth_otp_sent_to}</p>
              <p className="font-mono font-bold text-teal-700 mt-0.5">••••••{mobile.slice(-4)}</p>
            </div>
            <div>
              <label htmlFor="otp-input" className="block text-xs font-semibold mb-1.5 uppercase tracking-wider text-center" style={{ color: '#5A7A72' }}>
                {t.auth_otp_label}
              </label>
              <input id="otp-input" type="text" inputMode="numeric" maxLength={6}
                placeholder={t.auth_otp_placeholder}
                value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g,'').slice(0,6))}
                className="clay-input w-full px-4 py-3.5 text-center font-mono text-2xl font-black tracking-[0.5em] text-teal-800 placeholder-teal-200"
                required />
              <p className="text-[10px] text-center mt-1.5 font-medium" style={{ color: '#8AAFA8' }}>
                {t.auth_otp_hint}
              </p>
            </div>
            <button id="verify-otp-btn" type="submit" disabled={loading}
              className="clay-btn w-full py-3.5 font-bold text-sm text-white flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg,#4ECBA0,#38B2AC)' }}>
              {loading
                ? <span className="w-5 h-5 border-2 border-white/60 border-t-white rounded-full animate-spin" />
                : t.auth_verify}
            </button>
            <button id="back-btn" type="button" onClick={() => setStep(1)}
              className="w-full text-center text-xs font-semibold py-2 transition-colors"
              style={{ color: '#6BAAA0' }}>
              {t.auth_back}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
