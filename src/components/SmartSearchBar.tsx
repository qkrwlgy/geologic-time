/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 화면 2: 스마트 교과서 검색 및 인터랙티브 시각화 응답 모듈
 */

import React, { useState } from 'react';
import { Search, Sparkles, ArrowRight, AlertTriangle, BookOpen, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { answerTextbookQuery, QAResponse, FREQUENT_QUESTIONS } from '../utils/textbookQA';
import { GEOLOGICAL_ERAS, MASS_EXTINCTIONS } from '../data/geologyData';

interface SmartSearchBarProps {
  onNavigateToEra?: (eraId: string) => void;
  onNavigateToExtinction?: (order: 1 | 2 | 3 | 4 | 5) => void;
}

const PRESET_QUERIES = [
  '중생대와 신생대 중 무엇이 더 앞(오래된)인가?',
  '신생대에는 어떤 식물이 번성하였는가?',
  '페름기 대멸종 원인은?',
  '빙하기가 없었던 시대는?',
  '오존층은 언제 형성되었는가?',
  '삼엽충은 무슨 화석인가?',
  '산호 화석이 발견되면 과거 환경은?'
];

export const SmartSearchBar: React.FC<SmartSearchBarProps> = ({
  onNavigateToEra,
  onNavigateToExtinction
}) => {
  const [query, setQuery] = useState('');
  const [deployNotice, setDeployNotice] = useState<string | null>(null);
  const [response, setResponse] = useState<QAResponse | null>(() => answerTextbookQuery('중생대와 신생대 중 무엇이 더 앞(오래된)인가?'));

  const handleSearch = (textToSearch: string) => {
    const res = answerTextbookQuery(textToSearch);
    setResponse(res);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      handleSearch(query);
    }
  };

  const handleTagClick = (tag: string) => {
    const cleaned = tag.replace('#', '');
    setQuery(cleaned);
    handleSearch(cleaned);
  };

  const relatedEra = response?.highlightEraId
    ? GEOLOGICAL_ERAS.find((e) => e.id === response.highlightEraId)
    : null;

  const relatedExtinction = response?.highlightMassExtinctionOrder
    ? MASS_EXTINCTIONS.find((m) => m.order === response.highlightMassExtinctionOrder)
    : null;

  return (
    <div className="space-y-6">
      {/* Search Header Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border border-amber-200 dark:border-amber-900/60 rounded-xl p-5 sm:p-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-amber-700 dark:text-amber-400 mb-2">
          <Sparkles className="w-4 h-4" />
          <span>통합과학2 교과서 인터랙티브 질의응답 (화면 2)</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-slate-100 tracking-tight">
          지질 시대, 표준화석, 5대 대멸종에 대해 무엇이든 질문하세요
        </h2>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
          수치 연대 비교, 식물·동물 번성 순서, 기후 변화 및 대멸종 인과관계를 즉시 시각적으로 응답합니다.
        </p>

        {/* 자주 묻는 질문 버튼 (입력 칸 위 5개) */}
        <div className="mt-4 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium mr-1 text-slate-700 dark:text-slate-300 shrink-0">자주 묻는 질문:</span>
          {FREQUENT_QUESTIONS.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(q);
                handleSearch(q);
              }}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-[11px] truncate max-w-[280px] cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="mt-2.5 space-y-1.5">
          <div className="flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="예: 중생대와 신생대 중 무엇이 더 앞인가? / 페름기 대멸종 원인은?"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-sm focus:outline-none focus:ring-2 focus:ring-amber-500 transition-all placeholder:text-slate-400"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 rounded-lg bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-semibold text-sm hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors shadow-xs shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>탐색하기</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => setDeployNotice('이 기능은 배포판에서는 쓸 수 없어요.')}
              className="px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-400 text-xs font-semibold flex items-center justify-center gap-1.5 cursor-pointer shrink-0"
            >
              <ImageIcon className="w-4 h-4 text-amber-500" />
              <span>AI 그림 생성</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-500 dark:text-slate-400 pl-1">
            이름 · 학번 · 연락처는 쓰지 마세요
          </p>
        </form>

        {deployNotice && (
          <div className="mt-2.5 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-xs text-amber-900 dark:text-amber-200 font-semibold flex items-center justify-between">
            <span>{deployNotice}</span>
            <button type="button" onClick={() => setDeployNotice(null)} className="underline text-[11px] cursor-pointer">
              닫기
            </button>
          </div>
        )}

        {/* Preset chips for fast testing */}
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span className="font-medium mr-1 text-slate-700 dark:text-slate-300 shrink-0">심화 예시:</span>
          {PRESET_QUERIES.map((q, idx) => (
            <button
              key={idx}
              onClick={() => {
                setQuery(q);
                handleSearch(q);
              }}
              className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-amber-400 dark:hover:border-amber-500 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-colors text-[11px] truncate max-w-[280px] cursor-pointer"
            >
              {q}
            </button>
          ))}
        </div>
      </div>

      {/* Response Section */}
      {response && (
        <div className="space-y-4 transition-all duration-200">
          {/* Out of Scope Error State */}
          {!response.isInScope ? (
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-900/60 rounded-xl p-5 text-red-900 dark:text-red-200">
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-base font-bold text-red-800 dark:text-red-300">
                    {response.shortAnswer}
                  </h3>
                  <p className="text-xs sm:text-sm text-red-700 dark:text-red-400 mt-1 leading-relaxed">
                    {response.detailedExplanation}
                  </p>
                  <div className="mt-4 pt-3 border-t border-red-200 dark:border-red-900/40">
                    <div className="text-xs font-semibold text-red-800 dark:text-red-300 mb-2">
                      💡 통합과학2 핵심 키워드 추천 태그:
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {response.recommendedTags.map((tag, i) => (
                        <button
                          key={i}
                          onClick={() => handleTagClick(tag)}
                          className="px-2.5 py-1 text-xs font-medium rounded-md bg-white dark:bg-slate-900 text-red-700 dark:text-red-300 border border-red-300 dark:border-red-800 hover:bg-red-100 dark:hover:bg-red-900/50 transition-colors cursor-pointer"
                        >
                          {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* Valid In-Scope Response */
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 sm:p-6 shadow-xs">
              {/* Question & Short Answer Header */}
              <div className="pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="text-xs text-slate-500 dark:text-slate-400 font-medium mb-1">
                  질문: &quot;{response.query}&quot;
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">교과서 정답</span>
                </div>
                <div className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-slate-100 mt-1">
                  {response.shortAnswer}
                </div>
              </div>

              {/* Detailed Explanation */}
              <div className="py-4">
                <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                  <BookOpen className="w-3.5 h-3.5" />
                  교과서 개념 및 인과관계 상세
                </h4>
                <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-normal">
                  {response.detailedExplanation}
                </p>

                {response.keyPoints && response.keyPoints.length > 0 && (
                  <div className="mt-3 bg-slate-50 dark:bg-slate-800/60 rounded-lg p-3 border border-slate-200 dark:border-slate-700/60 space-y-1.5">
                    {response.keyPoints.map((pt, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                        <span>{pt}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Interactive Visual Widget depending on visualType */}
              <div className="mt-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                {/* 1. Era Comparison Visual */}
                {response.visualType === 'era_comparison' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      📊 지질 시대 순서 및 수치 연대 비례도
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                      {GEOLOGICAL_ERAS.map((era) => {
                        const isFocus = era.id === response.highlightEraId;
                        return (
                          <div
                            key={era.id}
                            className={`p-3 rounded-lg border transition-all ${
                              isFocus
                                ? `${era.color.light} ${era.color.border} ring-2 ring-amber-400`
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            <div className="text-xs font-bold text-slate-900 dark:text-slate-100">
                              {era.nameKo}
                            </div>
                            <div className="text-[11px] font-mono tabular-nums text-slate-500 dark:text-slate-400 mt-0.5">
                              {era.startMa} ~ {era.endMa} Ma
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-1">
                              비율: {era.percentageOfEarthHistory}%
                            </div>
                            {isFocus && (
                              <div className="mt-2 text-[10px] font-bold text-amber-700 dark:text-amber-400 flex items-center gap-1">
                                <span>정답 대상</span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Mass Extinction Chart Visual */}
                {(response.visualType === 'extinction_chart' || response.highlightMassExtinctionOrder) && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                        🔥 5대 대멸종 생물종 절멸 비율(%) 비교
                      </div>
                      <span className="text-[11px] text-slate-500 dark:text-slate-400">
                        *페름기 말(3차) 해양종 95% 멸종으로 사상 최대
                      </span>
                    </div>

                    <div className="space-y-2">
                      {MASS_EXTINCTIONS.map((ext) => {
                        const isTarget = ext.order === response.highlightMassExtinctionOrder;
                        return (
                          <div
                            key={ext.order}
                            className={`p-2.5 rounded-lg border transition-all ${
                              isTarget
                                ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800 ring-1 ring-amber-400'
                                : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                            }`}
                          >
                            <div className="flex items-center justify-between text-xs mb-1">
                              <span className="font-bold text-slate-800 dark:text-slate-200">
                                {ext.name}
                              </span>
                              <span className="font-mono tabular-nums font-bold text-red-600 dark:text-red-400">
                                종 멸종률: {ext.extinctionRateSpecies}%
                              </span>
                            </div>

                            {/* Progress bar */}
                            <div className="w-full h-2.5 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
                              <div
                                style={{ width: `${ext.extinctionRateSpecies}%` }}
                                className={`h-full rounded-full transition-all duration-500 ${
                                  ext.isWorstInEarthHistory
                                    ? 'bg-red-600 animate-pulse'
                                    : 'bg-amber-500'
                                }`}
                              />
                            </div>

                            {isTarget && (
                              <div className="mt-2 text-xs text-slate-600 dark:text-slate-400">
                                <span className="font-semibold text-slate-800 dark:text-slate-200">핵심 원인: </span>
                                {ext.causes.join(' · ')}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 3. Climate Graph Visual */}
                {response.visualType === 'climate_graph' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      ❄️ 시대별 빙하기 유무 및 기후 특징 비교표
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                      {GEOLOGICAL_ERAS.map((e) => (
                        <div
                          key={e.id}
                          className={`p-3 rounded-lg border ${
                            e.id === 'mesozoic'
                              ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-300 dark:border-amber-800'
                              : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800'
                          }`}
                        >
                          <div className="font-bold text-slate-900 dark:text-slate-100 flex items-center justify-between">
                            <span>{e.nameKo}</span>
                            {e.id === 'mesozoic' && (
                              <span className="text-[10px] bg-amber-500 text-slate-950 px-1.5 py-0.5 rounded font-bold">
                                빙하기 전무(0회)
                              </span>
                            )}
                          </div>
                          <p className="text-slate-600 dark:text-slate-400 mt-1">
                            {e.iceAges}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Evolution Flow Visual */}
                {response.visualType === 'causality_flow' && (
                  <div className="space-y-3">
                    <div className="text-xs font-bold text-slate-600 dark:text-slate-400">
                      🌿 식물계 변천 및 인과관계 진화 계통
                    </div>
                    <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                      <div className="flex-1 p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-center">
                        <div className="text-[10px] text-slate-400">선캄브리아~고생대 전기</div>
                        <div className="font-bold text-xs text-slate-800 dark:text-slate-200 mt-0.5">해조류</div>
                        <div className="text-[10px] text-slate-500 mt-0.5">바다 서식</div>
                      </div>
                      <div className="text-center font-bold text-slate-400 hidden sm:block">→</div>
                      <div className="flex-1 p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 text-center">
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">고생대 석탄기</div>
                        <div className="font-bold text-xs text-emerald-800 dark:text-emerald-200 mt-0.5">양치식물</div>
                        <div className="text-[10px] text-emerald-600 dark:text-emerald-400 mt-0.5">거대 삼림 (석탄층)</div>
                      </div>
                      <div className="text-center font-bold text-slate-400 hidden sm:block">→</div>
                      <div className="flex-1 p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 text-center">
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">중생대 전 기간</div>
                        <div className="font-bold text-xs text-amber-800 dark:text-amber-200 mt-0.5">겉씨식물</div>
                        <div className="text-[10px] text-amber-600 dark:text-amber-400 mt-0.5">소철·은행 (건조 적응)</div>
                      </div>
                      <div className="text-center font-bold text-slate-400 hidden sm:block">→</div>
                      <div className="flex-1 p-2.5 rounded-lg bg-cyan-50 dark:bg-cyan-950/40 border border-cyan-300 dark:border-cyan-800 text-center ring-1 ring-cyan-400">
                        <div className="text-[10px] text-cyan-600 dark:text-cyan-400 font-medium">신생대 전 기간</div>
                        <div className="font-bold text-xs text-cyan-800 dark:text-cyan-200 mt-0.5">속씨식물</div>
                        <div className="text-[10px] text-cyan-600 dark:text-cyan-400 mt-0.5">단풍·참나무·초원 번성</div>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. Fossil Card Visual */}
                {response.visualType === 'fossil_card' && response.highlightFossilName && (
                  <div className="p-4 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                        화석 표본 카드: {response.highlightFossilName}
                      </span>
                      <span className="text-xs font-semibold text-amber-600 dark:text-amber-400">
                        {response.highlightFossilType === 'facies' ? '시상화석 (환경 증거)' : '표준화석 (시대 증거)'}
                      </span>
                    </div>
                    <div className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {response.highlightFossilType === 'facies' ? (
                        <>
                          생존 기간이 길고 특정 환경에 국한되어 나타나는 시상화석입니다.
                        </>
                      ) : (
                        <>
                          생존 기간이 짧고 넓은 지역에 고루 분포하는 표준화석입니다.
                        </>
                      )}
                    </div>
                  </div>
                )}

                {/* Recommended Related Tags */}
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs text-slate-500 font-medium mr-1">연관 추천 검색:</span>
                  {response.recommendedTags.map((tag, i) => (
                    <button
                      key={i}
                      onClick={() => handleTagClick(tag)}
                      className="px-2.5 py-1 text-xs rounded-md bg-slate-100 dark:bg-slate-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-slate-700 dark:text-slate-300 hover:text-amber-800 dark:hover:text-amber-300 transition-colors cursor-pointer"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
