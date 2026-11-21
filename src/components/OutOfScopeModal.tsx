/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 통합과학2 범위 외 키워드 입력 시 띄우는 깔끔한 경고 모달
 */

import React from 'react';
import { AlertCircle, X, Sparkles, BookOpen } from 'lucide-react';

interface OutOfScopeModalProps {
  isOpen: boolean;
  onClose: () => void;
  query: string;
  onSelectTag: (tag: string) => void;
  recommendedTags: string[];
}

export const OutOfScopeModal: React.FC<OutOfScopeModalProps> = ({
  isOpen,
  onClose,
  query,
  onSelectTag,
  recommendedTags
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs animate-fadeIn">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          aria-label="닫기"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-3.5">
          <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <AlertCircle className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-slate-100 tracking-tight">
              아직 모르는 질문이에요.
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              입력하신 <span className="font-semibold text-slate-800 dark:text-slate-200">&quot;{query}&quot;</span> 키워드는 통합과학2 범위를 벗어난 키워드이거나 목록에 없는 질문입니다.
            </p>
          </div>
        </div>

        {/* Modal Content */}
        <div className="mt-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          <div className="flex items-center gap-1.5 font-bold text-slate-800 dark:text-slate-200 mb-1">
            <BookOpen className="w-3.5 h-3.5 text-amber-500" />
            <span>통합과학2 정규 학습 범위</span>
          </div>
          <p>
            선캄브리아대부터 신생대까지의 수치 연대(Ma), 표준화석과 시상화석의 조건, 기후 변화 및 5대 대멸종의 인과관계에 대해 질문해 보세요.
          </p>
        </div>

        {/* Recommended Tags Section */}
        <div className="mt-5">
          <div className="text-xs font-bold text-slate-700 dark:text-slate-300 mb-2.5 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>수능·내신 빈출 추천 키워드 태그 (클릭 시 즉시 질의):</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {recommendedTags.map((tag, idx) => (
              <button
                key={idx}
                onClick={() => {
                  onSelectTag(tag);
                  onClose();
                }}
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/80 text-amber-800 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all cursor-pointer active:scale-95"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 text-xs font-bold hover:bg-slate-800 dark:hover:bg-white transition-colors"
          >
            확인 및 닫기
          </button>
        </div>
      </div>
    </div>
  );
};
