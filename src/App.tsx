/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 고등학교 통합과학2 인터랙티브 지질 시대 및 5대 대멸종 학습 앱 (GitHub Pages 배포판)
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { GeologicTimelineBar } from './components/GeologicTimelineBar';
import { ConceptExplorer } from './components/ConceptExplorer';
import { BasicDrill } from './components/BasicDrill';
import { ExamChallenge } from './components/ExamChallenge';
import { SmartSearchBar } from './components/SmartSearchBar';
import { AiChatSection } from './components/AiChatSection';
import { StudyStorageBoard } from './components/StudyStorageBoard';
import { loadLocalProgress, loadDarkModeLocal, saveDarkModeLocal, LocalStudyProgress } from './utils/store';
import heroTimelineImg from './assets/images/geo_timeline_hero_1793416101472.jpg';
import { BookOpen, Layers, Award, Sparkles, ArrowRight, Flame, Search, Shell, Clock, Compass } from 'lucide-react';

type TabKey = 'home' | 'concept' | 'drill' | 'exam' | 'search';

const ROUTE_BY_TAB: Record<TabKey, string> = {
  home: '/',
  concept: '/concept',
  drill: '/drill',
  exam: '/exam',
  search: '/search',
};

function tabFromPath(pathname: string): TabKey {
  if (pathname.startsWith('/concept')) return 'concept';
  if (pathname.startsWith('/drill')) return 'drill';
  if (pathname.startsWith('/exam')) return 'exam';
  if (pathname.startsWith('/search')) return 'search';
  return 'home';
}

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentTab = tabFromPath(location.pathname);

  const [selectedEraForConcept, setSelectedEraForConcept] = useState<string>('paleozoic');
  const [selectedExtinctionForConcept, setSelectedExtinctionForConcept] = useState<1 | 2 | 3 | 4 | 5 | undefined>(
    undefined
  );
  const [localProgress, setLocalProgress] = useState<LocalStudyProgress>(() => loadLocalProgress());

  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const saved = loadDarkModeLocal();
    if (saved !== null) return saved;
    if (typeof window !== 'undefined') {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    const root = document.documentElement;
    if (isDarkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    saveDarkModeLocal(isDarkMode);
  }, [isDarkMode]);

  const refreshLocalProgress = () => {
    setLocalProgress(loadLocalProgress());
  };

  const handleToggleDarkMode = () => {
    setIsDarkMode((prev) => !prev);
  };

  const navigateToTab = (tab: TabKey) => {
    setSelectedExtinctionForConcept(undefined);
    navigate(ROUTE_BY_TAB[tab]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleGoHome = () => {
    navigateToTab('home');
  };

  const handleEraClickFromTimeline = (eraId: string) => {
    setSelectedEraForConcept(eraId);
    setSelectedExtinctionForConcept(undefined);
    navigate(ROUTE_BY_TAB.concept);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExtinctionClickFromTimeline = (order: 1 | 2 | 3 | 4 | 5) => {
    setSelectedExtinctionForConcept(order);
    navigate(ROUTE_BY_TAB.concept);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-150">
      {/* 상시 배치: Top Bar Header (🧭 처음으로 버튼 항상 상시 배치) */}
      <Header
        currentTab={currentTab}
        onSelectTab={navigateToTab}
        isDarkMode={isDarkMode}
        onToggleDarkMode={handleToggleDarkMode}
      />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-8">
        <Routes>
          {/* ============================================================== */}
          {/* 화면 1 (메인 홈) */}
          {/* ============================================================== */}
          <Route
            path="/"
            element={
              <div className="space-y-8 animate-fadeIn">
                {/* Hero Section */}
                <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-amber-600 via-amber-700 to-slate-900 text-white p-6 sm:p-10 shadow-lg">
                  <div className="relative z-10 max-w-3xl space-y-4 text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/15 backdrop-blur-xs text-xs font-semibold text-amber-200 border border-white/20">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>2022 개정 고등학교 통합과학2 완벽 대비</span>
                    </div>
                    <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
                      지질 시대와 5대 대멸종 <br className="hidden sm:inline" />
                      인터랙티브 시각화 탐구실
                    </h1>
                    <p className="text-sm sm:text-base text-amber-100/90 leading-relaxed">
                      선캄브리아 시대부터 신생대까지의 <strong>수치 연대(백만 년 단위, Ma)</strong>,
                      <strong> 표준화석과 시상화석의 조건</strong>, <strong>기후 변화 곡선</strong>, 그리고{' '}
                      <strong>5대 대멸종의 원인과 멸종 비율(교과서 기준)</strong>을 인과관계 중심으로 학습하세요.
                    </p>

                    {/* Quick stats */}
                    <div className="pt-2 flex flex-wrap items-center gap-4 sm:gap-6 text-xs text-amber-200">
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4 text-amber-300" />
                        <span>
                          지구 역사 <strong>46억 년 (4600 Ma)</strong>
                        </span>
                      </div>
                      <span className="text-amber-400">·</span>
                      <div className="flex items-center gap-1.5">
                        <Shell className="w-4 h-4 text-amber-300" />
                        <span>
                          표준·시상화석 <strong>대표 표본</strong>
                        </span>
                      </div>
                      <span className="text-amber-400">·</span>
                      <div className="flex items-center gap-1.5">
                        <Flame className="w-4 h-4 text-amber-300" />
                        <span>
                          5대 대멸종 <strong>인과관계 분석</strong>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Decorative Background Artwork */}
                  <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-20 pointer-events-none hidden md:block">
                    <img
                      src={heroTimelineImg}
                      alt="Geological Timeline Strata"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>

                {/* Global Timeline Bar Component */}
                <div className="space-y-2 text-left">
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-600 dark:text-slate-400">
                    <span>지질 시대 전체 타임라인 (구간을 클릭하면 해당 시대로 바로 이동합니다)</span>
                    <span>불꽃 아이콘(🔥)은 5대 대멸종 발생 지점</span>
                  </div>
                  <GeologicTimelineBar
                    onSelectEra={handleEraClickFromTimeline}
                    onSelectMassExtinction={handleExtinctionClickFromTimeline}
                  />
                </div>

                {/* 세 개의 대형 선택 버튼: [개념 익히기], [기본 다지기], [실전 도전] */}
                <div className="space-y-3 text-left">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
                      3단계 맞춤형 학습 모드 선택
                    </h2>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      원하는 학습 단계를 클릭해 시작하세요
                    </span>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                    {/* 1. [개념 익히기] 카드 버튼 */}
                    <button
                      onClick={() => navigateToTab('concept')}
                      className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-amber-400 dark:hover:border-amber-500 transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                          <BookOpen className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 mb-1">
                          STEP 1 · 인과관계 도표
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                          [개념 익히기]
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          4대 지질시대 탭 전환 대시보드! 판게아 형성 → 해안선 감소 → 대멸종 등 기후와 수륙 분포의 인과관계를 직관적인 도표로 시각화합니다.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600">
                        <span>개념 탐구 시작</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* 2. [기본 다지기] 카드 버튼 */}
                    <button
                      onClick={() => navigateToTab('drill')}
                      className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-cyan-400 dark:hover:border-cyan-500 transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-cyan-50 dark:bg-cyan-950/60 text-cyan-600 dark:text-cyan-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                          <Layers className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
                          STEP 2 · 무한 10문항 생성
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                          [기본 다지기]
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          한 번에 10문항으로 구성된 핵심 개념 퀴즈를 무한히 제공합니다. 다시 하기 시 이전과 겹치지 않는 새로운 10문제가 무한정 생성됩니다.
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-cyan-600">
                        <span>무한 퀴즈 시작</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>

                    {/* 3. [실전 도전] 카드 버튼 */}
                    <button
                      onClick={() => navigateToTab('exam')}
                      className="group relative p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 dark:hover:border-emerald-500 transition-all duration-200 text-left shadow-xs hover:shadow-md cursor-pointer flex flex-col justify-between"
                    >
                      <div>
                        <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-4 group-hover:scale-105 transition-transform">
                          <Award className="w-6 h-6" />
                        </div>
                        <div className="text-xs font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 mb-1">
                          STEP 3 · 수능 킬러 10문항
                        </div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                          [실전 도전]
                        </h3>
                        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                          지층 단면도(X-Y 단층, P-Q 부정합)와 해양 생물 꺾은선 그래프가 탑재된 수능 평가원 모방 &lt;ㄱ, ㄴ, ㄷ&gt; 킬러 모의평가(10문제 제한).
                        </p>
                      </div>

                      <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-emerald-600">
                        <span>킬러 모의고사 응시</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* 하단에 자유롭게 질문할 수 있는 '통합과학2 인공지능 질의응답창' 상시 노출 */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-left">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight flex items-center gap-2">
                      <Search className="w-5 h-5 text-amber-500" />
                      <span>통합과학2 인공지능 질의응답창 (상시 노출)</span>
                    </h3>
                    <span className="text-xs text-slate-500 dark:text-slate-400">
                      사카밤바스피스 · 타임머신 낚시 팩트폭행 · 5대 대멸종
                    </span>
                  </div>
                  <AiChatSection onGoToEra={handleEraClickFromTimeline} />
                </div>

                {/* 학습 기록(localStorage) & 암기 노트 공유(내 저장소) 보드 */}
                <StudyStorageBoard localProgress={localProgress} />
              </div>
            }
          />

          {/* 화면 2: [개념 익히기] */}
          <Route
            path="/concept"
            element={
              <div className="space-y-6 animate-fadeIn">
                <ConceptExplorer
                  initialEraId={selectedEraForConcept}
                  initialExtinctionOrder={selectedExtinctionForConcept}
                />
              </div>
            }
          />

          {/* 화면 2: [기본 다지기] */}
          <Route
            path="/drill"
            element={
              <div className="space-y-6 animate-fadeIn">
                <BasicDrill
                  onGoHome={handleGoHome}
                  onGoToConceptEra={handleEraClickFromTimeline}
                  onResultRecorded={refreshLocalProgress}
                />
              </div>
            }
          />

          {/* 화면 2 & 3: [실전 도전] */}
          <Route
            path="/exam"
            element={
              <div className="space-y-6 animate-fadeIn">
                <ExamChallenge
                  onGoToConceptEra={handleEraClickFromTimeline}
                  onGoHome={handleGoHome}
                  onResultRecorded={refreshLocalProgress}
                />
              </div>
            }
          />

          {/* 화면 2: 스마트 검색 전용 뷰 */}
          <Route
            path="/search"
            element={
              <div className="space-y-6 animate-fadeIn">
                <SmartSearchBar
                  onNavigateToEra={handleEraClickFromTimeline}
                  onNavigateToExtinction={handleExtinctionClickFromTimeline}
                />
              </div>
            }
          />

          {/* Fallback route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* Floating [🧭 처음으로] Button at bottom-right for instant home return from anywhere */}
      {currentTab !== 'home' && (
        <button
          onClick={handleGoHome}
          className="fixed bottom-6 right-6 z-40 px-4 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs shadow-lg hover:shadow-xl transition-all flex items-center gap-2 cursor-pointer active:scale-95 border-2 border-white dark:border-slate-800"
          title="언제든 안전하게 처음 화면(홈)으로 복귀합니다"
        >
          <Compass className="w-4 h-4 animate-spin-slow" />
          <span>🧭 처음으로</span>
        </button>
      )}

      {/* Footer */}
      <footer className="mt-12 border-t border-slate-200 dark:border-slate-800 py-6 text-center text-xs text-slate-500 dark:text-slate-400 bg-white/50 dark:bg-slate-900/50">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>고등학교 통합과학2 지질 시대 및 5대 대멸종 시각화 학습 센터</div>
          <div className="text-[11px] text-slate-400">
            기준: 2022 개정 고등학교 통합과학2 교과서 · 한국지질자원연구원(KIGAM) · 국립중앙과학관
          </div>
        </div>
      </footer>
    </div>
  );
}
