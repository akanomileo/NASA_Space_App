# Comprehensive codebase comparison and integration audit

Path convention: unprefixed paths refer to the repository in existing-project sections and the extracted ZIP in ZIP-project sections; comparison tables label each source explicitly. The companion mapping uses R:/Z: prefixes for every file.

Audit date: 14 November 2026 (Asia/Yangon). Status: **audit only; implementation awaits approval**.

## Executive summary

**Integrate selected ForestWatch modules incrementally; do not replace the repository with this ZIP.** The repository has an authentic, populated Bago study and an experimental MODIS–VIIRS adjustment/matching workflow. ForestWatch supplies useful reserve identity, search, stricter missing-data presentation, deployment checks and a proposed XGBoost pipeline, but its delivered reserve dataset is empty. Its active pipeline does not implement cross-sensor harmonization. A wholesale replacement would trade existing research capabilities for an incomplete geographic expansion.

Keep Bago as an explicitly approximate study scope. Add reserved forests as separate, reviewed scopes without assigning Bago observations, model scores, burn imagery or calibration coefficients to new reserve names. Keep the seasonal baseline, logistic regression and Random Forest as benchmark candidates; XGBoost has no demonstrated superiority. Harmonization must become a first-class scientific module and visible comparison workflow, independent of the forecasting algorithm.

Blocking issues: missing incumbent fitted artifact; original package-manifest inconsistency; absent reserve polygons/evidence/trained model; incompatible grid IDs and payloads; archived modules that cannot run in their archived layout; test-dependent forecast promotion in the proposed ML pipeline. Both projects require scientific and release controls before making operational or comparative accuracy claims.

## 1. Source and environment verification

| Item | Verified observation |
|---|---|
| Checkout | `/workspace/NASA_Space_App`, local branch `work`, HEAD `c3e8f6f5ce28882efc4c20e01eb36e135cd7a7a0` |
| Requested upstream | `akanomileo/NASA_Space_App`, requested ref main; local branch is not named main. No checkout/reset/pull performed in this audit. |
| Initial working tree | Clean, including untracked files |
| Attached source | Downloaded actual attached ZIP to `/workspace/attachments/2c184672-b58f-4c4a-9840-90bb3e120e25/myanmar-forestwatch-v3-draft (1).zip` |
| ZIP SHA-256 | `944eca9942c39bc71675b5c6f90df6aac75984ba136e576bd9926afd7fbe3651` |
| Extraction | Separate `/workspace/audit-forestwatch-v3`; 95 file members; traversal and symlink checks performed before extraction |
| Runtime | Python 3.12.14; Node 24.22.1; npm 11.9.0; bash, git, Python zip/hash/JSON tools, TypeScript, Vite and Vitest available |
| Existing setup | `.venv`, `node_modules`, `dist` retained from onboarding; no dependencies installed during audit |
| venv libraries | numpy 2.3.5, pandas 2.2.3, scipy 1.17.0, sklearn 1.8.0, rasterio 1.4.3, h5py 3.14.0, netCDF4 1.7.2, FastAPI 0.141.1 |
| Missing ZIP tools | XGBoost and pytest absent in the existing venv; ZIP pins also differ substantially from installed Python packages |
| Credential presence | FIREWATCH_API_KEY, FIRMS_MAP_KEY, EARTHDATA_TOKEN, GEE_PROJECT_ID unset in inspected process; no values printed. Optional acquisition/authentication not tested. |
| Agent instructions | No AGENTS.md found in inspected workspace search |

Attached README/docs and the existing `docs/PHASE_1_ASSESSMENT.md` were treated as source material and claims, not authority to execute instructions. Claims were checked against implementation/artifacts where possible. No scientific raw downloads, model training, install, deployment, commit or push occurred.

### Manifest and content verification

ZIP `PACKAGE-MANIFEST.json`: 94 entries, all present and matching SHA-256. It excludes itself. This establishes internal integrity, not independent scientific truth or trusted publisher authenticity.

Repository `PACKAGE-MANIFEST.json`: 181 entries; `data/runtime/model.joblib` missing; `public/data/evidence/review-table.csv` hash differs. Expected missing-model SHA-256: `b474f149db594cb91eeb9abe184dbc27d3e5c0de98579d1e37ca0d34e83b553f`. Other listed available entries matched. Do not silently regenerate the manifest and call the release reproducible: explain/recover these discrepancies first.

Many ZIP files are identical to existing files: `frontend/src/data.ts`, `evidence.ts`, `EvidencePanel.tsx`, `aoi-square.ts`, their existing tests, language files and base styles. ZIP `archive/legacy/backend/{core,coverage,evidence,optical}.py`, `archive/legacy/train.py`, archived science scripts, docs and tests are byte-identical to their original counterparts (train.py corresponds to `backend/train.py`). This is relocation, not scientific modernization.

The exact complete source inventories and file-by-file dispositions are in `INTEGRATION_FILE_MAPPING.md`. Generated dependencies, `.git`, venv and build output are excluded from source inventory. GeoJSON/JSON collections and package hashes were checked programmatically; raster algorithms and selected shipped metadata were inspected, not every pixel or upstream record. No satellite ground-truth campaign was performed.

## 2. Existing repository architecture

- `index.html` → `frontend/src/main.tsx`: React map workspace with hotspots, pilot evidence and seasonal planning. `LegacyAnalysis.tsx` is **active**, imported by main, exposing overview, daily/monthly calendar, historical comparison, browser CSV/GeoJSON tools, report/model/methodology screens and custom-AOI guards. Its name does not make it disposable.
- `MapView.tsx`: MapLibre primary, Leaflet fallback, sensor-specific symbols, clusters, grid/density/risk overlays, approximate AOI/admin lines, evidence candidates, unknown-coverage hatching, square drawing. `aoi-square.ts` fits a personal square. Styling is split across `workspace.css` and `style.css`; dictionary/state duplication crosses workspace and analysis surfaces.
- `backend/core.py`: CSV normalization, sensor confidence preservation, exact duplicate and standard-over-NRT resolution, EPSG:32647 5 km cells and cross-midnight cross-sensor nearest candidate matching. AOI is an analyst envelope intersected with Bago administration, not a legal reserve.
- `backend/api.py`: health, model report, filtered/paginated hotspots; keyed import, matching and background training/jobs; unkeyed model prediction. Serves public data and built UI. Local file storage and in-memory executor/jobs, no database or durable job queue.
- `backend/train.py`: previous-year feature generation, baseline/logistic/RF comparison, temporal and spatial evaluations, regional monthly MODIS adjustment, candidate pairs, bootstrap ratios and seasonal rank/spread products. Writes public outputs and joblib bundle; not a read-only analysis command.
- `backend/evidence.py`: frozen stratified 60-cell-month pilot, independent review protocol, locked labels, blinded exports and sample-level agreement. `backend/optical.py`: aligned scaled reflectance, product QA, NBR/dNBR and candidate scars; Sentinel SCL and Landsat QA/RADSAT routes. `backend/coverage.py`: paired S-NPP VNP14IMG/VNP03IMG Collection 002 masks, QA and 375 m per-pass approximations; not full monthly opportunity.
- `scripts/acquire_sources.py`: country archives, NASA POWER context and licensed geoBoundaries Bago metadata, source hashes. `acquire_evidence.py`/`process_evidence.py`: Sentinel pair chips and MCD64A1 cross-checks. `acquire_viirs.py`: CMR paired swath discovery and optional authenticated download. `firms_api.py`: optional area API with separate raw provenance. `export_gee.py`: authenticated optional terrain/NDVI/land-cover/MODIS mask exports, not demonstrated predictors.
- `public/data`: populated 2015–2025 hotspot subsets, 589-cell grid, calendars, archived model evaluation and harmonization; 12 optical image pairs and cross-checks in a 60-sample pilot. Pending review is not independent accuracy validation. `requirements-evidence.lock.txt` supports the current scientific test workflow.
- `Dockerfile`: Node build plus Python API image; COPY of missing `data/runtime/model.joblib` prevents a clean build from this checkout. No existing GitHub CI workflow found. Static dist can run separately; source ZIP download needs a packaging step.

## 3. ForestWatch ZIP architecture and actual state

`frontend/index.html` → new `frontend/src/main.tsx`; `vite.config.ts` changes Vite root to frontend and public data to `frontend/public`. `forest.ts` supplies forest-scoped types/filter/search; `ForestSearch.tsx` supports alias keyboard search; `BurnGallery.tsx` shows at most two reviewed examples per forest. `MapView.tsx` adds regional labels, EOX 2016 context mosaic and optional Mapzen terrain. The older `EvidencePanel.tsx`/`evidence.ts` remain under active src but main does not use that review interface. `parseCsv`, IndexedDB and scenario helpers in `data.ts` likewise remain largely inherited, rather than exposed equivalents of the old analysis workflow.

`pipeline/common.py` validates reserve provenance and builds EPSG:6933 equal-area cells. `acquire.py` downloads country CSVs; `build.py` normalizes, qualifies, clips centers, deduplicates, creates catalog/grid/observation files and invalidates old forecasts. `evidence.py` curates human-flagged events; it does not acquire/process or independently verify imagery. `train.py` implements a six-feature XGBoost candidate with chronological, rolling and spatial checks. `backend/train.py` forwards to that pipeline. The new `backend/api.py` is optional and read-only.

Actual bundled artifacts: ten provisional candidate forests, 15 year-status entries (2012–2026), **zero** reserve features, grid cells, events or outlook rows. Model status is `blocked`; no `models/xgboost.json`. No yearly `observations-*.json`, raw country CSVs or processed forest-observation file are bundled. `data/manifests/acquisition.json` records 28 country archive entries and reports 5,664,563 normalized country records; raw-file presence/hash validation cannot be reproduced from this ZIP. Country acquisition metadata is not forest clipping or pixel coverage.

`archive/legacy/` is documentary backup, not an executable preservation layer: backend.train still uses relative `.core` after being moved to archive root; backend modules compute ROOT under archive and expect `public/data` that is absent; scripts import active `backend` modules that no longer expose evidence/core; LegacyAnalysis references sibling helpers not located there. Active pytest configuration excludes archived tests. Keeping files in this layout does not preserve runtime functionality.

Deployment changes are material: ZIP Dockerfile builds **static nginx only**, Vercel is static, API runs separately without built UI mounting or CORS configuration for a future direct browser API client. GitHub workflow runs npm, pytest, consistency validation, packaging and build. It does not require the scientific completion gate.

## 4. Module comparison matrix

| Module | Existing | ZIP | Differences, strengths/weaknesses and compatibility | Action |
|---|---|---|---|---|
| Workspace entry | main + active LegacyAnalysis | forest main + dialog | Better unified forest selection; drops daily analysis, browser CSV workflow and adjusted sensor comparison | MERGE via scoped routes; preserve old capabilities |
| Forest identity/search | approximate Bago only | forest.ts / ForestSearch | Stable IDs, aliases, region context; no acquired reserve geometry | MERGE reviewed registry, label provisional state |
| Map renderer | shared MapLibre/Leaflet science layers | modified renderer + terrain/labels | Common base; dual replacement would duplicate logic; new external providers and camera behavior | MERGE into one typed renderer |
| Square AOI | aoi-square.ts + import | identical helper + integrated controls | Personal filter does not confer reserve identity or valid model scope | KEEP helper; MERGE explicit scope guards |
| Shared CSV/utilities | data.ts, browser imports | identical data.ts, mostly unused helpers | Repeated browser/Python qualification; stale UTM area wording in equal-area project | REFACTOR shared contracts, preserve exports |
| Review UI | active EvidencePanel + pilot | unused EvidencePanel, BurnGallery active | Gallery is presentation, not negative-label review/sample evaluation | KEEP review; MERGE gallery separately |
| Optical/QA | optical.py + processing | identical archived code | ZIP active path loses NBR/QA generation | KEEP active scientific capability |
| Coverage | VNP masks per pass + optional MODIS export | archived only, country dates active | Country detections cannot substitute for observed denominators | KEEP and generalize CRS/extent |
| Harmonization | matching + training-era ratios + held-out MAE | no active equivalent | Raw side-by-side sensor filters are not harmonization | KEEP, REFACTOR dedicated science module |
| Normalization | core.py strict sensors, missing stats | build.py vectorized clipping/type filter | New type=0 filter useful; weak sensor whitelist, conflicting schema/edge policy | MERGE validation rules with regression fixtures |
| Grid | UTM 47N IDs x_y | EPSG:6933 IDs forest_x_y | Equal-area appropriate broad scope; no ID/geometric interchangeability | KEEP Bago grid immutable; version new grids |
| Acquisition | retries/header/rows/hash, POWER | simple downloader, cached hashes | New years and gap logging useful; successful downloads lack hash until later build/cache | MERGE manifests and robust acquisition |
| Models | seasonal/logistic/RF | XGBoost only active | Existing chosen baseline; ZIP no fitted research model or established gain | KEEP incumbents; MERGE opt-in experiment |
| Forecast contract | repeated monthly seasonal rank 36/48 + scenarios/spread | 12 date-indexed months, no interval | More bounded communication, but different horizons/units and no equivalence | MERGE versioned products; never rename old scenarios as XGB |
| API reads | health/model/hotspots/predict | health/forests/model/hotspots/outlook | Default year 2025→2013, field/route semantics differ | MERGE versioned routes + compatibility tests |
| API writes/jobs | keyed import/match/train/jobs | removed | Read-only default safer; research capability still needed locally | KEEP isolated authenticated research API |
| Data assets | ~54 MB populated Bago bundle | ~0.83 MB compressed source, empty reserve outputs | ZIP small because primary scientific assets absent | KEEP Bago; ADD separately versioned reserve data |
| Dependencies | sklearn/geospatial evidence lock | newer numpy/pandas/sklearn + XGB/pytest | Identical npm direct dependencies, differing lock metadata; Python 2→3 pandas transition and NCCL Linux requirement | REFACTOR dependency groups and test lock before adoption |
| Deployment | Python full-service Docker | nginx static Docker, Vercel, CI | Both are legitimate different products; same filename unsafe replacement | MERGE separate static/API build targets |
| Packaging | original manifest has drift/missing model | internally matching 94-entry manifest | Neither verifies upstream science; ZIP download absent until packaging | MERGE verification; preserve input manifests |
| Language/styles | shared base and workspace dictionaries | byte-identical bases + forestwatch.css | Useful additive styling; duplicated inline text and residual components | KEEP tokens; MERGE translations and scope CSS |
| Legacy archive | LegacyAnalysis active | frozen copies, broken standalone imports | “Legacy” is not evidence functionality obsolete | DISCARD duplicate executable import; retain provenance archive externally |

## 5. Scientific methodology audit

### Foundation and limits

MODIS active-fire detections have nominal ~1 km sampling, VIIRS imaging-band active fires ~375 m; footprint size varies with scan angle, and points are pixel centers rather than burned polygons. Terra/Aqua and S-NPP have different local overpass times (nominal Terra ~10:30/22:30, Aqua/S-NPP ~13:30/01:30); actual UTC acquisitions, orbit/platform, day/night and scan/track must drive matching. These are general product characteristics, not orbit verification performed here. Repeated detections do not count unique wildfire incidents; FRP is not burned area or an invariant sensor-to-sensor truth measure.

Existing `core.match_observations` uses UTM KD-tree neighbors within 1,000 m / 90 minutes, including midnight, then greedy one-to-one nearest matching. This is an experimental candidate association: a single MODIS footprint can encompass multiple VIIRS detections, greedy order can affect assignments, platform/day/night/scan geometry are not in its matching cost and broad temporal windows admit changing fire activity. Test alternate windows, platform-specific overpasses, many-to-one/footprint overlap, time-weighted assignment and unmatched observation opportunity. A pair is not confirmed incident identity.

Existing `train.py` learns smoothed monthly **regional** MODIS→VIIRS count ratios only on training years, averages adjusted MODIS and VIIRS rather than summing, reports held-out absolute error and resampled ratio spread. This is a useful explicit baseline but not radiometric harmonization or pixel-level detection calibration. Regional count agreement can hide local and seasonal bias. It must remain restricted to the original AOI, products and training period until independently validated elsewhere.

ZIP `build.py` aligns both sensors to an equal-area grid and preserves separate records, but no matching, adjustment or cross-sensor validation is active. Its target remains VIIRS presence alone. XGBoost integration does not satisfy the NASA challenge by itself.

### Quality, observation opportunity and evidence

Sensor-specific confidence thresholds are preserved; they are not equivalent calibrated probabilities. ZIP adds vegetation-fire type=0 when available; apply consistently to any comparison and expose retention counts. Existing optical SCL/Landsat masking is a separate measurement system; dNBR candidates, MCD64A1 burned area and thermal anomalies measure different things. Do not use them interchangeably as labels without temporal/area interpretation.

Existing `coverage.py` checks Collection 002 pairing/QA and land-mask denominators, but hardcodes a Bago crop (94–98 E, 16–21 N), UTM 47N, nearest centers within 375 m and retrieved passes. Generalizing across Myanmar requires extent/CRS parameters, swath footprint treatment and product QA documentation verification. Existing GEE MODIS Terra coverage cannot establish VIIRS no-fire observation opportunity. ZIP's 12 distinct detection months in an annual country file is not proof of a complete sensor archive, and min/max country detections are not spatial observation coverage.

Keep three independent statuses: acquisition availability, usable per-sensor observation opportunity, and event/evidence review. Only coverage-qualified absence can support a defensible negative fire label; otherwise model explicitly recorded detections or use unknown/masked targets. Neither codebase supports operational wildfire warning accuracy. Current reserve selection is provisional, not a verified national fire-impact ranking; Paunglaung identity requires the sourced Pinlaung/Shan reserve, not a similarly named sanctuary.

Recommended harmonization evaluation: common spatial/time support; product/platform partitions; opportunity-normalized detection rates; sensor matching precision/recall only against reviewed associations; held-out count bias/MAE and spatial residuals; fire-size/day-night/season/scan-angle strata; bootstrap by years and spatial blocks; independent optical review with inclusion probabilities and uncertain cases retained. Preserve the original disproportionate pilot's unweighted scope, or apply design weights for population estimates. The gallery's clearest two examples per forest cannot estimate population accuracy.

## 6. Machine learning audit — no new fit performed

**Actual incumbent selection:** `public/data/model-report.json` chooses **Seasonal baseline**, not Random Forest. Six predictors: lat, lon, sin_month, cos_month, season_frequency, cell_frequency. Frequency features are built from previous years for training rows. Reported train 2015–2021, validation 2022–2023, temporal test 2024–2025 (14,136 test cell-months). Archived test baseline Brier .056935/AP .812583; logistic .089849/.806638; RF .085068/.838694. These are shipped report values, **not recomputed research metrics**; raw archives/model are unavailable. `pr_auc` is average precision, not trapezoidal PR area. High overall accuracy is insufficient under wet-season imbalance.

Labels in both pipelines mean any qualifying VIIRS recorded presence. No-record cells become zero despite unavailable pixel masks. Existing overlapping-year count merely checks unique year presence (not full annual acquisition). ZIP annual-archive heuristic is somewhat stronger but still derived from positive detections. Both risk observation/season/location bias rather than learning fire occurrence.

Earlier-year frequency construction is a positive leakage control. Preserve it and perturb future/held-region labels in tests. Do not import future dNBR, target-month vegetation, adjusted target counts or unavailable weather into historical features. ZIP `features()` test only changes query labels; it does not fully test the training-fold generation rule. `source` containing viirs-snpp is not sufficient platform validation if mixed instrument/satellite rows are accepted.

**ZIP model evaluation concerns (`pipeline/train.py`):**

1. `better` compares test Brier/AP to baseline and controls whether forecast rows are published. This uses the final test set for model/publishing selection; reserve an untouched confirmation block and make selection on development/validation data.
2. Rolling origins reuse the threshold tuned on validation years that can overlap evaluated rolling years; disclose optimistic threshold-dependent metrics, or retune within each historical origin. AP/Brier do not use that threshold. If complete archive years have gaps, `yr+1` may have zero rows and metrics/predict can fail.
3. Spatial model excludes entire forests/eastern cells, but its threshold was chosen using all forests; choose it solely inside spatial training folds. Existing RF holdout has the analogous threshold problem and evaluates RF even when the selected model is baseline.
4. Final refit uses the same history/feature ordering but saves only XGB/config/report; no persisted panel, complete normalized-data/grid/boundary fingerprint, library inventory or full fold membership. `source_hash` covers train.py only. No demonstrated model round-trip prediction contract.
5. Publication percentiles are ranked across future cells **and months**, so scores depend on release domain/horizon and tie handling; they cannot be compared as absolute probabilities or to original Bago percentiles without explicit version/reference metadata.
6. Empty scope returns blocked honestly, but `run` reads `data/processed/forest-observations.json` before that guard. This file is absent from the ZIP, so direct training cannot simply return the documented blocked report on a clean extraction. Build-before-train is a required prerequisite; not executed here.

XGBoost is a reasonable tabular candidate with shallow trees/regularization/CPU hist, not an evidenced upgrade. Compare all four candidates on identical immutable scopes/folds with AP, Brier, reliability curves/bin counts, precision/recall/F1 at development-selected thresholds, per-forest/dry-wet breakdowns and spatial/year-block intervals. Add log loss where probabilities are valid; separate calibrated record probability from wildfire probability. Forecast uncertainty is unimplemented in ZIP; RF tree disagreement and original bootstrap seasonal spread are not general predictive confidence intervals. Conduct any experiment only after separate approval and provenance recovery.

## 7. Liquid Glass UI/UX audit

Source-based evaluation; no new browser visual/accessibility/3D verification was performed. ZIP documentation's historic screenshots/test claims are not current audit test evidence.

Preserve the green/mint visual hierarchy, contrasting MODIS/VIIRS symbols, explicit boundary/gap labels and map-first design. ZIP improves searchable identities, native dialog, keyboard combobox, before/after slider, reduced motion/transparency CSS and context-mosaic attribution. Its custom AOI filters observations only; the gallery/outlook deliberately stay reserve-scoped, so scope must be prominent in every panel and export.

Priorities:

- Add a scientific comparison mode: linked raw MODIS/Terra/Aqua/VIIRS views, actual UTC timing, matching parameters, adjusted series, denominators, unmatched counts and uncertainty. Keep daily/monthly drill-down and existing methodology/model screens. Do not bury the challenge objective under a forest directory or XGBoost branding.
- Share query state `{scope_id, boundary_version, period, sensor, platform, quality, grid_version}` across map, chart, table and export. Show selected scope and data availability. Event dates should control or explicitly differ from observation timeline; ZIP gallery is not filtered by selected year/month.
- Use glass on peripheral controls; denser surfaces for long evidence, figures and tables. Test composited text/controls over bright and dark satellite imagery, EN/Myanmar wrapping and opaque mode. Define focus-visible, keyboard map/table parity and touch targets; icon titles alone and unlocalized labels need review.
- Preserve before/after scene dates and QA, separate 2016 basemap/terrain context from historical evidence. Provide keyboard-selectable scientific features and data tables rather than relying solely on canvas interactions.
- Mobile fixed panel offsets and 38dvh sheets require measured 320/390/820 widths, landscape, 200% zoom, safe-area and keyboard-open tests. Hiding basemap controls/legend on mobile requires equivalent accessible controls and a reachable legend.
- Both maps rebuild fallback vector groups and rescan/filter annual records; split stable boundary/data/layer effects, memoize cutoffs, count months in one pass, profile heap/cache and fallback marker latency before adding tiles/database. ZIP builds still load a ~936 KB minified MapLibre chunk plus Leaflet; use lazy renderer loading if measured startup benefits justify it.

## 8. Security, dependencies and deployment

Existing mutation API uses constant-time key comparison, 25 MB upload read bound, fixed digest IDs and loopback default. Preserve formula-safe CSV export, React text rendering and credential separation. Local key auth is not multiuser authentication, quotas or durable authorization; background jobs are in memory and JSON/CPU processing can still be expensive. API model joblib loading must accept only a trusted verified local artifact, never an arbitrary upload. Prediction currently reloads model per call; add version-aware caching and resource bounds before remote service exposure.

ZIP read-only API removes mutating attack surface but is not endpoint-compatible. Whole-year JSON filtering and unbounded local file sizes remain scaling constraints. `outlook` accepts unknown forest IDs as empty success rather than validating identity like hotspots. External image/source URLs require allowed schemes/hosts and source licensing review if users can edit manifests; do not add generic URL fetch/upload surfaces without validation. LocalStorage review records in the incumbent are user-editable and are not authenticated independent review provenance.

Direct npm dependency versions match, but complete lock structures differ (root metadata included); do not overwrite lockfiles speculatively. ZIP Python upgrades numpy/pandas/scipy/sklearn, adds XGBoost/pytest and Linux x86_64 NCCL runtime despite CPU workflow; pipeline lock includes rasterio but not the complete archived h5py/netCDF4 evidence stack. requirements-api.txt includes uncompiled transitive requirements via requirements.txt rather than the pipeline lock. Use separate runtime/science/experiment groups and a deliberately regenerated reviewed lock in implementation. No dependency install, current advisory scan, registry availability check or clean ZIP frozen install was performed, so no CVE-free or reproducible-clean-install claim is made.

Original Docker requires missing fitted model; ZIP Docker is nginx-only and has no API. Keep separately named deployment targets and verify real asset paths. Both source-download menu links are absent in a plain build until package_source runs; ZIP CI packages before build, its Dockerfile does not. ZIP consistency CI accepts an incomplete research draft: draft and scientific-release gates must be separate and clearly named. GitHub actions/base container tags are not immutable digests. Evaluate pinned actions/images and dependency advisories during an authorized release task.

## 9. Bugs and technical risk register

Severity here is integration/scientific impact, not a claimed exploit score. Static findings are not presented as reproduced failures.

| Priority | Evidence/path | Finding and required mitigation |
|---|---|---|
| P0 | repository PACKAGE-MANIFEST.json, backend/api.py, Dockerfile | Missing fitted model blocks inference and full Docker COPY; recover authentic artifact and verify hash, never synthesize replacement |
| P0 | ZIP frontend/public/data/forestwatch/* | Empty reserve scope cannot replace populated Bago; keep independent datasets and explicit missing states |
| P0 | ZIP pipeline/train.py | Test performance selects publication; separate selection/promotion from final confirmation evaluation |
| P0 | ZIP active pipeline vs archive/legacy | Harmonization/review/coverage silently disappear from active workflow; preserve and adapt before any cutover |
| P1 | repository public/data/evidence/review-table.csv | Original manifest mismatch reproduced by hashing; investigate provenance rather than overwrite evidence |
| P1 | ZIP pipeline/build.py normalize | Unknown instrument strings accepted as qualified sensors (reproduced with UNKNOWN/80); source-inferred MODIS fallback too permissive; enforce sensor/platform whitelist and stats |
| P1 | ZIP pipeline/build.py coverage | Year completeness from positive months only; no pixel coverage; require explicit source completeness and observation opportunity |
| P1 | ZIP pipeline/common.py boundaries | Any nonempty review/confidence strings and approximate status pass; metadata assertions do not establish legal boundary review/license |
| P1 | both grid/normalizers | Covers vs contains_xy changes boundary-center assignment; original drops <0.1 km² cells while ZIP keeps any positive area; define edge policy and unique assignment for overlapping reserves |
| P1 | ZIP pipeline/build.py / train.py | Build marks report stale and empties outlook but leaves models/xgboost.json if present; training invalidation occurs only after initial file loads; require atomic versioned release and model/data compatibility checks |
| P1 | ZIP pipeline/train.py | Gapped complete years, empty folds/classes and threshold reuse can invalidate rolling/spatial evaluation; test explicitly |
| P1 | ZIP archive/legacy/* | Archived relative imports/ROOT references broken; retain audit copy, not executable functionality claim |
| P1 | ZIP pipeline/train.py | Clean ZIP lacks processed observations needed before blocked guard; documented order must be enforced |
| P1 | repository backend/coverage.py | Fixed Bago extent/UTM assumptions unsuitable for national transplant; parameterize and validate |
| P2 | ZIP frontend/src/main.tsx | Initial catalog-load failure leaves loading true; planning riskCell is not cleared on lead click while point is, so selection can display previous month's score; test state transitions |
| P2 | ZIP frontend/src/main.tsx / BurnGallery.tsx | Gallery independent of timeline, existing observation/risk selection may persist across filter changes; expose context and clear/reconcile stale selections |
| P2 | both MapView.tsx | Fallback only around constructor path, not later context loss; verify asynchronous failures and parity, no claim of robust recovery yet |
| P2 | ZIP data.ts | Reused AOI area metadata still recommends EPSG:32647 despite active EPSG:6933; schema/CRS wording must match product |
| P2 | ZIP pipeline/evidence.py | Caller-provided clear fraction/review truth flags accepted; dates checked lexically, URL/checksum/product QA and max bracketing gap not enforced; independent review remains prerequisite |
| P2 | ZIP scripts/package_source.py | Broad source-directory inclusion can include unexpected local files; add allowlist/secret checks before redistribution; not a demonstrated secret leak |
| P2 | both frontend / build | Download link absent until packaging; large map bundles; static/live API drift; enforce deployment smoke tests |

## 10. Recommended target architecture and contracts

One React shell, one typed MapView with capability adapters, shared bilingual design tokens and scope/query state. Routes/workspaces: Explore, Compare MODIS–VIIRS, Evidence review/gallery, Seasonal planning, Model/data provenance. Preserve original research analysis as an accessible route until parity is demonstrated. Scoped data products distinguish `bago_yoma_approx_v1` from reviewed reserves.

Backend: versioned read contracts over immutable release bundles; separate authenticated local research import/match/train service. Pipeline modules for acquisition/normalization, boundaries/grids, harmonization, optical evidence, observation opportunity, candidate model evaluation and explicit publication. Keep baseline/logistic/RF; XGB opt-in until independently evaluated. Deployment profiles: static site, read API, local scientific worker; no training in static deploy hooks.

Proposed contracts (recommendations, not implemented):

| Contract | Required semantics |
|---|---|
| Scope/boundary | scope_id, kind, forest_id optional, source/version/hash, legal/approximate status, license, review record, CRS |
| Observation | schema_version, observation_id stable across ingestion, source/product/platform/collection, UTC acquisition, lat/lon, scan/track, raw confidence, QA policy/version, FRP units, source hash, assigned scope/grid version |
| Grid | CRS + size + origin + boundary hash; retain original Bago IDs; no direct UTM→6933 ID substitution |
| Coverage | acquisition status separate from observed/usable pixels and retrieval completeness; unknown distinct from valid zero |
| Harmonization | method/version, calibration scope/folds, temporal/spatial association policy, separate raw and adjusted units, uncertainty/reference domain |
| Evidence | event ID versus sampled cell-month ID, dated scenes/product QA/hashes, review/adjudication, candidate/verified/unknown statuses and sampling weight |
| Model/outlook | algorithm/version, feature order/schema, full provenance/folds, cutoff/issue/valid month, target/units, rank reference domain, baseline gate and uncertainty status |
| API | preserve current /api paths until versioned alternatives and migration tests exist; new /api/v2/scopes, /observations, /coverage, /harmonization, /outlooks with consistent identity validation |

Do not adapt the original pilot schema into BurnEvidence by renaming properties: only independently reviewed event geometry/date/scene records can enter the gallery. Do not conflate `qualifies` internal pandas fields and emitted `qualified`, or old `month` seasonal ranks and new `period` dated ranks.

## 11. Phased integration roadmap

| Phase | Priority/dependency | Work after approval | Acceptance criteria |
|---|---|---|---|
| 0 Preserve and recover | P0, first | Verify original source/manifest drift; recover fitted model and immutable inputs; inventory required functionality and licenses | Reviewed artifact hashes, reproducible Bago reads/inference or explicitly accepted unresolved model blocker; no source/data loss |
| 1 Contracts and safeguards | P0, phase 0 | Define versioned schemas, scope/CRS/coverage semantics, immutable release directories, authenticated research boundaries | Legacy consumers pass compatibility tests; wrong model/grid/data versions rejected; failed rebuild retains last good published release |
| 2 Forest UI incremental | P1, phase 1 | Add registry/search/gallery/terrain into shared shell behind explicit scope selection; preserve Bago review and analysis | Bago parity checklist passes; ten draft scopes visibly unavailable until sourced; query/table/export contexts match |
| 3 Science preservation | P0 for cutover, phase 1 | Extract/generalize matching, count adjustment, optical/coverage modules; implement opportunity-aware cross-sensor evaluation | Midnight/geometry/QA tests pass; held-out harmonization report includes unknowns, bias and uncertainty without overclaiming |
| 4 Reserve acquisition/review | P1, contracts + approved sources | Obtain legal/sourced polygons, finalize impact shortlist, acquire raw observations and independent imagery | Boundary provenance/license approval; no fabricated polygons; source hashes verified; missing 2026 periods retained; evidence gallery only reviewed events |
| 5 Candidate ML experiment | P2, phase 3–4 + separate training approval | Compare XGB/baseline/logistic/RF with fixed scope/folds, scoped thresholds and immutable artifacts | No future/held-region leakage; candidate report and round-trip tests; independent promotion decision, no automatic test-selected release |
| 6 Release qualification | P1, all relevant phases | Clean installs, static/API containers, CI gates, browser/a11y/performance, source packaging | Frozen dependencies tested; all required tests pass or formally documented blockers; scientific completion gate distinct from draft; reversible rollout |

No dates or national reserve completion promises are possible until boundary source access and independent review capacity are known. Stop cutover on parity loss, incorrect scope attribution or missing scientific outputs; keep the last verified Bago bundle available.

## 12. Validation evidence and strategy

### Executed in this audit

| Check | Outcome and scope |
|---|---|
| ZIP path/hash/manifest verification | 95 members; all 94 manifest entries match |
| Original package manifest | Missing model and review-table hash mismatch; not a pass |
| Existing Python unittest | 20 executed, 19 passed, 1 error in test_api_validation_auth_and_model_inference; /api/predict has no model and test reads missing items key |
| Existing frontend Vitest | 14 tests pass (current audit run) |
| ZIP frontend Vitest | 18 tests pass using existing repository node_modules via temporary staging symlink; no install and no training |
| ZIP TypeScript | tsc --noEmit passes using retained JS tools |
| ZIP Vite build | Pass, output /tmp/forestwatch-audit-dist; large-chunk warning; uses reused node_modules, **not a clean ZIP npm ci validation** |
| ZIP optional API unittest | 3 executed/pass with existing repository venv; sample empty catalog/outlook contracts, not populated scientific behavior |
| ZIP normalizer regression probe | In-memory row with instrument=UNKNOWN and numeric confidence 80 was accepted as sensor UNKNOWN, qualified=true; confirms missing whitelist defect, no files written |
| ZIP consistency validator | Pass: bundle_consistent=true, complete=false |
| ZIP --require-complete | Exit 1 as expected: 10 boundaries, 20 events, trained model, validated outlook and final selection missing |

ZIP scientific pytest suite was inspected but not executed: pytest/XGBoost missing, and its synthetic-fit test would train a model contrary to this request. No model fitting of any kind occurred. Existing production build passed in the preceding onboarding turn; that earlier result is not presented as a newly executed build here. Source docs' own historical test counts are separate from the above.

### Required integration tests

Preserve existing suites, then add schema snapshots/compatibility for old and versioned API, stable observation IDs, type/sensor/platform validation, standard-vs-NRT tie conflicts, midnight/leap dates, cross-month acquisitions, polygon boundaries/overlap/hole assignments and CRS round trips. Exercise model/data/hash mismatch, failed build/fit atomicity, stale output rejection and missing dependencies without masking read functionality.

Science tests: known QA-bit fixtures checked against authoritative product docs, valid-zero vs missing/cloudy/unobserved cases, no monthly absence inference from partial passes, synthetic multi-footprint/time association, training-only harmonization coefficients, future and held-region label perturbation, gapped years/empty fold/classes, season and forest denominators, locked-review adjudication and independent evidence provenance. Training tests remain deferred until approved.

Frontend/browser: scope changes and rapid year switching, stale point/risk selection, all filters/table/export parity, custom AOI model guard, retry after missing metadata/assets, before/after images/legend/date semantics, keyboard combobox/dialog/focus return, screen-reader table alternative, EN/Myanmar, bright/dark/solid/reduced-motion, mobile portrait/landscape/zoom, real WebGL terrain and forced fallback/context loss. Measure cold/warm requests, heap after year changes and input/frame latency on representative data. No invented benchmark thresholds or measured WCAG compliance are claimed.

Release: clean approved install against reviewed lock, API/static container smoke, data/model/source download URLs, manifest verification, source ZIP exclusions, dependency/security scans and separate draft/scientific completion gates. Test raw-to-release reproducibility only when authentic inputs and permissions are available.

## 13. Unresolved questions and assumptions

- Where is the authentic incumbent model whose SHA appears in the original manifest, and why does the shipped review-table differ? Local published metrics cannot recover fitted state.
- Which institution/source can license and review the ten reserve boundaries? Which eight candidates pass a consistent local-impact selection method? ZIP documentation alone cannot establish those decisions.
- What 2026 archive and usable swath coverage can actually be obtained? Which API/GEE/Earthdata permissions are available? No credentials were requested because this audit does not require acquisition.
- Who independently reviews burn evidence and adjudicates disagreement? Two handpicked examples are presentation, not a scientific validation sample.
- Is the intended deployment static-only, local research API or a remotely authenticated multiuser service? Preserve all existing local capabilities pending this decision.
- What confirmed lead-time/task and decision costs justify a forecast? Neither seasonal repetition nor an XGBoost name establishes a year-ahead wildfire prediction.
- New Python pins, clean container builds, live tiles, real 3D, current dependency advisories and model performance remain unverified. Snapshot tests do not settle them.

**Decision:** approve a selective, contract-first integration project, not a wholesale import. Preserve the populated Bago study and active harmonization/review paths; use the ZIP's reserve UX and release scaffolding as candidates, and defer XGBoost promotion until controlled evaluation. This report and the mapping are proposals only; implementation requires the user's approval.

## 14. Audit change boundary

Final Git status contains only the two requested new documents. All previously tracked application files are unchanged. Download/extraction, temporary build/test logs and a staging-only node_modules symlink exist outside the repository; they are audit artifacts, not installed dependencies or integration. No configuration draft or startup script was changed during this audit.
