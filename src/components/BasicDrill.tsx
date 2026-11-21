/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * [기본 다지기] 핵심 개념 무한 퀴즈 (10문항 비중복 무한 생성)
 * - 한 번당 10문항으로 구성된 핵심 개념 퀴즈를 무한히 제공
 * - [문제 풀기 시작] 버튼으로 시작
 * - 이전 10문제와 내용이 겹치지 않도록 알고리즘 적용
 * - 10문제를 모두 풀이한 후 결과창 및 기본다지기 처음 화면 복귀 지원
 */

import React, { useState } from 'react';
import { generateRandomDrillSet, GeneratedDrillQuestion } from '../utils/drillGenerator';
import { GeologicTimelineBar } from './GeologicTimelineBar';
import { recordDrillResultLocal, store } from '../utils/store';
import { Layers, Play, RotateCcw, CheckCircle2, XCircle, ArrowRight, Sparkles, Check, ShieldAlert, Save } from 'lucide-react';

interface BasicDrillProps {
  onGoHome?: () => void;
  onGoToConceptEra?: (eraId: string) => void;
  onResultRecorded?: () => void;
}

export const BasicDrill: React.FC<BasicDrillProps> = ({ onGoHome, onGoToConceptEra, onResultRecorded }) => {
  const [drillState, setDrillState] = useState<'idle' | 'playing' | 'completed'>('idle');
  const [questions, setQuestions] = useState<GeneratedDrillQuestion[]>([]);
  const [previousSignatures, setPreviousSignatures] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [missedEraIds, setMissedEraIds] = useState<string[]>([]);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [isSavingScore, setIsSavingScore] = useState(false);

  const startNewDrill = () => {
    // 이전 10문제와 절대 겹치지 않는 새로운 10문제 조립!
    const newQuestions = generateRandomDrillSet(previousSignatures);
    const newSignatures = newQuestions.map((q) => q.signature);
    setPreviousSignatures(newSignatures);
    setQuestions(newQuestions);
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setMissedEraIds([]);
    setSaveMessage(null);
    setSaveError(null);
    setDrillState('playing');
  };

  const currentQ = questions[currentIndex];

  const handleSelectOption = (idx: number) => {
    if (selectedAnswer !== null) return;
    setSelectedAnswer(idx);
    if (idx === currentQ.correctIndex) {
      setScore((prev) => prev + 1);
    } else {
      setMissedEraIds((prev) => (prev.includes(currentQ.relatedEra) ? prev : [...prev, currentQ.relatedEra]));
    }
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
    } else {
      recordDrillResultLocal(score * 10, missedEraIds);
      onResultRecorded?.();
      setDrillState('completed');
    }
  };

  const handleSaveScoreToStore = async () => {
    if (isSavingScore || saveMessage) return;
    setIsSavingScore(true);
    setSaveError(null);
    try {
      await store('add', {
        data: {
          type: 'score',
          mode: '기본 다지기',
          score: score * 10,
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

  const handleReturnToInitialScreen = () => {
    setDrillState('idle');
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setScore(0);
    setMissedEraIds([]);
    setSaveMessage(null);
    setSaveError(null);
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 text-left">
      {/* 1. 처음 화면: [문제 풀기 시작] 버튼 */}
      {drillState === 'idle' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 text-center shadow-xs space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
            <Layers className="w-8 h-8" />
          </div>

          <div className="space-y-2 max-w-lg mx-auto">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 dark:bg-cyan-950/40 text-cyan-700 dark:text-cyan-300 text-xs font-semibold border border-cyan-200 dark:border-cyan-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>핵심 개념 무한 문제 생성 알고리즘</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100 tracking-tight">
              [기본 다지기] 10문항 핵심 개념 훈련
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
              화석의 정의, 지질 시대 매핑, 기후와 수치 연대 템플릿 알고리즘이 매번 이전 10문제와 겹치지 않는 새로운 10문제를 무한정 조립 출제합니다.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-xs text-left">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-800 dark:text-slate-200">10문항 구성</div>
              <div className="text-slate-500 mt-0.5">화석 조건 및 시대 매핑</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-800 dark:text-slate-200">이전 문제 비중복</div>
              <div className="text-slate-500 mt-0.5">매번 새로운 조합 생성</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <div className="font-bold text-slate-800 dark:text-slate-200">즉각 해설 확인</div>
              <div className="text-slate-500 mt-0.5">정답 및 인과관계 정리</div>
            </div>
          </div>

          {/* [문제 풀기 시작] 버튼 (한 세트, 세트1 표기 제거) */}
          <button
            onClick={startNewDrill}
            className="px-8 py-3.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-sm sm:text-base shadow-sm hover:shadow-md transition-all flex items-center justify-center gap-2 mx-auto cursor-pointer active:scale-98"
          >
            <Play className="w-5 h-5 fill-current" />
            <span>[문제 풀기 시작]</span>
          </button>
        </div>
      )}

      {/* 2. 문제 풀이 화면: 10문항 순차 진행 */}
      {drillState === 'playing' && currentQ && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-xs space-y-6 text-left">
          {/* Header Progress */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div>
              <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400">
                기본 다지기
              </span>
              <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400">
                문항 {currentIndex + 1} / 10 · [{currentQ.topic}]
              </h3>
            </div>
            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-300">
                현재 득점: {score} / 10
              </span>
              <div className="w-28 h-2 rounded-full bg-slate-100 dark:bg-slate-800 mt-1 overflow-hidden">
                <div
                  className="h-full bg-cyan-500 transition-all duration-300"
                  style={{ width: `${((currentIndex + 1) / 10) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Question Title */}
          <div className="p-4 sm:p-5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
            <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-slate-100 leading-snug">
              {currentQ.question}
            </h4>
          </div>

          {/* 4 Choices */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isSelected = selectedAnswer === idx;
              const isCorrect = currentQ.correctIndex === idx;

              let btnStyle = 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-cyan-400 text-slate-800 dark:text-slate-200';
              if (selectedAnswer !== null) {
                if (isCorrect) {
                  btnStyle = 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100 ring-2 ring-emerald-400 font-bold';
                } else if (isSelected && !isCorrect) {
                  btnStyle = 'bg-red-50 dark:bg-red-950/40 border-red-500 text-red-900 dark:text-red-100 ring-2 ring-red-400';
                } else {
                  btnStyle = 'opacity-40 border-slate-200 dark:border-slate-800';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={selectedAnswer !== null}
                  onClick={() => handleSelectOption(idx)}
                  className={`w-full p-4 rounded-xl border text-xs sm:text-sm transition-all flex items-center justify-between text-left cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <span>{opt}</span>
                  </div>

                  {selectedAnswer !== null && isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                  )}
                  {selectedAnswer !== null && isSelected && !isCorrect && (
                    <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Banner */}
          {selectedAnswer !== null && (
            <div className={`p-4 rounded-xl border text-xs leading-relaxed ${
              selectedAnswer === currentQ.correctIndex
                ? 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                : 'bg-red-50 dark:bg-red-950/30 border-red-300 dark:border-red-800 text-red-900 dark:text-red-200'
            }`}>
              <div className="font-bold mb-1 flex items-center gap-1.5 text-sm">
                {selectedAnswer === currentQ.correctIndex ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-600" />
                    <span>정답입니다! (+1점)</span>
                  </>
                ) : (
                  <>
                    <XCircle className="w-4 h-4 text-red-600" />
                    <span>오답입니다! (정답: {currentQ.correctIndex + 1}번)</span>
                  </>
                )}
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Next Button */}
          {selectedAnswer !== null && (
            <div className="pt-2 flex justify-end">
              <button
                onClick={handleNext}
                className="px-6 py-3 rounded-xl bg-slate-900 dark:bg-cyan-500 text-white dark:text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-800 dark:hover:bg-cyan-400 transition-colors flex items-center gap-2 cursor-pointer shadow-xs"
              >
                <span>{currentIndex + 1 === 10 ? '채점 결과 확인하기' : '다음 문제'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* 3. 10문제 모두 풀이 완료 결과창 -> [다시 하기 (이전과 안 겹치는 10문제)] 및 기본다지기 처음 화면 복귀 */}
      {drillState === 'completed' && (
        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-8 sm:p-10 text-center shadow-xs space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-cyan-100 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mx-auto shadow-inner">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest">
              기본 다지기 10문제 완료
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-slate-100">
              100점 중 {score * 10}점! ({score >= 8 ? '5대 대멸종 지식 구출 완료' : '오답 시대 핵심 개념 보강 추천'})
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
              10문제 중 {score}문제 정답 · 틀린 문항에 해당하는 지질시대만 타임라인에 빨간색으로 표시됩니다.
            </p>
          </div>

          {/* Screen 3: 틀린 시대만 타임라인에 빨간색 표시 */}
          <div className="text-left space-y-2 pt-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
              <span className="flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-red-500" />
                <span>취약 지질시대 타임라인 진단</span>
              </span>
              {missedEraIds.length === 0 && (
                <span className="text-emerald-600 font-bold">전 시대 오답 없음!</span>
              )}
            </div>
            <GeologicTimelineBar
              missedEraIds={missedEraIds}
              onSelectEra={(eraId) => onGoToConceptEra && onGoToConceptEra(eraId)}
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-3">
            {/* 다시 하기: 이전 10문제와 안 겹치는 10문제 바로 생성 */}
            <button
              onClick={startNewDrill}
              className="px-6 py-3 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs sm:text-sm transition-all flex items-center gap-2 cursor-pointer shadow-xs active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>다시 하기 (이전과 안 겹치는 10문제 생성)</span>
            </button>

            <button
              type="button"
              onClick={handleSaveScoreToStore}
              disabled={isSavingScore || Boolean(saveMessage)}
              className="px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-60"
            >
              <Save className="w-4 h-4" />
              <span>{saveMessage ? saveMessage : '내 저장소에 점수 기록'}</span>
            </button>

            {/* 기본다지기의 처음 화면으로 돌아오는 버튼 */}
            <button
              onClick={handleReturnToInitialScreen}
              className="px-5 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5"
            >
              <span>기본다지기 처음 화면으로</span>
            </button>

            {onGoHome && (
              <button
                onClick={onGoHome}
                className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm transition-colors cursor-pointer flex items-center gap-1.5 shadow-xs"
              >
                <span>🧭 처음으로</span>
              </button>
            )}
          </div>

          {saveError && (
            <p className="text-xs text-red-600 dark:text-red-400 font-medium">{saveError}</p>
          )}
        </div>
      )}
    </div>
  );
};
