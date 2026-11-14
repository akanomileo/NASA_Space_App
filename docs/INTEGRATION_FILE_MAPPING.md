# Integration file mapping

Status: proposed only; no application integration performed. Paths labeled `R:` are relative to `/workspace/NASA_Space_App`; `Z:` are relative to `/workspace/audit-forestwatch-v3`. Destinations are relative to the existing repository. KEEP means preserve the current file. MERGE/REFACTOR require reviewed edits in a later task, never blind overwrite. DISCARD means omit a duplicate from the integration, not delete the attached source archive. New destination names are architectural proposals, not files created by this audit.

## 1. Every ZIP member

| Exact source | Proposed destination | Action and rationale |
|---|---|---|
| `Z:.dockerignore` | `.dockerignore` | **MERGE** — Merge additive exclusions/templates; preserve existing settings, no secrets or blind replacement. |
| `Z:.env.example` | `.env.example` | **MERGE** — Merge additive exclusions/templates; preserve existing settings, no secrets or blind replacement. |
| `Z:.github/workflows/checks.yml` | `.github/workflows/checks.yml` | **MERGE** — Merge CI with incumbent suites, clean installs and separate draft/scientific completion gates. |
| `Z:.gitignore` | `.gitignore` | **MERGE** — Merge additive exclusions/templates; preserve existing settings, no secrets or blind replacement. |
| `Z:CONTRIBUTING.md` | `CONTRIBUTING.md` | **MERGE** — Add contributor workflow with no-training/install restrictions scoped to actual tasks. |
| `Z:Dockerfile` | `deploy/Dockerfile.static` | **MERGE** — Retain existing full-service recipe; introduce separate reviewed static target with source packaging smoke. |
| `Z:PACKAGE-MANIFEST.json` | `docs/source-manifests/forestwatch-v3-PACKAGE-MANIFEST.json` | **KEEP provenance copy** — Preserve original input hashes; do not use as final integrated release manifest. |
| `Z:README.md` | `README.md` | **MERGE** — Merge accurate reserve workflow/status; preserve Bago capability documentation and harmonization objective. |
| `Z:archive/legacy/LegacyAnalysis.tsx` | `frontend/src/LegacyAnalysis.tsx` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/README-v2.md` | `docs/history/README-v2.md` | **MERGE documentation** — Historical claims only; add source/date context, no executable setup authority. |
| `Z:archive/legacy/README.md` | `docs/history/ZIP_LEGACY_NOTES.md` | **MERGE documentation** — Historical claims only; add source/date context, no executable setup authority. |
| `Z:archive/legacy/backend/core.py` | `backend/core.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/backend/coverage.py` | `backend/coverage.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/backend/evidence.py` | `backend/evidence.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/backend/optical.py` | `backend/optical.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/ACCEPTANCE.md` | `docs/ACCEPTANCE.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/DATA_SOURCES.md` | `docs/DATA_SOURCES.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/DEMO_GUIDE.md` | `docs/DEMO_GUIDE.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/DESIGN.md` | `docs/DESIGN.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/EVIDENCE_WORKFLOW.md` | `docs/EVIDENCE_WORKFLOW.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/METHODOLOGY.md` | `docs/METHODOLOGY.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/MODEL_CARD.md` | `docs/MODEL_CARD.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/docs/VALIDATION_V2.md` | `docs/VALIDATION_V2.md` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/requirements-evidence.lock.txt` | `requirements-evidence.lock.txt` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/requirements-evidence.txt` | `requirements-evidence.txt` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/requirements-gee.txt` | `requirements-gee.txt` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/scripts/acquire_evidence.py` | `scripts/acquire_evidence.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/scripts/acquire_sources.py` | `scripts/acquire_sources.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/scripts/acquire_viirs.py` | `scripts/acquire_viirs.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/scripts/export_gee.py` | `scripts/export_gee.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/scripts/firms_api.py` | `scripts/firms_api.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/scripts/process_evidence.py` | `scripts/process_evidence.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/scripts/validate_release.py` | `scripts/validate_release.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/tests/test_evidence.py` | `tests/test_evidence.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/tests/test_pipeline.py` | `tests/test_pipeline.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:archive/legacy/train.py` | `backend/train.py` | **DISCARD duplicate import** — Keep incumbent at destination; archive paths/imports are not runnable. Preserve ZIP itself as provenance. |
| `Z:backend/__init__.py` | `backend/__init__.py` | **MERGE** — Review alongside existing counterpart; preserve current behavior. |
| `Z:backend/api.py` | `backend/forest_api.py` | **MERGE** — Add versioned read router/service; keep existing keyed import/match/train/jobs and prediction API. |
| `Z:backend/train.py` | `pipeline/train_xgboost.py` | **DISCARD wrapper import** — Do not replace incumbent training entry point; proposed pipeline candidate gets explicit command. |
| `Z:data/boundaries/forests.geojson` | `data/boundaries/forests.geojson` | **MERGE** — Add provenance inputs for reserve scope; reviewed empty/missing status must remain explicit. |
| `Z:data/manifests/acquisition.json` | `data/manifests/acquisition.json` | **MERGE** — Add provenance inputs for reserve scope; reviewed empty/missing status must remain explicit. |
| `Z:data/manifests/evidence-reviews.json` | `data/manifests/evidence-reviews.json` | **MERGE** — Add provenance inputs for reserve scope; reviewed empty/missing status must remain explicit. |
| `Z:data/manifests/forest-candidates.json` | `data/manifests/forest-candidates.json` | **MERGE** — Add provenance inputs for reserve scope; reviewed empty/missing status must remain explicit. |
| `Z:data/manifests/regions-source.json` | `data/manifests/regions-source.json` | **MERGE** — Add provenance inputs for reserve scope; reviewed empty/missing status must remain explicit. |
| `Z:docs/DATA_WORKFLOW.md` | `docs/forestwatch/DATA_WORKFLOW.md` | **MERGE** — Add source-scoped draft documentation; reconcile claims with measured results and active workflow. |
| `Z:docs/DEPLOYMENT.md` | `docs/forestwatch/DEPLOYMENT.md` | **MERGE** — Add source-scoped draft documentation; reconcile claims with measured results and active workflow. |
| `Z:docs/MODEL_CARD.md` | `docs/forestwatch/MODEL_CARD.md` | **MERGE** — Add source-scoped draft documentation; reconcile claims with measured results and active workflow. |
| `Z:docs/RELEASE_STATUS.md` | `docs/forestwatch/RELEASE_STATUS.md` | **MERGE** — Add source-scoped draft documentation; reconcile claims with measured results and active workflow. |
| `Z:frontend/index.html` | `index.html` | **MERGE** — Merge metadata/branding only; keep existing Vite root until all data paths and deployments migrate atomically. |
| `Z:frontend/public/data/forestwatch/boundaries.geojson` | `public/data/forestwatch/boundaries.geojson` | **MERGE** — Add isolated draft reserve bundle; do not replace public/data Bago products or interpret empties as zero fire. |
| `Z:frontend/public/data/forestwatch/catalog.json` | `public/data/forestwatch/catalog.json` | **MERGE** — Add isolated draft reserve bundle; do not replace public/data Bago products or interpret empties as zero fire. |
| `Z:frontend/public/data/forestwatch/evidence.json` | `public/data/forestwatch/evidence.json` | **MERGE** — Add isolated draft reserve bundle; do not replace public/data Bago products or interpret empties as zero fire. |
| `Z:frontend/public/data/forestwatch/grid.geojson` | `public/data/forestwatch/grid.geojson` | **MERGE** — Add isolated draft reserve bundle; do not replace public/data Bago products or interpret empties as zero fire. |
| `Z:frontend/public/data/forestwatch/model-report.json` | `public/data/forestwatch/model-report.json` | **MERGE** — Add isolated draft reserve bundle; do not replace public/data Bago products or interpret empties as zero fire. |
| `Z:frontend/public/data/forestwatch/outlook.json` | `public/data/forestwatch/outlook.json` | **MERGE** — Add isolated draft reserve bundle; do not replace public/data Bago products or interpret empties as zero fire. |
| `Z:frontend/public/data/forestwatch/regions.geojson` | `public/data/forestwatch/regions.geojson` | **MERGE** — Add isolated draft reserve bundle; do not replace public/data Bago products or interpret empties as zero fire. |
| `Z:frontend/src/BurnGallery.tsx` | `frontend/src/BurnGallery.tsx` | **MERGE** — Add forest contracts/search/gallery/tests after schema and shared scope review. |
| `Z:frontend/src/EvidencePanel.tsx` | `frontend/src/EvidencePanel.tsx` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/ForestSearch.tsx` | `frontend/src/ForestSearch.tsx` | **MERGE** — Add forest contracts/search/gallery/tests after schema and shared scope review. |
| `Z:frontend/src/MapView.tsx` | `frontend/src/MapView.tsx` | **MERGE** — Merge terrain/labels/camera capabilities into one renderer; retain science overlays and fallback parity. |
| `Z:frontend/src/aoi-square.test.ts` | `frontend/src/aoi-square.test.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/aoi-square.ts` | `frontend/src/aoi-square.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/data.test.ts` | `frontend/src/data.test.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/data.ts` | `frontend/src/data.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/evidence.test.ts` | `frontend/src/evidence.test.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/evidence.ts` | `frontend/src/evidence.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/forest.test.ts` | `frontend/src/forest.test.ts` | **MERGE** — Add forest contracts/search/gallery/tests after schema and shared scope review. |
| `Z:frontend/src/forest.ts` | `frontend/src/forest.ts` | **MERGE** — Add forest contracts/search/gallery/tests after schema and shared scope review. |
| `Z:frontend/src/forestwatch.css` | `frontend/src/forestwatch.css` | **MERGE** — Add scoped styles through shared tokens; measure mobile/contrast/opaque mode. |
| `Z:frontend/src/i18n.ts` | `frontend/src/i18n.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/main.tsx` | `frontend/src/main.tsx` | **MERGE** — Merge forest selection into existing shell; keep LegacyAnalysis, harmonization, daily calendar and review routes. |
| `Z:frontend/src/style.css` | `frontend/src/style.css` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/workspace-i18n.ts` | `frontend/src/workspace-i18n.ts` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:frontend/src/workspace.css` | `frontend/src/workspace.css` | **KEEP existing** — Byte-identical shared implementation; no duplicate copy needed. Refactor stale metadata only in later approved task. |
| `Z:models/model-card.json` | `models/forestwatch/model-card.json` | **MERGE** — Preserve blocked candidate card separately from Bago report; no fitted candidate artifact supplied. |
| `Z:package-lock.json` | `package-lock.json` | **MERGE** — Merge script/name metadata as needed; keep tested direct dependencies, review lock resolution in authorized install task. |
| `Z:package.json` | `package.json` | **MERGE** — Merge script/name metadata as needed; keep tested direct dependencies, review lock resolution in authorized install task. |
| `Z:pipeline/__init__.py` | `pipeline/__init__.py` | **REFACTOR** — Add explicit namespace; avoid duplicate root/constants definitions. |
| `Z:pipeline/acquire.py` | `pipeline/acquire.py` | **REFACTOR** — Consolidate robust downloader/hash manifest with incumbent source acquisition. |
| `Z:pipeline/build.py` | `pipeline/build.py` | **REFACTOR** — Adapt output root, whitelist sensors/platforms, validate coverage, version grids and publish atomically. |
| `Z:pipeline/common.py` | `pipeline/common.py` | **REFACTOR** — Parameterize output root/CRS; preserve original Bago IDs and validate boundary provenance. |
| `Z:pipeline/evidence.py` | `pipeline/curate_events.py` | **REFACTOR** — Keep presentation curation distinct from incumbent independent sample review and optical processing. |
| `Z:pipeline/train.py` | `pipeline/train_xgboost.py` | **REFACTOR** — Opt-in candidate only; remove test-selected promotion, fix fold isolation and persist full provenance before any fit. |
| `Z:pytest.ini` | `pytest.ini` | **MERGE** — Retain discovery of incumbent unittest cases as well as new pytest tests; do not hide active scientific suites. |
| `Z:requirements-api.txt` | `requirements-forest-api.txt` | **REFACTOR** — Candidate names provisional; resolve compatible separate API/evidence/experiment groups and tested locks without replacing incumbent environment. |
| `Z:requirements-pipeline.lock.txt` | `requirements-forest-pipeline.lock.txt` | **REFACTOR** — Candidate names provisional; resolve compatible separate API/evidence/experiment groups and tested locks without replacing incumbent environment. |
| `Z:requirements.lock.txt` | `requirements-forest-experiment.lock.txt` | **REFACTOR** — Candidate names provisional; resolve compatible separate API/evidence/experiment groups and tested locks without replacing incumbent environment. |
| `Z:requirements.txt` | `requirements-forest-experiment.txt` | **REFACTOR** — Candidate names provisional; resolve compatible separate API/evidence/experiment groups and tested locks without replacing incumbent environment. |
| `Z:scripts/package_source.py` | `scripts/package_source.py` | **MERGE** — Consolidate source packager; include active scientific modules and scoped assets, validate exclusions and manifest. |
| `Z:scripts/validate_release.py` | `scripts/validate_forest_release.py` | **MERGE** — Preserve existing evidence/QGIS validator; separate consistency/completion gates and assertions. |
| `Z:tests/test_api.py` | `tests/test_forest_api.py` | **MERGE** — Add populated/empty versioned-route contract tests without replacing incumbent API coverage. |
| `Z:tests/test_forestwatch.py` | `tests/test_forestwatch.py` | **MERGE** — Keep new contracts, add fold/QA/coverage tests; fitting test deferred until explicit approval. |
| `Z:tsconfig.json` | `tsconfig.json` | **KEEP existing** — Byte-identical; no integration change required. |
| `Z:vercel.json` | `vercel.json` | **MERGE** — Add static profile only after selected root/public paths are verified; do not imply Python hosting. |
| `Z:vite.config.ts` | `vite.config.ts` | **MERGE** — Preserve current root/public until atomic migration; use scoped reserve data under existing public/data/forestwatch. |

## 2. Every incumbent manifest entry — retention inventory

All existing source/data remains at its exact current path through the proposed migration. The table includes the absent fitted artifact so recovery is explicit. No listed KEEP means the implementation is bug-free; follow the report for fixes. Existing active LegacyAnalysis, optical/coverage, matching, calendar, API and processing capabilities must remain runnable until parity is proven.

| Exact source | Retained destination | Disposition |
|---|---|---|
| `R:.dockerignore` | `.dockerignore` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:.env.example` | `.env.example` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:.gitignore` | `.gitignore` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:Dockerfile` | `Dockerfile` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:README.md` | `README.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:backend/__init__.py` | `backend/__init__.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:backend/api.py` | `backend/api.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:backend/core.py` | `backend/core.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:backend/coverage.py` | `backend/coverage.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:backend/evidence.py` | `backend/evidence.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:backend/optical.py` | `backend/optical.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:backend/train.py` | `backend/train.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:data/runtime/model.joblib` | `data/runtime/model.joblib` | RECOVER authentic missing artifact at this exact path; verify original SHA before trusted load; never fabricate. |
| `R:docs/ACCEPTANCE.md` | `docs/ACCEPTANCE.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/DATA_SOURCES.md` | `docs/DATA_SOURCES.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/DEMO_GUIDE.md` | `docs/DEMO_GUIDE.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/DESIGN.md` | `docs/DESIGN.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/EVIDENCE_WORKFLOW.md` | `docs/EVIDENCE_WORKFLOW.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/METHODOLOGY.md` | `docs/METHODOLOGY.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/MODEL_CARD.md` | `docs/MODEL_CARD.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/PHASE_1_ASSESSMENT.md` | `docs/PHASE_1_ASSESSMENT.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:docs/VALIDATION_V2.md` | `docs/VALIDATION_V2.md` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/EvidencePanel.tsx` | `frontend/src/EvidencePanel.tsx` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/LegacyAnalysis.tsx` | `frontend/src/LegacyAnalysis.tsx` | KEEP active functionality; later split into scoped routes only after parity acceptance. |
| `R:frontend/src/MapView.tsx` | `frontend/src/MapView.tsx` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/aoi-square.test.ts` | `frontend/src/aoi-square.test.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/aoi-square.ts` | `frontend/src/aoi-square.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/data.test.ts` | `frontend/src/data.test.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/data.ts` | `frontend/src/data.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/evidence.test.ts` | `frontend/src/evidence.test.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/evidence.ts` | `frontend/src/evidence.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/i18n.ts` | `frontend/src/i18n.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/main.tsx` | `frontend/src/main.tsx` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/style.css` | `frontend/src/style.css` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/workspace-i18n.ts` | `frontend/src/workspace-i18n.ts` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:frontend/src/workspace.css` | `frontend/src/workspace.css` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:index.html` | `index.html` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:package-lock.json` | `package-lock.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:package.json` | `package.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/acquisition-manifest.json` | `public/data/acquisition-manifest.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/aoi.geojson` | `public/data/aoi.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/bago-admin-source.json` | `public/data/bago-admin-source.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/bago-admin.geojson` | `public/data/bago-admin.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/calendar.json` | `public/data/calendar.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/climate.json` | `public/data/climate.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/acquisition.json` | `public/data/evidence/acquisition.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/after-nbr.tif` | `public/data/evidence/assets/25_400_2024-03/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/after.png` | `public/data/evidence/assets/25_400_2024-03/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/before-nbr.tif` | `public/data/evidence/assets/25_400_2024-03/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/before.png` | `public/data/evidence/assets/25_400_2024-03/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/candidates.geojson` | `public/data/evidence/assets/25_400_2024-03/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/crosscheck.json` | `public/data/evidence/assets/25_400_2024-03/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/dnbr.tif` | `public/data/evidence/assets/25_400_2024-03/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_400_2024-03/metadata.json` | `public/data/evidence/assets/25_400_2024-03/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/after-nbr.tif` | `public/data/evidence/assets/25_401_2025-02/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/after.png` | `public/data/evidence/assets/25_401_2025-02/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/before-nbr.tif` | `public/data/evidence/assets/25_401_2025-02/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/before.png` | `public/data/evidence/assets/25_401_2025-02/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/candidates.geojson` | `public/data/evidence/assets/25_401_2025-02/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/crosscheck.json` | `public/data/evidence/assets/25_401_2025-02/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/dnbr.tif` | `public/data/evidence/assets/25_401_2025-02/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/25_401_2025-02/metadata.json` | `public/data/evidence/assets/25_401_2025-02/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/after-nbr.tif` | `public/data/evidence/assets/26_405_2025-02/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/after.png` | `public/data/evidence/assets/26_405_2025-02/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/before-nbr.tif` | `public/data/evidence/assets/26_405_2025-02/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/before.png` | `public/data/evidence/assets/26_405_2025-02/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/candidates.geojson` | `public/data/evidence/assets/26_405_2025-02/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/crosscheck.json` | `public/data/evidence/assets/26_405_2025-02/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/dnbr.tif` | `public/data/evidence/assets/26_405_2025-02/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/26_405_2025-02/metadata.json` | `public/data/evidence/assets/26_405_2025-02/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/after-nbr.tif` | `public/data/evidence/assets/28_389_2024-12/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/after.png` | `public/data/evidence/assets/28_389_2024-12/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/before-nbr.tif` | `public/data/evidence/assets/28_389_2024-12/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/before.png` | `public/data/evidence/assets/28_389_2024-12/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/candidates.geojson` | `public/data/evidence/assets/28_389_2024-12/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/crosscheck.json` | `public/data/evidence/assets/28_389_2024-12/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/dnbr.tif` | `public/data/evidence/assets/28_389_2024-12/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_389_2024-12/metadata.json` | `public/data/evidence/assets/28_389_2024-12/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/after-nbr.tif` | `public/data/evidence/assets/28_396_2025-01/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/after.png` | `public/data/evidence/assets/28_396_2025-01/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/before-nbr.tif` | `public/data/evidence/assets/28_396_2025-01/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/before.png` | `public/data/evidence/assets/28_396_2025-01/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/candidates.geojson` | `public/data/evidence/assets/28_396_2025-01/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/crosscheck.json` | `public/data/evidence/assets/28_396_2025-01/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/dnbr.tif` | `public/data/evidence/assets/28_396_2025-01/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_396_2025-01/metadata.json` | `public/data/evidence/assets/28_396_2025-01/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/after-nbr.tif` | `public/data/evidence/assets/28_398_2025-03/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/after.png` | `public/data/evidence/assets/28_398_2025-03/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/before-nbr.tif` | `public/data/evidence/assets/28_398_2025-03/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/before.png` | `public/data/evidence/assets/28_398_2025-03/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/candidates.geojson` | `public/data/evidence/assets/28_398_2025-03/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/crosscheck.json` | `public/data/evidence/assets/28_398_2025-03/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/dnbr.tif` | `public/data/evidence/assets/28_398_2025-03/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_398_2025-03/metadata.json` | `public/data/evidence/assets/28_398_2025-03/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/after-nbr.tif` | `public/data/evidence/assets/28_409_2024-12/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/after.png` | `public/data/evidence/assets/28_409_2024-12/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/before-nbr.tif` | `public/data/evidence/assets/28_409_2024-12/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/before.png` | `public/data/evidence/assets/28_409_2024-12/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/candidates.geojson` | `public/data/evidence/assets/28_409_2024-12/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/crosscheck.json` | `public/data/evidence/assets/28_409_2024-12/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/dnbr.tif` | `public/data/evidence/assets/28_409_2024-12/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/28_409_2024-12/metadata.json` | `public/data/evidence/assets/28_409_2024-12/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/after-nbr.tif` | `public/data/evidence/assets/31_411_2024-04/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/after.png` | `public/data/evidence/assets/31_411_2024-04/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/before-nbr.tif` | `public/data/evidence/assets/31_411_2024-04/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/before.png` | `public/data/evidence/assets/31_411_2024-04/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/candidates.geojson` | `public/data/evidence/assets/31_411_2024-04/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/crosscheck.json` | `public/data/evidence/assets/31_411_2024-04/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/dnbr.tif` | `public/data/evidence/assets/31_411_2024-04/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/31_411_2024-04/metadata.json` | `public/data/evidence/assets/31_411_2024-04/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/after-nbr.tif` | `public/data/evidence/assets/34_416_2024-04/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/after.png` | `public/data/evidence/assets/34_416_2024-04/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/before-nbr.tif` | `public/data/evidence/assets/34_416_2024-04/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/before.png` | `public/data/evidence/assets/34_416_2024-04/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/candidates.geojson` | `public/data/evidence/assets/34_416_2024-04/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/crosscheck.json` | `public/data/evidence/assets/34_416_2024-04/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/dnbr.tif` | `public/data/evidence/assets/34_416_2024-04/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/34_416_2024-04/metadata.json` | `public/data/evidence/assets/34_416_2024-04/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/after-nbr.tif` | `public/data/evidence/assets/35_414_2024-02/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/after.png` | `public/data/evidence/assets/35_414_2024-02/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/before-nbr.tif` | `public/data/evidence/assets/35_414_2024-02/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/before.png` | `public/data/evidence/assets/35_414_2024-02/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/candidates.geojson` | `public/data/evidence/assets/35_414_2024-02/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/crosscheck.json` | `public/data/evidence/assets/35_414_2024-02/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/dnbr.tif` | `public/data/evidence/assets/35_414_2024-02/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_414_2024-02/metadata.json` | `public/data/evidence/assets/35_414_2024-02/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/after-nbr.tif` | `public/data/evidence/assets/35_421_2025-03/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/after.png` | `public/data/evidence/assets/35_421_2025-03/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/before-nbr.tif` | `public/data/evidence/assets/35_421_2025-03/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/before.png` | `public/data/evidence/assets/35_421_2025-03/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/candidates.geojson` | `public/data/evidence/assets/35_421_2025-03/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/crosscheck.json` | `public/data/evidence/assets/35_421_2025-03/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/dnbr.tif` | `public/data/evidence/assets/35_421_2025-03/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/35_421_2025-03/metadata.json` | `public/data/evidence/assets/35_421_2025-03/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/after-nbr.tif` | `public/data/evidence/assets/36_417_2025-04/after-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/after.png` | `public/data/evidence/assets/36_417_2025-04/after.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/before-nbr.tif` | `public/data/evidence/assets/36_417_2025-04/before-nbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/before.png` | `public/data/evidence/assets/36_417_2025-04/before.png` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/candidates.geojson` | `public/data/evidence/assets/36_417_2025-04/candidates.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/crosscheck.json` | `public/data/evidence/assets/36_417_2025-04/crosscheck.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/dnbr.tif` | `public/data/evidence/assets/36_417_2025-04/dnbr.tif` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/assets/36_417_2025-04/metadata.json` | `public/data/evidence/assets/36_417_2025-04/metadata.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/pilot.json` | `public/data/evidence/pilot.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/review-cells.geojson` | `public/data/evidence/review-cells.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/evidence/review-table.csv` | `public/data/evidence/review-table.csv` | KEEP current file and investigate original manifest hash mismatch before any regeneration. |
| `R:public/data/evidence/validation-report.json` | `public/data/evidence/validation-report.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/grid.geojson` | `public/data/grid.geojson` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/harmonization.json` | `public/data/harmonization.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2015.json` | `public/data/hotspots-2015.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2016.json` | `public/data/hotspots-2016.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2017.json` | `public/data/hotspots-2017.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2018.json` | `public/data/hotspots-2018.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2019.json` | `public/data/hotspots-2019.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2020.json` | `public/data/hotspots-2020.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2021.json` | `public/data/hotspots-2021.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2022.json` | `public/data/hotspots-2022.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2023.json` | `public/data/hotspots-2023.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2024.json` | `public/data/hotspots-2024.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/hotspots-2025.json` | `public/data/hotspots-2025.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/model-report.json` | `public/data/model-report.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/power-manifest.json` | `public/data/power-manifest.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/processed-version.json` | `public/data/processed-version.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/seasonal-risk.json` | `public/data/seasonal-risk.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:public/data/summary.json` | `public/data/summary.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:requirements-evidence.lock.txt` | `requirements-evidence.lock.txt` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:requirements-evidence.txt` | `requirements-evidence.txt` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:requirements-gee.txt` | `requirements-gee.txt` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:requirements.lock.txt` | `requirements.lock.txt` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:requirements.txt` | `requirements.txt` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/acquire_evidence.py` | `scripts/acquire_evidence.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/acquire_sources.py` | `scripts/acquire_sources.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/acquire_viirs.py` | `scripts/acquire_viirs.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/export_gee.py` | `scripts/export_gee.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/firms_api.py` | `scripts/firms_api.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/package_source.py` | `scripts/package_source.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/process_evidence.py` | `scripts/process_evidence.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:scripts/validate_release.py` | `scripts/validate_release.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:tests/test_evidence.py` | `tests/test_evidence.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:tests/test_pipeline.py` | `tests/test_pipeline.py` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:tsconfig.json` | `tsconfig.json` | KEEP unchanged through migration; regression/provenance baseline. |
| `R:vite.config.ts` | `vite.config.ts` | KEEP unchanged through migration; regression/provenance baseline. |

## 3. New modules to author after approval

These are new designs, not supplied files. Exact source inspirations and destinations make the migration reviewable.

| Source inspiration | New destination | Purpose |
|---|---|---|
| `R:backend/core.py`, `R:backend/train.py` matching/ratios | `pipeline/harmonize.py` | Explicit training-only matching/calibration/validation, parameterized scope |
| `R:backend/coverage.py`, `R:backend/optical.py`, `Z:pipeline/common.py` | `pipeline/observation_opportunity.py` | Parameterized CRS/extent and sensor-specific usable denominators; retain original implementations while adapting |
| `R:frontend/src/main.tsx`, `Z:frontend/src/forest.ts` | `frontend/src/contracts.ts` | Versioned scope/observation/grid/evidence/outlook types and validators |
| Both main.tsx files and R:LegacyAnalysis.tsx | `frontend/src/ScopeContext.tsx` | Shared query state, stale selection handling and explicit custom-AOI guards |
| `R:frontend/src/LegacyAnalysis.tsx` comparison logic | `frontend/src/SensorComparison.tsx` | First-class MODIS–VIIRS raw/adjusted/time/coverage comparison |
| `Z:tests/test_forestwatch.py`, incumbent tests | `tests/test_harmonization_contracts.py` | Cross-sensor, grid, QA, missingness and fold contracts without fitting by default |
| Both API implementations | `tests/test_api_compatibility.py` | Current and versioned endpoint/field compatibility, populated and missing data |
| Both model evaluation implementations | `tests/test_ml_leakage.py` | Future/held-region feature perturbation, thresholds, folds and publication isolation; fitting deferred |

## 4. Ordering and invariants

Resolve artifact provenance first; agree schemas before copying forest assets or merging UI; keep old/new scope and CRS namespaces separate; introduce compatibility tests before moving paths. Carry complete optical data families (all eight files per sample in the retention table) with their metadata. Do not import duplicate archive code into the active package. Preserve archive documentation and ZIP hashes externally for lineage. No recommendation authorizes deletion, training, installation, deployment or repository replacement.

## 5. Additional observed incumbent files outside original package manifest

- `R:PACKAGE-MANIFEST.json` → `PACKAGE-MANIFEST.json`: KEEP existing document/source; not authenticated by original package manifest.
