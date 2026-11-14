import React, {useEffect, useMemo, useRef, useState} from 'react';
import {createRoot} from 'react-dom/client';
import {Flame, Layers, CalendarDays, Download, X, Moon, Sun, ArrowUpRight, Satellite, ScanLine, TrendingUp, SlidersHorizontal, ChevronLeft, ChevronRight, Info, Maximize2, Menu, Upload, FileJson, Check} from 'lucide-react';
import {MapView} from './MapView';
import LegacyAnalysis from './LegacyAnalysis';
import {EvidencePanel} from './EvidencePanel';
import {Pilot, Sample} from './evidence';
import {Hotspot, Risk, csv, download, scenarioIndex} from './data';
import {tr} from './workspace-i18n';
import {Key} from './i18n';
import './workspace.css';

const read = async (name: string) => {
  const response = await fetch('/data/'+name);
  if(!response.ok) throw new Error(name);
  return response.json();
};
type Mode = 'hotspots'|'evidence'|'planning';
function App() {
  const [lang,setLang]=useState(localStorage.getItem('fw-lang')||'en');
  const [theme,setTheme]=useState(localStorage.getItem('fw-theme')||'dark');
  const [solid,setSolid]=useState(localStorage.getItem('fw-solid')==='true');
  const [mode,setMode]=useState<Mode>('hotspots');
  const [year,setYear]=useState('2025');
  const [month,setMonth]=useState('03');
  const [sensor,setSensor]=useState('both');
  const [quality,setQuality]=useState(true);
  const [basemap,setBasemap]=useState('satellite');
  const [gridOn,setGridOn]=useState(false);
  const [coverageOn,setCoverageOn]=useState(false);
  const [density,setDensity]=useState(false);
  const [adjusted,setAdjusted]=useState(false);
  const [filters,setFilters]=useState(false);
  const [calendar,setCalendar]=useState(false);
  const [menu,setMenu]=useState(false);
  const [analysis,setAnalysis]=useState<Key|null>(null);
  const [aoi,setAoi]=useState<any>(null),[admin,setAdmin]=useState<any>(null),[grid,setGrid]=useState<any>(null);
  const [summary,setSummary]=useState<any>(null),[report,setReport]=useState<any>(null),[harm,setHarm]=useState<any>(null);
  const [risks,setRisks]=useState<Risk[]>([]),[rows,setRows]=useState<Hotspot[]>([]);
  const [pilot,setPilot]=useState<Pilot|null>(null);
  const [sampleId,setSampleId]=useState('');
  const [candidates,setCandidates]=useState<any>(null);
  const [point,setPoint]=useState<Hotspot|null>(null),[riskCell,setRiskCell]=useState<any>(null);
  const [showEvidence,setShowEvidence]=useState(true);
  const [scenario,setScenario]=useState('baseline'),[horizon,setHorizon]=useState(36),[lead,setLead]=useState(3);
  const [loading,setLoading]=useState(true),[error,setError]=useState(false),[retry,setRetry]=useState(0);
  const [online,setOnline]=useState(navigator.onLine);
  const cache=useRef<Record<string,Hotspot[]>>({});
  const dialog=useRef<HTMLDivElement>(null);
  useEffect(()=>{if(!analysis)return;const prior=document.activeElement as HTMLElement;const node=dialog.current;if(!node)return;const siblings=Array.from(node.parentElement!.children).filter(x=>x!==node) as HTMLElement[];siblings.forEach(x=>x.inert=true);node.querySelector<HTMLElement>('button')?.focus();const trap=(event:KeyboardEvent)=>{if(event.key!=='Tab')return;const controls=Array.from(node.querySelectorAll<HTMLElement>('a[href],button,input,select,textarea,summary,[tabindex="0"]')).filter(x=>x.getClientRects().length&&!x.hasAttribute('disabled'));const first=controls[0],last=controls.at(-1);if(event.shiftKey&&document.activeElement===first){event.preventDefault();last?.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first?.focus();}};node.addEventListener('keydown',trap);return()=>{siblings.forEach(x=>x.inert=false);node.removeEventListener('keydown',trap);prior?.focus();document.documentElement.dataset.theme=theme;document.documentElement.lang=lang==='mm'?'my':'en';};},[analysis]);
  const t=(key:string)=>tr(lang,key);
  const monthText=(number:number,short=false)=>lang==='mm'?(short?['ဇန်','ဖေ','မတ်','ဧ','မေ','ဇွန်','ဇူ','ဩ','စက်','အောက်','နို','ဒီ']:['ဇန်နဝါရီ','ဖေဖော်ဝါရီ','မတ်','ဧပြီ','မေ','ဇွန်','ဇူလိုင်','ဩဂုတ်','စက်တင်ဘာ','အောက်တိုဘာ','နိုဝင်ဘာ','ဒီဇင်ဘာ'])[number-1]:new Intl.DateTimeFormat('en-GB',{month:short?'short':'long',timeZone:'UTC'}).format(new Date(Date.UTC(2025,number-1,1)));
  const fmt=(number:number)=>new Intl.NumberFormat('en-US').format(number).replace(/\d/g,d=>lang==='mm'?'၀၁၂၃၄၅၆၇၈၉'[Number(d)]:d);
  useEffect(()=>{
    localStorage.setItem('fw-lang',lang);localStorage.setItem('fw-theme',theme);localStorage.setItem('fw-solid',String(solid));
    document.documentElement.lang=lang==='mm'?'my':'en';document.documentElement.dataset.theme=theme;
  },[lang,theme,solid]);
  useEffect(()=>{
    let active=true;
    Promise.all(['aoi.geojson','bago-admin.geojson','grid.geojson','summary.json','model-report.json','seasonal-risk.json','harmonization.json','evidence/pilot.json'].map(read)).then(values=>{
      if(!active)return;
      setAoi(values[0]);setAdmin(values[1]);setGrid(values[2]);setSummary(values[3]);setReport(values[4]);setRisks(values[5]);setHarm(values[6]);
      const current=values[7] as Pilot;
      try {const saved=JSON.parse(localStorage.getItem('fw-reviews-v2')||'{}');current.samples=current.samples.map(s=>saved[s.sample_id]?{...s,...saved[s.sample_id]}:s);}catch{}
      setPilot(current);setError(false);
    }).catch(()=>active&&setError(true));
    return()=>{active=false;};
  },[retry]);
  useEffect(()=>{
    let active=true;setLoading(true);
    if(cache.current[year]) {setRows(cache.current[year]);setLoading(false);return;}
    read(`hotspots-${year}.json`).then(data=>{cache.current[year]=data;if(active){setRows(data);setLoading(false);}}).catch(()=>{if(active){setError(true);setLoading(false);setRows([]);}});
    return()=>{active=false;};
  },[year,retry]);
  useEffect(()=>{const update=()=>setOnline(navigator.onLine);window.addEventListener('online',update);window.addEventListener('offline',update);return()=>{window.removeEventListener('online',update);window.removeEventListener('offline',update);};},[]);
  useEffect(()=>{const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){if(document.querySelector('.analysis-overlay .modal'))return;setMenu(false);setCalendar(false);setFilters(false);setAnalysis(null);setPoint(null);setRiskCell(null);}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[]);
  const sample=pilot?.samples.find(s=>s.sample_id===sampleId);
  useEffect(()=>{
    let active=true;setCandidates(null);
    if(sample?.imagery)fetch(sample.imagery.asset_base+'/candidates.geojson').then(r=>r.json()).then(data=>active&&setCandidates(data)).catch(()=>{});
    return()=>{active=false;};
  },[sample?.imagery?.asset_base]);
  const available=useMemo(()=>rows.filter(r=>(!quality||r.qualified)&&(sensor==='both'||r.sensor===sensor)),[rows,quality,sensor]);
  const filtered=useMemo(()=>available.filter(r=>r.date.slice(5,7)===month),[available,month]);
  const monthly=useMemo(()=>Array.from({length:12},(_,i)=>available.filter(r=>Number(r.date.slice(5,7))===i+1).length),[available]);
  const maximum=Math.max(1,...monthly);
  const period=year+'-'+month;
  const evidenceCells=useMemo(()=>mode==='evidence'?{type:'FeatureCollection',features:(pilot?.samples||[]).filter(s=>s.period===period).map(s=>({type:'Feature',geometry:s.geometry,properties:{sample_id:s.sample_id,cell_id:s.cell_id}}))}:null,[mode,pilot,period]);
  const focusGeometry=useMemo(()=>mode==='evidence'&&sample?{type:'Feature',geometry:sample.geometry,properties:{}}:null,[mode,sample?.sample_id]);
  const targetDate=new Date(Date.UTC(Number(report?.forecast_origin.slice(0,4)||2026),Number(report?.forecast_origin.slice(5,7)||1)-1+lead-1,1));
  const reference=useMemo(()=>risks.map(r=>r.raw_proxy).sort((a,b)=>a-b),[risks]);
  const riskGeo=useMemo(()=>{
    if(mode!=='planning'||!grid)return null;
    const lookup=new Map(risks.filter(r=>r.month===targetDate.getUTCMonth()+1).map(r=>[r.cell_id,r]));
    return {...grid,features:grid.features.map((f:any)=>({...f,properties:{...f.properties,...lookup.get(f.id),index:lookup.has(f.id)?scenarioIndex(lookup.get(f.id)!,scenario,reference):0}}))};
  },[mode,grid,risks,lead,scenario,report,reference]);
  const activity=useMemo(()=>{
    if(!adjusted||!grid||!harm||mode!=='hotspots')return null;
    const counts=new Map<string,{modis:number;viirs:number}>();
    for(const row of rows.filter(r=>r.qualified&&r.date.slice(5,7)===month)){
      const count=counts.get(row.cell_id)||{modis:0,viirs:0};row.sensor==='MODIS'?count.modis++:count.viirs++;counts.set(row.cell_id,count);
    }
    return {...grid,features:grid.features.map((f:any)=>({...f,properties:{...f.properties,count:((counts.get(f.id)?.modis||0)*harm.ratios[String(Number(month))]+(counts.get(f.id)?.viirs||0))/2}}))};
  },[adjusted,grid,harm,rows,month,mode]);
  const chooseSample=(selected:Sample)=>{setSampleId(selected.sample_id);setYear(selected.period.slice(0,4));setMonth(selected.period.slice(5,7));setShowEvidence(true);setPoint(null);};
  const chooseMode=(next:Mode)=>{setMode(next);setPoint(null);setRiskCell(null);setFilters(false);if(next==='evidence'){setShowEvidence(true);if(!sample){const candidates=(pilot?.samples||[]).filter(s=>s.period===period);const first=candidates.find(s=>s.imagery)||candidates[0]||(Number(year)<2024?pilot?.samples.find(s=>s.imagery):undefined);if(first)chooseSample(first);}}};
  const changeMonth=(value:string)=>{setMonth(value);setPoint(null);const candidates=pilot?.samples.filter(s=>s.period===year+'-'+value)||[];const match=candidates.find(s=>s.cell_id===sample?.cell_id)||candidates.find(s=>s.imagery)||candidates[0];setSampleId(match?.sample_id||'');};
  const recordReview=(updated:Sample)=>{
    if(!pilot)return;
    const next={...pilot,samples:pilot.samples.map(s=>s.sample_id===updated.sample_id?updated:s)};
    const persisted=Object.fromEntries(next.samples.filter(s=>s.locked).map(s=>[s.sample_id,{label:s.label,locked:true,reviewer:s.reviewer,reason:s.reason,polygon:s.polygon,confounders_checked:s.confounders_checked,temporal_adequacy_confirmed:s.temporal_adequacy_confirmed,review_confidence:s.review_confidence,reviewed_at:s.reviewed_at}]));
    try{localStorage.setItem('fw-reviews-v2',JSON.stringify(persisted));setPilot(next);}catch{setError(true);}
  };
  const exportHotspots=()=>download('firewatch-hotspots.csv',csv(filtered.map(row=>({...row,mode:'observed',units:'detection_records',aoi:'approximate_bago_yoma_v1',coverage:'unknown',source_version:summary?.updated_at,exported_at:new Date().toISOString()}))),'text/csv');
  const exportPilot=()=>download('firewatch-pilot.geojson',JSON.stringify({type:'FeatureCollection',features:pilot?.samples.map(({geometry,...properties})=>({type:'Feature',geometry,properties:{...properties,viirs_count:properties.locked?properties.viirs_count:null,imagery:undefined,attribution:'NASA FIRMS; Copernicus Sentinel-2 / Earth Search',schema_version:pilot.schema_version,exported_at:new Date().toISOString(),coverage:undefined,coverage_status:properties.coverage.status,grid_crs:'EPSG:32647',aoi:'approximate_bago_yoma_v1'}}))},null,2));
  return <div className={`workspace ${solid?'solid':''} ${lang==='mm'?'myanmar':''} mode-${mode}`}>
    <div className="map-stage"><MapView rows={mode==='hotspots'?filtered:mode==='evidence'&&sample?.locked?filtered.filter(r=>r.cell_id===sample.cell_id):[]} aoi={aoi} admin={admin} grid={grid} risk={riskGeo} activity={activity} basemap={basemap} setBasemap={setBasemap} t={t} onPick={setPoint} onCell={setRiskCell} draw={false} showGrid={gridOn} showDensity={density||adjusted} evidenceCells={evidenceCells} candidates={mode==='evidence'?candidates:null} focusGeometry={focusGeometry} showCoverage={coverageOn} onEvidencePick={(properties:any)=>{const match=pilot?.samples.find(s=>s.sample_id===properties.sample_id);if(match)chooseSample(match);}}/></div>
    <header className="glass workspace-header">
      <a href="#" className="workspace-brand" onClick={e=>{e.preventDefault();chooseMode('hotspots');}}><span className="brand-mark"><Flame size={25}/></span><span><strong>FireWatch<span className="brand-dot">.</span></strong><small>{t('subtitle')}</small></span></a>
      <nav className="workspace-modes" aria-label={t('workspace')}>{(['hotspots','evidence','planning'] as Mode[]).map((item,i)=>{const Icon=[Satellite,ScanLine,TrendingUp][i];return <button key={item} className={mode===item?'active':''} onClick={()=>chooseMode(item)} aria-pressed={mode===item}><Icon size={16}/><span>{t(item)}</span></button>;})}</nav>
      <div className="workspace-actions"><div className="workspace-language"><button className={lang==='en'?'active':''} onClick={()=>setLang('en')}>EN</button><button className={lang==='mm'?'active':''} onClick={()=>setLang('mm')}>မြန်မာ</button></div><button className="round-button theme-button" onClick={()=>setTheme(theme==='dark'?'light':'dark')} aria-label={t(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={18}/>:<Moon size={18}/>}</button><button className="round-button" onClick={()=>setMenu(!menu)} aria-label={t('workspace')} aria-expanded={menu}><Menu size={20}/></button></div>
    </header>
    {menu&&<div className="glass workspace-menu"><button onClick={()=>setTheme(theme==='dark'?'light':'dark')}>{theme==='dark'?<Sun size={16}/>:<Moon size={16}/>} {t(theme==='dark'?'light':'dark')}</button><button onClick={()=>{setAnalysis('overview');setMenu(false);}}><Info size={16}/>{t('overview')}</button><button onClick={()=>{setAnalysis('quality');setMenu(false);}}><TrendingUp size={16}/>{t('openMethod')}</button><button onClick={()=>{setAnalysis('map');setMenu(false);}}><Upload size={16}/>{t('import')} / {t('draw')}</button><button onClick={()=>setSolid(!solid)}><Layers size={16}/>{t(solid?'glass':'solid')}{solid&&<Check size={15}/>}</button><button onClick={exportHotspots}><Download size={16}/>{t('csv')}</button><button onClick={exportPilot}><FileJson size={16}/>{t('exportPilot')}</button><a href="/firewatch-source.zip" download><Download size={16}/>{t('downloadSource')}</a></div>}
    <div className="map-context"><span className="context-pill"><span className="status-dot"/>{t('real')}</span><span className="context-range">{mode==='evidence'?'2024–2025':t('allYears')}</span></div>
    <button className={`glass filter-trigger ${filters?'active':''}`} onClick={()=>setFilters(!filters)} aria-expanded={filters}><SlidersHorizontal size={16}/>{t('filters')}</button>
    {filters&&<section className="glass filter-popover"><div className="drawer-heading"><h3>{t('filters')}</h3><button className="round-button" onClick={()=>setFilters(false)} aria-label={t('close')}><X size={17}/></button></div><label>{t('sensor')}<select value={sensor} onChange={e=>setSensor(e.target.value)} disabled={mode!=='hotspots'}><option value="both">MODIS + VIIRS</option><option>MODIS</option><option>VIIRS</option></select></label><label className="check-label"><input type="checkbox" checked={quality} onChange={e=>setQuality(e.target.checked)}/>{t('qualityOnly')}</label><label className="check-label"><input type="checkbox" checked={gridOn} onChange={e=>setGridOn(e.target.checked)}/>{t('grid')}</label><label className="check-label"><input type="checkbox" checked={coverageOn} onChange={e=>setCoverageOn(e.target.checked)}/>{t('viirsCoverage')}</label><label className="check-label"><input type="checkbox" checked={density} onChange={e=>setDensity(e.target.checked)} disabled={mode!=='hotspots'}/>{t('density')}</label><label className="check-label"><input type="checkbox" checked={adjusted} onChange={e=>setAdjusted(e.target.checked)} disabled={mode!=='hotspots'}/>{t('adjustedLayer')}</label>{adjusted&&<p>{t('adjustedNote')}</p>}</section>}
    {!online&&<div className="workspace-notice" role="status">{t('offline')}</div>}{error&&<div className="workspace-notice" role="alert">{t('error')}<button onClick={()=>setRetry(value=>value+1)}>{t('reset')}</button></div>}
    {mode==='hotspots'&&!point&&<section className="glass map-summary"><span className="eyebrow">{t('subtitle')}</span><h1>{t('mapIntro')}</h1><p>{t('mapDescription')}</p><div className="summary-count"><strong>{loading?'—':fmt(filtered.length)}</strong><span>{t('monthlyCount')}<small>{monthText(Number(month))} {year} · UTC</small></span></div><div className="summary-foot"><span>{t('approx')}</span><button onClick={()=>chooseMode('evidence')}>{t('inspect')}<ArrowUpRight size={16}/></button></div></section>}
    {mode==='planning'&&<section className="glass planning-card"><span className="eyebrow">{t('plannedNotice')}</span><h2>{t('outlook')}</h2><p>{t('warning')}</p><label>{t('horizon')}<select value={horizon} onChange={e=>{setHorizon(Number(e.target.value));setLead(Math.min(lead,Number(e.target.value)));}}><option value={36}>36 {t('months')}</option><option value={48}>48 {t('months')}</option></select></label><label>{t('scenario')}<select value={scenario} onChange={e=>setScenario(e.target.value)}>{['baseline','dry','wet'].map(s=><option key={s} value={s}>{t(s)}</option>)}</select></label><p className="quiet-note">{t('repeat')}</p><button className="outline-button" onClick={()=>setAnalysis('future')}>{t('openMethod')}<ArrowUpRight size={16}/></button></section>}
    {mode==='evidence'&&pilot&&(showEvidence?<EvidencePanel pilot={pilot} sample={sample} t={t} onSelect={chooseSample} onReview={recordReview} onClose={()=>setShowEvidence(false)}/>:<button className="glass reopen-evidence" onClick={()=>setShowEvidence(true)}><ScanLine size={18}/>{t('evidence')}</button>)}
    {point&&<aside className="glass observation-card"><div className="drawer-heading"><div><span className="eyebrow">{t('observed')}</span><h2>{point.sensor}</h2></div><button className="round-button" onClick={()=>setPoint(null)} aria-label={t('close')}><X size={18}/></button></div><dl>{[[t('date'),point.date+' '+point.time],[t('location'),point.lat+', '+point.lon],[t('confidence'),point.confidence],[t('frp'),(point.frp??'—')+' MW'],[t('source'),point.source],[t('platform'),point.satellite],[t('version'),point.version]].map(([key,value])=><React.Fragment key={key}><dt>{key}</dt><dd>{value}</dd></React.Fragment>)}</dl><p>{t('whyBody')}</p><span className="coverage-badge">{t('coverageUnknown')}</span></aside>}
    {riskCell&&<aside className="glass observation-card"><div className="drawer-heading"><h2>{t('index')}</h2><button className="round-button" onClick={()=>setRiskCell(null)} aria-label={t('close')}><X size={18}/></button></div><strong className="risk-number">{Number(riskCell.index).toFixed(1)}<small>/100</small></strong><p>{t('notProbability')}</p><p>{t('spread')} · {riskCell.spread_low}–{riskCell.spread_high}</p><p>{t('baseline')} · {t('repeat')}</p></aside>}
    <section className="glass timeline">
      <div className="timeline-heading"><button className="timeline-date" onClick={()=>setCalendar(!calendar)}><CalendarDays size={18}/><span>{mode==='planning'?monthText(targetDate.getUTCMonth()+1):monthText(Number(month))} <strong>{mode==='planning'?targetDate.getUTCFullYear():year}</strong></span></button><span className="timeline-mode">{t(mode==='planning'?'projected':mode==='evidence'?'evidence':'observed')} · UTC</span><button className="round-button" aria-label={t('calendar')} onClick={()=>setCalendar(!calendar)}><Maximize2 size={15}/></button></div>
      {mode==='planning'?<input className="planning-range" type="range" min={1} max={horizon} value={lead} onChange={e=>setLead(Number(e.target.value))} aria-label={t('target')}/>:<div className="month-track">{monthly.map((count,index)=><button key={index} className={Number(month)===index+1?'active':''} onClick={()=>changeMonth(String(index+1).padStart(2,'0'))} aria-label={`${monthText(index+1)} ${year}`} aria-pressed={Number(month)===index+1}><span className="month-bar" style={{height:(mode==='evidence'?8:Math.max(3,Math.sqrt(count/maximum)*23))+'px'}}/><small>{monthText(index+1,true)}</small></button>)}</div>}
    </section>
    {calendar&&<div className="glass calendar-popover"><div className="drawer-heading"><h3>{t('calendar')}</h3><button className="round-button" onClick={()=>setCalendar(false)} aria-label={t('close')}><X size={17}/></button></div>{mode==='planning'?<label>{t('target')}<select value={lead} onChange={e=>{setLead(Number(e.target.value));setCalendar(false);}}>{Array.from({length:horizon},(_,i)=>{const date=new Date(Date.UTC(Number(report?.forecast_origin.slice(0,4)||2026),Number(report?.forecast_origin.slice(5,7)||1)-1+i,1));return <option key={i} value={i+1}>{monthText(date.getUTCMonth()+1)} {date.getUTCFullYear()}</option>;})}</select></label>:<><select value={year} onChange={e=>{setYear(e.target.value);setSampleId('');}} aria-label={t('year')}>{(mode==='evidence'?[2024,2025]:summary?.years||[2025]).map((y:number)=><option key={y}>{y}</option>)}</select><div className="calendar-months">{monthly.map((count,index)=><button className={Number(month)===index+1?'active':''} key={index} onClick={()=>{changeMonth(String(index+1).padStart(2,'0'));setCalendar(false);}}><span>{monthText(index+1,true)}</span>{mode==='hotspots'&&<small>{fmt(count)}</small>}</button>)}</div><button className="outline-button" onClick={()=>{setCalendar(false);setAnalysis('calendar');}}>{t('analysis')}<ArrowUpRight size={15}/></button></>}</div>}
    {analysis&&<div ref={dialog} className="analysis-overlay" role="dialog" aria-modal="true" aria-label={t('analysis')}><button className="glass analysis-close" onClick={()=>setAnalysis(null)}><ChevronLeft size={18}/>{t('map')}</button><LegacyAnalysis evidenceStatus={pilot?`${t('evidence')} · ${fmt(pilot.samples.filter(s=>s.imagery).length)} ${t('evidenceAvailable')} · ${fmt(pilot.samples.filter(s=>!s.locked).length)} ${t('reviewPending')} · ${fmt(pilot.samples.filter(s=>s.coverage.passes.length).length)} ${t('withCoverage')}`:t('notAvailable')} initialView={analysis} initialLanguage={lang} initialTheme={theme}/></div>}
  </div>;
}
createRoot(document.getElementById('root')!).render(<App/>);
