/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * [개념 익히기] 모듈: 고등학교 통합과학2 지질 시대, 표준/시상 화석, 기후, 5대 대멸종
 */

import React, { useState } from 'react';
import { GEOLOGICAL_ERAS, MASS_EXTINCTIONS, FACIES_FOSSILS, GeologicalEra } from '../data/geologyData';
import { BookOpen, Thermometer, Flame, Shell, Clock, ArrowRight, ShieldCheck, Info } from 'lucide-react';

interface ConceptExplorerProps {
  initialEraId?: string;
  initialExtinctionOrder?: 1 | 2 | 3 | 4 | 5;
}

export const ConceptExplorer: React.FC<ConceptExplorerProps> = ({
  initialEraId = 'paleozoic',
  initialExtinctionOrder
}) => {
  const [subTab, setSubTab] = useState<'eras' | 'fossils' | 'climate' | 'extinctions'>(
    initialExtinctionOrder ? 'extinctions' : 'eras'
  );
  const [selectedEraId, setSelectedEraId] = useState<string>(initialEraId);
  const [selectedExtinctionOrder, setSelectedExtinctionOrder] = useState<number>(initialExtinctionOrder || 3);

  const selectedEra = GEOLOGICAL_ERAS.find((e) => e.id === selectedEraId) || GEOLOGICAL_ERAS[1];
  const selectedExtinction = MASS_EXTINCTIONS.find((m) => m.order === selectedExtinctionOrder) || MASS_EXTINCTIONS[2];

  return (
    <div className="space-y-6">
      {/* Subtab Segmented Navigation */}
      <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setSubTab('eras')}
          className={`flex-1 min-w-[140px] px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            subTab === 'eras'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Clock className="w-4 h-4 text-amber-500" />
          <span>지질 시대별 특징</span>
        </button>

        <button
          onClick={() => setSubTab('fossils')}
          className={`flex-1 min-w-[140px] px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            subTab === 'fossils'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Shell className="w-4 h-4 text-cyan-500" />
          <span>표준화석 vs 시상화석</span>
        </button>

        <button
          onClick={() => setSubTab('climate')}
          className={`flex-1 min-w-[140px] px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            subTab === 'climate'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Thermometer className="w-4 h-4 text-emerald-500" />
          <span>기후 변화 & 빙하기 비교</span>
        </button>

        <button
          onClick={() => setSubTab('extinctions')}
          className={`flex-1 min-w-[140px] px-3 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-2 whitespace-nowrap ${
            subTab === 'extinctions'
              ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
          }`}
        >
          <Flame className="w-4 h-4 text-red-500" />
          <span>5대 대멸종 심층 분석</span>
        </button>
      </div>

      {/* Tab 1: 지질 시대별 특징 */}
      {subTab === 'eras' && (
        <div className="space-y-6">
          {/* Era Selector Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {GEOLOGICAL_ERAS.map((era) => {
              const isSelected = era.id === selectedEra.id;
              return (
                <button
                  key={era.id}
                  onClick={() => setSelectedEraId(era.id)}
                  className={`p-3.5 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? `${era.color.light} ${era.color.border} ring-2 ring-amber-400 shadow-xs`
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="text-xs font-mono text-slate-400 dark:text-slate-500">
                    {era.nameEn}
                  </div>
                  <div className="text-base font-bold text-slate-900 dark:text-slate-100 mt-0.5">
                    {era.nameKo}
                  </div>
                  <div className="text-xs font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-1">
                    {era.startMa} ~ {era.endMa} Ma
                  </div>
                  <div className="text-[11px] font-semibold text-amber-600 dark:text-amber-400 mt-2">
                    지구 역사의 {era.percentageOfEarthHistory}%
                  </div>
                </button>
              );
            })}
          </div>

          {/* Selected Era Deep Dive Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  시대 심층 분석
                </span>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-0.5">
                  {selectedEra.nameKo} ({selectedEra.nameEn})
                </h3>
              </div>
              <div className="text-right">
                <div className="text-sm font-bold font-mono tabular-nums text-slate-800 dark:text-slate-200">
                  {selectedEra.startMa}백만 년 전 ~ {selectedEra.endMa}백만 년 전
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  지속 기간: 약 {selectedEra.durationMa}백만 년 ({selectedEra.percentageOfEarthHistory}%)
                </div>
              </div>
            </div>

            {/* Sub-periods breakdown */}
            <div className="mt-5">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                세부 기(Period) 구분 및 주요 사건
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                {selectedEra.periods.map((p, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60"
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-slate-100">{p.nameKo}</span>
                      <span className="font-mono tabular-nums text-[11px] text-slate-400">{p.startMa}~{p.endMa} Ma</span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {p.keyFeature}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Biological & Atmospheric Evolution */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Plants */}
              <div className="p-4 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                <div className="text-xs font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-1.5 mb-1.5">
                  <span>🌿 식물계 변천 (교과서 핵심)</span>
                </div>
                <div className="text-sm font-bold text-emerald-950 dark:text-emerald-100 mb-1">
                  {selectedEra.plants.evolutionState}
                </div>
                <p className="text-xs text-emerald-900/80 dark:text-emerald-300 leading-relaxed">
                  {selectedEra.plants.detail}
                </p>
                <div className="mt-3 text-xs font-semibold text-emerald-800 dark:text-emerald-300">
                  대표 식물: {selectedEra.plants.representative.join(', ')}
                </div>
              </div>

              {/* Animals */}
              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <div className="text-xs font-bold text-amber-800 dark:text-amber-400 flex items-center gap-1.5 mb-1.5">
                  <span>🦕 동물계 변천 (교과서 핵심)</span>
                </div>
                <div className="text-sm font-bold text-amber-950 dark:text-amber-100 mb-1">
                  {selectedEra.animals.evolutionState}
                </div>
                <p className="text-xs text-amber-900/80 dark:text-amber-300 leading-relaxed">
                  {selectedEra.animals.detail}
                </p>
                <div className="mt-3 text-xs font-semibold text-amber-800 dark:text-amber-300">
                  대표 동물: {selectedEra.animals.representative.join(', ')}
                </div>
              </div>
            </div>

            {/* Climate & Atmosphere */}
            <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                기후 및 대기 환경
              </div>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                <strong>기후 특징:</strong> {selectedEra.climateSummary}
              </p>
              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                <strong>빙하기 현황:</strong> {selectedEra.iceAges}
              </div>
            </div>

            {/* Visual Land-Sea Distribution & Pangaea Diagram */}
            <div className="mt-6 p-4 rounded-xl bg-slate-900 text-white border border-slate-800 space-y-3">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-amber-400">🌍 {selectedEra.nameKo} 수륙 분포 및 환경 인과 도표</span>
                <span className="text-[11px] text-slate-400 font-mono">{selectedEra.startMa} ~ {selectedEra.endMa} Ma</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 items-center text-xs">
                <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 flex items-center justify-center h-24">
                  <svg viewBox="0 0 180 80" className="w-full h-full">
                    <rect x="0" y="0" width="180" height="80" rx="6" fill="#082f49" />
                    {selectedEra.id === 'precambrian' && (
                      <>
                        <circle cx="55" cy="40" r="18" fill="#881337" stroke="#fb7185" strokeWidth="1.2" />
                        <circle cx="120" cy="45" r="14" fill="#881337" stroke="#fb7185" strokeWidth="1.2" />
                        <text x="90" y="72" textAnchor="middle" fill="#fda4af" fontSize="9">원시 대륙 &amp; 남세균 광합성</text>
                      </>
                    )}
                    {selectedEra.id === 'paleozoic' && (
                      <>
                        <path d="M55,15 C85,10 115,20 118,42 C120,62 85,70 60,60 C42,52 40,25 55,15 Z" fill="#065f46" stroke="#34d399" strokeWidth="1.5" />
                        <text x="90" y="43" textAnchor="middle" fill="#ecfdf5" fontSize="10" fontWeight="bold">초대륙 판게아</text>
                        <text x="90" y="74" textAnchor="middle" fill="#6ee7b7" fontSize="8.5">말기 하나로 합체 → 대륙붕 급감!</text>
                      </>
                    )}
                    {selectedEra.id === 'mesozoic' && (
                      <>
                        <path d="M35,18 L68,22 L62,55 L32,48 Z" fill="#92400e" stroke="#fbbf24" strokeWidth="1.2" />
                        <path d="M88,16 L138,20 L132,58 L94,50 Z" fill="#92400e" stroke="#fbbf24" strokeWidth="1.2" />
                        <path d="M74,15 L82,62" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3,2" />
                        <text x="90" y="73" textAnchor="middle" fill="#fcd34d" fontSize="8.5">판게아 분열 → 대서양 확장</text>
                      </>
                    )}
                    {selectedEra.id === 'cenozoic' && (
                      <>
                        <path d="M25,18 L52,22 L46,56 L30,48 Z" fill="#0e7490" stroke="#38bdf8" strokeWidth="1.2" />
                        <path d="M72,16 L108,18 L100,52 L74,45 Z" fill="#0e7490" stroke="#38bdf8" strokeWidth="1.2" />
                        <path d="M118,22 L152,24 L145,48 L120,44 Z" fill="#0e7490" stroke="#38bdf8" strokeWidth="1.2" />
                        <text x="90" y="73" textAnchor="middle" fill="#67e8f9" fontSize="8.5">현재 수륙 분포 &amp; 알프스·히말라야 산맥</text>
                      </>
                    )}
                  </svg>
                </div>
                <div className="sm:col-span-2 text-xs text-slate-300 space-y-1.5 leading-relaxed">
                  <div className="font-bold text-white">핵심 수륙 분포 변화</div>
                  <p>
                    {selectedEra.id === 'precambrian' && '작은 원시 대륙들이 형성·이동하고, 원시 바다에서 남세균의 광합성이 시작되어 지구 대기를 산소가 풍부한 환경으로 바꾸었습니다.'}
                    {selectedEra.id === 'paleozoic' && '초기에는 대륙이 흩어져 얕은 바다가 넓었으나, 말기(페름기)에 모든 대륙이 모여 초대륙 판게아를 형성 → 해안선 및 대륙붕 감소 → 3차 대멸종(95%)으로 직결되었습니다.'}
                    {selectedEra.id === 'mesozoic' && '트라이아스기 말부터 판게아가 분열하며 대서양이 열리고 해류 순환과 수증기 공급이 활발해져 전 기간 빙하기 없이 온난한 기후가 유지되었습니다.'}
                    {selectedEra.id === 'cenozoic' && '대륙 이동으로 대서양과 인도양이 넓어지고 히말라야·알프스 산맥이 형성되어, 제4기 빙하기 4회·간빙기 3회와 함께 현재의 수륙 분포가 완성되었습니다.'}
                  </p>
                </div>
              </div>
            </div>

            {/* Essential Causality Logic (원인과 결과) */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                고등학생 필독: 인과관계(원인과 결과) 메커니즘
              </h4>
              <div className="space-y-3">
                {selectedEra.keyCausality.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700"
                  >
                    <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-2.5">
                      {item.title}
                    </div>
                    <div className="flex flex-col md:flex-row items-stretch md:items-center gap-2 text-xs">
                      <div className="flex-1 p-2.5 rounded-lg bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/50">
                        <div className="font-bold text-red-700 dark:text-red-400 mb-1">1. 원인 (Cause)</div>
                        <p className="text-red-900/80 dark:text-red-300">{item.cause}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 self-center rotate-90 md:rotate-0" />
                      <div className="flex-1 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
                        <div className="font-bold text-amber-700 dark:text-amber-400 mb-1">2. 과정 (Process)</div>
                        <p className="text-amber-900/80 dark:text-amber-300">{item.process}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-slate-400 shrink-0 self-center rotate-90 md:rotate-0" />
                      <div className="flex-1 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
                        <div className="font-bold text-emerald-700 dark:text-emerald-400 mb-1">3. 결과 (Result)</div>
                        <p className="text-emerald-900/80 dark:text-emerald-300">{item.result}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Era Index Fossils */}
            <div className="mt-6">
              <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                {selectedEra.nameKo} 대표 표준화석
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedEra.indexFossils.map((fossil, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40"
                  >
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        {fossil.name}
                      </span>
                      <span className="text-[11px] px-2 py-0.5 rounded bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium">
                        서식: {fossil.environment}
                      </span>
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                      {fossil.description}
                    </p>
                    <div className="mt-2 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/30 p-1.5 rounded">
                      암기 공식: {fossil.mnemonic}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: 표준화석 vs 시상화석 */}
      {subTab === 'fossils' && (
        <div className="space-y-6">
          {/* Comparison Matrix Header */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 mb-1">
              표준화석 vs 시상화석 조건 2대 비교 매트릭스
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
              고등학교 통합과학2 기출 1순위: 생존 기간과 분포 면적의 역학 관계
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Standard Fossil Card */}
              <div className="p-5 rounded-xl bg-amber-50/60 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-extrabold text-amber-900 dark:text-amber-200">
                    표준화석 (Index Fossil)
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-200 dark:bg-amber-900 text-amber-900 dark:text-amber-100">
                    지질 시대 결정
                  </span>
                </div>
                <div className="space-y-2 text-xs text-amber-950 dark:text-amber-300">
                  <div className="p-2 rounded bg-white/80 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-900">
                    <strong>생존 기간:</strong> 매우 짧아야 함 (진화 속도가 빨라야 특정 시대에만 한정됨)
                  </div>
                  <div className="p-2 rounded bg-white/80 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-900">
                    <strong>분포 면적:</strong> 매우 넓어야 함 (전 지구적 대비가 가능해야 함)
                  </div>
                  <div className="p-2 rounded bg-white/80 dark:bg-slate-900/60 border border-amber-200 dark:border-amber-900">
                    <strong>개체 수:</strong> 많아야 함 (쉽게 발견되어야 함)
                  </div>
                  <div className="mt-3 text-xs font-bold text-amber-900 dark:text-amber-200">
                    대표 암기: [선] 스트로마톨라이트 / [고] 삼·필·갑·방 / [중] 암·공·시 / [신] 화·매
                  </div>
                </div>
              </div>

              {/* Facies Fossil Card */}
              <div className="p-5 rounded-xl bg-cyan-50/60 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/60">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-base font-extrabold text-cyan-900 dark:text-cyan-200">
                    시상화석 (Facies Fossil)
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded bg-cyan-200 dark:bg-cyan-900 text-cyan-900 dark:text-cyan-100">
                    과거 환경 추정
                  </span>
                </div>
                <div className="space-y-2 text-xs text-cyan-950 dark:text-cyan-300">
                  <div className="p-2 rounded bg-white/80 dark:bg-slate-900/60 border border-cyan-200 dark:border-cyan-900">
                    <strong>생존 기간:</strong> 매우 길어야 함 (오랜 세월 동안 살아남아 환경을 증언)
                  </div>
                  <div className="p-2 rounded bg-white/80 dark:bg-slate-900/60 border border-cyan-200 dark:border-cyan-900">
                    <strong>분포 면적:</strong> 매우 좁아야 함 (특정 환경 조건에서만 국한되어 서식)
                  </div>
                  <div className="p-2 rounded bg-white/80 dark:bg-slate-900/60 border border-cyan-200 dark:border-cyan-900">
                    <strong>환경 민감도:</strong> 온도, 습도, 수심 등 환경 변화에 매우 예민함
                  </div>
                  <div className="mt-3 text-xs font-bold text-cyan-900 dark:text-cyan-200">
                    대표 암기: 산호(따뜻하고 얕은 바다), 고사리(온난 습윤한 육지), 조개(얕은 바다/갯벌)
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Facies Fossil Real Examples */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-3">
              교과서 필수 시상화석 3대 도감
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {FACIES_FOSSILS.map((ff, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-base text-slate-900 dark:text-slate-100">{ff.name}</span>
                    <span className="text-[11px] font-semibold text-cyan-600 dark:text-cyan-400">환경 지표</span>
                  </div>
                  <div className="text-xs font-bold text-amber-700 dark:text-amber-400 mb-1">
                    서식처: {ff.habitat}
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-2">
                    {ff.environmentalMeaning}
                  </p>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 bg-white dark:bg-slate-900 p-2 rounded border border-slate-200 dark:border-slate-700">
                    {ff.characteristics}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: 기후 변화 & 빙하기 비교 */}
      {subTab === 'climate' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs space-y-6">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100">
              지질 시대별 기후 변화 곡선 & 빙하기 발생 분포
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              중생대는 빙하기가 0회이며, 신생대 제4기에는 빙하기 4회와 간빙기 3회가 교대하였습니다.
            </p>
          </div>

          {/* Interactive SVG Climate Temperature & Ice-Age Curve */}
          <div className="bg-slate-950 rounded-xl p-4 border border-slate-800">
            <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
              <span className="font-bold text-amber-400">📈 지질 시대 평균 기온 변화 곡선 (교과서 기준)</span>
              <span className="text-[11px] text-cyan-400">파란 점 = 빙하기 발생 구간</span>
            </div>
            <svg viewBox="0 0 640 165" className="w-full h-40">
              <rect x="45" y="15" width="140" height="115" fill="#9f1239" fillOpacity="0.18" />
              <rect x="185" y="15" width="165" height="115" fill="#065f46" fillOpacity="0.18" />
              <rect x="350" y="15" width="145" height="115" fill="#b45309" fillOpacity="0.25" />
              <rect x="495" y="15" width="125" height="115" fill="#0e7490" fillOpacity="0.18" />
              <line x1="45" y1="88" x2="620" y2="88" stroke="#38bdf8" strokeWidth="1.2" strokeDasharray="4,3" />
              <text x="6" y="92" fill="#38bdf8" fontSize="10" fontWeight="bold">빙하기</text>
              <text x="8" y="38" fill="#fbbf24" fontSize="10" fontWeight="bold">온난</text>
              <text x="6" y="64" fill="#94a3b8" fontSize="10">현재</text>
              <path
                d="M 50,42 C 95,44 138,40 158,112 L 185,46 C 205,44 232,46 248,108 L 270,44 C 295,42 315,108 345,50 C 378,28 458,28 495,42 L 538,54 L 554,108 L 568,60 L 580,108 L 593,62 L 605,108"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="3"
              />
              <circle cx="158" cy="112" r="4.5" fill="#38bdf8" stroke="#fff" strokeWidth="1" />
              <text x="132" y="126" fill="#7dd3fc" fontSize="9">원생누대 말</text>
              <circle cx="248" cy="108" r="4.5" fill="#38bdf8" stroke="#fff" strokeWidth="1" />
              <text x="218" y="124" fill="#7dd3fc" fontSize="9">오르도비스기</text>
              <circle cx="318" cy="108" r="4.5" fill="#38bdf8" stroke="#fff" strokeWidth="1" />
              <text x="292" y="124" fill="#7dd3fc" fontSize="9">석탄~페름기</text>
              <rect x="365" y="45" width="115" height="22" rx="4" fill="#f59e0b" fillOpacity="0.2" stroke="#fbbf24" />
              <text x="422" y="60" textAnchor="middle" fill="#fde68a" fontSize="10" fontWeight="bold">빙하기 0회 (고온 유지)</text>
              <circle cx="580" cy="108" r="4.5" fill="#38bdf8" stroke="#fff" strokeWidth="1" />
              <text x="542" y="124" fill="#7dd3fc" fontSize="9">제4기 (4회)</text>
              <text x="115" y="150" textAnchor="middle" fill="#fda4af" fontSize="11" fontWeight="bold">선캄브리아</text>
              <text x="267" y="150" textAnchor="middle" fill="#6ee7b7" fontSize="11" fontWeight="bold">고생대</text>
              <text x="422" y="150" textAnchor="middle" fill="#fcd34d" fontSize="11" fontWeight="bold">중생대</text>
              <text x="557" y="150" textAnchor="middle" fill="#67e8f9" fontSize="11" fontWeight="bold">신생대</text>
            </svg>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            {GEOLOGICAL_ERAS.map((era) => {
              const isMesozoic = era.id === 'mesozoic';
              return (
                <div
                  key={era.id}
                  className={`p-4 rounded-xl border ${
                    isMesozoic
                      ? 'bg-amber-50/80 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 ring-2 ring-amber-400'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-sm text-slate-900 dark:text-slate-100">{era.nameKo}</span>
                    {isMesozoic && (
                      <span className="text-[10px] font-bold bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded">
                        빙하기 없음!
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    {era.climateSummary}
                  </div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-200 dark:border-slate-700/60">
                    <strong>빙하기 기록:</strong> {era.iceAges}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 space-y-1.5">
            <div className="font-bold text-sm flex items-center gap-1.5 text-amber-800 dark:text-amber-300">
              <Info className="w-4 h-4" />
              <span>통합과학2 교과서 기후 핵심 암기 체크리스트</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-slate-700 dark:text-slate-300">
              <li><strong>선캄브리아 시대:</strong> 대체로 온난하였으나, 원생누대 말기에 대규모 빙하기 존재 (눈덩이 지구).</li>
              <li><strong>고생대:</strong> 온난 기후 위주이나 오르도비스기 말 빙하기(1차 대멸종 유발)와 석탄기 말~페름기 초 빙하기 2회 존재.</li>
              <li><strong>중생대:</strong> ★빙하기가 전혀 없이 전 기간 온난! 극지방에도 얼음이 없었음!★ (수능/내신 100% 출제)</li>
              <li><strong>신생대:</strong> 전기(팔레오기~네오기)는 온난, 후기(제4기)에는 빙하기 4회와 간빙기 3회 교대로 한랭화.</li>
            </ul>
          </div>
        </div>
      )}

      {/* Tab 4: 5대 대멸종 심층 분석 */}
      {subTab === 'extinctions' && (
        <div className="space-y-6">
          {/* Extinction selector tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
            {MASS_EXTINCTIONS.map((ext) => {
              const isSelected = ext.order === selectedExtinction.order;
              return (
                <button
                  key={ext.order}
                  onClick={() => setSelectedExtinctionOrder(ext.order)}
                  className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 dark:border-amber-600 ring-2 ring-amber-400'
                      : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900 dark:text-slate-100">{ext.order}차 대멸종</span>
                    {ext.isWorstInEarthHistory && (
                      <span className="text-[9px] font-bold bg-red-600 text-white px-1 py-0.2 rounded">최대!</span>
                    )}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-1 truncate">
                    {ext.timingPeriod}
                  </div>
                  <div className="text-xs font-mono font-bold text-red-600 dark:text-red-400 mt-1">
                    종 {ext.extinctionRateSpecies}% 절멸
                  </div>
                </button>
              );
            })}
          </div>

          {/* Extinction Deep Detail */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-6 shadow-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 dark:text-red-400">
                    {selectedExtinction.timingPeriod} (~{selectedExtinction.timingMa} Ma)
                  </span>
                  {selectedExtinction.isWorstInEarthHistory && (
                    <span className="bg-red-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                      지구 역사상 최대 규모
                    </span>
                  )}
                </div>
                <h3 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                  {selectedExtinction.name}
                </h3>
              </div>
              <div className="flex items-center gap-4 text-right">
                <div className="p-2.5 rounded-lg bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900">
                  <div className="text-[10px] text-red-600 dark:text-red-400 font-bold">생물 종 멸종 비율</div>
                  <div className="text-xl font-black font-mono tabular-nums text-red-700 dark:text-red-300">
                    {selectedExtinction.extinctionRateSpecies}%
                  </div>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 font-bold">생물 과(Family) 멸종</div>
                  <div className="text-xl font-black font-mono tabular-nums text-slate-800 dark:text-slate-200">
                    {selectedExtinction.extinctionRateFamily}%
                  </div>
                </div>
              </div>
            </div>

            {/* Causes and Mechanisms */}
            <div className="mt-5 space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2">
                  핵심 원인 요인
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {selectedExtinction.causes.map((c, i) => (
                    <div
                      key={i}
                      className="p-3 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-800 dark:text-slate-200 flex items-start gap-2"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                      <span>{c}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40">
                <h4 className="text-xs font-bold text-amber-800 dark:text-amber-400 uppercase tracking-wider mb-1">
                  인과관계 작동 메커니즘
                </h4>
                <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {selectedExtinction.causeMechanism}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-red-50/40 dark:bg-red-950/20 border border-red-200 dark:border-red-900/40">
                  <h4 className="text-xs font-bold text-red-700 dark:text-red-400 uppercase tracking-wider mb-1">
                    생태계 파괴 영향 (절멸한 생물)
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedExtinction.ecologicalImpact}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emerald-50/40 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/40">
                  <h4 className="text-xs font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wider mb-1">
                    생존자와 이후 진화적 도약
                  </h4>
                  <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                    {selectedExtinction.survivorsAndEvolution}
                  </p>
                </div>
              </div>

              {/* Exam Check Points */}
              <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
                <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  시험 출제 포인트
                </div>
                <div className="space-y-1">
                  {selectedExtinction.examCheckPoints.map((cp, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                      <ShieldCheck className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                      <span>{cp}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
