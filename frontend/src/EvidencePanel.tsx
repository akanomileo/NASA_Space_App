import {useEffect, useRef, useState} from 'react';
import {Download, Eye, EyeOff, FileCheck, Images, LockKeyhole, ScanLine, ChevronDown, X} from 'lucide-react';
import {booleanWithin} from '@turf/turf';
import {Pilot, Sample, EvidenceLabel, agreement, validateReview} from './evidence';
import {download, csv} from './data';

interface Props {
  pilot: Pilot; sample: Sample | undefined; t: (key: string) => string;
  onSelect: (sample: Sample) => void; onReview: (sample: Sample) => void; onClose: () => void;
}
export function EvidencePanel({pilot, sample, t, onSelect, onReview, onClose}: Props) {
  const [position, setPosition] = useState(50);
  const [imageMode, setImageMode] = useState('compare');
  const [reviewer, setReviewer] = useState('');
  const [reason, setReason] = useState('');
  const [label, setLabel] = useState<EvidenceLabel>('unknown');
  const [confidence, setConfidence] = useState('low');
  const [checked, setChecked] = useState(false);
  const [temporal, setTemporal] = useState(false);
  const [polygon, setPolygon] = useState<any>(null);
  const [error, setError] = useState('');
  const [expanded, setExpanded] = useState(!window.matchMedia('(max-width:760px)').matches);
  const [crosscheck, setCrosscheck] = useState<any>(null);
  const touchStart = useRef(0);
  useEffect(() => {
    setReviewer(sample?.reviewer || ''); setReason(sample?.locked ? sample.reason : '');
    setLabel(sample?.label || 'unknown'); setConfidence(sample?.review_confidence || 'low'); setChecked(false); setTemporal(false); setPolygon(null); setError('');
    setCrosscheck(null);
    if (sample?.locked && sample.imagery) {
      fetch(sample.imagery.asset_base + '/crosscheck.json').then(r=>r.ok?r.json():null).then(setCrosscheck).catch(()=>{});
    }
  }, [sample?.sample_id, sample?.locked]);
  const result = agreement(pilot.samples);
  const score = (value: number|null) => value == null ? '—' : (value*100).toFixed(1)+'%';
  const save = () => {
    if (!sample) return;
    const problem = validateReview(sample,label,reviewer,reason,checked,temporal,polygon,pilot);
    if (problem) {setError(t(problem));return;}
    onReview({...sample,label,reviewer,reason,locked:true,polygon,review_confidence:confidence,reviewed_at:new Date().toISOString(),confounders_checked:checked,temporal_adequacy_confirmed:temporal});
    setError(t('reviewSaved'));
  };
  const uploadPolygon = async (file?: File) => {
    if(!file || !sample) return;
    try {
      const data=JSON.parse(await file.text());
      const feature=data.type==='Feature'?data:{type:'Feature',geometry:data,properties:{}};
      if(!['Polygon','MultiPolygon'].includes(feature.geometry.type) || !booleanWithin(feature,{type:'Feature',geometry:sample.geometry,properties:{}})) throw Error();
      setPolygon(feature);setError('');
    } catch {setError(t('polygonRequired'));}
  };
  const exportReviews=()=>download('firewatch-reviews.json',JSON.stringify(pilot.samples.filter(s=>s.locked).map(s=>({
    sample_id:s.sample_id,label:s.label,reviewer:s.reviewer,reason:s.reason,polygon:s.polygon,
    confounders_checked:s.confounders_checked,temporal_adequacy_confirmed:s.temporal_adequacy_confirmed,
    review_origin:'human',review_confidence:s.review_confidence,reviewed_at:s.reviewed_at,
  })),null,2));
  const exportTable=()=>download('firewatch-validation.csv',csv(pilot.samples.map(s=>({
    sample_id:s.sample_id,cell_id:s.cell_id,period:s.period,label:s.label,review_status:s.locked?'locked':'pending',
    reviewer:s.reviewer,review_confidence:s.review_confidence||'',reviewed_at:s.reviewed_at||'',rationale:s.reason,
    before_scene:s.imagery?.before_id||'',after_scene:s.imagery?.after_id||'',
    before_date:s.imagery?.before_date||'',after_date:s.imagery?.after_date||'',clear_overlap:s.imagery?.clear_overlap_fraction??'',
    qualifying_viirs_count:s.locked?s.viirs_count:'blinded',coverage_status:s.coverage.status,
    season:s.season,crs:'EPSG:4326',area_crs:'EPSG:32647',schema_version:pilot.schema_version,
    attribution:'NASA FIRMS; Copernicus Sentinel-2 / Earth Search',aoi:'approximate_bago_yoma_v1',exported_at:new Date().toISOString(),
  }))),'text/csv');
  const exportPolygons=()=>download('firewatch-reviewed-polygons.geojson',JSON.stringify({type:'FeatureCollection',features:pilot.samples.filter(s=>s.locked&&s.polygon).map(s=>({type:'Feature',geometry:s.polygon.geometry||s.polygon,properties:{sample_id:s.sample_id,cell_id:s.cell_id,period:s.period,label:s.label,reviewer:s.reviewer,review_confidence:s.review_confidence,reviewed_at:s.reviewed_at,before_scene:s.imagery?.before_id,after_scene:s.imagery?.after_id,crs:'EPSG:4326',schema_version:pilot.schema_version,attribution:'Copernicus Sentinel-2 / Earth Search; independent reviewer'}}))},null,2));
  return <aside className={`glass evidence-panel ${expanded?'expanded':'collapsed'}`} aria-label={t('evidence')}>
    <div className="sheet-handle" onTouchStart={e=>{touchStart.current=e.touches[0].clientY;}} onTouchEnd={e=>setExpanded(e.changedTouches[0].clientY<touchStart.current)}>
      <button onClick={()=>setExpanded(!expanded)} aria-expanded={expanded} aria-label={t('evidence')}><span/></button>
    </div>
    <div className="drawer-heading"><div><span className="eyebrow">{t('pilot')}</span><h2>{t('evidence')}</h2></div><button className="round-button" onClick={onClose} aria-label={t('close')}><X size={18}/></button></div>
    {!expanded&&sample&&<p className="collapsed-selection">{sample.cell_id} · {sample.period} · {sample.locked?t(sample.label):t('reviewPending')}</p>}
    <div className="evidence-scroll">
      <label className="field-label">{t('selection')}<select value={sample?.sample_id || ''} onChange={e=>onSelect(pilot.samples.find(s=>s.sample_id===e.target.value)!)}>
        <option value="" disabled>{t('noSample')}</option>
        {[...pilot.samples].sort((a,b)=>Number(!!b.imagery)-Number(!!a.imagery)||a.sample_id.localeCompare(b.sample_id)).map(s=><option value={s.sample_id} key={s.sample_id}>{s.cell_id} · {s.period}{s.imagery?' ◉':''}</option>)}
      </select></label>
      {sample && <>
        <div className="review-status"><span className={`status-label ${sample.locked?'locked':''}`}>{sample.locked?<FileCheck size={14}/>:<EyeOff size={14}/>} {sample.locked?t(sample.label):t('reviewPending')}</span><span>5 km</span></div>
        {!sample.locked && <p className="quiet-note"><EyeOff size={14}/>{t('blind')}</p>}
        {sample.imagery ? <>
          <div className="image-switch" role="group" aria-label={t('compare')}>
            {['before','compare','after'].map(mode=><button key={mode} className={imageMode===mode?'active':''} onClick={()=>setImageMode(mode)}>{t(mode)}</button>)}
          </div>
          <div className="image-comparison">
            <img src={sample.imagery.asset_base+'/after.png'} alt={`${t('after')} ${sample.imagery.after_date.slice(0,10)}`} />
            <img className="before-image" src={sample.imagery.asset_base+'/before.png'} alt={`${t('before')} ${sample.imagery.before_date.slice(0,10)}`} style={{clipPath:`inset(0 ${imageMode==='before'?0:imageMode==='after'?100:100-position}% 0 0)`}}/>
            {imageMode==='compare'&&<><div className="compare-line" style={{left:position+'%'}}><ScanLine size={18}/></div><input type="range" min="0" max="100" value={position} onChange={e=>setPosition(Number(e.target.value))} aria-label={t('swipe')}/></>}
            {imageMode!=='after'&&<span className="image-caption left">{t('before')}</span>}{imageMode!=='before'&&<span className="image-caption right">{t('after')}</span>}
          </div>
          <p className="image-key">{t('falseColor')} · {sample.imagery.resolution_m} m</p>
          <div className="image-dates"><span>{sample.imagery.before_date.slice(0,10)}</span><span>{sample.imagery.after_date.slice(0,10)}</span></div>
          <div className="evidence-stat"><span>{t('clearOverlap')}</span><strong>{(sample.imagery.clear_overlap_fraction*100).toFixed(1)}%</strong></div>
          <div className="clear-meter"><span style={{width:sample.imagery.clear_overlap_fraction*100+'%'}}/></div>
          <div className="evidence-stat"><span>{t('candidate')}</span><strong>{sample.imagery.candidate_count}</strong></div>
          <details className="evidence-details"><summary>{t('viewSources')}</summary><p>{sample.imagery.before_id}<br/>{sample.imagery.after_id}</p><p>{sample.imagery.qa_method}</p><a href={sample.imagery.asset_base+'/metadata.json'} target="_blank" rel="noreferrer">{t('dataset')} ↗</a><a href={sample.imagery.asset_base+'/dnbr.tif'} download>dNBR GeoTIFF ↓</a></details>
        </>:<div className="empty-evidence"><Images size={32}/><p>{t('awaitingImages')}</p></div>}
        <section className="coverage-card"><div><ScanLine size={17}/><strong>{t('viirsCoverage')}</strong></div>{sample.coverage.passes.length?<><span className="coverage-badge">{sample.coverage.passes.length} {t('retrievedPasses')}</span><p>{t('partialCoverage')}</p>{sample.coverage.passes.map(pass=><details key={pass.pass_id}><summary>{pass.timestamp.slice(0,16).replace('T',' ')} UTC · {pass.usable_land_fraction==null?'—':(pass.usable_land_fraction*100).toFixed(1)+'%'}</summary><p>{pass.usable_pixels} / {pass.land_pixels} {t('usablePixels')}</p>{sample.locked?<p>{pass.qualifying_fire_pixels>0?`${pass.qualifying_fire_pixels} ${t('qualifying')}`:pass.usable_pixels>0?t('noPassHotspot'):t('coverageUnknown')}</p>:<p>{t('blind')}</p>}</details>)}</>:<><span className="coverage-badge"><i className="hatch-box"/>{t('coverageUnknown')}</span><p>{t('authNeeded')}</p></>}</section>
        {sample.locked ? <section className="review-result"><strong>{t(sample.label)}</strong><p>{sample.reason}</p><span>{sample.reviewer}</span><div className="evidence-stat"><span>VIIRS · {sample.period}</span><b>{sample.viirs_count}</b></div><details><summary>{t('crosscheck')}</summary><p>{crosscheck?`${crosscheck.burned_pixels} / ${crosscheck.valid_pixels} ${t('cells')} · 500 m`:t('notAvailable')}</p></details></section> : <details className="review-form"><summary><FileCheck size={16}/>{t('review')}<ChevronDown size={16}/></summary>
          <label>{t('labels')}<select value={label} onChange={e=>setLabel(e.target.value as EvidenceLabel)}>{['unknown','burn_scar','no_burn_evidence'].map(value=><option key={value} value={value}>{t(value)}</option>)}</select></label>
          <label>{t('reviewer')}<input value={reviewer} onChange={e=>setReviewer(e.target.value)} maxLength={100}/></label>
          <label>{t('reviewConfidence')}<select value={confidence} onChange={e=>setConfidence(e.target.value)}>{['low','medium','high'].map(value=><option key={value} value={value}>{t('confidence_'+value)}</option>)}</select></label>
          <label>{t('rationale')}<textarea value={reason} onChange={e=>setReason(e.target.value)} rows={3}/></label>
          {label==='burn_scar'&&<label>{t('polygonRequired')}<input type="file" accept=".json,.geojson" onChange={e=>uploadPolygon(e.target.files?.[0])}/></label>}
          {label!=='unknown'&&<label className="check-label"><input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)}/>{t('confounders')}</label>}
          {label==='no_burn_evidence'&&<label className="check-label"><input type="checkbox" checked={temporal} onChange={e=>setTemporal(e.target.checked)}/>{t('temporal')}</label>}
          <button className="action-button" onClick={save}><LockKeyhole size={15}/>{t('lockReview')}</button><p className="quiet-note">{t('reviewLocal')}</p>
        </details>}
        {error&&<p className="form-message" role="status">{error}</p>}
      </>}
      <section className="pilot-summary"><h3>{t('validation')}</h3><div className="metric-grid"><div><strong>{result.known}/{pilot.samples.length}</strong><span>{t('known')}</span></div><div><strong>{score(result.f1)}</strong><span>F1</span></div><div><strong>{score(result.accuracy)}</strong><span>{t('accuracy')}</span></div></div><p>{result.known?t('sampleOnly'):t('pendingMetric')}</p><details><summary>{t('agreementDetails')}</summary><table className="evidence-table"><tbody><tr><th>TP</th><td>{result.tp}</td><th>FP</th><td>{result.fp}</td></tr><tr><th>FN</th><td>{result.fn}</td><th>TN</th><td>{result.tn}</td></tr><tr><th>{t('precision')}</th><td colSpan={3}>{score(result.precision)} · n={result.tp+result.fp}</td></tr><tr><th>{t('recall')}</th><td colSpan={3}>{score(result.recall)} · n={result.tp+result.fn}</td></tr><tr><th>{t('unknown')}</th><td colSpan={3}>{result.unknown}</td></tr></tbody></table><p>{t('matrixMeaning')}</p>{['dry_Nov_Apr','wet_May_Oct'].map(season=>{const rows=pilot.samples.filter(s=>s.season===season),score=agreement(rows);return <p key={season}>{t(season)} · {score.known}/{rows.length} {t('known')} · {rows.filter(s=>s.coverage.passes.length).length} {t('withCoverage')}</p>;})}</details><details className="review-table"><summary>{t('reviewTable')}</summary><table className="evidence-table"><thead><tr><th>{t('selection')}</th><th>{t('labels')}</th></tr></thead><tbody>{pilot.samples.map(s=><tr key={s.sample_id}><td><button onClick={()=>onSelect(s)}>{s.cell_id}<br/>{s.period}</button></td><td>{s.locked?t(s.label):t('reviewPending')}</td></tr>)}</tbody></table></details><div className="evidence-exports"><button className="outline-button" onClick={exportReviews}><Download size={15}/>{t('exportReviews')}</button><button className="outline-button" onClick={exportTable}>{t('validationCsv')}</button><button className="outline-button" onClick={exportPolygons}>{t('polygonExport')}</button></div></section>
    </div>
  </aside>;
}
