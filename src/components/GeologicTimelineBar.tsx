/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { GEOLOGICAL_ERAS, MASS_EXTINCTIONS } from '../data/geologyData';
import { AlertCircle, Flame, Sparkles } from 'lucide-react';

interface GeologicTimelineBarProps {
  selectedEraId?: string;
  onSelectEra?: (eraId: string) => void;
  missedEraIds?: string[]; // 틀린 시대 ID 배열 (화면 3 결과에서 빨간색 표시)
  highlightMassExtinctionOrder?: number;
  onSelectMassExtinction?: (order: 1 | 2 | 3 | 4 | 5) => void;
  interactive?: boolean;
}

export const GeologicTimelineBar: React.FC<GeologicTimelineBarProps> = ({
  selectedEraId,
  onSelectEra,
  missedEraIds = [],
  highlightMassExtinctionOrder,
  onSelectMassExtinction,
  interactive = true,
}) => {
  const [scaleMode, setScaleMode] = useState<'equal' | 'proportional'>('equal');

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 sm:p-5 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
              지질 시대 타임라인 (46억 년 전 ~ 현재)
            </h3>
            {missedEraIds.length > 0 && (
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/40 px-2 py-0.5 rounded-md border border-red-200 dark:border-red-900 animate-pulse">
                <AlertCircle className="w-3.5 h-3.5" />
                틀린 시대 빨간색 표시 중 ({missedEraIds.length}개)
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            수치 연대(백만 년, Ma)와 5대 대멸종 발생 지점을 한눈에 파악하세요
          </p>
        </div>

        {/* Proportional vs Equal Scale Toggle */}
        <div className="flex items-center self-start sm:self-auto p-1 bg-slate-100 dark:bg-slate-800 rounded-lg">
          <button
            onClick={() => setScaleMode('equal')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              scaleMode === 'equal'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            보기 쉬운 균등 뷰
          </button>
          <button
            onClick={() => setScaleMode('proportional')}
            className={`px-2.5 py-1 text-xs font-medium rounded-md transition-colors ${
              scaleMode === 'proportional'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
            title="실제 지구 역사 46억 년 중 88.2%가 선캄브리아 시대임을 체감하는 비율 뷰"
          >
            실제 연대 비율 뷰 (88.2%)
          </button>
        </div>
      </div>

      {/* Main Timeline Bar */}
      <div className="relative pt-6 pb-2">
        {/* Mass Extinctions Markers on top */}
        <div className="absolute top-0 inset-x-0 h-6 pointer-events-auto">
          {MASS_EXTINCTIONS.map((ext) => {
            // Calculate position along timeline
            // If equal scale:
            // precambrian (0% - 25%), paleozoic (25% - 50%), mesozoic (50% - 75%), cenozoic (75% - 100%)
            let leftPercent = 50;
            if (scaleMode === 'equal') {
              if (ext.eraId === 'paleozoic') {
                // Paleozoic 541 to 252 (range 289)
                const frac = (541 - ext.timingMa) / 289;
                leftPercent = 25 + frac * 25;
              } else if (ext.eraId === 'mesozoic') {
                // Mesozoic 252 to 66 (range 186)
                const frac = (252 - ext.timingMa) / 186;
                leftPercent = 50 + frac * 25;
              }
            } else {
              // Proportional 4600 to 0
              leftPercent = ((4600 - ext.timingMa) / 4600) * 100;
            }

            const isSelected = highlightMassExtinctionOrder === ext.order;

            return (
              <button
                key={ext.order}
                onClick={() => onSelectMassExtinction && onSelectMassExtinction(ext.order)}
                style={{ left: `${leftPercent}%` }}
                className={`absolute -translate-x-1/2 flex items-center gap-1 group z-20 cursor-pointer ${
                  isSelected ? 'scale-110' : 'hover:scale-105'
                }`}
                title={`${ext.name} (약 ${ext.timingMa} Ma): ${ext.extinctionRateSpecies}% 멸종`}
              >
                <div
                  className={`px-1.5 py-0.5 rounded text-[10px] font-bold flex items-center gap-0.5 shadow-xs transition-all ${
                    ext.isWorstInEarthHistory
                      ? 'bg-red-600 text-white ring-2 ring-red-400 animate-bounce'
                      : isSelected
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300'
                      : 'bg-slate-800 text-white dark:bg-slate-700 hover:bg-red-500'
                  }`}
                >
                  <Flame className="w-2.5 h-2.5" />
                  <span>{ext.order}차</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Timeline segments */}
        <div className="flex w-full h-12 rounded-lg overflow-hidden border border-slate-300 dark:border-slate-700 bg-slate-100 dark:bg-slate-800 shadow-inner">
          {GEOLOGICAL_ERAS.map((era) => {
            const isMissed = missedEraIds.includes(era.id);
            const isSelected = selectedEraId === era.id;

            // Width calculation
            let widthPercent = 25;
            if (scaleMode === 'proportional') {
              widthPercent = era.percentageOfEarthHistory;
            }

            return (
              <button
                key={era.id}
                disabled={!interactive}
                onClick={() => onSelectEra && onSelectEra(era.id)}
                style={{ width: `${widthPercent}%` }}
                className={`h-full relative flex flex-col items-center justify-center transition-all p-1 text-center select-none ${
                  isMissed
                    ? 'bg-red-500 text-white border-2 border-red-600 ring-2 ring-red-400 z-10 animate-pulse'
                    : isSelected
                    ? `${era.color.bg} text-white ring-2 ring-amber-400 z-10`
                    : `${era.color.bg}/85 hover:${era.color.bg} text-white opacity-90 hover:opacity-100`
                } ${interactive ? 'cursor-pointer hover:brightness-105' : 'cursor-default'}`}
              >
                {/* Missed Warning Tag */}
                {isMissed && (
                  <span className="absolute -top-3.5 bg-red-600 text-white font-bold text-[9px] px-1.5 py-0.2 rounded shadow-xs tracking-wider">
                    오답 복습!
                  </span>
                )}

                <div className="text-xs font-bold leading-tight truncate max-w-full">
                  {era.nameKo}
                </div>
                <div className="text-[10px] opacity-90 font-mono tabular-nums leading-tight truncate">
                  {era.startMa} ~ {era.endMa} Ma
                </div>

                {scaleMode === 'proportional' && widthPercent > 10 && (
                  <span className="text-[9px] opacity-80 mt-0.5">({era.percentageOfEarthHistory}%)</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Timeline Scale Marks and Legend */}
        <div className="flex justify-between items-center text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-2 px-1">
          <span>4600 Ma (지구 탄생)</span>
          <span className="hidden sm:inline">541 Ma (고생대 시작)</span>
          <span className="hidden sm:inline">252 Ma (중생대 시작)</span>
          <span className="hidden sm:inline">66 Ma (신생대 시작)</span>
          <span>현재 (0 Ma)</span>
        </div>
      </div>

      {/* Proportional Mode Educational Callout */}
      {scaleMode === 'proportional' && (
        <div className="mt-3 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
          <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">교과서 핵심 포인트:</span> 선캄브리아 시대는 전체 46억 년 중 무려 <strong>88.2%</strong>(약 40억 년)를 차지합니다. 반면 공룡의 시대인 중생대는 4.0%, 인류가 속한 신생대는 단 <strong>1.4%</strong>에 불과합니다!
          </div>
        </div>
      )}
    </div>
  );
};
