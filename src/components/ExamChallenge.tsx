/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * [실전 도전] 수능·평가원 기출 모방 'ㄱ, ㄴ, ㄷ 보기 조합형 변형 킬러 문제'
 * - 1회 도전 시 딱 10문제 제한 라운드
 * - 지층 단면도 (X-Y 단층, P-Q 부정합) 및 해양 생물 과의 수 꺾은선 그래프 자료 가시화
 * - 오지선다 버튼 제공
 * - 채점 완료 시: "100점 중 XX점! (5대 대멸종 지식 구출 완료)" 및 틀린 시대만 타임라인에 빨간색 경고 표시
 */

import React, { useState } from 'react';
import { CSAT_KILLER_QUESTIONS } from '../utils/examGenerator';
import { ScientificDiagram } from './ScientificDiagram';
import { GeologicTimelineBar } from './GeologicTimelineBar';
import { recordExamResultLocal, store } from '../utils/store';
import { Award, CheckCircle2, XCircle, RotateCcw, ArrowRight, ShieldAlert, Sparkles, BookOpen, Save } from 'lucide-react';

interface ExamChallengeProps {
  onGoToConceptEra?: (eraId: string) => void;
  onGoHome?: () => void;
  onResultRecorded?: () => void;
}

export const ExamChallenge: React.FC<ExamChallengeProps> = ({
  onGoToConceptEra,
  onGoHome,
  onResultRecorded
}) => {
  const [userAnswers, setUserAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState(0);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSavingScore, setIsSavingScore] = useState(false);

  const questions = CSAT_KILLER_QUESTIONS;
  const totalQuestions = questions.length; // 10문제 제한
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (questionId: number, optionIndex: number) => {
    if (isSubmitted) return;
    setUserAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex
    }));
  };

  // Calculate score (10 points each = 100 max)
  const score = isSubmitted
    ? questions.reduce((acc, q) => {
        return userAnswers[q.id] === q.correctIndex ? acc + 10 : acc;
      }, 0)
    : 0;

  // Identify which eras were missed
  const missedEraIds: string[] = isSubmitted
    ? Array.from(
        new Set(
          questions
            .filter((q) => userAnswers[q.id] !== q.correctIndex)
            .map((q) => q.relatedEra)
        )
      )
    : [];

  const handleReset = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setActiveQuestionIndex(0);
    setSaveMessage(null);
    setSaveError(null);
  };

  const handleSubmitExam = () => {
    const computedScore = questions.reduce((acc, q) => {
      return userAnswers[q.id] === q.correctIndex ? acc + 10 : acc;
    }, 0);
    const computedMissed = Array.from(
      new Set(
        questions
          .filter((q) => userAnswers[q.id] !== q.correctIndex)
          .map((q) => q.relatedEra)
      )
    );
    recordExamResultLocal(computedScore, computedMissed);
    onResultRecorded?.();
    setIsSubmitted(true);
  };

  const handleSaveScoreToStore = async () => {
    if (isSavingScore || saveMessage) return;
    setIsSavingScore(true);
    setSaveError(null);
    try {
      await store('add', {
        data: {
          type: 'score',
          mode: '실전 도전',
          score,
          missedEras: missedEraIds,
        },
      });
      setSaveMessage('내 저장소에 기록되었어요.');
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : '점수를 저장하지 못했어요.');
    } finally {
      setIsSavingScore(false);
    }
  };

  const currentQ = questions[activeQuestionIndex];

  return (
    <div className="space-y-6 text-left">
      {!isSubmitted ? (
        /* 1. Exam In Progress */
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-7 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800 gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-bold">
                  <Award className="w-5 h-5" />
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
                  [실전 도전] 수능·평가원 기출 모방 킬러 모의평가
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                1회 10문제 제한 라운드 · ㄱ, ㄴ, ㄷ 보기 조합형 킬러 문항 (100점 만점)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 font-medium">마킹 현황:</span>
              <span className="font-mono tabular-nums text-sm font-bold text-amber-600 dark:text-amber-400">
                {answeredCount} / {totalQuestions}
              </span>
            </div>
          </div>

          {/* Question Index Pills */}
          <div className="flex flex-wrap gap-1.5">
            {questions.map((q, idx) => {
              const isAnswered = userAnswers[q.id] !== undefined;
              const isActive = activeQuestionIndex === idx;
              return (
                <button
                  key={q.id}
                  onClick={() => setActiveQuestionIndex(idx)}
                  className={`w-9 h-9 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center justify-center ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 ring-2 ring-amber-300 shadow-xs'
                      : isAnswered
                      ? 'bg-slate-900 text-white dark:bg-slate-700'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>

          {/* Current Killer Question */}
          <div className="space-y-5">
            {/* Title & Material */}
            <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-400 font-extrabold border border-amber-500/30">
                    문항 {activeQuestionIndex + 1} / {totalQuestions}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold">
                    [출처: {currentQ.source}]
                  </span>
                  <span className="text-slate-500 text-[11px]">
                    주제: {currentQ.topic}
                  </span>
                </div>
                <span className="font-bold text-slate-600 dark:text-slate-400">배점: 10점</span>
              </div>
              <h4 className="text-sm font-extrabold text-slate-900 dark:text-slate-100">
                {currentQ.title}
              </h4>
              <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
                {currentQ.materialDescription}
              </p>
            </div>

            {/* Scientific Diagram Graphic */}
            <ScientificDiagram type={currentQ.diagramType} data={currentQ.diagramData} />

            {/* <보기> Box */}
            <div className="p-4 rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-2xs space-y-2.5">
              <div className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest text-center border-b border-slate-100 dark:border-slate-800 pb-1.5">
                &lt; 보 기 &gt;
              </div>
              <div className="space-y-2 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed">
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">ㄱ.</span>
                  <span>{currentQ.statementG}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">ㄴ.</span>
                  <span>{currentQ.statementN}</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400 shrink-0">ㄷ.</span>
                  <span>{currentQ.statementD}</span>
                </div>
              </div>
            </div>

            {/* 5 CSAT Choice Buttons (오지선다) */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-600 dark:text-slate-400 mb-1">
                답안 선택 (오지선다):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = userAnswers[currentQ.id] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelectOption(currentQ.id, optIdx)}
                      className={`p-3 rounded-xl border text-center text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-amber-500 text-slate-950 border-amber-500 shadow-sm ring-2 ring-amber-300'
                          : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-amber-400 text-slate-800 dark:text-slate-200'
                      }`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-800">
              <button
                disabled={activeQuestionIndex === 0}
                onClick={() => setActiveQuestionIndex((prev) => prev - 1)}
                className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                이전 문항
              </button>

              {activeQuestionIndex < totalQuestions - 1 ? (
                <button
                  onClick={() => setActiveQuestionIndex((prev) => prev + 1)}
                  className="px-5 py-2 rounded-lg text-xs font-bold text-white bg-slate-900 dark:bg-slate-100 dark:text-slate-900 hover:bg-slate-800 dark:hover:bg-white flex items-center gap-1.5"
                >
                  <span>다음 문항</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmitExam}
                  className="px-6 py-2.5 rounded-lg text-xs font-extrabold text-slate-950 bg-amber-500 hover:bg-amber-400 transition-colors shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <span>최종 채점하기 ({answeredCount}/{totalQuestions})</span>
                  <CheckCircle2 className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        /* ============================================================== */
        /* 2. 화면 3: 결과 보고서 (100점 중 85점! 5대 대멸종 지식 구출 완료) */
        /* 틀린 시대만 타임라인에 빨간색 보더/경고 아이콘 하이라이트 표시! */
        /* ============================================================== */
        <div className="space-y-6">
          {/* Result Banner */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 text-center shadow-xs space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto shadow-inner">
              <Sparkles className="w-8 h-8" />
            </div>

            <div>
              <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                고등학교 통합과학2 수능 킬러 모의평가 성적표
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-slate-100 mt-1">
                100점 중 {score}점! ({score >= 80 ? '5대 대멸종 지식 구출 완료' : '인과관계 보강 추천'})
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
                10문항 중 {score / 10}문항 정답 · 틀린 문항에 해당하는 지질시대 영역만 타임라인 상에 빨간색으로 표시됩니다.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <button
                onClick={handleReset}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-slate-800 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-4 h-4" />
                <span>시험 다시 도전하기</span>
              </button>

              <button
                type="button"
                onClick={handleSaveScoreToStore}
                disabled={isSavingScore || Boolean(saveMessage)}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs disabled:opacity-60"
              >
                <Save className="w-4 h-4" />
                <span>{saveMessage ? saveMessage : '내 저장소에 점수 기록'}</span>
              </button>

              {onGoHome && (
                <button
                  onClick={onGoHome}
                  className="px-5 py-2.5 rounded-xl bg-amber-500 text-slate-950 text-xs font-bold hover:bg-amber-400 transition-colors inline-flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>🧭 처음으로 복귀</span>
                </button>
              )}
            </div>

            {saveError && (
              <p className="text-xs text-red-600 dark:text-red-400 font-medium">{saveError}</p>
            )}
          </div>

          {/* CRITICAL REQUIREMENT: 틀린 시대만 타임라인에 빨간색 보더/경고 아이콘으로 하이라이트 표시 */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span>오답 진단: 취약 지질시대 타임라인 (빨간색 영역 클릭 시 개념 이동)</span>
              </div>
              {missedEraIds.length > 0 ? (
                <span className="text-red-600 dark:text-red-400 font-bold animate-pulse">
                  *오답 발생 시대: {missedEraIds.length}개 구간 경고
                </span>
              ) : (
                <span className="text-emerald-600 font-bold">
                  *전 시대 만점 달성!
                </span>
              )}
            </div>
            <GeologicTimelineBar
              missedEraIds={missedEraIds}
              onSelectEra={(eraId) => onGoToConceptEra && onGoToConceptEra(eraId)}
            />
          </div>

          {/* Detailed Question Review & ㄱ, ㄴ, ㄷ Statement Breakdown */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <h3 className="text-base font-bold text-slate-900 dark:text-slate-100 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                <span>문항별 정답 분석 및 ㄱ, ㄴ, ㄷ 인과관계 오답 노트</span>
              </h3>
              <span className="text-xs text-slate-400">10문항 전수 해설</span>
            </div>

            <div className="space-y-4">
              {questions.map((q, idx) => {
                const userAns = userAnswers[q.id];
                const isCorrect = userAns === q.correctIndex;

                return (
                  <div
                    key={q.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isCorrect
                        ? 'bg-slate-50/60 dark:bg-slate-800/30 border-slate-200 dark:border-slate-800'
                        : 'bg-red-50/40 dark:bg-red-950/20 border-red-300 dark:border-red-900/60 ring-1 ring-red-400/40'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs mb-2">
                      <div className="flex items-center gap-2">
                        {isCorrect ? (
                          <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-bold">
                            <CheckCircle2 className="w-4 h-4" />
                            {idx + 1}번 정답 (+10점)
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-red-600 dark:text-red-400 font-bold animate-pulse">
                            <XCircle className="w-4 h-4" />
                            {idx + 1}번 오답 [관련 시대: {q.relatedEra === 'precambrian' ? '선캄브리아 시대' : q.relatedEra === 'paleozoic' ? '고생대' : q.relatedEra === 'mesozoic' ? '중생대' : '신생대'}]
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">[{q.topic}]</span>
                    </div>

                    <div className="text-[11px] font-semibold text-amber-700 dark:text-amber-400 mb-1">
                      [출처: {q.source}]
                    </div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
                      {q.title}
                    </h4>

                    {/* Marking check */}
                    <div className="text-xs space-y-1 mb-3">
                      <div className="text-slate-700 dark:text-slate-300">
                        <strong>내가 선택한 답:</strong>{' '}
                        <span className={isCorrect ? 'text-emerald-700 dark:text-emerald-400 font-bold' : 'text-red-600 dark:text-red-400 font-bold'}>
                          {userAns !== undefined ? q.options[userAns] : '미응답'}
                        </span>
                      </div>
                      {!isCorrect && (
                        <div className="text-emerald-700 dark:text-emerald-400 font-bold">
                          <strong>정답:</strong> {q.options[q.correctIndex]}
                        </div>
                      )}
                    </div>

                    {/* ㄱ, ㄴ, ㄷ Detailed Proposition Analysis */}
                    <div className="p-3.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs space-y-2">
                      <div className="font-bold text-slate-700 dark:text-slate-300">
                        &lt;보기 지문별 판별 및 팩트 분석&gt;
                      </div>
                      <div className="space-y-1 text-slate-600 dark:text-slate-300">
                        <div className="flex items-start gap-1.5">
                          <span className={`font-bold shrink-0 ${q.analysisG.isTrue ? 'text-emerald-600' : 'text-red-600'}`}>
                            ㄱ ({q.analysisG.isTrue ? '참' : '거짓'}):
                          </span>
                          <span>{q.analysisG.reason}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className={`font-bold shrink-0 ${q.analysisN.isTrue ? 'text-emerald-600' : 'text-red-600'}`}>
                            ㄴ ({q.analysisN.isTrue ? '참' : '거짓'}):
                          </span>
                          <span>{q.analysisN.reason}</span>
                        </div>
                        <div className="flex items-start gap-1.5">
                          <span className={`font-bold shrink-0 ${q.analysisD.isTrue ? 'text-emerald-600' : 'text-red-600'}`}>
                            ㄷ ({q.analysisD.isTrue ? '참' : '거짓'}):
                          </span>
                          <span>{q.analysisD.reason}</span>
                        </div>
                      </div>

                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-amber-700 dark:text-amber-400 font-medium">
                        💡 핵심 인과관계 개념: {q.coreCausalityConcept}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
