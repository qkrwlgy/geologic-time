/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * 고등학교 통합과학2 교과서 질의응답 목록 및 조사 제거 기반 유사도 매칭 엔진
 * - 외부 API(Gemini 등) 호출 없이 코드 내 질문/답변 목록(20개 이상)에서 직접 탐색
 * - 은·는·이·가·을·를·에·의·도 등 조사를 제거한 뒤 2글자 이상 낱말 일치 여부로 유사 질문 판별
 * - 맞는 답이 없으면 "아직 모르는 질문이에요" 반환
 */

import { GEOLOGICAL_ERAS, FACIES_FOSSILS, FAMOUS_ORGANISMS, OrganismProfile } from '../data/geologyData';

export interface QAResponse {
  query: string;
  isInScope: boolean;
  isPrankOrTrick?: boolean;
  matchedQuestion?: string;
  shortAnswer: string;
  detailedExplanation: string;
  factCheckPoints?: string[];
  highlightEraId?: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic';
  highlightMassExtinctionOrder?: 1 | 2 | 3 | 4 | 5;
  organismCard?: OrganismProfile;
  highlightFossilName?: string;
  highlightFossilType?: 'index' | 'facies';
  visualType?:
    | 'era_comparison'
    | 'fossil_card'
    | 'climate_graph'
    | 'extinction_chart'
    | 'causality_flow'
    | 'organism_card'
    | 'out_of_scope';
  recommendedTags: string[];
  keyPoints?: string[];
}

export interface QAEntry {
  id: string;
  question: string;
  keywords: string[];
  answer: Omit<QAResponse, 'query' | 'matchedQuestion'>;
}

// 자주 묻는 질문 버튼 (입력 칸 위 5개)
export const FREQUENT_QUESTIONS = [
  '중생대와 신생대 중 무엇이 더 앞임?',
  '신생대에는 어떤 식물이 번성함?',
  '표준화석이 뭐임?',
  '페름기 대멸종 원인은?',
  '사카밤바스피스는 어느 시대 생물인가요?',
];

export const RECOMMENDED_TAGS = [
  '#페름기_대멸종',
  '#판게아_인과관계',
  '#시상화석_조건',
  '#표준화석_정의',
  '#중생대와_신생대_순서',
  '#사카밤바스피스_오르도비스기',
  '#백악기_소행성충돌',
  '#중생대_빙하기없음',
  '#오존층과_육상진출',
  '#신생대_속씨식물과_매머드',
];

// ============================================================================
// 코드 한곳에 모은 질문-답변 목록 (22개)
// ============================================================================
export const QA_KNOWLEDGE_BASE: QAEntry[] = [
  {
    id: 'qa-timemachine-trick',
    question: '타임머신 타고 신생대 가서 삼엽충 낚시하다 티라노사우르스한테 쫓긴 여행 과학적 오류 3가지 비판',
    keywords: ['타임머신', '신생대', '삼엽충', '티라노', '티라노사우르스', '티라노사우루스', '낚시', '쫓겼어', '오류', '비판', '과거', '여행'],
    answer: {
      isInScope: true,
      isPrankOrTrick: true,
      shortAnswer: '🚨 타임머신 시공간 왜곡 오류! 3가지 치명적 과학적 오류가 발견되었습니다.',
      detailedExplanation:
        '질문자님의 시간여행 시나리오를 고등학교 통합과학2 지질 시대 팩트를 바탕으로 논리적으로 비판합니다.',
      factCheckPoints: [
        '1. 삼엽충은 고생대 생물입니다: 신생대 바다에는 삼엽충이 살지 않습니다. 이미 수억 년 전(고생대 페름기 말 3차 대멸종)에 멸종했습니다.',
        '2. 티라노사우루스는 중생대 생물입니다: 공룡은 중생대 말(백악기 말 5차 대멸종)에 다 전멸했기 때문에 신생대에는 존재하지 않습니다.',
        '3. 둘은 만난 적이 없습니다: 삼엽충이 사라지고 약 1억 8천만 년 뒤에나 티라노사우루스가 태어났으므로, 한 공간에 묶인 것 자체가 오류입니다.',
      ],
      highlightEraId: 'mesozoic',
      organismCard: FAMOUS_ORGANISMS.find((o) => o.id === 'trilobite'),
      visualType: 'organism_card',
      recommendedTags: ['#삼엽충_고생대', '#페름기_3차대멸종', '#백악기_소행성충돌', '#중생대_암모나이트'],
      keyPoints: [
        '고생대(541~252Ma): 삼엽충 번성 → 페름기 말 3차 대멸종으로 절멸',
        '중생대(252~66Ma): 티라노사우루스 등 공룡·암모나이트 번성 → 백악기 말 5차 대멸종으로 절멸',
        '신생대(66Ma~현재): 매머드·화폐석·속씨식물 및 포유류 번성',
      ],
    },
  },
  {
    id: 'qa-mesozoic-vs-cenozoic',
    question: '중생대와 신생대 중 무엇이 더 앞(오래된)인가요?',
    keywords: ['중생대', '신생대', '무엇', '오래된', '먼저', '순서', '앞임', '앞인가'],
    answer: {
      isInScope: true,
      shortAnswer: '중생대 입니다.',
      detailedExplanation:
        '지질 시대 순서는 [선캄브리아 시대(4600~541 Ma) → 고생대(541~252 Ma) → 중생대(252~66 Ma) → 신생대(66 Ma~현재)] 순입니다. 따라서 중생대가 신생대보다 더 앞선(오래된) 시대입니다.',
      highlightEraId: 'mesozoic',
      visualType: 'era_comparison',
      recommendedTags: ['#고생대와_중생대_비교', '#지질시대_수치연대', '#신생대_속씨식물'],
      keyPoints: [
        '중생대: 약 2억 5200만 년 전 ~ 6600만 년 전 (252 ~ 66 Ma)',
        '신생대: 약 6600만 년 전 ~ 현재 (66 Ma ~ 현재)',
        '중생대가 신생대보다 약 1억 8600만 년 앞서 시작되었습니다.',
      ],
    },
  },
  {
    id: 'qa-paleozoic-vs-mesozoic',
    question: '고생대와 중생대 중 무엇이 더 앞(오래된)인가요?',
    keywords: ['고생대', '중생대', '무엇', '오래된', '먼저', '앞임', '앞인가'],
    answer: {
      isInScope: true,
      shortAnswer: '고생대 입니다.',
      detailedExplanation:
        '고생대(5억 4100만~2억 5200만 년 전)가 중생대(2억 5200만~6600만 년 전)보다 앞선 시대입니다.',
      highlightEraId: 'paleozoic',
      visualType: 'era_comparison',
      recommendedTags: ['#고생대_표준화석', '#페름기_대멸종', '#중생대_번성생물'],
    },
  },
  {
    id: 'qa-cenozoic-plants',
    question: '신생대에는 어떤 식물이 번성하였는가?',
    keywords: ['신생대', '식물', '번성', '속씨식물', '초원', '활엽수'],
    answer: {
      isInScope: true,
      shortAnswer: '속씨식물이 번성하였습니다.',
      detailedExplanation:
        '신생대에는 씨방 속에 밑씨가 보호되고 꽃과 열매를 맺어 곤충·동물과 공생하는 속씨식물(단풍나무, 참나무, 풀/초본류)이 대번성하여 활엽수림과 초원을 형성했습니다. (참고: 겉씨식물은 중생대에 번성했습니다.)',
      highlightEraId: 'cenozoic',
      visualType: 'causality_flow',
      recommendedTags: ['#중생대_겉씨식물', '#고생대_양치식물', '#신생대_매머드'],
      keyPoints: [
        '식물 번성 순서: 해조류(선캄브리아) → 양치식물(고생대 석탄기) → 겉씨식물(중생대) → 속씨식물(신생대)',
        '속씨식물의 초원은 신생대 초식 포유류 번성의 기반이 되었습니다.',
      ],
    },
  },
  {
    id: 'qa-mesozoic-plants',
    question: '중생대에는 어떤 식물이 번성하였는가?',
    keywords: ['중생대', '식물', '번성', '겉씨식물', '소철', '은행나무'],
    answer: {
      isInScope: true,
      shortAnswer: '겉씨식물이 번성하였습니다.',
      detailedExplanation:
        '중생대에는 소철, 은행나무, 송백류 등 건조한 기후에 잘 견디는 겉씨식물이 전 지구적으로 번성하여 거대한 초식 공룡들의 주요 먹이가 되었습니다.',
      highlightEraId: 'mesozoic',
      visualType: 'causality_flow',
      recommendedTags: ['#신생대_속씨식물', '#중생대_공룡', '#중생대_빙하기없음'],
    },
  },
  {
    id: 'qa-paleozoic-plants',
    question: '고생대 석탄기에는 어떤 식물이 번성하고 석탄층을 형성했는가?',
    keywords: ['고생대', '석탄기', '양치식물', '석탄층', '식물', '인목', '봉인목'],
    answer: {
      isInScope: true,
      shortAnswer: '고생대 석탄기에는 거대한 양치식물(인목·봉인목·고사리류) 숲이 번성하여 오늘날의 석탄층을 형성했습니다.',
      detailedExplanation:
        '고생대 실루리아기에 오존층이 형성되어 식물이 육상에 진출했고, 석탄기에는 온난 습윤한 늪지대에 거대 양치식물이 거대한 삼림을 이루어 매몰되면서 오늘날의 대규모 석탄층이 만들어졌습니다.',
      highlightEraId: 'paleozoic',
      visualType: 'causality_flow',
      recommendedTags: ['#오존층과_육상진출', '#신생대_속씨식물', '#페름기_대멸종'],
    },
  },
  {
    id: 'qa-index-fossil-def',
    question: '표준화석이 무엇인가요? (정의와 조건)',
    keywords: ['표준화석', '정의', '조건', '특징', '기준', '뭐임'],
    answer: {
      isInScope: true,
      shortAnswer: '지층이 생성된 시기(지질 시대)를 결정하고 구분하는 기준이 되는 화석입니다.',
      detailedExplanation:
        '표준화석(Index Fossil)은 지층의 퇴적 시기(지질 시대)를 정확히 판별하기 위한 기준 화석입니다. 진화 속도가 빨라 생존 기간이 짧아야 하고(단명), 전 세계 바다나 육지에 고루 분포해야 하므로 분포 면적이 넓어야 하며(광역), 개체 수가 많아야 합니다.',
      highlightFossilType: 'index',
      visualType: 'fossil_card',
      recommendedTags: ['#시상화석_조건', '#삼엽충_고생대', '#암모나이트_중생대', '#화폐석_신생대'],
      keyPoints: [
        '정의: 지층이 생성된 시기(지질 시대)를 결정하고 구분하는 기준 화석',
        '필수 조건: 생존 기간이 짧을 것(단명) + 지리적 분포 면적이 넓을 것(광역) + 개체 수가 많을 것',
        '시대별 대표: [선] 스트로마톨라이트 / [고] 삼·필·갑·방 / [중] 암·공·시 / [신] 화·매',
      ],
    },
  },
  {
    id: 'qa-facies-fossil',
    question: '시상화석 조건과 산호·고사리·조개 화석이 알려주는 환경은?',
    keywords: ['시상화석', '산호', '고사리', '조개', '환경', '조건', '따뜻', '습윤'],
    answer: {
      isInScope: true,
      shortAnswer: '과거의 "환경"을 알려주는 시상화석입니다. (산호: 따뜻하고 얕은 바다 / 고사리: 온난 습윤한 육지)',
      detailedExplanation:
        '시상화석은 생존 기간이 길고 특정 환경 조건에 민감하여 서식 면적이 좁습니다. 산호는 수온 약 20℃ 이상의 따뜻하고 얕고 맑은 바다를, 고사리는 온난하고 습윤한 육지 환경을, 조개는 얕은 바다/갯벌을 증명합니다.',
      highlightFossilName: '산호 · 고사리 · 조개',
      highlightFossilType: 'facies',
      visualType: 'fossil_card',
      recommendedTags: ['#시상화석_조건', '#표준화석_정의', '#중생대_빙하기없음'],
      keyPoints: FACIES_FOSSILS.map((f) => `${f.name}: ${f.habitat} (${f.environmentalMeaning})`),
    },
  },
  {
    id: 'qa-sacabambaspis',
    question: '사카밤바스피스는 어느 시대 생물인가요?',
    keywords: ['사카밤바스피스', '사카밤바', '오르도비스기', '무악어류', '물고기', '갑주어'],
    answer: {
      isInScope: true,
      shortAnswer: '사카밤바스피스는 고생대 오르도비스기(~4억 7000만 년 전)의 턱 없는 원시 무악어류입니다.',
      detailedExplanation:
        '고생대 오르도비스기 바다에 살았던 턱이 없는 원시 어류(갑주어의 일종)로, 머리 앞쪽에 동그란 두 눈이 나란히 배치된 독특한 생김새를 가집니다. 오르도비스기 말에 발생한 1차 대멸종(기온 급감, 해수면 하강)의 한파를 겪었던 시기의 생물입니다.',
      highlightEraId: 'paleozoic',
      highlightMassExtinctionOrder: 1,
      organismCard: FAMOUS_ORGANISMS.find((o) => o.id === 'sacabambaspis'),
      visualType: 'organism_card',
      recommendedTags: ['#오르도비스기_1차대멸종', '#페름기_대멸종', '#삼엽충_고생대'],
      keyPoints: [
        '시대: 고생대 오르도비스기 (약 470 Ma)',
        '분류: 무악어류 (턱이 없는 원시 척추동물)',
        '환경: 오르도비스기 말 기온 급감과 빙하기로 1차 대멸종 발생',
      ],
    },
  },
  {
    id: 'qa-extinction-3rd-permian',
    question: '페름기 3차 대멸종 원인과 초대륙 판게아 인과관계는?',
    keywords: ['페름기', '3차', '대멸종', '판게아', '대륙붕', '화산', '시베리아', '원인', '최대'],
    answer: {
      isInScope: true,
      shortAnswer: '초대륙 판게아 형성 및 대규모 화산 폭발로 인한 온난화와 산성비 (약 95% 멸종) 입니다.',
      detailedExplanation:
        '고생대 페름기 말 3차 대멸종은 지구 역사상 최대 규모로 해양 생물종의 약 95%가 절멸했습니다. 판게아 형성으로 얕은 바다 대륙붕이 급감한 상태에서, 대규모 화산 폭발(시베리아 트랩)로 온난화, 산성비, 해양 산성화가 닥쳐 삼엽충과 방추충이 영구 멸종했습니다.',
      highlightMassExtinctionOrder: 3,
      highlightEraId: 'paleozoic',
      visualType: 'extinction_chart',
      recommendedTags: ['#페름기_대멸종', '#판게아_인과관계', '#삼엽충_고생대'],
      keyPoints: [
        '원인: 초대륙 판게아 형성(대륙붕 감소) + 대규모 화산 폭발(온난화 및 산성비)',
        '규모: 생물종 약 95% 멸종 (지구 역사상 최대 규모)',
        '결과: 삼엽충, 방추충 완전 절멸 → 중생대 파충류 진화의 공간 제공',
      ],
    },
  },
  {
    id: 'qa-extinction-5th-cretaceous',
    question: '백악기 5차 대멸종과 공룡·암모나이트 멸종 원인은?',
    keywords: ['백악기', '5차', '공룡', '소행성', '충돌', '먼지', '태양광', '멸종'],
    answer: {
      isInScope: true,
      shortAnswer: '소행성 충돌 및 먼지 구름으로 인한 태양광 차단, 기온 급감 (약 75% 멸종, 공룡/암모나이트 전멸) 입니다.',
      detailedExplanation:
        '중생대 백악기 말 5차 대멸종(약 6600만 년 전)은 소행성이 충돌하면서 발생했습니다. 먼지 구름이 태양광을 차단해 기온이 급감하고 광합성이 멈춰 먹이사슬이 붕괴되면서 공룡과 암모나이트가 완전히 절멸했습니다.',
      highlightMassExtinctionOrder: 5,
      highlightEraId: 'mesozoic',
      visualType: 'extinction_chart',
      recommendedTags: ['#백악기_소행성충돌', '#중생대_빙하기없음', '#신생대_속씨식물과_매머드'],
      keyPoints: [
        '원인: 소행성 충돌 + 먼지 구름으로 인한 태양광 차단 + 기온 급감',
        '영향: 공룡과 암모나이트 전멸, 약 75% 생물종 멸종',
        '결과: 소형 포유류와 속씨식물이 살아남아 신생대 번성',
      ],
    },
  },
  {
    id: 'qa-extinction-1st-ordovician',
    question: '1차 대멸종(오르도비스기 말) 원인과 멸종 비율은?',
    keywords: ['1차', '오르도비스기', '해수면', '기온', '급감', '멸종'],
    answer: {
      isInScope: true,
      shortAnswer: '1차 대멸종(오르도비스기 말, ~443 Ma): 기온 급감과 해수면 하강으로 약 85%가 멸종했습니다.',
      detailedExplanation:
        '고생대 오르도비스기 말, 대륙이 남극 부근으로 이동하며 거대한 빙하가 형성되어 기온이 급감하고 해수면이 크게 하강하면서 얕은 바다 생물종 약 85%가 절멸했습니다.',
      highlightMassExtinctionOrder: 1,
      highlightEraId: 'paleozoic',
      visualType: 'extinction_chart',
      recommendedTags: ['#사카밤바스피스_오르도비스기', '#페름기_대멸종', '#백악기_소행성충돌'],
    },
  },
  {
    id: 'qa-extinction-2nd-devonian',
    question: '2차 대멸종(데본기 말) 원인과 멸종 비율은?',
    keywords: ['2차', '데본기', '무산소화', '해양', '기후', '변동'],
    answer: {
      isInScope: true,
      shortAnswer: '2차 대멸종(데본기 말, ~375 Ma): 해양 무산소화와 기후 변동으로 약 75%가 멸종했습니다.',
      detailedExplanation:
        '고생대 데본기 말에 육상 식물의 번성과 해양 영양염류 유입 등으로 바닷속 산소가 고갈(해양 무산소화)되고 기후 변동이 겹쳐 갑주어 등 원시 어류와 산호초가 크게 줄었습니다.',
      highlightMassExtinctionOrder: 2,
      highlightEraId: 'paleozoic',
      visualType: 'extinction_chart',
      recommendedTags: ['#페름기_대멸종', '#백악기_소행성충돌', '#오존층과_육상진출'],
    },
  },
  {
    id: 'qa-extinction-4th-triassic',
    question: '4차 대멸종(트라이아스기 말) 원인과 멸종 비율은?',
    keywords: ['4차', '트라이아스기', '중앙대서양', '마그마', '이산화탄소', '분열'],
    answer: {
      isInScope: true,
      shortAnswer: '4차 대멸종(트라이아스기 말, ~201 Ma): 중앙대서양 마그마 지대 분출과 대기 중 이산화탄소 급증으로 약 80%가 멸종했습니다.',
      detailedExplanation:
        '판게아가 분열하기 시작한 중생대 트라이아스기 말, 중앙대서양 마그마 지대의 대규모 분출로 대기 중 이산화탄소가 급증해 온난화가 진행되었고 이후 공룡이 생태계를 지배하게 되었습니다.',
      highlightMassExtinctionOrder: 4,
      highlightEraId: 'mesozoic',
      visualType: 'extinction_chart',
      recommendedTags: ['#백악기_소행성충돌', '#페름기_대멸종', '#판게아_인과관계'],
    },
  },
  {
    id: 'qa-5-extinctions-summary',
    question: '5대 대멸종 전체 비교와 생물 진화에 미친 영향은?',
    keywords: ['5대', '대멸종', '멸종', '비율', '비교', '진화'],
    answer: {
      isInScope: true,
      shortAnswer: '5대 대멸종: 1차(85%) · 2차(75%) · 3차(95% 최대) · 4차(80%) · 5차(75%)이며, 멸종 후 살아남은 생물이 새롭게 진화·다양화되었습니다.',
      detailedExplanation:
        '대멸종은 기존의 우점종을 소멸시키지만, 살아남은 생물군(3차 후 파충류, 5차 후 포유류)이 빈 서식지를 차지하며 폭발적으로 진화·분화하는 계기가 되었습니다.',
      highlightMassExtinctionOrder: 3,
      visualType: 'extinction_chart',
      recommendedTags: ['#페름기_대멸종', '#백악기_소행성충돌', '#판게아_인과관계'],
    },
  },
  {
    id: 'qa-climate-mesozoic-no-ice',
    question: '빙하기가 없었던 시대는 언제이며 지질 시대 기후 변화 특징은?',
    keywords: ['빙하기', '없었던', '없음', '기후', '온난', '간빙기', '제4기'],
    answer: {
      isInScope: true,
      shortAnswer: '중생대 입니다. (빙하기가 전혀 없이 전 기간 온난)',
      detailedExplanation:
        '중생대(252~66 Ma)는 전 기간에 걸쳐 빙하기가 전혀 없이 전반적으로 온난하였습니다. 반면 고생대는 오르도비스기 말과 석탄기 말~페름기 초에 빙하기가 있었고, 신생대 제4기에는 빙하기 4회와 간빙기 3회가 반복되었습니다.',
      highlightEraId: 'mesozoic',
      visualType: 'climate_graph',
      recommendedTags: ['#중생대_빙하기없음', '#신생대_속씨식물과_매머드', '#페름기_대멸종'],
      keyPoints: [
        '중생대: 빙하기 0회 (전 기간 온난, 극지방 얼음 없음)',
        '신생대 제4기: 빙하기 4회, 간빙기 3회 교대',
        '고생대: 오르도비스기 말 빙하기, 석탄기 말~페름기 초 빙하기 2회',
      ],
    },
  },
  {
    id: 'qa-ozone-land',
    question: '오존층 형성과 생물의 육상 진출 시기와 인과관계는?',
    keywords: ['오존층', '육상', '진출', '자외선', '실루리아기', '산소', '광합성'],
    answer: {
      isInScope: true,
      shortAnswer: '고생대 실루리아기 무렵 오존층(O₃)이 형성되어 유해 자외선을 차단함으로써 생물이 최초로 육상에 진출하였습니다.',
      detailedExplanation:
        '선캄브리아 시대 남세균(스트로마톨라이트)의 오랜 광합성으로 대기 중 산소가 축적되었고, 고생대 실루리아기에 성층권 오존층이 두껍게 형성되어 치명적인 자외선이 차단되자 육상 식물과 원시 양서류가 육지로 올라왔습니다.',
      highlightEraId: 'paleozoic',
      visualType: 'causality_flow',
      recommendedTags: ['#오존층과_육상진출', '#페름기_대멸종', '#표준화석_정의'],
      keyPoints: [
        '1단계: 남세균 광합성 → 대기 중 산소(O₂) 축적',
        '2단계: 성층권 오존층(O₃) 형성 → 유해 자외선(UV) 차단',
        '3단계: 고생대 실루리아기 생물 최초 육상 진출',
      ],
    },
  },
  {
    id: 'qa-trilobite',
    question: '삼엽충은 어느 시대의 무슨 화석인가요?',
    keywords: ['삼엽충', '고생대', '캄브리아기', '절지동물'],
    answer: {
      isInScope: true,
      shortAnswer: '고생대 바다의 대표적인 표준화석입니다.',
      detailedExplanation:
        '삼엽충은 몸이 세 부분으로 나뉜 고생대 바다 밑바닥의 대표 절지동물입니다. 캄브리아기에 등장해 번성하다가 페름기 말 3차 대멸종(약 95% 멸종) 때 완전히 절멸했습니다.',
      highlightEraId: 'paleozoic',
      organismCard: FAMOUS_ORGANISMS.find((o) => o.id === 'trilobite'),
      visualType: 'organism_card',
      recommendedTags: ['#페름기_대멸종', '#표준화석_정의', '#사카밤바스피스_오르도비스기'],
    },
  },
  {
    id: 'qa-ammonite',
    question: '암모나이트는 어느 시대의 화석인가요?',
    keywords: ['암모나이트', '중생대', '나선형', '두족류'],
    answer: {
      isInScope: true,
      shortAnswer: '중생대 바다의 대표적인 표준화석입니다.',
      detailedExplanation:
        '암모나이트는 소용돌이 모양의 나선형 껍데기를 가진 중생대 바다의 두족류입니다. 백악기 말 5차 대멸종(소행성 충돌) 때 공룡과 함께 완전히 절멸했습니다.',
      highlightEraId: 'mesozoic',
      organismCard: FAMOUS_ORGANISMS.find((o) => o.id === 'ammonite'),
      visualType: 'organism_card',
      recommendedTags: ['#백악기_소행성충돌', '#중생대_빙하기없음', '#표준화석_정의'],
    },
  },
  {
    id: 'qa-mammoth-nummulite',
    question: '매머드와 화폐석은 어느 시대 화석인가요?',
    keywords: ['매머드', '화폐석', '신생대', '유공충', '포유류'],
    answer: {
      isInScope: true,
      shortAnswer: '둘 다 신생대의 대표적인 표준화석입니다. (화폐석: 전기 따뜻·얕은 바다 / 매머드: 후기 제4기 빙하기)',
      detailedExplanation:
        '화폐석은 신생대 전기(팔레오기~네오기) 따뜻하고 얕은 바다에 살았던 동전 모양 유공충이며, 매머드는 신생대 후기 제4기 한랭한 빙하기 육상에 살았던 대형 포유류입니다.',
      highlightEraId: 'cenozoic',
      organismCard: FAMOUS_ORGANISMS.find((o) => o.id === 'mammoth'),
      visualType: 'organism_card',
      recommendedTags: ['#신생대_속씨식물과_매머드', '#중생대와_신생대_순서', '#표준화석_정의'],
    },
  },
  {
    id: 'qa-archaeopteryx',
    question: '시조새 화석은 어느 시대이며 진화에서 왜 중요한가요?',
    keywords: ['시조새', '쥐라기', '파충류', '조류', '중간', '진화'],
    answer: {
      isInScope: true,
      shortAnswer: '중생대 쥐라기의 표준화석이자, 파충류에서 조류로의 진화를 입증하는 중간 단계 화석입니다.',
      detailedExplanation:
        '시조새는 깃털과 날개(조류 특징)와 부리 속 이빨, 날개 발톱, 긴 꼬리뼈(파충류 특징)를 모두 지니고 있어 척추동물의 진화 계통을 증명합니다.',
      highlightEraId: 'mesozoic',
      organismCard: FAMOUS_ORGANISMS.find((o) => o.id === 'archaeopteryx'),
      visualType: 'organism_card',
      recommendedTags: ['#중생대_빙하기없음', '#백악기_소행성충돌', '#표준화석_정의'],
    },
  },
  {
    id: 'qa-precambrian-stromatolite',
    question: '선캄브리아 시대 특징과 스트로마톨라이트·에디아카라 동물군은?',
    keywords: ['선캄브리아', '스트로마톨라이트', '남세균', '시아노박테리아', '에디아카라', '88'],
    answer: {
      isInScope: true,
      shortAnswer: '선캄브리아 시대(4600~541 Ma)는 지구 역사의 88.2%를 차지하며, 스트로마톨라이트(남세균 광합성)와 에디아카라 동물군이 대표 화석입니다.',
      detailedExplanation:
        '단단한 뼈나 껍데기가 거의 없고 오랜 지각 변동으로 지층이 변형되어 화석이 매우 드뭅니다. 남세균의 광합성으로 대기 산소가 축적되기 시작했습니다.',
      highlightEraId: 'precambrian',
      organismCard: FAMOUS_ORGANISMS.find((o) => o.id === 'stromatolite'),
      visualType: 'organism_card',
      recommendedTags: ['#오존층과_육상진출', '#중생대와_신생대_순서', '#표준화석_정의'],
    },
  },
  {
    id: 'qa-numerical-ages',
    question: '선캄브리아·고생대·중생대·신생대 수치 연대(Ma)와 비율은?',
    keywords: ['수치', '연대', '기간', '비율', '4600', '541', '252', '66', '지질시대'],
    answer: {
      isInScope: true,
      shortAnswer: '선캄브리아(4600~541 Ma, 88.2%) → 고생대(541~252 Ma) → 중생대(252~66 Ma) → 신생대(66 Ma~현재)',
      detailedExplanation:
        '교과서 수치 연대 기준: 선캄브리아 시대(4600~541 Ma), 고생대(541~252 Ma), 중생대(252~66 Ma), 신생대(66 Ma~현재)이며 경계는 대규모 대멸종과 지각 변동을 기준으로 구분합니다.',
      highlightEraId: 'precambrian',
      visualType: 'era_comparison',
      recommendedTags: ['#중생대와_신생대_순서', '#페름기_대멸종', '#표준화석_정의'],
    },
  },
];

// 조사(은, 는, 이, 가, 을, 를, 에, 의, 도 등) 제거 및 어근 정규화
const PARTICLES_MULTI = [
  '에서부터', '으로부터', '에게는', '한테는', '에서는', '으로는', '인가요', '였나요', '했나요', '하였는가',
  '무엇인가', '무엇임', '뭐예요', '이에요', '예요', '에서', '으로', '에게', '한테', '에는', '에도', '과는', '와는',
  '부터', '까지', '보다', '처럼', '조차', '마저', '이야', '인가', '나요', '까요', '했어', '해줘', '뭐임',
];
const PARTICLES_SINGLE = ['은', '는', '이', '가', '을', '를', '에', '의', '도', '로', '와', '과', '랑', '야', '임', '함'];

export function stripKoreanParticles(rawWord: string): string {
  let w = rawWord.trim().toLowerCase();
  if (!w) return '';

  // 다중 글자 조사/어미 먼저 제거
  for (const suffix of PARTICLES_MULTI) {
    if (w.endsWith(suffix) && w.length - suffix.length >= 2) {
      w = w.slice(0, w.length - suffix.length);
      break;
    }
  }

  // 단음절 조사(은·는·이·가·을·를·에·의·도 등) 제거 (어근이 2글자 이상 남을 때만)
  for (const p of PARTICLES_SINGLE) {
    if (w.endsWith(p) && w.length - p.length >= 2) {
      w = w.slice(0, w.length - p.length);
      break;
    }
  }

  return w;
}

export function extractWordsTwoPlus(text: string): string[] {
  const cleaned = text
    .replace(/[?!.,~·/()[\]{}"'<>:;]/g, ' ')
    .split(/\s+/)
    .map(stripKoreanParticles)
    .filter((w) => w.length >= 2);
  return Array.from(new Set(cleaned));
}

export function answerTextbookQuery(rawQuery: string): QAResponse {
  const trimmed = rawQuery.trim();
  if (!trimmed) {
    return {
      query: rawQuery,
      isInScope: false,
      shortAnswer: '아직 모르는 질문이에요.',
      detailedExplanation: '지질 시대, 표준·시상 화석, 기후 변화, 5대 대멸종에 대해 질문해 보세요.',
      visualType: 'out_of_scope',
      recommendedTags: RECOMMENDED_TAGS,
    };
  }

  const userWords = extractWordsTwoPlus(trimmed);
  const rawLower = trimmed.toLowerCase();

  let bestEntry: QAEntry | null = null;
  let bestScore = 0;

  for (const entry of QA_KNOWLEDGE_BASE) {
    const entryWords = extractWordsTwoPlus(entry.question + ' ' + entry.keywords.join(' '));
    let score = 0;

    // 1. 2글자 이상 같은 낱말 비교 (조사 제거 후)
    for (const uw of userWords) {
      for (const ew of entryWords) {
        if (uw === ew) {
          score += 10; // 완전 일치
        } else if (uw.length >= 2 && ew.length >= 2 && (uw.includes(ew) || ew.includes(uw))) {
          score += 6; // 부분 포함 일치 (예: '삼엽충낚시' <-> '삼엽충', '사카밤바' <-> '사카밤바스피스')
        }
      }
    }

    // 2. 특수 동률 보정: "앞" (단음절 핵심 의문사)이 포함된 순서 질문 우선
    if (score > 0 && rawLower.includes('앞') && entry.question.includes('앞')) {
      score += 5;
    }
    // 동률 보정: "번성" + "식물" 조합
    if (score > 0 && rawLower.includes('식물') && entry.keywords.includes('식물')) {
      score += 3;
    }
    // 동률 보정: 타임머신/오류 낚시 질문 우선
    if (
      score > 0 &&
      (rawLower.includes('타임머신') || rawLower.includes('오류') || rawLower.includes('쫓')) &&
      entry.id === 'qa-timemachine-trick'
    ) {
      score += 12;
    }

    if (score > bestScore) {
      bestScore = score;
      bestEntry = entry;
    }
  }

  // 2글자 이상 같은 낱말이 하나도 없으면 (bestScore === 0) "아직 모르는 질문이에요" 반환
  if (!bestEntry || bestScore === 0) {
    return {
      query: rawQuery,
      isInScope: false,
      shortAnswer: '아직 모르는 질문이에요.',
      detailedExplanation:
        '통합과학2 범위를 벗어난 키워드이거나 질문 목록에서 2글자 이상 겹치는 낱말을 찾지 못했습니다. 자주 묻는 질문 버튼이나 아래 추천 태그를 눌러 보세요!',
      visualType: 'out_of_scope',
      recommendedTags: RECOMMENDED_TAGS,
    };
  }

  // "중생대"만 단독으로 들어가면서 "신생대" 없는 타임머신 낚시일 경우 팩트체크 문구 동적 맞춤
  if (bestEntry.id === 'qa-timemachine-trick' && rawLower.includes('중생대') && !rawLower.includes('신생대')) {
    return {
      query: rawQuery,
      matchedQuestion: bestEntry.question,
      ...bestEntry.answer,
      factCheckPoints: [
        '1. 삼엽충은 고생대 생물입니다: 중생대 바다에는 삼엽충이 살지 않습니다. 이미 페름기 말 3차 대멸종(252Ma)에 완전히 멸종했습니다.',
        '2. 고생대와 중생대의 시간 장벽: 삼엽충은 고생대 표준화석이고 공룡·암모나이트는 중생대 표준화석이므로 공존할 수 없습니다.',
        '3. 시대별 생물 확인: 중생대에는 공룡·암모나이트·겉씨식물이 번성했으므로 삼엽충 낚시는 불가능합니다.',
      ],
      highlightEraId: 'paleozoic',
    };
  }

  // GEOLOGICAL_ERAS를 직접 참조해 데이터 무결성 유지
  void GEOLOGICAL_ERAS;

  return {
    query: rawQuery,
    matchedQuestion: bestEntry.question,
    ...bestEntry.answer,
  };
}
