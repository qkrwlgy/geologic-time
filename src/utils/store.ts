/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 배포판 데이터 저장소 모듈
 * - 이 기기: localStorage (학습 최고 점수, 오답 시대 기록, 화면 테마)
 * - 내 저장소: Google Apps Script store() 연동 (노트, 투표, 점수 기록)
 */

const STORE_URL =
  'https://script.google.com/macros/s/AKfycbyftynT0m5y9lrkdt_VvRZfib9wsbZslH-7-6JMhqyDy7Sc16BmEM318mvHSG_DSicBtw/exec';
const APP = 'geologic time';

export function getToken(): string | null {
  try {
    return localStorage.getItem(APP + ':token');
  } catch {
    return null;
  }
}

export function setToken(t: string | null): void {
  try {
    if (t) localStorage.setItem(APP + ':token', t);
    else localStorage.removeItem(APP + ':token');
  } catch {
    // ignore storage errors
  }
}

export interface StoreRowData {
  type?: 'note' | 'vote' | 'score' | string;
  era?: string;
  topic?: string;
  content?: string;
  choice?: string;
  mode?: string;
  score?: number;
  missedEras?: string[];
  [key: string]: unknown;
}

export interface StoreItem {
  id: string;
  time: string;
  user?: string;
  private?: boolean;
  data: StoreRowData;
}

export interface StoreResponse {
  ok: boolean;
  items?: StoreItem[];
  item?: StoreItem;
  token?: string;
  name?: string;
  error?: string;
  code?: string;
}

export async function store(action: string, payload: Record<string, unknown> = {}): Promise<StoreResponse> {
  const token = getToken();
  if (action === 'me' && !token) {
    throw Object.assign(new Error('로그인하지 않았어요.'), { code: 'login' });
  }
  let res: Response;
  let out: StoreResponse;
  try {
    res = await fetch(STORE_URL, {
      method: 'POST',
      body: JSON.stringify({ ...payload, action, app: APP, token }),
    });
  } catch {
    throw Object.assign(new Error('저장소에 연결하지 못했어요. 잠시 뒤 다시 해 보세요.'), { code: 'network' });
  }
  try {
    out = (await res.json()) as StoreResponse;
  } catch {
    throw Object.assign(
      new Error('저장소의 대답을 읽지 못했어요. STORE_URL이 /exec로 끝나는 주소인지 확인하세요.'),
      { code: 'bad_response' }
    );
  }
  if (out.token) setToken(out.token);
  if (action === 'logout' || out.code === 'login') setToken(null);
  if (!out.ok) throw Object.assign(new Error(out.error || '요청을 처리하지 못했어요.'), { code: out.code });
  return out;
}

// ============================================================================
// 이 기기 전용 저장소 (localStorage)
// ============================================================================
const LOCAL_PROGRESS_KEY = APP + ':local_progress';
const LOCAL_DARK_MODE_KEY = APP + ':dark_mode';

export interface LocalStudyProgress {
  drillBestScore: number;
  drillTotalRuns: number;
  examBestScore: number;
  examTotalRuns: number;
  lastMissedEras: string[];
  updatedAt: string;
}

const DEFAULT_PROGRESS: LocalStudyProgress = {
  drillBestScore: 0,
  drillTotalRuns: 0,
  examBestScore: 0,
  examTotalRuns: 0,
  lastMissedEras: [],
  updatedAt: '',
};

export function loadLocalProgress(): LocalStudyProgress {
  try {
    const raw = localStorage.getItem(LOCAL_PROGRESS_KEY);
    if (!raw) return { ...DEFAULT_PROGRESS };
    const parsed = JSON.parse(raw) as Partial<LocalStudyProgress>;
    return {
      drillBestScore: typeof parsed.drillBestScore === 'number' ? parsed.drillBestScore : 0,
      drillTotalRuns: typeof parsed.drillTotalRuns === 'number' ? parsed.drillTotalRuns : 0,
      examBestScore: typeof parsed.examBestScore === 'number' ? parsed.examBestScore : 0,
      examTotalRuns: typeof parsed.examTotalRuns === 'number' ? parsed.examTotalRuns : 0,
      lastMissedEras: Array.isArray(parsed.lastMissedEras) ? parsed.lastMissedEras : [],
      updatedAt: typeof parsed.updatedAt === 'string' ? parsed.updatedAt : '',
    };
  } catch {
    return { ...DEFAULT_PROGRESS };
  }
}

export function recordDrillResultLocal(score100: number, missedEras: string[]): LocalStudyProgress {
  const prev = loadLocalProgress();
  const next: LocalStudyProgress = {
    ...prev,
    drillBestScore: Math.max(prev.drillBestScore, score100),
    drillTotalRuns: prev.drillTotalRuns + 1,
    lastMissedEras: missedEras,
    updatedAt: new Date().toLocaleString('ko-KR'),
  };
  try {
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function recordExamResultLocal(score100: number, missedEras: string[]): LocalStudyProgress {
  const prev = loadLocalProgress();
  const next: LocalStudyProgress = {
    ...prev,
    examBestScore: Math.max(prev.examBestScore, score100),
    examTotalRuns: prev.examTotalRuns + 1,
    lastMissedEras: missedEras,
    updatedAt: new Date().toLocaleString('ko-KR'),
  };
  try {
    localStorage.setItem(LOCAL_PROGRESS_KEY, JSON.stringify(next));
  } catch {
    // ignore
  }
  return next;
}

export function loadDarkModeLocal(): boolean | null {
  try {
    const raw = localStorage.getItem(LOCAL_DARK_MODE_KEY);
    if (raw === 'true') return true;
    if (raw === 'false') return false;
    return null;
  } catch {
    return null;
  }
}

export function saveDarkModeLocal(isDark: boolean): void {
  try {
    localStorage.setItem(LOCAL_DARK_MODE_KEY, String(isDark));
  } catch {
    // ignore
  }
}
