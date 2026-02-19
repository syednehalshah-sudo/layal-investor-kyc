import { useState } from "react";

const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=DM+Sans:wght@300;400;500&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  body { font-family: 'DM Sans', sans-serif; background: #0b0c0e; min-height: 100vh; }
  .shell {
    min-height: 100vh; background: #0b0c0e; display: flex; align-items: center;
    justify-content: center; padding: 2rem; position: relative; overflow: hidden;
  }
  .shell::before {
    content: ''; position: fixed; top: -30%; right: -20%; width: 60vw; height: 60vw;
    background: radial-gradient(circle, rgba(180,145,90,0.08) 0%, transparent 70%); pointer-events: none;
  }
  .shell::after {
    content: ''; position: fixed; bottom: -20%; left: -10%; width: 40vw; height: 40vw;
    background: radial-gradient(circle, rgba(120,100,200,0.06) 0%, transparent 70%); pointer-events: none;
  }
  .card {
    background: #111214; border: 1px solid #222428; border-radius: 2px;
    width: 100%; max-width: 680px; padding: 3rem; position: relative; z-index: 1;
  }
  .card-accent { position: absolute; top: 0; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, #b4915a, #d4af7a, #b4915a); }
  .logo-mark { font-family: 'Cormorant Garamond', serif; font-size: 0.75rem; font-weight: 300; letter-spacing: 0.35em; color: #b4915a; text-transform: uppercase; margin-bottom: 2.5rem; }
  h1 { font-family: 'Cormorant Garamond', serif; font-size: 2.2rem; font-weight: 300; color: #e8e0d0; line-height: 1.2; margin-bottom: 0.4rem; }
  .subtitle { font-size: 0.82rem; color: #555860; font-weight: 300; letter-spacing: 0.02em; margin-bottom: 2.5rem; }
  .progress-bar { display: flex; gap: 4px; margin-bottom: 2.5rem; }
  .progress-seg { height: 2px; flex: 1; background: #1e2024; transition: background 0.4s ease; }
  .progress-seg.active { background: #b4915a; }
  .progress-seg.done { background: #6a5a3a; }
  .step-label { font-size: 0.72rem; letter-spacing: 0.12em; color: #444750; text-transform: uppercase; margin-bottom: 1.8rem; }
  .field { margin-bottom: 1.4rem; }
  label { display: block; font-size: 0.75rem; letter-spacing: 0.08em; color: #888b90; text-transform: uppercase; margin-bottom: 0.5rem; }
  label span.req { color: #b4915a; margin-left: 2px; }
  input[type="text"], input[type="email"], input[type="number"], input[type="url"], select, textarea {
    width: 100%; background: #0d0e10; border: 1px solid #1e2024; border-radius: 1px;
    color: #c8c0b0; font-family: 'DM Sans', sans-serif; font-size: 0.9rem; font-weight: 300;
    padding: 0.75rem 1rem; outline: none; transition: border-color 0.2s, box-shadow 0.2s;
    appearance: none; -webkit-appearance: none;
  }
  input:focus, select:focus, textarea:focus { border-color: #b4915a; box-shadow: 0 0 0 1px rgba(180,145,90,0.15); }
  select {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='6'%3E%3Cpath d='M0 0l5 6 5-6z' fill='%23555860'/%3E%3C/svg%3E");
    background-repeat: no-repeat; background-position: right 1rem center; padding-right: 2.5rem; cursor: pointer;
  }
  select option { background: #111214; }
  textarea { resize: vertical; min-height: 80px; }
  .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; }
  .checkbox-group { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-top: 0.4rem; }
  .check-item {
    display: flex; align-items: center; gap: 0.6rem; background: #0d0e10; border: 1px solid #1e2024;
    border-radius: 1px; padding: 0.55rem 0.8rem; cursor: pointer; transition: border-color 0.2s;
    font-size: 0.82rem; color: #888b90; font-weight: 300;
  }
  .check-item:hover { border-color: #333640; }
  .check-item.selected { border-color: #b4915a; color: #c8b88a; }
  .check-item input { display: none; }
  .check-box {
    width: 14px; height: 14px; border: 1px solid #333640; border-radius: 1px;
    display: flex; align-items: center; justify-content: center; flex-shrink: 0;
    font-size: 9px; color: #b4915a; transition: border-color 0.2s, background 0.2s;
  }
  .check-item.selected .check-box { border-color: #b4915a; background: rgba(180,145,90,0.1); }
  .divider { border: none; border-top: 1px solid #1a1c20; margin: 2rem 0; }
  .section-title { font-family: 'Cormorant Garamond', serif; font-size: 1rem; font-weight: 400; color: #b4915a; letter-spacing: 0.05em; margin-bottom: 1.2rem; }
  .btn-row { display: flex; justify-content: space-between; align-items: center; margin-top: 2.5rem; }
  .btn-back {
    background: none; border: 1px solid #1e2024; color: #555860; font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem; letter-spacing: 0.08em; text-transform: uppercase; padding: 0.7rem 1.5rem;
    cursor: pointer; border-radius: 1px; transition: border-color 0.2s, color 0.2s;
  }
  .btn-back:hover { border-color: #333640; color: #888b90; }
  .btn-next {
    background: #b4915a; border: none; color: #0b0c0e; font-family: 'DM Sans', sans-serif;
    font-size: 0.8rem; font-weight: 500; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.7rem 2rem; cursor: pointer; border-radius: 1px; transition: background 0.2s, transform 0.1s;
  }
  .btn-next:hover { background: #c8a46a; }
  .btn-next:active { transform: scale(0.98); }
  .btn-next:disabled { background: #2a2c30; color: #555860; cursor: not-allowed; }
  .success-state { text-align: center; padding: 2rem 0; }
  .success-icon {
    width: 56px; height: 56px; border: 1px solid #b4915a; border-radius: 50%;
    display: flex; align-items: center; justify-content: center; margin: 0 auto 1.5rem;
    font-size: 1.4rem; color: #b4915a;
  }
  .success-state h2 { font-family: 'Cormorant Garamond', serif; font-size: 1.8rem; font-weight: 300; color: #e8e0d0; margin-bottom: 0.6rem; }
  .success-state p { font-size: 0.85rem; color: #555860; font-weight: 300; line-height: 1.7; }
  .type-cards { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 1rem; margin-top: 1rem; }
  .type-card {
    background: #0d0e10; border: 1px solid #1e2024; border-radius: 1px; padding: 1.4rem 1rem;
    cursor: pointer; text-align: center; transition: border-color 0.2s, background 0.2s;
  }
  .type-card:hover { border-color: #333640; }
  .type-card.selected { border-color: #b4915a; background: rgba(180,145,90,0.04); }
  .type-card-icon { font-size: 1.6rem; margin-bottom: 0.6rem; }
  .type-card-name { font-size: 0.8rem; letter-spacing: 0.06em; text-transform: uppercase; color: #888b90; font-weight: 400; }
  .type-card.selected .type-card-name { color: #b4915a; }
  .submitted-badge {
    display: inline-block; background: rgba(180,145,90,0.1); border: 1px solid #b4915a;
    color: #b4915a; font-size: 0.7rem; letter-spacing: 0.1em; text-transform: uppercase;
    padding: 0.3rem 0.8rem; border-radius: 1px; margin-bottom: 1rem;
  }
  @media (max-width: 600px) {
    .card { padding: 2rem 1.5rem; }
    .grid-2, .checkbox-group, .type-cards { grid-template-columns: 1fr; }
  }
`;

const SECTORS = ["Fintech","Healthtech","EdTech","CleanTech","AgriTech","SaaS","AI/ML","Consumer","DeepTech","PropTech","LegalTech","Logistics","Cybersecurity","Gaming","MediaTech","Other"];
const STAGES = ["Idea / Pre-seed","Seed","Bridge","Series A","Series B+","Growth / Mature","SMEs","Buyout"];
const GEOGRAPHIES = ["MENA","Sub-Saharan Africa","South Asia","Southeast Asia","Europe","North America","Latin America","Global"];

function MultiCheck({ options, value, onChange, cols = 2 }) {
  const toggle = (opt) => {
    if (value.includes(opt)) onChange(value.filter(v => v !== opt));
    else onChange([...value, opt]);
  };
  return (
    <div className="checkbox-group" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {options.map(opt => (
        <label key={opt} className={`check-item${value.includes(opt) ? " selected" : ""}`} onClick={() => toggle(opt)}>
          <span className="check-box">{value.includes(opt) ? "✓" : ""}</span>
          {opt}
        </label>
      ))}
    </div>
  );
}

function Field({ label, required, children }) {
  return (
    <div className="field">
      <label>{label}{required && <span className="req">*</span>}</label>
      {children}
    </div>
  );
}

function StepType({ data, onChange, onNext }) {
  const types = [
    { key: "angel", icon: "👤", label: "Angel Investor" },
    { key: "institutional", icon: "🏛", label: "Institutional" },
    { key: "family_office", icon: "🏠", label: "Family Office" },
  ];
  return (
    <div>
      <p className="step-label">Step 1 of 3 — Investor Classification</p>
      <Field label="Select your investor type" required>
        <div className="type-cards">
          {types.map(t => (
            <div key={t.key} className={`type-card${data.investorType === t.key ? " selected" : ""}`} onClick={() => onChange("investorType", t.key)}>
              <div className="type-card-icon">{t.icon}</div>
              <div className="type-card-name">{t.label}</div>
            </div>
          ))}
        </div>
      </Field>
      <div className="btn-row">
        <span />
        <button className="btn-next" disabled={!data.investorType} onClick={onNext}>Continue →</button>
      </div>
    </div>
  );
}

function StepIdentity({ data, onChange, onNext, onBack, type }) {
  const isInst = type === "institutional" || type === "family_office";
  const valid = data.fullName && data.email && (isInst ? data.entityName : true);
  return (
    <div>
      <p className="step-label">Step 2 of 3 — {isInst ? "Entity" : "Personal"} Details</p>
      {isInst && (
        <>
          <p className="section-title">{type === "family_office" ? "Family Office Details" : "Institutional Details"}</p>
          <div className="grid-2">
            <Field label="Entity / Fund Name" required><input type="text" value={data.entityName || ""} onChange={e => onChange("entityName", e.target.value)} placeholder="Acme Capital Partners" /></Field>
            <Field label="Registration Number"><input type="text" value={data.regNumber || ""} onChange={e => onChange("regNumber", e.target.value)} placeholder="CR-12345" /></Field>
          </div>
          <div className="grid-2">
            <Field label="Country of Incorporation" required>
              <select value={data.incorporationCountry || ""} onChange={e => onChange("incorporationCountry", e.target.value)}>
                <option value="">Select country</option>
                {["Qatar","UAE","Saudi Arabia","Bahrain","Kuwait","Oman","USA","UK","Singapore","Cayman Islands","Other"].map(c=><option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Fund / AUM Size (USD)">
              <select value={data.aumSize || ""} onChange={e => onChange("aumSize", e.target.value)}>
                <option value="">Select range</option>
                {["<$10M","$10M–$50M","$50M–$200M","$200M–$1B",">$1B"].map(r=><option key={r}>{r}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid-2">
            <Field label="Fund Type">
              <select value={data.fundType || ""} onChange={e => onChange("fundType", e.target.value)}>
                <option value="">Select</option>
                {["VC Fund","PE Fund","Corporate VC","Sovereign Fund","Endowment","Pension Fund","Hedge Fund","Family Office"].map(f=><option key={f}>{f}</option>)}
              </select>
            </Field>
            <Field label="Fund Website"><input type="url" value={data.website || ""} onChange={e => onChange("website", e.target.value)} placeholder="https://acmecapital.com" /></Field>
          </div>
          <hr className="divider" />
        </>
      )}
      <p className="section-title">{isInst ? "Primary Contact" : "Personal Information"}</p>
      <div className="grid-2">
        <Field label="Full Name" required><input type="text" value={data.fullName || ""} onChange={e => onChange("fullName", e.target.value)} placeholder="Sarah Al-Mahmoud" /></Field>
        {isInst && <Field label="Title / Role"><input type="text" value={data.title || ""} onChange={e => onChange("title", e.target.value)} placeholder="Managing Partner" /></Field>}
      </div>
      <div className="grid-2">
        <Field label="Email Address" required><input type="email" value={data.email || ""} onChange={e => onChange("email", e.target.value)} placeholder="sarah@example.com" /></Field>
        <Field label="Phone Number"><input type="text" value={data.phone || ""} onChange={e => onChange("phone", e.target.value)} placeholder="+974 XXXX XXXX" /></Field>
      </div>
      {!isInst && (
        <>
          <div className="grid-2">
            <Field label="Nationality / Residency">
              <select value={data.nationality || ""} onChange={e => onChange("nationality", e.target.value)}>
                <option value="">Select country</option>
                {["Qatar","UAE","Saudi Arabia","Bahrain","Kuwait","Oman","USA","UK","India","Other"].map(c=><option key={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="LinkedIn Profile"><input type="url" value={data.linkedin || ""} onChange={e => onChange("linkedin", e.target.value)} placeholder="https://linkedin.com/in/..." /></Field>
          </div>
          <Field label="Professional Background">
            <select value={data.background || ""} onChange={e => onChange("background", e.target.value)}>
              <option value="">Select</option>
              {["Entrepreneur / Founder","C-Suite Executive","Finance / Banking","Consulting","Technology","Legal / Medical","Other"].map(b=><option key={b}>{b}</option>)}
            </select>
          </Field>
          <Field label="Accredited Investor Status" required>
            <select value={data.accredited || ""} onChange={e => onChange("accredited", e.target.value)}>
              <option value="">Select</option>
              <option>Yes — Self-certified</option>
              <option>Yes — Verified by third party</option>
              <option>No</option>
            </select>
          </Field>
        </>
      )}
      <div className="btn-row">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" disabled={!valid} onClick={onNext}>Continue →</button>
      </div>
    </div>
  );
}

function StepPreferences({ data, onChange, onSubmit, onBack, type, submitting }) {
  const isInst = type === "institutional" || type === "family_office";
  const valid = data.minTicket && data.maxTicket && data.sectors?.length && data.stages?.length && data.geographies?.length;
  return (
    <div>
      <p className="step-label">Step 3 of 3 — Investment Preferences</p>
      <p className="section-title">Ticket Size</p>
      <div className="grid-2">
        <Field label="Minimum Investment (USD)" required>
          <select value={data.minTicket || ""} onChange={e => onChange("minTicket", e.target.value)}>
            <option value="">Select</option>
            {["<$25K","$25K–$50K","$50K–$100K","$100K–$250K","$250K–$500K","$500K–$1M","$1M–$5M","$5M+"].map(r=><option key={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Maximum Investment (USD)" required>
          <select value={data.maxTicket || ""} onChange={e => onChange("maxTicket", e.target.value)}>
            <option value="">Select</option>
            {["$25K–$100K","$100K–$500K","$500K–$1M","$1M–$5M","$5M–$20M","$20M+"].map(r=><option key={r}>{r}</option>)}
          </select>
        </Field>
      </div>
      {isInst && (
        <div className="grid-2">
          <Field label="Target Annual Deployments">
            <select value={data.annualDeployments || ""} onChange={e => onChange("annualDeployments", e.target.value)}>
              <option value="">Select</option>
              {["1–3","4–10","10–20","20+"].map(r=><option key={r}>{r}</option>)}
            </select>
          </Field>
          <Field label="Follow-on Reserves?">
            <select value={data.followOn || ""} onChange={e => onChange("followOn", e.target.value)}>
              <option value="">Select</option>
              <option>Yes — typically participate</option>
              <option>Sometimes — case by case</option>
              <option>No — initial check only</option>
            </select>
          </Field>
        </div>
      )}
      <hr className="divider" />
      <p className="section-title">Sector Focus</p>
      <Field label="Preferred Sectors" required>
        <MultiCheck options={SECTORS} value={data.sectors || []} onChange={v => onChange("sectors", v)} cols={3} />
      </Field>
      <hr className="divider" />
      <p className="section-title">Stage Preference</p>
      <Field label="Company Stage" required>
        <MultiCheck options={STAGES} value={data.stages || []} onChange={v => onChange("stages", v)} cols={2} />
      </Field>
      <hr className="divider" />
      <p className="section-title">Geography</p>
      <Field label="Target Markets" required>
        <MultiCheck options={GEOGRAPHIES} value={data.geographies || []} onChange={v => onChange("geographies", v)} cols={2} />
      </Field>
      <hr className="divider" />
      <p className="section-title">Portfolio & Track Record</p>
      <div className="grid-2">
        <Field label="Active Investments">
          <select value={data.activeInvestments || ""} onChange={e => onChange("activeInvestments", e.target.value)}>
            <option value="">Select</option>
            {["0 (First investment)","1–5","6–15","16–30","30+"].map(r=><option key={r}>{r}</option>)}
          </select>
        </Field>
        <Field label="Exits / Realized Returns">
          <select value={data.exits || ""} onChange={e => onChange("exits", e.target.value)}>
            <option value="">Select</option>
            {["None yet","1–3","4–10","10+"].map(r=><option key={r}>{r}</option>)}
          </select>
        </Field>
      </div>
      <Field label="Notable Portfolio Companies">
        <input type="text" value={data.notablePortfolio || ""} onChange={e => onChange("notablePortfolio", e.target.value)} placeholder="e.g. Careem, Sarwa, Anghami" />
      </Field>
      <Field label="Investment Thesis / Value-Add">
        <textarea value={data.thesis || ""} onChange={e => onChange("thesis", e.target.value)} placeholder="Briefly describe your investment philosophy and how you add value beyond capital…" />
      </Field>
      {!isInst && (
        <>
          <hr className="divider" />
          <p className="section-title">Co-investment & Syndication</p>
          <Field label="Open to Co-investing?">
            <select value={data.coInvest || ""} onChange={e => onChange("coInvest", e.target.value)}>
              <option value="">Select</option>
              <option>Yes — actively looking for syndicates</option>
              <option>Yes — case by case</option>
              <option>No — prefer solo investments</option>
            </select>
          </Field>
        </>
      )}
      {isInst && (
        <>
          <hr className="divider" />
          <p className="section-title">Due Diligence & Structure</p>
          <div className="grid-2">
            <Field label="Typical DD Timeline">
              <select value={data.ddTimeline || ""} onChange={e => onChange("ddTimeline", e.target.value)}>
                <option value="">Select</option>
                {["<2 weeks","2–4 weeks","1–3 months","3+ months"].map(r=><option key={r}>{r}</option>)}
              </select>
            </Field>
            <Field label="Preferred Instrument">
              <select value={data.instrument || ""} onChange={e => onChange("instrument", e.target.value)}>
                <option value="">Select</option>
                {["Equity","Convertible Note","SAFE","Revenue Share","Debt","Hybrid"].map(r=><option key={r}>{r}</option>)}
              </select>
            </Field>
          </div>
          <Field label="Board Seat / Observer Rights?">
            <select value={data.boardSeat || ""} onChange={e => onChange("boardSeat", e.target.value)}>
              <option value="">Select</option>
              <option>Typically require board seat</option>
              <option>Observer rights preferred</option>
              <option>No governance requirements</option>
            </select>
          </Field>
        </>
      )}
      <div className="btn-row">
        <button className="btn-back" onClick={onBack}>← Back</button>
        <button className="btn-next" disabled={!valid || submitting} onClick={onSubmit}>
          {submitting ? "Submitting…" : "Submit Profile →"}
        </button>
      </div>
    </div>
  );
}

export default function App() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key, val) => setData(p => ({ ...p, [key]: val }));

  const handleSubmit = async () => {
    setSubmitting(true);
    // TODO: Replace with your Make.com or backend webhook URL
    const WEBHOOK_URL = "https://hook.eu1.make.com/ms6lzsfx6h6sye8dudjn158n92ou1fg5";
    try {
      await fetch(WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, submittedAt: new Date().toISOString() }),
      });
    } catch (e) {
      console.error("Submission error:", e);
    }
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <>
        <style>{styles}</style>
        <div className="shell">
          <div className="card">
            <div className="card-accent" />
            <div className="logo-mark">Layal Consulting — Investor Relations</div>
            <div className="success-state">
              <div className="success-icon">✓</div>
              <div className="submitted-badge">Profile Received</div>
              <h2>Thank You</h2>
              <p>Thank you, {data.fullName || "valued investor"}.<br />Our team will review your profile and be in touch within 2 business days.</p>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{styles}</style>
      <div className="shell">
        <div className="card">
          <div className="card-accent" />
          <div className="logo-mark">Layal Consulting — Investor Relations</div>
          <h1>Investor Profile</h1>
          <p className="subtitle">Know Your Investor — Confidential Onboarding</p>
          <div className="progress-bar">
            {[0,1,2].map(i => (
              <div key={i} className={`progress-seg${i < step ? " done" : i === step ? " active" : ""}`} />
            ))}
          </div>
          {step === 0 && <StepType data={data} onChange={set} onNext={() => setStep(1)} />}
          {step === 1 && <StepIdentity data={data} onChange={set} type={data.investorType} onNext={() => setStep(2)} onBack={() => setStep(0)} />}
          {step === 2 && <StepPreferences data={data} onChange={set} type={data.investorType} onSubmit={handleSubmit} onBack={() => setStep(1)} submitting={submitting} />}
        </div>
      </div>
    </>
  );
}
