/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 배포판 학습 저장소 & 암기 노트 공유 보드
 * - 이 기기(localStorage): 최고 점수 및 누적 풀이 횟수 저장
 * - 내 저장소(store): 암기 노트(type: 'note'), 5대 대멸종 투표(type: 'vote'), 성적 기록(type: 'score')
 */

import React, { useEffect, useState, useCallback } from 'react';
import { RefreshCw, StickyNote, BarChart3, Award, Trash2, Edit3, Check, X, AlertCircle, Send } from 'lucide-react';
import { store, getToken, StoreItem, LocalStudyProgress } from '../utils/store';

interface StudyStorageBoardProps {
  localProgress: LocalStudyProgress;
}

const VOTE_CHOICES = [
  '1차 오르도비스기 말 (기온 급감, 85%)',
  '2차 데본기 말 (해양 무산소화, 75%)',
  '3차 페름기 말 (판게아·화산, 95% 최대)',
  '4차 트라이아스기 말 (마그마 분출, 80%)',
  '5차 백악기 말 (소행성 충돌, 75%)',
];

const ERA_OPTIONS = ['전체', '선캄브리아 시대', '고생대', '중생대', '신생대'];

export const StudyStorageBoard: React.FC<StudyStorageBoardProps> = ({ localProgress }) => {
  const [items, setItems] = useState<StoreItem[]>([]);
  const [currentUser, setCurrentUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [storeError, setStoreError] = useState<string | null>(null);

  // Note form state
  const [noteEra, setNoteEra] = useState<string>('고생대');
  const [noteTopic, setNoteTopic] = useState<string>('');
  const [noteContent, setNoteContent] = useState<string>('');

  // Edit note state (only visible when currentUser && item.user === currentUser)
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState<string>('');

  const fetchList = useCallback(async () => {
    setIsLoading(true);
    setStoreError(null);
    try {
      if (getToken()) {
        try {
          const meRes = await store('me');
          setCurrentUser(meRes.name || null);
        } catch {
          setCurrentUser(null);
        }
      } else {
        setCurrentUser(null);
      }
      const res = await store('list');
      setItems(Array.isArray(res.items) ? res.items : []);
    } catch (err) {
      setStoreError(err instanceof Error ? err.message : '저장소에서 목록을 불러오지 못했어요.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  // 앱을 열 때 1회만 불러오기 (자동 주기적 호출 금지)
  useEffect(() => {
    fetchList();
  }, [fetchList]);

  const handleAddNote = async (e: React.FormEvent) => {
    e.preventDefault();
    const content = noteContent.trim();
    if (!content || isSubmitting) return;

    setIsSubmitting(true);
    setStoreError(null);
    try {
      await store('add', {
        data: {
          type: 'note',
          era: noteEra,
          topic: noteTopic.trim() || '핵심 암기',
          content,
        },
      });
      setNoteTopic('');
      setNoteContent('');
      await fetchList();
    } catch (err) {
      setStoreError(err instanceof Error ? err.message : '암기 노트를 저장하지 못했어요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleVote = async (choice: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStoreError(null);
    try {
      await store('add', {
        data: {
          type: 'vote',
          choice,
        },
      });
      await fetchList();
    } catch (err) {
      setStoreError(err instanceof Error ? err.message : '투표를 저장하지 못했어요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateNote = async (item: StoreItem) => {
    const trimmed = editContent.trim();
    if (!trimmed || isSubmitting) return;
    setIsSubmitting(true);
    setStoreError(null);
    try {
      await store('update', {
        id: item.id,
        data: {
          ...item.data,
          type: 'note',
          content: trimmed,
        },
      });
      setEditingId(null);
      setEditContent('');
      await fetchList();
    } catch (err) {
      setStoreError(err instanceof Error ? err.message : '글을 고치지 못했어요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteNote = async (id: string) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    setStoreError(null);
    try {
      await store('delete', { id });
      await fetchList();
    } catch (err) {
      setStoreError(err instanceof Error ? err.message : '글을 지우지 못했어요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // 데이터 종류(type)별 분류 (예전 줄에 새 항목이 없어도 오류 없이 표시)
  const voteItems = items.filter((item) => item.data && item.data.type === 'vote');
  const noteItems = items.filter((item) => !item.data?.type || item.data.type === 'note');
  const scoreItems = items.filter((item) => item.data && item.data.type === 'score');

  const voteCounts: Record<string, number> = {};
  for (const choice of VOTE_CHOICES) voteCounts[choice] = 0;
  for (const v of voteItems) {
    const ch = typeof v.data?.choice === 'string' ? v.data.choice : '';
    if (ch) {
      voteCounts[ch] = (voteCounts[ch] || 0) + 1;
    }
  }
  const totalVotes = voteItems.length;

  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 shadow-xs space-y-6 text-left">
      {/* Header + 새로 고침 button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100 dark:border-slate-800">
        <div>
          <h3 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-slate-100 flex items-center gap-2">
            <StickyNote className="w-5 h-5 text-amber-500" />
            <span>내 학습 기록 &amp; 5대 대멸종 암기 노트 공유 보드</span>
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            이 기기(localStorage) 최고 기록과 내 저장소에 저장된 암기 팁·투표 결과를 확인하세요.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchList}
          disabled={isLoading}
          className="px-3.5 py-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 self-start sm:self-auto cursor-pointer disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
          <span>새로 고침</span>
        </button>
      </div>

      {/* Store error display verbatim */}
      {storeError && (
        <div className="p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-300 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
          <span>{storeError}</span>
        </div>
      )}

      {/* 이 기기 localStorage 요약 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
        <div className="p-3.5 rounded-xl bg-cyan-50/70 dark:bg-cyan-950/30 border border-cyan-200 dark:border-cyan-900/50">
          <div className="text-[11px] font-bold text-cyan-700 dark:text-cyan-400">이 기기 · 기본 다지기 최고점</div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5 font-mono">
            {localProgress.drillBestScore}점 <span className="text-xs font-normal text-slate-500">({localProgress.drillTotalRuns}회 완료)</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50">
          <div className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400">이 기기 · 실전 도전 최고점</div>
          <div className="text-lg font-black text-slate-900 dark:text-slate-100 mt-0.5 font-mono">
            {localProgress.examBestScore}점 <span className="text-xs font-normal text-slate-500">({localProgress.examTotalRuns}회 응시)</span>
          </div>
        </div>
        <div className="p-3.5 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-900/50">
          <div className="text-[11px] font-bold text-amber-700 dark:text-amber-400">내 저장소 · 최근 공유 점수</div>
          <div className="text-sm font-bold text-slate-900 dark:text-slate-100 mt-1">
            {scoreItems.length > 0
              ? `${String(scoreItems[0].data?.mode ?? '퀴즈')} ${String(scoreItems[0].data?.score ?? 0)}점`
              : '아직 저장된 기록이 없어요'}
          </div>
        </div>
      </div>

      {/* 2 Columns: 5대 대멸종 난이도 투표 (left) + 암기 노트 작성 & 목록 (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vote Section (store('add', { data: { type: 'vote', choice } })) */}
        <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 space-y-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <BarChart3 className="w-4 h-4 text-amber-500" />
              <span>가장 헷갈리는 대멸종 사건 투표</span>
            </h4>
            <span className="text-[11px] font-mono text-slate-500">총 {totalVotes}표</span>
          </div>

          <div className="space-y-2">
            {VOTE_CHOICES.map((choice) => {
              const count = voteCounts[choice] || 0;
              const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
              return (
                <button
                  key={choice}
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => handleVote(choice)}
                  className="w-full p-2.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-amber-400 text-left transition-all cursor-pointer disabled:opacity-60"
                >
                  <div className="flex items-center justify-between text-xs font-semibold text-slate-800 dark:text-slate-200 mb-1">
                    <span>{choice}</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">
                      {count}표 ({pct}%)
                    </span>
                  </div>
                  <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                    <div className="h-full bg-amber-500 transition-all duration-300" style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Study Note Form + Shared List */}
        <div className="space-y-4">
          <form onSubmit={handleAddNote} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/70 space-y-2.5">
            <div className="text-sm font-bold text-slate-900 dark:text-slate-100 flex items-center gap-1.5">
              <Award className="w-4 h-4 text-cyan-500" />
              <span>나만의 암기 팁 남기기</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              <select
                value={noteEra}
                onChange={(e) => setNoteEra(e.target.value)}
                className="px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-800 dark:text-slate-200"
              >
                {ERA_OPTIONS.map((era) => (
                  <option key={era} value={era}>
                    {era}
                  </option>
                ))}
              </select>
              <input
                type="text"
                value={noteTopic}
                onChange={(e) => setNoteTopic(e.target.value)}
                placeholder="주제 (예: 삼필갑방)"
                className="sm:col-span-2 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                value={noteContent}
                onChange={(e) => setNoteContent(e.target.value)}
                placeholder="암기 꿀팁이나 헷갈리는 포인트를 적어 보세요"
                className="flex-1 px-3 py-2 rounded-lg border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100"
              />
              <button
                type="submit"
                disabled={isSubmitting || !noteContent.trim()}
                className="px-4 py-2 rounded-lg bg-slate-900 dark:bg-amber-500 text-white dark:text-slate-950 text-xs font-bold hover:bg-slate-800 dark:hover:bg-amber-400 disabled:opacity-50 flex items-center gap-1 cursor-pointer shrink-0"
              >
                <span>저장</span>
                <Send className="w-3 h-3" />
              </button>
            </div>
            <p className="text-[11px] text-slate-400 dark:text-slate-500">
              이름 · 학번 · 연락처는 쓰지 마세요
            </p>
          </form>

          {/* Saved Notes List (텍스트만 안전하게 출력, 작성자 일치 시에만 고치기·지우기 노출) */}
          <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
            {noteItems.length === 0 ? (
              <div className="p-4 rounded-xl border border-dashed border-slate-300 dark:border-slate-700 text-center text-xs text-slate-500">
                아직 등록된 암기 노트가 없어요. 첫 암기 팁을 남겨 보세요!
              </div>
            ) : (
              noteItems.map((item) => {
                const eraText = typeof item.data?.era === 'string' && item.data.era ? item.data.era : '전체';
                const topicText = typeof item.data?.topic === 'string' && item.data.topic ? item.data.topic : '핵심 암기';
                const contentText = typeof item.data?.content === 'string' ? item.data.content : '';
                const canManage = Boolean(currentUser && item.user && item.user === currentUser);

                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700/80 text-xs space-y-1"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <div className="flex items-center gap-1.5">
                        <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 font-bold text-[10px]">
                          {eraText}
                        </span>
                        <span className="font-bold text-slate-700 dark:text-slate-300">{topicText}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.user ? item.user : '익명'} · {item.time ? item.time.slice(0, 10) : ''}
                      </span>
                    </div>

                    {editingId === item.id ? (
                      <div className="flex gap-1.5 pt-1">
                        <input
                          type="text"
                          value={editContent}
                          onChange={(e) => setEditContent(e.target.value)}
                          className="flex-1 px-2.5 py-1.5 rounded border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900 text-xs"
                        />
                        <button
                          type="button"
                          onClick={() => handleUpdateNote(item)}
                          className="px-2.5 py-1 rounded bg-emerald-600 text-white font-bold cursor-pointer"
                          aria-label="수정 완료"
                        >
                          <Check className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingId(null)}
                          className="px-2.5 py-1 rounded bg-slate-300 dark:bg-slate-700 text-slate-800 dark:text-slate-200 cursor-pointer"
                          aria-label="취소"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ) : (
                      <p className="text-slate-700 dark:text-slate-200 leading-relaxed">{contentText}</p>
                    )}

                    {/* 지금 로그인한 사람이 쓴 줄에만 고치기 · 지우기 버튼 노출 */}
                    {canManage && editingId !== item.id && (
                      <div className="flex justify-end gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingId(item.id);
                            setEditContent(contentText);
                          }}
                          className="text-[11px] text-slate-500 hover:text-amber-600 flex items-center gap-0.5 cursor-pointer"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>고치기</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteNote(item.id)}
                          className="text-[11px] text-red-500 hover:text-red-700 flex items-center gap-0.5 cursor-pointer"
                        >
                          <Trash2 className="w-3 h-3" />
                          <span>지우기</span>
                        </button>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
