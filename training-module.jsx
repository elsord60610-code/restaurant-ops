import { useState } from "react";

function today() { return new Date().toISOString().slice(0, 10); }
function calcProgress(jobs) {
  let total = 0, done = 0;
  jobs.forEach(j => { total += j.indicators.length; done += j.indicators.filter(i => i.done).length; });
  return total === 0 ? 0 : Math.round((done / total) * 100);
}
const mkInd = (id, text, done, assessDate = "", assessor = "", failDate = "", failReason = "") =>
  ({ id, text, done, assessDate, assessor, failDate, failReason });

const DEFAULT_PASSWORD = "0303";

const initialData = {
  partners: [
    {
      id: 1, name: "王小明", avatar: "王",
      zones: {
        kitchen: {
          label: "內場", color: "#E8521A",
          stations: {
            veg: { label: "菜區", icon: "🥬", jobs: [
              { id: "v1", title: "蔬菜前處理", indicators: [
                mkInd("v1a","清洗標準作業程序",true,"2025-03-10","陳主廚"),
                mkInd("v1b","切割規格符合標準",true,"2025-03-12","陳主廚"),
                mkInd("v1c","儲存溫度控管",false,"","","2025-03-15","溫度記錄未完整填寫"),
              ]},
              { id: "v2", title: "備料管理", indicators: [
                mkInd("v2a","備料數量計算",true,"2025-04-01","李副主廚"),
                mkInd("v2b","先進先出執行",true,"2025-04-01","李副主廚"),
                mkInd("v2c","異常回報機制",true,"2025-04-02","李副主廚"),
              ]},
            ]},
            fry: { label: "炸區", icon: "🍟", jobs: [
              { id: "f1", title: "油炸操作", indicators: [
                mkInd("f1a","油溫控制標準",true,"2025-04-10","陳主廚"),
                mkInd("f1b","炸籃操作安全",false,"","","2025-04-11","操作手勢不符安全規範"),
                mkInd("f1c","出餐時間掌控",false),
              ]},
            ]},
            meat: { label: "肉區", icon: "🥩", jobs: [
              { id: "m1", title: "肉品處理", indicators: [
                mkInd("m1a","解凍流程規範",true,"2025-05-01","陳主廚"),
                mkInd("m1b","分切重量標準",true,"2025-05-01","陳主廚"),
                mkInd("m1c","熟度判斷技能",true,"2025-05-02","陳主廚"),
              ]},
            ]},
          },
        },
        floor: {
          label: "外場", color: "#1A8BE8",
          stations: {
            service: { label: "外場", icon: "🍽️", jobs: [
              { id: "s1", title: "桌邊服務", indicators: [
                mkInd("s1a","點餐流程熟悉",true,"2025-03-20","林店長"),
                mkInd("s1b","上菜禮儀標準",false,"","","2025-03-21","托盤持法需改善"),
                mkInd("s1c","客訴處理能力",false),
              ]},
            ]},
            reception: { label: "接待", icon: "🤝", jobs: [
              { id: "r1", title: "迎賓接待", indicators: [
                mkInd("r1a","問候語標準",true,"2025-03-05","林店長"),
                mkInd("r1b","帶位流程",true,"2025-03-05","林店長"),
                mkInd("r1c","候位管理",true,"2025-03-06","林店長"),
              ]},
            ]},
            bar: { label: "吧檯", icon: "🍹", jobs: [
              { id: "b1", title: "飲品製作", indicators: [
                mkInd("b1a","飲品配方熟悉",false),
                mkInd("b1b","器具清潔維護",false),
                mkInd("b1c","備料管理",false),
              ]},
            ]},
            control: { label: "控場", icon: "📋", jobs: [
              { id: "c1", title: "現場統籌", indicators: [
                mkInd("c1a","人員調度協調",false),
                mkInd("c1b","異常狀況處理",false),
                mkInd("c1c","營運數據掌握",false),
              ]},
            ]},
          },
        },
      },
    },
    {
      id: 2, name: "林美華", avatar: "林",
      zones: {
        kitchen: {
          label: "內場", color: "#E8521A",
          stations: {
            veg: { label: "菜區", icon: "🥬", jobs: [
              { id: "lv1", title: "蔬菜前處理", indicators: [
                mkInd("lv1a","清洗標準作業程序",true,"2025-02-10","陳主廚"),
                mkInd("lv1b","切割規格符合標準",true,"2025-02-10","陳主廚"),
                mkInd("lv1c","儲存溫度控管",true,"2025-02-11","陳主廚"),
              ]},
            ]},
            fry: { label: "炸區", icon: "🍟", jobs: [
              { id: "lf1", title: "油炸操作", indicators: [
                mkInd("lf1a","油溫控制標準",true,"2025-03-01","陳主廚"),
                mkInd("lf1b","炸籃操作安全",true,"2025-03-01","陳主廚"),
                mkInd("lf1c","出餐時間掌控",false,"","","2025-03-02","高峰時段仍有延誤"),
              ]},
            ]},
            meat: { label: "肉區", icon: "🥩", jobs: [
              { id: "lm1", title: "肉品處理", indicators: [
                mkInd("lm1a","解凍流程規範",false),
                mkInd("lm1b","分切重量標準",false),
                mkInd("lm1c","熟度判斷技能",false),
              ]},
            ]},
          },
        },
        floor: {
          label: "外場", color: "#1A8BE8",
          stations: {
            service: { label: "外場", icon: "🍽️", jobs: [
              { id: "ls1", title: "桌邊服務", indicators: [
                mkInd("ls1a","點餐流程熟悉",true,"2025-02-20","林店長"),
                mkInd("ls1b","上菜禮儀標準",true,"2025-02-21","林店長"),
                mkInd("ls1c","客訴處理能力",true,"2025-02-22","林店長"),
              ]},
            ]},
            reception: { label: "接待", icon: "🤝", jobs: [
              { id: "lr1", title: "迎賓接待", indicators: [
                mkInd("lr1a","問候語標準",true,"2025-02-15","林店長"),
                mkInd("lr1b","帶位流程",true,"2025-02-15","林店長"),
                mkInd("lr1c","候位管理",false,"","","2025-02-16","尖峰候位說明不清楚"),
              ]},
            ]},
            bar: { label: "吧檯", icon: "🍹", jobs: [
              { id: "lb1", title: "飲品製作", indicators: [
                mkInd("lb1a","飲品配方熟悉",true,"2025-04-05","吧檯主管"),
                mkInd("lb1b","器具清潔維護",true,"2025-04-05","吧檯主管"),
                mkInd("lb1c","備料管理",true,"2025-04-06","吧檯主管"),
              ]},
            ]},
            control: { label: "控場", icon: "📋", jobs: [
              { id: "lc1", title: "現場統籌", indicators: [
                mkInd("lc1a","人員調度協調",false),
                mkInd("lc1b","異常狀況處理",false),
                mkInd("lc1c","營運數據掌握",false),
              ]},
            ]},
          },
        },
      },
    },
  ],
};

const inp = (extra = {}) => ({
  border: "1.5px solid #ece8e0", borderRadius: 8, padding: "5px 10px",
  fontSize: 12, outline: "none", background: "#fff", color: "#2a221a",
  fontFamily: "inherit", ...extra,
});
const btn = (bg, color, extra = {}) => ({
  background: bg, color, border: "none", borderRadius: 8,
  padding: "5px 12px", cursor: "pointer", fontSize: 12,
  fontWeight: 600, fontFamily: "inherit", ...extra,
});

function ProgressBar({ pct, color }) {
  return (
    <div style={{ background: "#e8e4dd", borderRadius: 99, height: 6, overflow: "hidden" }}>
      <div style={{ width: `${pct}%`, background: color, height: "100%", borderRadius: 99, transition: "width 0.5s ease" }} />
    </div>
  );
}

function AssessModal({ ind, onSave, onClose }) {
  const [date, setDate] = useState(ind.assessDate || today());
  const [assessor, setAssessor] = useState(ind.assessor || "");
  const [failDate, setFailDate] = useState(ind.failDate || today());
  const [failReason, setFailReason] = useState(ind.failReason || "");
  const isDone = ind.done;

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: "#fff", borderRadius: 18, padding: 24, width: "100%", maxWidth: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
          <span style={{ fontSize: 15, fontWeight: 700, color: "#1a1612" }}>
            {isDone ? "✅ 達成記錄" : "⚠️ 未通過記錄"}
          </span>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: "#9a8f82" }}>×</button>
        </div>
        <div style={{ fontSize: 13, color: "#6a5a4a", background: "#faf8f4", borderRadius: 10, padding: "8px 12px", marginBottom: 16 }}>{ind.text}</div>

        {isDone ? (
          <>
            <label style={{ fontSize: 12, color: "#9a8f82", fontWeight: 600, display: "block", marginBottom: 4 }}>考核日期</label>
            <input type="date" value={date} onChange={e => setDate(e.target.value)}
              style={{ ...inp({ width: "100%", marginBottom: 12, boxSizing: "border-box" }) }} />
            <label style={{ fontSize: 12, color: "#9a8f82", fontWeight: 600, display: "block", marginBottom: 4 }}>考核人員</label>
            <input value={assessor} onChange={e => setAssessor(e.target.value)} placeholder="輸入考核人員姓名"
              style={{ ...inp({ width: "100%", marginBottom: 20, boxSizing: "border-box" }) }} />
          </>
        ) : (
          <>
            <label style={{ fontSize: 12, color: "#9a8f82", fontWeight: 600, display: "block", marginBottom: 4 }}>考核日期</label>
            <input type="date" value={failDate} onChange={e => setFailDate(e.target.value)}
              style={{ ...inp({ width: "100%", marginBottom: 12, boxSizing: "border-box" }) }} />
            <label style={{ fontSize: 12, color: "#9a8f82", fontWeight: 600, display: "block", marginBottom: 4 }}>未通過原因</label>
            <textarea value={failReason} onChange={e => setFailReason(e.target.value)} placeholder="說明未通過的原因..." rows={3}
              style={{ ...inp({ width: "100%", marginBottom: 20, boxSizing: "border-box", resize: "vertical" }) }} />
          </>
        )}

        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={btn("#ece8e0", "#6a5a4a")}>取消</button>
          <button onClick={() => {
            if (isDone) onSave({ assessDate: date, assessor });
            else onSave({ failDate, failReason });
            onClose();
          }} style={btn("linear-gradient(135deg,#c8a96e,#e8c87a)", "#fff")}>儲存</button>
        </div>
      </div>
    </div>
  );
}

function IndicatorItem({ ind, onToggle, onDelete, onSaveMeta, isEditor }) {
  const [showModal, setShowModal] = useState(false);
  const hasDoneMeta = ind.done && (ind.assessDate || ind.assessor);
  const hasFailMeta = !ind.done && (ind.failDate || ind.failReason);

  return (
    <>
      {showModal && <AssessModal ind={ind} onSave={meta => onSaveMeta(meta)} onClose={() => setShowModal(false)} />}
      <div style={{ padding: "9px 0", borderBottom: "1px solid #f0ece5" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {isEditor ? (
            <button onClick={onToggle} style={{
              width: 22, height: 22, borderRadius: 6, border: `2px solid ${ind.done ? "#2d9e5f" : "#c8b89a"}`,
              background: ind.done ? "#2d9e5f" : "transparent", cursor: "pointer", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center", transition: "all 0.15s",
            }}>
              {ind.done && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </button>
          ) : (
            <div style={{
              width: 22, height: 22, borderRadius: 6, border: `2px solid ${ind.done ? "#2d9e5f" : "#c8b89a"}`,
              background: ind.done ? "#2d9e5f" : "transparent", flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {ind.done && <svg width="12" height="10" viewBox="0 0 12 10" fill="none"><path d="M1 5l3.5 3.5L11 1" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>}
            </div>
          )}

          <span style={{ flex: 1, fontSize: 14, color: ind.done ? "#7a8f7a" : "#3a332a", textDecoration: ind.done ? "line-through" : "none", transition: "all 0.15s" }}>
            {ind.text}
          </span>

          {isEditor && (
            <button onClick={() => setShowModal(true)} title="記錄考核資訊"
              style={{ background: "none", border: "none", cursor: "pointer", fontSize: 14, color: (hasDoneMeta || hasFailMeta) ? "#c8a96e" : "#d0c8be", padding: "0 2px" }}>
              📝
            </button>
          )}
          {isEditor && (
            <button onClick={onDelete} style={{ background: "none", border: "none", cursor: "pointer", color: "#c8a9a9", fontSize: 16, padding: "0 2px" }}>×</button>
          )}
        </div>

        {hasDoneMeta && (
          <div style={{ marginLeft: 32, marginTop: 5, display: "flex", gap: 6, flexWrap: "wrap" }}>
            {ind.assessDate && <span style={{ fontSize: 11, background: "#edf7f0", color: "#2d9e5f", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>📅 {ind.assessDate}</span>}
            {ind.assessor && <span style={{ fontSize: 11, background: "#edf7f0", color: "#2d9e5f", padding: "2px 8px", borderRadius: 99, fontWeight: 600 }}>👤 {ind.assessor}</span>}
          </div>
        )}
        {hasFailMeta && (
          <div style={{ marginLeft: 32, marginTop: 5, display: "flex", gap: 6, flexWrap: "wrap", alignItems: "flex-start" }}>
            {ind.failDate && <span style={{ fontSize: 11, background: "#fdf0ee", color: "#c8521a", padding: "2px 8px", borderRadius: 99, fontWeight: 600, flexShrink: 0 }}>📅 {ind.failDate}</span>}
            {ind.failReason && <span style={{ fontSize: 11, background: "#fdf0ee", color: "#c8521a", padding: "2px 8px", borderRadius: 6, fontWeight: 500 }}>⚠️ {ind.failReason}</span>}
          </div>
        )}
      </div>
    </>
  );
}

function JobItem({ job, onToggleIndicator, onDeleteIndicator, onAddIndicator, onSaveMeta, onDeleteJob, isEditor }) {
  const [adding, setAdding] = useState(false);
  const [newText, setNewText] = useState("");
  const allDone = job.indicators.length > 0 && job.indicators.every(i => i.done);

  return (
    <div style={{ background: "#faf8f4", border: "1.5px solid #ece8e0", borderRadius: 14, padding: "16px 18px", marginBottom: 10 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700, color: "#2a221a", flex: 1 }}>{job.title}</span>
        {allDone && <span style={{ fontSize: 11, fontWeight: 700, color: "#2d9e5f", background: "#e8f5ee", padding: "3px 10px", borderRadius: 99 }}>✓ 已達成</span>}
        {isEditor && <button onClick={onDeleteJob} style={{ background: "none", border: "none", cursor: "pointer", color: "#c8a9a9", fontSize: 12, padding: "0 4px" }}>刪除</button>}
      </div>
      {job.indicators.map(ind => (
        <IndicatorItem key={ind.id} ind={ind} isEditor={isEditor}
          onToggle={() => onToggleIndicator(ind.id)}
          onDelete={() => onDeleteIndicator(ind.id)}
          onSaveMeta={meta => onSaveMeta(ind.id, meta)} />
      ))}
      {isEditor && (adding ? (
        <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
          <input value={newText} onChange={e => setNewText(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter" && newText.trim()) { onAddIndicator(newText.trim()); setNewText(""); setAdding(false); } if (e.key === "Escape") { setAdding(false); setNewText(""); } }}
            placeholder="輸入指標名稱..." autoFocus style={inp({ flex: 1 })} />
          <button onClick={() => { if (newText.trim()) { onAddIndicator(newText.trim()); setNewText(""); setAdding(false); } }} style={btn("#c8a96e", "#fff")}>新增</button>
          <button onClick={() => { setAdding(false); setNewText(""); }} style={btn("#ece8e0", "#6a5a4a")}>取消</button>
        </div>
      ) : (
        <button onClick={() => setAdding(true)} style={{ marginTop: 10, background: "none", border: "1.5px dashed #c8b89a", borderRadius: 8, color: "#a09080", fontSize: 12, padding: "5px 12px", cursor: "pointer", width: "100%" }}>
          + 新增指標
        </button>
      ))}
    </div>
  );
}

function StationPanel({ station, onUpdate, isEditor }) {
  const [addingJob, setAddingJob] = useState(false);
  const [newJobTitle, setNewJobTitle] = useState("");

  function handleToggleIndicator(jobId, indId) {
    onUpdate(prev => ({ ...prev, jobs: prev.jobs.map(j => j.id !== jobId ? j : { ...j, indicators: j.indicators.map(i => i.id !== indId ? i : { ...i, done: !i.done }) }) }));
  }
  function handleDeleteIndicator(jobId, indId) {
    onUpdate(prev => ({ ...prev, jobs: prev.jobs.map(j => j.id !== jobId ? j : { ...j, indicators: j.indicators.filter(i => i.id !== indId) }) }));
  }
  function handleAddIndicator(jobId, text) {
    onUpdate(prev => ({ ...prev, jobs: prev.jobs.map(j => j.id !== jobId ? j : { ...j, indicators: [...j.indicators, { id: `${jobId}_${Date.now()}`, text, done: false, assessDate: "", assessor: "", failDate: "", failReason: "" }] }) }));
  }
  function handleSaveMeta(jobId, indId, meta) {
    onUpdate(prev => ({ ...prev, jobs: prev.jobs.map(j => j.id !== jobId ? j : { ...j, indicators: j.indicators.map(i => i.id !== indId ? i : { ...i, ...meta }) }) }));
  }
  function handleDeleteJob(jobId) {
    onUpdate(prev => ({ ...prev, jobs: prev.jobs.filter(j => j.id !== jobId) }));
  }
  function handleAddJob() {
    if (!newJobTitle.trim()) return;
    onUpdate(prev => ({ ...prev, jobs: [...prev.jobs, { id: `job_${Date.now()}`, title: newJobTitle.trim(), indicators: [] }] }));
    setNewJobTitle(""); setAddingJob(false);
  }

  const pct = calcProgress(station.jobs);
  return (
    <div style={{ marginBottom: 28 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 20 }}>{station.icon}</span>
        <span style={{ fontSize: 16, fontWeight: 700, color: "#2a221a" }}>{station.label}</span>
        <div style={{ flex: 1, marginLeft: 8 }}><ProgressBar pct={pct} color="#c8a96e" /></div>
        <span style={{ fontSize: 13, color: "#9a8f82", fontWeight: 600, minWidth: 36 }}>{pct}%</span>
      </div>
      {station.jobs.map(job => (
        <JobItem key={job.id} job={job} isEditor={isEditor}
          onToggleIndicator={indId => handleToggleIndicator(job.id, indId)}
          onDeleteIndicator={indId => handleDeleteIndicator(job.id, indId)}
          onAddIndicator={text => handleAddIndicator(job.id, text)}
          onSaveMeta={(indId, meta) => handleSaveMeta(job.id, indId, meta)}
          onDeleteJob={() => handleDeleteJob(job.id)} />
      ))}
      {isEditor && (addingJob ? (
        <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
          <input value={newJobTitle} onChange={e => setNewJobTitle(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleAddJob(); if (e.key === "Escape") { setAddingJob(false); setNewJobTitle(""); } }}
            placeholder="輸入工作項目名稱..." autoFocus style={inp({ flex: 1, fontSize: 14, padding: "8px 14px", borderRadius: 10 })} />
          <button onClick={handleAddJob} style={btn("#c8a96e", "#fff", { borderRadius: 10, padding: "8px 16px", fontSize: 13 })}>新增</button>
          <button onClick={() => { setAddingJob(false); setNewJobTitle(""); }} style={btn("#ece8e0", "#6a5a4a", { borderRadius: 10, padding: "8px 12px", fontSize: 13 })}>取消</button>
        </div>
      ) : (
        <button onClick={() => setAddingJob(true)} style={{ background: "none", border: "1.5px dashed #c8b89a", borderRadius: 10, color: "#a09080", fontSize: 13, padding: "7px 16px", cursor: "pointer", width: "100%", marginTop: 4 }}>
          + 新增工作項目
        </button>
      ))}
    </div>
  );
}

function PartnerCard({ partner, onClick }) {
  let allJobs = [];
  Object.values(partner.zones).forEach(z => Object.values(z.stations).forEach(s => allJobs = allJobs.concat(s.jobs)));
  const pct = calcProgress(allJobs);
  return (
    <button onClick={() => onClick(partner)} style={{
      background: "#fff", border: "2px solid #ece8e0", borderRadius: 18, padding: "24px 28px",
      cursor: "pointer", textAlign: "left", transition: "all 0.22s ease", boxShadow: "0 2px 8px rgba(0,0,0,0.06)", width: "100%",
    }}
      onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "0 8px 24px rgba(0,0,0,0.12)"; e.currentTarget.style.borderColor = "#c8a96e"; }}
      onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = "0 2px 8px rgba(0,0,0,0.06)"; e.currentTarget.style.borderColor = "#ece8e0"; }}>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
        <div style={{ width: 48, height: 48, borderRadius: 14, background: "linear-gradient(135deg,#c8a96e,#e8c87a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700, color: "#fff", flexShrink: 0 }}>{partner.avatar}</div>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#1a1612" }}>{partner.name}</div>
          <div style={{ fontSize: 12, color: "#9a8f82", marginTop: 2 }}>{allJobs.length} 個工作項目</div>
        </div>
        <div style={{ marginLeft: "auto", fontSize: 24, fontWeight: 800, color: pct === 100 ? "#2d9e5f" : "#c8a96e" }}>{pct}%</div>
      </div>
      <ProgressBar pct={pct} color={pct === 100 ? "#2d9e5f" : "#c8a96e"} />
    </button>
  );
}

function PasswordModal({ onSuccess, onClose, password }) {
  const [input, setInput] = useState("");
  const [error, setError] = useState(false);

  function submit() {
    if (input === password) { setError(false); onSuccess(); }
    else { setError(true); setInput(""); }
  }

  return (
    <div onClick={e => { if (e.target === e.currentTarget) onClose(); }}
      style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: 16, fontFamily: "'Noto Sans TC','PingFang TC',sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 20, padding: 28, width: "100%", maxWidth: 380, boxShadow: "0 20px 60px rgba(0,0,0,0.25)" }}>
        <div style={{ textAlign: "center", marginBottom: 22 }}>
          <div style={{ width: 56, height: 56, borderRadius: 16, background: "linear-gradient(135deg,#c8a96e,#e8c87a)", margin: "0 auto 14px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26 }}>🔒</div>
          <div style={{ fontSize: 17, fontWeight: 700, color: "#1a1612" }}>編輯者登入</div>
          <div style={{ fontSize: 12, color: "#9a8f82", marginTop: 4 }}>請輸入編輯者密碼以繼續</div>
        </div>
        <input type="password" value={input} onChange={e => { setInput(e.target.value); setError(false); }}
          onKeyDown={e => { if (e.key === "Enter") submit(); }}
          placeholder="請輸入密碼" autoFocus inputMode="numeric"
          style={{ ...inp({ width: "100%", fontSize: 16, padding: "12px 16px", borderRadius: 12, boxSizing: "border-box", textAlign: "center", letterSpacing: "4px", borderColor: error ? "#e57373" : "#ece8e0" }) }} />
        {error && <div style={{ fontSize: 12, color: "#d84a3d", marginTop: 8, textAlign: "center" }}>密碼錯誤，請重新輸入</div>}
        <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
          <button onClick={onClose} style={btn("#ece8e0", "#6a5a4a", { flex: 1, borderRadius: 12, padding: "11px", fontSize: 14 })}>取消</button>
          <button onClick={submit} style={btn("linear-gradient(135deg,#c8a96e,#e8c87a)", "#fff", { flex: 1, borderRadius: 12, padding: "11px", fontSize: 14 })}>登入</button>
        </div>
      </div>
    </div>
  );
}

function SettingsPage({ password, onChangePassword, onBack }) {
  const [oldPw, setOldPw] = useState("");
  const [newPw, setNewPw] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [msg, setMsg] = useState(null); // {type, text}

  function handleSave() {
    if (oldPw !== password) { setMsg({ type: "err", text: "目前密碼不正確" }); return; }
    if (!newPw.trim()) { setMsg({ type: "err", text: "新密碼不可空白" }); return; }
    if (newPw !== confirmPw) { setMsg({ type: "err", text: "兩次新密碼輸入不一致" }); return; }
    if (newPw === password) { setMsg({ type: "err", text: "新密碼不可與目前密碼相同" }); return; }
    onChangePassword(newPw);
    setOldPw(""); setNewPw(""); setConfirmPw("");
    setMsg({ type: "ok", text: "✓ 密碼已成功更新" });
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f1eb", fontFamily: "'Noto Sans TC','PingFang TC',sans-serif" }}>
      <div style={{ background: "#fff", borderBottom: "1.5px solid #ece8e0", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", gap: 14, height: 64 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: "#c8a96e", fontSize: 22, padding: 0 }}>←</button>
          <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1612" }}>⚙️ 設定</span>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 24px" }}>
        <div style={{ background: "#fff", border: "1.5px solid #ece8e0", borderRadius: 18, padding: "24px 26px", marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6 }}>
            <span style={{ fontSize: 20 }}>🔐</span>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1612" }}>變更編輯者密碼</span>
          </div>
          <div style={{ fontSize: 12, color: "#9a8f82", marginBottom: 20 }}>變更後請使用新密碼登入</div>

          <label style={{ fontSize: 12, color: "#6a5a4a", fontWeight: 600, display: "block", marginBottom: 5 }}>目前密碼</label>
          <input type="password" value={oldPw} onChange={e => { setOldPw(e.target.value); setMsg(null); }}
            placeholder="輸入目前密碼" inputMode="numeric"
            style={{ ...inp({ width: "100%", fontSize: 14, padding: "9px 14px", borderRadius: 10, marginBottom: 14, boxSizing: "border-box" }) }} />

          <label style={{ fontSize: 12, color: "#6a5a4a", fontWeight: 600, display: "block", marginBottom: 5 }}>新密碼</label>
          <input type="password" value={newPw} onChange={e => { setNewPw(e.target.value); setMsg(null); }}
            placeholder="輸入新密碼" inputMode="numeric"
            style={{ ...inp({ width: "100%", fontSize: 14, padding: "9px 14px", borderRadius: 10, marginBottom: 14, boxSizing: "border-box" }) }} />

          <label style={{ fontSize: 12, color: "#6a5a4a", fontWeight: 600, display: "block", marginBottom: 5 }}>確認新密碼</label>
          <input type="password" value={confirmPw} onChange={e => { setConfirmPw(e.target.value); setMsg(null); }}
            placeholder="再次輸入新密碼" inputMode="numeric"
            onKeyDown={e => { if (e.key === "Enter") handleSave(); }}
            style={{ ...inp({ width: "100%", fontSize: 14, padding: "9px 14px", borderRadius: 10, marginBottom: 16, boxSizing: "border-box" }) }} />

          {msg && (
            <div style={{
              fontSize: 13, padding: "10px 14px", borderRadius: 10, marginBottom: 14, fontWeight: 600,
              background: msg.type === "ok" ? "#e8f5ee" : "#fdecea",
              color: msg.type === "ok" ? "#2d9e5f" : "#d84a3d",
            }}>{msg.text}</div>
          )}

          <button onClick={handleSave} style={btn("linear-gradient(135deg,#c8a96e,#e8c87a)", "#fff", { width: "100%", borderRadius: 12, padding: "12px", fontSize: 15 })}>
            儲存變更
          </button>
        </div>

        <div style={{ background: "#fff8ec", border: "1.5px solid #f0d99a", borderRadius: 14, padding: "14px 18px", fontSize: 12, color: "#8a6a2a", lineHeight: 1.6 }}>
          💡 提示：密碼變更後立即生效。請妥善保管新密碼，避免遺忘。
        </div>
      </div>
    </div>
  );
}

function RoleBadge({ isEditor, onSwitch }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <span style={{ fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99, background: isEditor ? "#fff3e0" : "#e8f0fe", color: isEditor ? "#c8521a" : "#1A8BE8", border: `1.5px solid ${isEditor ? "#e8c87a" : "#90bef5"}` }}>
        {isEditor ? "✏️ 編輯者" : "👁️ 觀看者"}
      </span>
      <button onClick={onSwitch} style={{ background: "none", border: "1.5px solid #ece8e0", borderRadius: 99, cursor: "pointer", color: "#9a8f82", fontSize: 11, padding: "3px 10px", fontFamily: "inherit" }}>切換</button>
    </div>
  );
}

function LoginScreen({ onLogin, password }) {
  const [selected, setSelected] = useState(null);
  const [showPwModal, setShowPwModal] = useState(false);

  const roles = [
    { key: "editor", label: "編輯者", icon: "✏️", desc: "可新增、編輯、勾選指標與填寫考核資訊", color: "#c8521a", needsPw: true },
    { key: "viewer", label: "觀看者", icon: "👁️", desc: "僅可檢視訓練進度，無法進行任何編輯", color: "#1A8BE8", needsPw: false },
  ];

  function handleEnter() {
    if (!selected) return;
    if (selected === "editor") setShowPwModal(true);
    else onLogin("viewer");
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f1eb", display: "flex", alignItems: "center", justifyContent: "center", padding: 24, fontFamily: "'Noto Sans TC','PingFang TC',sans-serif" }}>
      {showPwModal && (
        <PasswordModal password={password}
          onSuccess={() => { setShowPwModal(false); onLogin("editor"); }}
          onClose={() => setShowPwModal(false)} />
      )}
      <div style={{ maxWidth: 400, width: "100%" }}>
        <div style={{ marginBottom: 32, textAlign: "center" }}>
          <div style={{ fontSize: 11, letterSpacing: "3px", color: "#c8a96e", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>TRAINING MODULE</div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, color: "#1a1612", letterSpacing: "-0.6px" }}>請選擇身份</h1>
          <p style={{ color: "#9a8f82", marginTop: 8, fontSize: 13 }}>依據使用身份進入對應模式</p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 }}>
          {roles.map(r => (
            <button key={r.key} onClick={() => setSelected(r.key)} style={{
              background: "#fff", border: `2px solid ${selected === r.key ? r.color : "#ece8e0"}`,
              borderRadius: 16, padding: "18px 20px", cursor: "pointer", textAlign: "left",
              boxShadow: selected === r.key ? `0 4px 16px ${r.color}28` : "0 1px 4px rgba(0,0,0,0.06)",
              transition: "all 0.18s", fontFamily: "inherit",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: selected === r.key ? r.color : "#f0ece5", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, transition: "all 0.18s" }}>{r.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 16, fontWeight: 700, color: selected === r.key ? r.color : "#1a1612" }}>{r.label}</span>
                    {r.needsPw && <span style={{ fontSize: 11 }}>🔒</span>}
                  </div>
                  <div style={{ fontSize: 12, color: "#9a8f82", marginTop: 2 }}>{r.desc}</div>
                </div>
                {selected === r.key && <div style={{ color: r.color, fontSize: 18 }}>✓</div>}
              </div>
            </button>
          ))}
        </div>
        <button onClick={handleEnter} style={{
          width: "100%", background: selected ? "linear-gradient(135deg,#c8a96e,#e8c87a)" : "#e0dbd4",
          color: selected ? "#fff" : "#b0a898", border: "none", borderRadius: 14,
          padding: "14px", fontSize: 16, fontWeight: 700, cursor: selected ? "pointer" : "default",
          transition: "all 0.18s", fontFamily: "inherit",
        }}>進入系統</button>
      </div>
    </div>
  );
}

export default function App() {
  const [role, setRole] = useState(null);
  const [password, setPassword] = useState(DEFAULT_PASSWORD);
  const [data, setData] = useState(initialData);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [activeZone, setActiveZone] = useState("kitchen");
  const [addingPartner, setAddingPartner] = useState(false);
  const [newPartnerName, setNewPartnerName] = useState("");
  const [view, setView] = useState("list"); // list | detail | settings

  const isEditor = role === "editor";

  if (!role) return <LoginScreen onLogin={setRole} password={password} />;

  if (view === "settings") {
    return <SettingsPage password={password} onChangePassword={setPassword} onBack={() => setView("list")} />;
  }

  function getPartner() { return data.partners.find(p => p.id === selectedPartner?.id); }

  function updateStation(zoneKey, stationKey, updater) {
    setData(prev => ({
      ...prev,
      partners: prev.partners.map(p => p.id !== selectedPartner.id ? p : {
        ...p,
        zones: { ...p.zones, [zoneKey]: { ...p.zones[zoneKey], stations: { ...p.zones[zoneKey].stations, [stationKey]: updater(p.zones[zoneKey].stations[stationKey]) } } }
      })
    }));
  }

  function addPartner() {
    if (!newPartnerName.trim()) return;
    const name = newPartnerName.trim();
    const newP = {
      id: Date.now(), name, avatar: name[0],
      zones: {
        kitchen: { label: "內場", color: "#E8521A", stations: {
          veg: { label: "菜區", icon: "🥬", jobs: [] },
          fry: { label: "炸區", icon: "🍟", jobs: [] },
          meat: { label: "肉區", icon: "🥩", jobs: [] },
        }},
        floor: { label: "外場", color: "#1A8BE8", stations: {
          service: { label: "外場", icon: "🍽️", jobs: [] },
          reception: { label: "接待", icon: "🤝", jobs: [] },
          bar: { label: "吧檯", icon: "🍹", jobs: [] },
          control: { label: "控場", icon: "📋", jobs: [] },
        }},
      },
    };
    setData(prev => ({ ...prev, partners: [...prev.partners, newP] }));
    setNewPartnerName(""); setAddingPartner(false);
  }

  const partner = getPartner();

  if (selectedPartner && partner) {
    const zone = partner.zones[activeZone];
    return (
      <div style={{ minHeight: "100vh", background: "#f5f1eb", fontFamily: "'Noto Sans TC','PingFang TC',sans-serif" }}>
        <div style={{ background: "#fff", borderBottom: "1.5px solid #ece8e0", padding: "0 24px", position: "sticky", top: 0, zIndex: 10 }}>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", alignItems: "center", gap: 14, height: 64 }}>
            <button onClick={() => setSelectedPartner(null)} style={{ background: "none", border: "none", cursor: "pointer", color: "#c8a96e", fontSize: 22, padding: 0 }}>←</button>
            <div style={{ width: 38, height: 38, borderRadius: 11, background: "linear-gradient(135deg,#c8a96e,#e8c87a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, fontWeight: 700, color: "#fff" }}>{partner.avatar}</div>
            <span style={{ fontSize: 18, fontWeight: 700, color: "#1a1612" }}>{partner.name}</span>
            <span style={{ fontSize: 11, color: "#9a8f82", background: "#f0ece5", padding: "3px 10px", borderRadius: 99 }}>訓練進度</span>
            <div style={{ marginLeft: "auto" }}><RoleBadge isEditor={isEditor} onSwitch={() => setRole(null)} /></div>
          </div>
        </div>

        <div style={{ background: "#fff", borderBottom: "1.5px solid #ece8e0" }}>
          <div style={{ maxWidth: 720, margin: "0 auto", display: "flex", padding: "0 24px" }}>
            {Object.entries(partner.zones).map(([zk, z]) => {
              let allJ = []; Object.values(z.stations).forEach(s => allJ = allJ.concat(s.jobs));
              const pct = calcProgress(allJ);
              return (
                <button key={zk} onClick={() => setActiveZone(zk)} style={{
                  padding: "14px 20px", border: "none", background: "none", cursor: "pointer",
                  borderBottom: `3px solid ${activeZone === zk ? z.color : "transparent"}`,
                  color: activeZone === zk ? z.color : "#9a8f82", fontWeight: activeZone === zk ? 700 : 400,
                  fontSize: 15, transition: "all 0.15s", display: "flex", alignItems: "center", gap: 8, fontFamily: "inherit",
                }}>
                  {z.label}
                  <span style={{ fontSize: 11, background: activeZone === zk ? z.color : "#ece8e0", color: activeZone === zk ? "#fff" : "#9a8f82", padding: "1px 7px", borderRadius: 99, fontWeight: 600 }}>{pct}%</span>
                </button>
              );
            })}
          </div>
        </div>

        <div style={{ maxWidth: 720, margin: "0 auto", padding: "24px" }}>
          {!isEditor && (
            <div style={{ background: "#e8f0fe", border: "1.5px solid #90bef5", borderRadius: 12, padding: "10px 16px", marginBottom: 20, fontSize: 13, color: "#1A8BE8", display: "flex", alignItems: "center", gap: 8 }}>
              👁️ 目前為觀看模式，僅可檢視資料
            </div>
          )}
          {Object.entries(zone.stations).map(([sk, station]) => (
            <StationPanel key={sk} station={station} isEditor={isEditor}
              onUpdate={updater => updateStation(activeZone, sk, updater)} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f5f1eb", fontFamily: "'Noto Sans TC','PingFang TC',sans-serif" }}>
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px" }}>
        <div style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16 }}>
            <div>
              <div style={{ fontSize: 11, letterSpacing: "3px", color: "#c8a96e", fontWeight: 700, textTransform: "uppercase", marginBottom: 8 }}>TRAINING MODULE</div>
              <h1 style={{ margin: 0, fontSize: 32, fontWeight: 800, color: "#1a1612", letterSpacing: "-0.8px", lineHeight: 1.15 }}>教育訓練<br /><span style={{ color: "#c8a96e" }}>管理系統</span></h1>
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, marginTop: 4 }}>
              <RoleBadge isEditor={isEditor} onSwitch={() => setRole(null)} />
              {isEditor && (
                <button onClick={() => setView("settings")} style={{
                  background: "#fff", border: "1.5px solid #ece8e0", borderRadius: 99,
                  cursor: "pointer", color: "#6a5a4a", fontSize: 12, padding: "5px 12px",
                  fontFamily: "inherit", fontWeight: 600, display: "flex", alignItems: "center", gap: 4,
                }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e"; e.currentTarget.style.color = "#c8a96e"; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = "#ece8e0"; e.currentTarget.style.color = "#6a5a4a"; }}>
                  ⚙️ 設定
                </button>
              )}
            </div>
          </div>
          <p style={{ color: "#9a8f82", marginTop: 10, fontSize: 14 }}>點選夥伴查看訓練進度與職能狀態</p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
          {data.partners.map(p => (
            <PartnerCard key={p.id} partner={p} onClick={p => { setSelectedPartner(p); setActiveZone("kitchen"); }} />
          ))}
        </div>

        {isEditor && (addingPartner ? (
          <div style={{ background: "#fff", border: "2px solid #c8a96e", borderRadius: 18, padding: "20px 24px" }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#2a221a", marginBottom: 12 }}>新增夥伴</div>
            <div style={{ display: "flex", gap: 10 }}>
              <input value={newPartnerName} onChange={e => setNewPartnerName(e.target.value)}
                onKeyDown={e => { if (e.key === "Enter") addPartner(); if (e.key === "Escape") { setAddingPartner(false); setNewPartnerName(""); } }}
                placeholder="輸入夥伴姓名..." autoFocus
                style={inp({ flex: 1, fontSize: 14, padding: "9px 14px", borderRadius: 10 })} />
              <button onClick={addPartner} style={btn("linear-gradient(135deg,#c8a96e,#e8c87a)", "#fff", { borderRadius: 10, padding: "9px 20px", fontSize: 14 })}>新增</button>
              <button onClick={() => { setAddingPartner(false); setNewPartnerName(""); }} style={btn("#ece8e0", "#6a5a4a", { borderRadius: 10, padding: "9px 14px", fontSize: 14 })}>取消</button>
            </div>
          </div>
        ) : (
          <button onClick={() => setAddingPartner(true)} style={{
            width: "100%", background: "none", border: "2px dashed #c8b89a", borderRadius: 18,
            color: "#a09080", fontSize: 15, padding: "18px", cursor: "pointer", fontWeight: 600, fontFamily: "inherit",
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#c8a96e"; e.currentTarget.style.color = "#c8a96e"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#c8b89a"; e.currentTarget.style.color = "#a09080"; }}>
            + 新增夥伴
          </button>
        ))}
      </div>
    </div>
  );
}
