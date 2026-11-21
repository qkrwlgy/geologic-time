/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 통합과학2 인공지능 질의응답창 (챗 인터페이스)
 * - 관련 질문: 지질시대 기후 그래프(SVG), 화석 목록, 생물 카드(사카밤바스피스, 매머드 등) 시각 응답
 * - 짓궂은 질문: 1., 2., 3. 논리 구조의 팩트 폭행 비판 답변
 * - 비관련 질문: '통합과학2 범위를 벗어난 키워드' 경고 모달 및 수능 빈출 태그 연동
 */

import React, { useState } from 'react';
import { Send, Sparkles, Bot, User, AlertTriangle, ShieldCheck, Image as ImageIcon } from 'lucide-react';
import { answerTextbookQuery, QAResponse, RECOMMENDED_TAGS, FREQUENT_QUESTIONS } from '../utils/textbookQA';
import { OutOfScopeModal } from './OutOfScopeModal';
import { GEOLOGICAL_ERAS, MASS_EXTINCTIONS } from '../data/geologyData';

interface ChatMessage {
  id: string;
  sender: 'user' | 'assistant';
  timestamp: string;
  response: QAResponse;
}

const INITIAL_MESSAGES: ChatMessage[] = [
  {
    id: 'm-init',
    sender: 'assistant',
    timestamp: '지금',
    response: {
      query: '',
      isInScope: true,
      shortAnswer: '안녕하세요! 통합과학2 지질 시대 & 5대 대멸종 인공지능 탐구 봇입니다.',
      detailedExplanation: '선캄브리아대부터 신생대까지의 수치 연대(Ma), 표준·시상 화석, 기후 변화, 5대 대멸종 인과관계에 대해 무엇이든 물어보세요! 사카밤바스피스나 타임머신 오류 찾기 질문도 환영합니다.',
      visualType: 'out_of_scope',
      recommendedTags: RECOMMENDED_TAGS
    }
  }
];

const QUICK_PROMPT_PILLS = [
  '사카밤바스피스는 어느 시대 생물인가요?',
  '내가 타임머신을 타고 신생대로 가서 삼엽충 낚시를 하다가 티라노사우르스한테 쫓겼어. 과학적 오류 3가지 비판해봐',
  '중생대와 신생대 중 무엇이 더 앞임?',
  '신생대에는 어떤 식물이 번성함?',
  '표준화석이 뭐임?',
  '페름기 대멸종 원인은?',
  '빙하기가 없었던 시대는?',
  '오늘 저녁 메뉴 추천해줘'
];

interface AiChatSectionProps {
  onGoToEra?: (eraId: string) => void;
}

export const AiChatSection: React.FC<AiChatSectionProps> = ({ onGoToEra }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(INITIAL_MESSAGES);
  const [inputQuery, setInputQuery] = useState('');
  const [modalQuery, setModalQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deployNotice, setDeployNotice] = useState<string | null>(null);

  const handleSend = (queryText: string) => {
    const text = queryText.trim();
    if (!text) return;

    const answer = answerTextbookQuery(text);

    // If out of scope, trigger the dedicated modal!
    if (!answer.isInScope) {
      setModalQuery(text);
      setIsModalOpen(true);
    }

    const userMsg: ChatMessage = {
      id: `u-${Date.now()}`,
      sender: 'user',
      timestamp: '방금',
      response: {
        query: text,
        isInScope: true,
        shortAnswer: text,
        detailedExplanation: '',
        recommendedTags: []
      }
    };

    const aiMsg: ChatMessage = {
      id: `a-${Date.now()}`,
      sender: 'assistant',
      timestamp: '방금',
      response: answer
    };

    setMessages((prev) => [...prev, userMsg, aiMsg]);
    setInputQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSend(inputQuery);
  };

  const handleSelectTagFromModal = (tag: string) => {
    const cleaned = tag.replace('#', '').replace(/_/g, ' ');
    handleSend(cleaned);
  };

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-sm overflow-hidden text-left">
      {/* Top Header */}
      <div className="px-5 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-amber-500 text-slate-950 flex items-center justify-center font-bold">
            <Bot className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <span>통합과학2 인공지능 질의응답창</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                실시간 응답 중
              </span>
            </h3>
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              교과서 핵심 데이터 · 생물 카드 · 팩트 체크 비판 답변 상시 노출
            </p>
          </div>
        </div>

        {/* Non-deployable AI Image Button */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setDeployNotice('이 기능은 배포판에서는 쓸 수 없어요.')}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-300 hover:border-amber-400 text-[11px] font-semibold flex items-center gap-1.5 cursor-pointer"
          >
            <ImageIcon className="w-3.5 h-3.5 text-amber-500" />
            <span>AI 화석 그림 만들기</span>
          </button>
          <div className="text-right text-[11px] text-slate-400 font-mono hidden sm:block">
            KIGAM &amp; 국립중앙과학관 기준
          </div>
        </div>
      </div>

      {deployNotice && (
        <div className="px-5 py-2.5 bg-amber-50 dark:bg-amber-950/50 border-b border-amber-200 dark:border-amber-900 flex items-center justify-between text-xs text-amber-900 dark:text-amber-200 font-semibold">
          <span>{deployNotice}</span>
          <button
            type="button"
            onClick={() => setDeployNotice(null)}
            className="text-[11px] underline cursor-pointer ml-3"
          >
            닫기
          </button>
        </div>
      )}

      {/* Quick Prompts Bar */}
      <div className="px-5 py-2.5 bg-slate-100/60 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800/80 overflow-x-auto flex items-center gap-1.5 text-xs">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 shrink-0 mr-1 flex items-center gap-1">
          <Sparkles className="w-3 h-3 text-amber-500" />
          탐구 예시:
        </span>
        {QUICK_PROMPT_PILLS.map((pill, i) => (
          <button
            key={i}
            onClick={() => handleSend(pill)}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 hover:border-amber-400 transition-colors text-[11px] whitespace-nowrap cursor-pointer shadow-2xs"
          >
            {pill}
          </button>
        ))}
      </div>

      {/* Messages Stream */}
      <div className="p-4 sm:p-6 space-y-4 max-h-[500px] overflow-y-auto">
        {messages.map((m) => {
          if (m.sender === 'user') {
            return (
              <div key={m.id} className="flex justify-end gap-2.5">
                <div className="max-w-[85%] sm:max-w-[70%] p-3.5 rounded-2xl rounded-tr-xs bg-slate-900 text-white text-xs sm:text-sm font-medium shadow-xs">
                  {m.response.shortAnswer}
                </div>
                <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center shrink-0 text-slate-700 dark:text-slate-300">
                  <User className="w-4 h-4" />
                </div>
              </div>
            );
          }

          const resp = m.response;
          return (
            <div key={m.id} className="flex gap-2.5 text-left">
              <div className="w-7 h-7 rounded-full bg-amber-500 text-slate-950 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4" />
              </div>
              <div className="flex-1 max-w-[95%] sm:max-w-[85%] space-y-3">
                <div className="p-4 rounded-2xl rounded-tl-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                  {/* Short Answer */}
                  <div>
                    <div className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
                      {resp.isPrankOrTrick ? (
                        <span className="text-red-500 font-bold">{resp.shortAnswer}</span>
                      ) : (
                        <span>{resp.shortAnswer}</span>
                      )}
                    </div>
                    {resp.detailedExplanation && (
                      <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {resp.detailedExplanation}
                      </p>
                    )}
                  </div>

                  {/* 팩트 폭행 비판 구조 (1., 2., 3.) for trick questions */}
                  {resp.factCheckPoints && resp.factCheckPoints.length > 0 && (
                    <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-xs space-y-2">
                      <div className="font-bold text-red-700 dark:text-red-300 flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-red-600" />
                        <span>통합과학2 교과서 기반 팩트 체크 및 논리 비판</span>
                      </div>
                      <div className="space-y-1.5 text-red-900 dark:text-red-200">
                        {resp.factCheckPoints.map((pt, idx) => (
                          <div key={idx} className="font-medium leading-relaxed">
                            {pt}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Key points */}
                  {resp.keyPoints && resp.keyPoints.length > 0 && (
                    <div className="p-3 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1">
                      {resp.keyPoints.map((kp, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-slate-700 dark:text-slate-300">
                          <ShieldCheck className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span>{kp}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Organism Card Component (e.g. Sacabambaspis, Trilobite, Mammoth) */}
                  {resp.organismCard && (
                    <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2.5">
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex items-center gap-2.5">
                          {/* Compact Custom SVG Specimen Illustration */}
                          <div className={`w-10 h-10 rounded-xl ${resp.organismCard.svgBadgeColor} flex items-center justify-center shrink-0 shadow-xs text-white`}>
                            {resp.organismCard.id === 'sacabambaspis' ? (
                              <svg viewBox="0 0 36 36" className="w-7 h-7 fill-none stroke-current" strokeWidth="1.8">
                                <ellipse cx="17" cy="18" rx="11" ry="7" fill="currentColor" fillOpacity="0.2" />
                                <path d="M27 18 L33 13 L31 18 L33 23 Z" fill="currentColor" fillOpacity="0.35" />
                                <circle cx="11" cy="16" r="1.8" fill="#fff" />
                                <circle cx="11" cy="20" r="1.8" fill="#fff" />
                                <path d="M8 18 Q6 18 8 18" stroke="#fff" strokeWidth="2" />
                              </svg>
                            ) : resp.organismCard.id === 'ammonite' ? (
                              <svg viewBox="0 0 36 36" className="w-7 h-7 fill-none stroke-current" strokeWidth="1.8">
                                <path d="M18 18 m-1 0 a 1,1 0 1,0 2,0 a 3,3 0 1,0 -6,0 a 6,6 0 1,0 12,0 a 9,9 0 1,0 -18,0" />
                              </svg>
                            ) : resp.organismCard.id === 'trilobite' ? (
                              <svg viewBox="0 0 36 36" className="w-7 h-7 fill-none stroke-current" strokeWidth="1.7">
                                <ellipse cx="18" cy="18" rx="8" ry="12" fill="currentColor" fillOpacity="0.2" />
                                <line x1="15" y1="8" x2="15" y2="28" />
                                <line x1="21" y1="8" x2="21" y2="28" />
                                <line x1="10" y1="14" x2="26" y2="14" />
                                <line x1="10" y1="19" x2="26" y2="19" />
                                <line x1="11" y1="24" x2="25" y2="24" />
                              </svg>
                            ) : (
                              <svg viewBox="0 0 36 36" className="w-7 h-7 fill-none stroke-current" strokeWidth="1.8">
                                <circle cx="18" cy="18" r="10" fill="currentColor" fillOpacity="0.2" />
                                <path d="M12 18 L16 22 L24 14" />
                              </svg>
                            )}
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className={`text-[10px] font-bold text-white px-2 py-0.5 rounded ${resp.organismCard.svgBadgeColor}`}>
                                {resp.organismCard.category}
                              </span>
                              <span className="font-bold text-sm text-slate-900 dark:text-slate-100">
                                {resp.organismCard.nameKo} ({resp.organismCard.nameEn})
                              </span>
                            </div>
                            <div className="text-[11px] text-slate-500 mt-0.5">
                              <strong>서식처:</strong> {resp.organismCard.habitat}
                            </div>
                          </div>
                        </div>
                        <span className="text-[11px] font-mono text-slate-400 shrink-0">
                          {resp.organismCard.periodKo}
                        </span>
                      </div>

                      <ul className="text-xs text-slate-600 dark:text-slate-300 list-disc pl-4 space-y-0.5">
                        {resp.organismCard.features.map((f, i) => (
                          <li key={i}>{f}</li>
                        ))}
                      </ul>

                      <div className="mt-2 text-[11px] p-2 rounded bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 flex items-center justify-between gap-2">
                        <span>💡 {resp.organismCard.funFact}</span>
                        {onGoToEra && (
                          <button
                            onClick={() => onGoToEra(resp.organismCard!.eraId)}
                            className="shrink-0 font-bold text-amber-700 dark:text-amber-300 underline cursor-pointer"
                          >
                            개념 보기 →
                          </button>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Visual: Extinction Chart */}
                  {resp.visualType === 'extinction_chart' && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400 flex items-center justify-between">
                        <span>🔥 5대 대멸종 생물종 절멸 비율(%) 비교</span>
                        <span className="text-red-500 font-bold">*페름기 말 95% 사상 최대</span>
                      </div>
                      <div className="grid grid-cols-5 gap-1.5 text-center">
                        {MASS_EXTINCTIONS.map((ext) => (
                          <div
                            key={ext.order}
                            className={`p-2 rounded-lg border text-xs ${
                              ext.order === resp.highlightMassExtinctionOrder
                                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 text-amber-900 dark:text-amber-200 ring-1 ring-amber-400 font-bold'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div className="text-[10px] text-slate-400">{ext.order}차</div>
                            <div className="font-extrabold text-red-600 dark:text-red-400">{ext.extinctionRateSpecies}%</div>
                            <div className="text-[9px] text-slate-500 truncate">{ext.timingPeriod.split(' ')[1]}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Visual: Era Comparison */}
                  {resp.visualType === 'era_comparison' && (
                    <div className="space-y-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        📊 지질 시대 수치 연대(Ma) 및 지속 기간
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 text-xs">
                        {GEOLOGICAL_ERAS.map((e) => (
                          <div
                            key={e.id}
                            onClick={() => onGoToEra && onGoToEra(e.id)}
                            className={`p-2 rounded-lg border text-center cursor-pointer transition-all hover:border-amber-400 ${
                              e.id === resp.highlightEraId
                                ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 font-bold text-amber-900 dark:text-amber-200 ring-1 ring-amber-400'
                                : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            <div>{e.nameKo}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{e.startMa}~{e.endMa}Ma</div>
                            <div className="text-[9px] text-amber-600 dark:text-amber-400">({e.percentageOfEarthHistory}%)</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Visual: Climate Graph SVG */}
                  {resp.visualType === 'climate_graph' && (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="flex items-center justify-between text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        <span>🌡️ 지질 시대 평균 기온 변화 곡선 및 빙하기 분포</span>
                        <span className="text-amber-600 dark:text-amber-400">*중생대: 빙하기 0회 (온난 지속)</span>
                      </div>
                      <div className="bg-slate-950 rounded-xl p-3 border border-slate-800">
                        <svg viewBox="0 0 560 130" className="w-full h-28 overflow-visible">
                          <rect x="40" y="15" width="120" height="85" fill="#9f1239" fillOpacity="0.18" />
                          <rect x="160" y="15" width="140" height="85" fill="#065f46" fillOpacity="0.18" />
                          <rect x="300" y="15" width="130" height="85" fill="#b45309" fillOpacity="0.25" />
                          <rect x="430" y="15" width="110" height="85" fill="#0e7490" fillOpacity="0.18" />
                          <line x1="40" y1="68" x2="540" y2="68" stroke="#38bdf8" strokeWidth="1" strokeDasharray="3,3" />
                          <text x="5" y="71" fill="#38bdf8" fontSize="9">빙하기</text>
                          <text x="6" y="34" fill="#fbbf24" fontSize="9">온난</text>
                          <path
                            d="M 45,35 C 90,38 125,35 142,88 L 160,42 C 175,40 195,42 208,82 L 228,38 C 250,36 270,84 295,45 C 325,28 395,28 430,36 L 470,48 L 485,84 L 498,54 L 510,85 L 522,56 L 535,84"
                            fill="none"
                            stroke="#fbbf24"
                            strokeWidth="2.5"
                          />
                          <circle cx="142" cy="88" r="3.5" fill="#38bdf8" />
                          <circle cx="208" cy="82" r="3.5" fill="#38bdf8" />
                          <circle cx="275" cy="82" r="3.5" fill="#38bdf8" />
                          <circle cx="510" cy="85" r="3.5" fill="#38bdf8" />
                          <text x="68" y="114" fill="#fda4af" fontSize="10" fontWeight="bold">선캄브리아</text>
                          <text x="210" y="114" fill="#6ee7b7" fontSize="10" fontWeight="bold">고생대 (2회)</text>
                          <text x="328" y="114" fill="#fcd34d" fontSize="10" fontWeight="bold">중생대 (0회!)</text>
                          <text x="452" y="114" fill="#67e8f9" fontSize="10" fontWeight="bold">신생대 제4기(4회)</text>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Visual: Fossil Card & Condition Matrix */}
                  {resp.visualType === 'fossil_card' && (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        🐚 표준화석 vs 시상화석 조건 및 대표 목록
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                        <div className={`p-3 rounded-xl border ${resp.highlightFossilType === 'index' ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-400 ring-1 ring-amber-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                          <div className="font-bold text-amber-700 dark:text-amber-300">표준화석 (지질 시대 결정)</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">• 조건: 생존 기간 <strong>짧음</strong> + 분포 면적 <strong>넓음</strong></div>
                          <div className="text-[11px] text-slate-500 mt-1">• 대표: 삼엽충·필석·갑주어·방추충(고) / 암모나이트·공룡·시조새(중) / 화폐석·매머드(신)</div>
                        </div>
                        <div className={`p-3 rounded-xl border ${resp.highlightFossilType === 'facies' ? 'bg-cyan-50 dark:bg-cyan-950/40 border-cyan-400 ring-1 ring-cyan-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                          <div className="font-bold text-cyan-700 dark:text-cyan-300">시상화석 (과거 환경 추정)</div>
                          <div className="text-[11px] text-slate-600 dark:text-slate-300 mt-1">• 조건: 생존 기간 <strong>김</strong> + 분포 면적 <strong>좁음</strong></div>
                          <div className="text-[11px] text-slate-500 mt-1">• 대표: 산호(따뜻·얕은 바다), 고사리(온난·습윤 육지), 조개(얕은 바다·갯벌)</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Visual: Causality & Evolution Flow */}
                  {resp.visualType === 'causality_flow' && (
                    <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
                      <div className="text-[11px] font-bold text-slate-500 dark:text-slate-400">
                        🌿 지질 시대 식물계 변천 및 환경 적응 순서
                      </div>
                      <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
                        <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
                          <div className="text-[9px] text-slate-400">선캄브리아</div>
                          <div className="font-bold text-slate-800 dark:text-slate-200">해조류</div>
                        </div>
                        <div className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800">
                          <div className="text-[9px] text-emerald-600">고생대</div>
                          <div className="font-bold text-emerald-800 dark:text-emerald-200">양치식물</div>
                        </div>
                        <div className={`p-2 rounded-lg border ${resp.highlightEraId === 'mesozoic' ? 'bg-amber-100 dark:bg-amber-950/60 border-amber-400 ring-1 ring-amber-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                          <div className="text-[9px] text-amber-600">중생대</div>
                          <div className="font-bold text-amber-800 dark:text-amber-200">겉씨식물</div>
                        </div>
                        <div className={`p-2 rounded-lg border ${resp.highlightEraId === 'cenozoic' ? 'bg-cyan-100 dark:bg-cyan-950/60 border-cyan-400 ring-1 ring-cyan-400' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700'}`}>
                          <div className="text-[9px] text-cyan-600">신생대</div>
                          <div className="font-bold text-cyan-800 dark:text-cyan-200">속씨식물</div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  {resp.recommendedTags && resp.recommendedTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-slate-200 dark:border-slate-700">
                      {resp.recommendedTags.map((t, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSelectTagFromModal(t)}
                          className="px-2 py-0.5 rounded text-[11px] bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-amber-600 transition-colors"
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 입력 칸 위: 자주 묻는 질문 버튼 5개 */}
      <div className="px-4 pt-3 pb-2 border-t border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/40 flex flex-wrap items-center gap-1.5">
        <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 mr-1">
          자주 묻는 질문:
        </span>
        {FREQUENT_QUESTIONS.map((fq, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => handleSend(fq)}
            className="px-2.5 py-1 rounded-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-[11px] font-medium text-slate-700 dark:text-slate-300 hover:border-amber-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
          >
            {fq}
          </button>
        ))}
      </div>

      {/* Input Bar */}
      <form onSubmit={handleSubmit} className="px-3 sm:px-4 pb-3 sm:pb-4 pt-1 bg-white dark:bg-slate-900 space-y-1.5">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputQuery}
            onChange={(e) => setInputQuery(e.target.value)}
            placeholder="통합과학2 지질시대와 대멸종에 대해 자유롭게 질문하세요 (예: 페름기 대멸종 원인은?)"
            className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-amber-400 transition-colors flex items-center gap-1.5 shadow-xs cursor-pointer shrink-0"
          >
            <span>질문</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
        <p className="text-[11px] text-slate-400 dark:text-slate-500 pl-1">
          이름 · 학번 · 연락처는 쓰지 마세요
        </p>
      </form>

      {/* Out of Scope Warning Modal */}
      <OutOfScopeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        query={modalQuery}
        onSelectTag={handleSelectTagFromModal}
        recommendedTags={RECOMMENDED_TAGS}
      />
    </div>
  );
};
