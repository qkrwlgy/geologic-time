/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 과학 탐구 지문용 인터랙티브 SVG/CSS 다이어그램 렌더러
 * - 지층 단면도 (X-Y 단층, P-Q 부정합면, 기저 역암, 화석 표본)
 * - 해양 생물 과의 수 변화 꺾은선 그래프 (A, B, C, D, E 5대 대멸종 지점)
 * - 표준화석 vs 시상화석 사분면 그래프
 * - 기후 변화 곡선
 */

import React from 'react';
import { DiagramType } from '../utils/examGenerator';
import { Flame, AlertTriangle, Layers, Activity } from 'lucide-react';

interface ScientificDiagramProps {
  type: DiagramType;
  data?: Record<string, unknown>;
}

export const ScientificDiagram: React.FC<ScientificDiagramProps> = ({ type }) => {
  return (
    <div className="w-full bg-slate-900 border border-slate-700/80 rounded-xl p-4 sm:p-5 text-white overflow-hidden shadow-inner">
      {/* 1. 지층 단면도 (Strata Cross Section with Fault X-Y and Unconformity P-Q) */}
      {type === 'strata_cross_section' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold flex items-center gap-1.5 text-amber-400">
              <Layers className="w-4 h-4" />
              [지문 자료] 지층 단면도 (P-Q: 부정합면, X-Y: 단층면)
            </span>
            <span className="text-[11px] text-slate-400 font-mono">단면 방위: 남(S) - 북(N)</span>
          </div>

          <div className="relative w-full h-56 bg-slate-950 rounded-lg border border-slate-800 overflow-hidden select-none">
            <svg className="w-full h-full" viewBox="0 0 600 240" preserveAspectRatio="none">
              <defs>
                {/* Patterns for strata */}
                <pattern id="limestonePat" width="20" height="12" patternUnits="userSpaceOnUse">
                  <path d="M 0 6 L 20 6 M 10 0 L 10 6 M 0 12 L 20 12 M 20 6 L 20 12" stroke="#475569" strokeWidth="0.8" fill="none" />
                </pattern>
                <pattern id="shalePat" width="20" height="6" patternUnits="userSpaceOnUse">
                  <line x1="0" y1="3" x2="20" y2="3" stroke="#334155" strokeWidth="0.8" strokeDasharray="4,2" />
                </pattern>
                <pattern id="sandstonePat" width="10" height="10" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.8" fill="#64748b" />
                  <circle cx="7" cy="7" r="0.8" fill="#64748b" />
                </pattern>
              </defs>

              {/* Lower Group (Pre-unconformity, cut by Fault X-Y) */}
              {/* Left block of fault */}
              <polygon points="0,110 240,110 180,240 0,240" fill="#1e293b" />
              <polygon points="0,110 240,110 180,240 0,240" fill="url(#sandstonePat)" />

              {/* Fault A-B boundary on left */}
              <line x1="0" y1="170" x2="210" y2="170" stroke="#475569" strokeWidth="1.2" strokeDasharray="3,2" />

              {/* Right block of fault (displaced downward or upward) */}
              <polygon points="240,110 600,110 600,240 180,240" fill="#0f172a" />
              <polygon points="240,110 600,110 600,240 180,240" fill="url(#shalePat)" />

              {/* Fault Line X-Y */}
              <line x1="240" y1="110" x2="180" y2="240" stroke="#ef4444" strokeWidth="2.5" strokeDasharray="5,2" />
              <text x="245" y="125" fill="#f87171" fontSize="12" fontWeight="bold">X</text>
              <text x="165" y="235" fill="#f87171" fontSize="12" fontWeight="bold">Y</text>

              {/* Unconformity Line P-Q (Wavy erosional boundary with basal conglomerate) */}
              <path
                d="M 0,110 Q 75,105 150,112 T 300,108 T 450,114 T 600,110"
                stroke="#f59e0b"
                strokeWidth="3"
                fill="none"
              />
              <text x="15" y="102" fill="#fbbf24" fontSize="12" fontWeight="bold">P (부정합면)</text>
              <text x="560" y="102" fill="#fbbf24" fontSize="12" fontWeight="bold">Q</text>

              {/* Basal conglomerate pebbles right above P-Q */}
              {[30, 80, 140, 200, 270, 340, 410, 480, 540].map((cx, i) => (
                <ellipse key={i} cx={cx} cy={102} rx="6" ry="3.5" fill="#78716c" stroke="#d6d3d1" strokeWidth="0.8" />
              ))}

              {/* Upper Group (Deposited horizontally after unconformity) */}
              {/* Stratum C (Limestone, Mesozoic) */}
              <rect x="0" y="55" width="600" height="48" fill="#1e293b" />
              <rect x="0" y="55" width="600" height="48" fill="url(#limestonePat)" />
              <line x1="0" y1="55" x2="600" y2="55" stroke="#475569" strokeWidth="1.2" />

              {/* Stratum D (Top layer, Mudstone) */}
              <rect x="0" y="0" width="600" height="55" fill="#0f172a" />
              <line x1="0" y1="1" x2="600" y2="1" stroke="#334155" strokeWidth="1" />

              {/* Strata Labels & Embedded Fossils */}
              {/* Layer D */}
              <text x="20" y="32" fill="#e2e8f0" fontSize="13" fontWeight="bold">D층 (이암)</text>
              <rect x="250" y="15" width="130" height="24" rx="4" fill="#334155" fillOpacity="0.8" stroke="#64748b" />
              <text x="260" y="31" fill="#f1f5f9" fontSize="11">🦖 공룡 발자국 화석</text>

              {/* Layer C */}
              <text x="20" y="85" fill="#e2e8f0" fontSize="13" fontWeight="bold">C층 (석회암)</text>
              <rect x="250" y="68" width="130" height="24" rx="4" fill="#334155" fillOpacity="0.8" stroke="#f59e0b" />
              <text x="260" y="84" fill="#fef08a" fontSize="11">🐚 암모나이트 화석</text>

              {/* Layer B */}
              <text x="380" y="155" fill="#e2e8f0" fontSize="13" fontWeight="bold">B층 (셰일)</text>
              <rect x="375" y="170" width="100" height="22" rx="4" fill="#1e293b" stroke="#64748b" />
              <text x="385" y="185" fill="#94a3b8" fontSize="11">🖋️ 필석 화석</text>

              {/* Layer A */}
              <text x="30" y="155" fill="#e2e8f0" fontSize="13" fontWeight="bold">A층 (사암)</text>
              <rect x="25" y="180" width="110" height="22" rx="4" fill="#1e293b" stroke="#10b981" />
              <text x="35" y="195" fill="#6ee7b7" fontSize="11">🪲 삼엽충 화석</text>
            </svg>
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>• 단층 X-Y는 A, B층을 절단하고 P-Q 부정합면에 의해 침식됨</span>
            <span>• 하부: 고생대(삼엽충) / 상부: 중생대(암모나이트, 공룡)</span>
          </div>
        </div>
      )}

      {/* 2. 해양 생물 과의 수 변화 꺾은선 그래프 (5대 대멸종 A~E) */}
      {type === 'mass_extinction_curve' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold flex items-center gap-1.5 text-amber-400">
              <Activity className="w-4 h-4" />
              [지문 자료] 현생 누대 해양 생물 과(Family)의 수 변화와 5대 대멸종
            </span>
            <span className="text-[11px] text-red-400 font-bold">A~E: 급격한 생물 절멸 지점</span>
          </div>

          <div className="relative w-full h-56 bg-slate-950 rounded-lg border border-slate-800 p-2 overflow-hidden">
            <svg className="w-full h-full" viewBox="0 0 600 200">
              {/* Axes */}
              <line x1="50" y1="170" x2="580" y2="170" stroke="#64748b" strokeWidth="1.2" />
              <line x1="50" y1="20" x2="50" y2="170" stroke="#64748b" strokeWidth="1.2" />

              {/* Era background zones */}
              {/* Paleozoic 541~252 */}
              <rect x="50" y="20" width="260" height="150" fill="#064e3b" fillOpacity="0.25" />
              <text x="140" y="35" fill="#34d399" fontSize="11" fontWeight="bold">고생대 (541~252 Ma)</text>

              {/* Mesozoic 252~66 */}
              <rect x="310" y="20" width="180" height="150" fill="#78350f" fillOpacity="0.25" />
              <text x="360" y="35" fill="#fbbf24" fontSize="11" fontWeight="bold">중생대 (252~66 Ma)</text>

              {/* Cenozoic 66~0 */}
              <rect x="490" y="20" width="90" height="150" fill="#0e7490" fillOpacity="0.25" />
              <text x="505" y="35" fill="#38bdf8" fontSize="11" fontWeight="bold">신생대</text>

              {/* Grid lines */}
              <line x1="50" y1="120" x2="580" y2="120" stroke="#334155" strokeDasharray="3,3" />
              <line x1="50" y1="70" x2="580" y2="70" stroke="#334155" strokeDasharray="3,3" />
              <text x="15" y="174" fill="#94a3b8" fontSize="10">0</text>
              <text x="15" y="124" fill="#94a3b8" fontSize="10">400</text>
              <text x="15" y="74" fill="#94a3b8" fontSize="10">800</text>
              <text x="10" y="24" fill="#cbd5e1" fontSize="10 font-bold">과의 수</text>

              {/* Biodiversity Line Curve */}
              <path
                d="M 50,165 
                   C 80,150 100,85 130,85 
                   L 145,125 
                   C 160,110 180,95 200,90 
                   L 215,125 
                   C 230,110 270,105 295,100 
                   L 310,160 
                   C 330,150 350,135 375,130 
                   L 390,148 
                   C 410,135 440,100 475,90 
                   L 490,132 
                   C 510,100 540,60 575,45"
                fill="none"
                stroke="#38bdf8"
                strokeWidth="2.5"
              />

              {/* Drops points A, B, C, D, E */}
              {/* Point A: Ordovician end */}
              <circle cx="145" cy="125" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
              <text x="138" y="145" fill="#f87171" fontSize="12" fontWeight="bold">A (1차)</text>

              {/* Point B: Devonian end */}
              <circle cx="215" cy="125" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
              <text x="208" y="145" fill="#f87171" fontSize="12" fontWeight="bold">B (2차)</text>

              {/* Point C: Permian end (WORST!) */}
              <circle cx="310" cy="160" r="7" fill="#dc2626" stroke="#fbbf24" strokeWidth="2" className="animate-pulse" />
              <text x="290" y="178" fill="#ef4444" fontSize="13" fontWeight="black">C (3차 최대!)</text>

              {/* Point D: Triassic end */}
              <circle cx="390" cy="148" r="5" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
              <text x="382" y="165" fill="#f87171" fontSize="12" fontWeight="bold">D (4차)</text>

              {/* Point E: Cretaceous end */}
              <circle cx="490" cy="132" r="6" fill="#dc2626" stroke="#fff" strokeWidth="1.5" />
              <text x="475" y="152" fill="#f87171" fontSize="12" fontWeight="bold">E (5차 운석)</text>
            </svg>
          </div>

          <div className="grid grid-cols-5 gap-1 text-[10px] text-center text-slate-300">
            <span className="p-1 rounded bg-slate-800">A: 오르도비스기 말 (85%)</span>
            <span className="p-1 rounded bg-slate-800">B: 데본기 말 (75%)</span>
            <span className="p-1 rounded bg-red-950/70 border border-red-500 font-bold text-red-300">C: 페름기 말 (95% 최대)</span>
            <span className="p-1 rounded bg-slate-800">D: 트라이아스기 말 (80%)</span>
            <span className="p-1 rounded bg-amber-950/70 border border-amber-500 font-bold text-amber-300">E: 백악기 말 (75% 공룡절멸)</span>
          </div>
        </div>
      )}

      {/* 3. 표준화석 vs 시상화석 사분면 그래프 */}
      {type === 'fossil_quadrant' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold flex items-center gap-1.5 text-amber-400">
              [지문 자료] 화석의 생존 기간과 분포 면적의 상대적 사분면
            </span>
          </div>

          <div className="relative w-full h-52 bg-slate-950 rounded-lg border border-slate-800 p-2 flex items-center justify-center">
            <svg className="w-full h-full" viewBox="0 0 500 180">
              {/* Axes */}
              <line x1="60" y1="90" x2="460" y2="90" stroke="#64748b" strokeWidth="1.5" />
              <line x1="250" y1="15" x2="250" y2="165" stroke="#64748b" strokeWidth="1.5" />

              <text x="400" y="82" fill="#94a3b8" fontSize="11 font-bold">분포 면적 (넓음 →)</text>
              <text x="255" y="25" fill="#94a3b8" fontSize="11 font-bold">생존 기간 (김 ↑)</text>

              {/* Quadrant B: Facies Fossil (Upper-Left: Long survival, narrow area) */}
              <rect x="80" y="25" width="150" height="55" rx="6" fill="#0369a1" fillOpacity="0.3" stroke="#38bdf8" />
              <text x="95" y="47" fill="#38bdf8" fontSize="13" fontWeight="bold">B 영역 (시상화석)</text>
              <text x="95" y="65" fill="#e0f2fe" fontSize="10">생존 기간 길고, 분포 면적 좁음</text>
              <text x="95" y="75" fill="#7dd3fc" fontSize="9 font-semibold">예: 산호, 고사리 (과거 환경 지시)</text>

              {/* Quadrant A: Index Fossil (Lower-Right: Short survival, wide area) */}
              <rect x="270" y="100" width="165" height="55" rx="6" fill="#b45309" fillOpacity="0.3" stroke="#f59e0b" />
              <text x="285" y="122" fill="#fbbf24" fontSize="13" fontWeight="bold">A 영역 (표준화석)</text>
              <text x="285" y="139" fill="#fef3c7" fontSize="10">생존 기간 짧고, 분포 면적 넓음</text>
              <text x="285" y="150" fill="#fde68a" fontSize="9 font-semibold">예: 삼엽충, 암모나이트 (지질 시대 결정)</text>
            </svg>
          </div>
        </div>
      )}

      {/* 4. 기후 곡선 및 기타 */}
      {(type === 'climate_curve' || type === 'pangea_causality_flow' || type === 'plant_animal_timeline') && (
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-300">
            <span className="font-bold flex items-center gap-1.5 text-amber-400">
              [지문 자료] 지질 시대별 핵심 환경·생물 진화 다이어그램
            </span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-xs">
            <div className="p-3 rounded-lg bg-rose-950/40 border border-rose-800 text-center">
              <div className="font-bold text-rose-300">선캄브리아대</div>
              <div className="text-[10px] text-slate-400 mt-1">4600~541 Ma (88.2%)</div>
              <div className="text-[10px] text-slate-300 mt-1">남세균 광합성 → 산소 축적</div>
            </div>
            <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800 text-center">
              <div className="font-bold text-emerald-300">고생대</div>
              <div className="text-[10px] text-slate-400 mt-1">541~252 Ma (6.3%)</div>
              <div className="text-[10px] text-slate-300 mt-1">오존층 형성 → 육상 진출<br />말기 판게아 형성 (3차 멸종)</div>
            </div>
            <div className="p-3 rounded-lg bg-amber-950/40 border border-amber-800 text-center ring-1 ring-amber-500">
              <div className="font-bold text-amber-300">중생대 (빙하기 0회)</div>
              <div className="text-[10px] text-slate-400 mt-1">252~66 Ma (4.0%)</div>
              <div className="text-[10px] text-amber-200 mt-1">전 기간 온난! 파충류·겉씨<br />백악기 말 소행성 충돌</div>
            </div>
            <div className="p-3 rounded-lg bg-cyan-950/40 border border-cyan-800 text-center">
              <div className="font-bold text-cyan-300">신생대</div>
              <div className="text-[10px] text-slate-400 mt-1">66 Ma~현재 (1.4%)</div>
              <div className="text-[10px] text-slate-300 mt-1">제4기 빙하기 4회·간빙기 3회<br />포유류·속씨식물 번성</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
