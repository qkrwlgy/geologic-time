/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * [실전 도전] 수능·평가원 기출 모방 'ㄱ, ㄴ, ㄷ 보기 조합형 킬러 문제' 10문항 데이터셋
 * 지층 단면도(X-Y 단층, P-Q 부정합), 생물 과의 수 변화 꺾은선 그래프, 사분면 도표 등 시각 자료 탑재
 */

export type DiagramType = 
  | 'strata_cross_section'      // 지층 단면도 (X-Y 단층, P-Q 부정합, 화석 포함)
  | 'mass_extinction_curve'     // 생물 과의 수 변화 꺾은선 그래프 (A, B, C, D, E 5대 대멸종)
  | 'fossil_quadrant'           // 생존 기간 vs 분포 면적 사분면 도표 (A 표준화석, B 시상화석)
  | 'climate_curve'             // 지질 시대별 지구 평균 기온 변화 곡선
  | 'pangea_causality_flow'     // 판게아 형성과 대륙붕 면적 변화 도식
  | 'plant_animal_timeline';    // 식물·동물 출현 순서 타임라인

export interface CsatKillerQuestion {
  id: number;
  source: string; // 실제 수능/모의고사/평가원 변형 출처 (고1~2 통합과학2 수준 변형)
  title: string;
  materialDescription: string;
  diagramType: DiagramType;
  diagramData?: Record<string, unknown>;
  statementG: string; // ㄱ
  statementN: string; // ㄴ
  statementD: string; // ㄷ
  options: string[];  // 5지선다 (① ㄱ, ② ㄴ, ③ ㄱ, ㄷ, ④ ㄴ, ㄷ, ⑤ ㄱ, ㄴ, ㄷ 등)
  correctIndex: number;
  relatedEra: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic';
  topic: string;
  analysisG: { isTrue: boolean; reason: string };
  analysisN: { isTrue: boolean; reason: string };
  analysisD: { isTrue: boolean; reason: string };
  coreCausalityConcept: string;
}

export const CSAT_KILLER_QUESTIONS: CsatKillerQuestion[] = [
  {
    id: 1,
    source: '2024학년도 대학수학능력시험 지구과학I 1번 변형 (고1·2 통합과학2 수준)',
    title: '지층 단면도와 화석을 이용한 지질학적 사건 해석',
    materialDescription: '그림은 어느 지역의 지층 단면을 나타낸 것이다. P-Q는 부정합면이고, X-Y는 단층면이다. 지층 A에서는 삼엽충, 지층 C에서는 암모나이트 화석이 산출되었다.',
    diagramType: 'strata_cross_section',
    diagramData: {
      strataA: { name: 'A층 (사암)', fossil: '삼엽충', era: '고생대' },
      strataB: { name: 'B층 (셰일)', fossil: '필석', era: '고생대' },
      unconformityPQ: '부정합면 P-Q (기저 역암 포함)',
      strataC: { name: 'C층 (석회암)', fossil: '암모나이트', era: '중생대' },
      strataD: { name: 'D층 (이암)', fossil: '공룡 발자국', era: '중생대' },
      faultXY: '단층 X-Y (A, B층을 절단하고 P-Q 부정합면 아래에 위치)'
    },
    statementG: 'A층이 퇴적된 지질 시대(고생대) 동안 지구상에는 빙하기가 단 한 번도 존재하지 않았다.',
    statementN: '단층 X-Y는 P-Q 부정합면이 형성되기 이전에 일어난 지각 변동이다.',
    statementD: 'P-Q 부정합면이 형성되는 동안 지표에는 고생대에서 중생대로 넘어가는 오랜 시간적 단절이 있었다.',
    options: ['① ㄱ', '② ㄴ', '③ ㄱ, ㄷ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 3, // ④ ㄴ, ㄷ
    relatedEra: 'paleozoic',
    topic: '지층 단면 및 부정합',
    analysisG: {
      isTrue: false,
      reason: '고생대에는 오르도비스기 말 빙하기와 석탄기 말~페름기 초 빙하기가 존재했습니다. 빙하기가 전혀 없었던 시대는 중생대입니다.'
    },
    analysisN: {
      isTrue: true,
      reason: '단층 X-Y가 A, B층은 끊어놓았으나 상부 부정합면 P-Q에 의해 깎여 있으므로, 단층 작용은 부정합면 형성 이전에 일어났습니다.'
    },
    analysisD: {
      isTrue: true,
      reason: 'A, B층은 고생대 화석(삼엽충, 필석)이 나오고 C, D층은 중생대 화석(암모나이트, 공룡)이 나오므로, 부정합면 P-Q는 고생대 말~중생대 초의 막대한 시간적 공백을 증명합니다.'
    },
    coreCausalityConcept: '지층의 누중과 절단 관계를 통해 지질학적 선후 관계를 판단하고, 표준화석으로 각 지층의 연대를 대비합니다.'
  },
  {
    id: 2,
    source: '2024학년도 9월 평가원 모의평가 지구과학I 4번 변형 (고1·2 통합과학2 수준)',
    title: '해양 생물 과(Family)의 수 변화와 5대 대멸종',
    materialDescription: '그림은 현생 누대 동안 해양 생물 과(Family)의 수 변화와 5대 대멸종 시점(A~E)을 나타낸 꺾은선 그래프이다. C는 고생대 말, E는 중생대 말에 해당한다.',
    diagramType: 'mass_extinction_curve',
    diagramData: {
      pointA: { name: 'A 지점', era: '고생대 오르도비스기 말 (1차)', rate: 85, cause: '기온 급감, 해수면 하강' },
      pointB: { name: 'B 지점', era: '고생대 데본기 말 (2차)', rate: 75, cause: '해양 무산소화' },
      pointC: { name: 'C 지점', era: '고생대 페름기 말 (3차)', rate: 95, cause: '판게아 형성, 시베리아 화산 폭발' },
      pointD: { name: 'D 지점', era: '중생대 트라이아스기 말 (4차)', rate: 80, cause: '판게아 분열, 마그마 분출' },
      pointE: { name: 'E 지점', era: '중생대 백악기 말 (5차)', rate: 75, cause: '소행성 충돌, 태양광 차단' }
    },
    statementG: '생물 과의 수가 가장 급격하게 감소한 C(페름기 말) 시기 이후에 삼엽충과 방추충이 완전히 절멸하였다.',
    statementN: 'E(백악기 말) 대멸종의 주요 원인은 대규모 빙하기 도래로 인한 해수면의 극단적인 하강이다.',
    statementD: 'A부터 E까지의 대멸종 사건 이후에는 살아남은 생물군이 새로운 생태적 지위를 차지하며 급격히 다양화되었다.',
    options: ['① ㄱ', '② ㄷ', '③ ㄱ, ㄴ', '④ ㄱ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 3, // ④ ㄱ, ㄷ
    relatedEra: 'paleozoic',
    topic: '5대 대멸종 비교',
    analysisG: {
      isTrue: true,
      reason: 'C는 3차 대멸종(페름기 말)으로 지구 역사상 최대 규모(약 95% 절멸)였으며, 삼엽충과 방추충이 완전히 멸종했습니다.'
    },
    analysisN: {
      isTrue: false,
      reason: 'E(백악기 말) 대멸종의 결정적 원인은 소행성 충돌에 의한 먼지 구름과 태양광 차단(충돌 겨울)입니다. 빙하기가 원인인 것은 A(오르도비스기 말)입니다.'
    },
    analysisD: {
      isTrue: true,
      reason: '대멸종은 기존의 우점종을 소멸시키지만, 멸종 후 살아남은 생물(예: 5차 후 포유류, 3차 후 파충류)이 빈 서식지를 독점하며 폭발적으로 진화하는 계기를 제공합니다.'
    },
    coreCausalityConcept: '대멸종의 원인과 멸종 비율, 그리고 멸종이 생물 진화에 미치는 촉진적 영향을 인과적으로 이해해야 합니다.'
  },
  {
    id: 3,
    source: '2023학년도 대학수학능력시험 지구과학I 2번 변형 (고1·2 통합과학2 수준)',
    title: '표준화석과 시상화석의 사분면 조건 분석',
    materialDescription: '그림은 화석 (가)와 (나)의 생존 기간과 지리적 분포 면적의 상대적 관계를 사분면으로 나타낸 것이다. A 영역은 생존 기간이 짧고 분포 면적이 넓으며, B 영역은 생존 기간이 길고 분포 면적이 좁다.',
    diagramType: 'fossil_quadrant',
    diagramData: {
      quadrantA: { role: '표준화석', condition: '생존 기간 짧음, 분포 면적 넓음', examples: ['삼엽충', '암모나이트', '화폐석'] },
      quadrantB: { role: '시상화석', condition: '생존 기간 김, 분포 면적 좁음', examples: ['산호', '고사리'] }
    },
    statementG: 'A 영역에 속하는 화석(표준화석)은 지층이 쌓인 지질 시대를 결정하는 데 유리하다.',
    statementN: '어느 지층에서 B 영역에 속하는 고사리 화석이 발견되었다면, 퇴적 당시 한랭 건조한 사막 환경이었을 것이다.',
    statementD: '산호 화석은 A 영역보다 B 영역의 특성에 더 잘 부합한다.',
    options: ['① ㄱ', '② ㄴ', '③ ㄱ, ㄷ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄷ
    relatedEra: 'paleozoic',
    topic: '표준/시상화석 조건',
    analysisG: {
      isTrue: true,
      reason: 'A 영역은 생존 기간이 짧고 분포 면적이 넓은 표준화석으로, 지층의 형성 시대를 정확히 판단할 수 있습니다.'
    },
    analysisN: {
      isTrue: false,
      reason: '고사리 화석은 "온난하고 습윤한 육지 환경"을 지시합니다. 한랭 건조한 사막 환경이 아닙니다.'
    },
    analysisD: {
      isTrue: true,
      reason: '산호는 따뜻하고 얕은 바다라는 좁은 환경에서만 살고 오랜 기간 생존해온 시상화석이므로 B 영역에 해당합니다.'
    },
    coreCausalityConcept: '표준화석(시대/단명광역)과 시상화석(환경/장수협역)의 정의와 예시를 그래프 상에서 매핑할 수 있어야 합니다.'
  },
  {
    id: 4,
    source: '2024학년도 6월 평가원 모의평가 지구과학I 5번 변형 (고1·2 통합과학2 수준)',
    title: '초대륙 판게아 형성과 생물계 멸종의 인과관계',
    materialDescription: '도식은 고생대 말 페름기에 모든 대륙이 하나로 뭉쳐 초대륙 판게아(Pangea)를 형성한 과정과 그에 따른 지구 환경 변화를 나타낸 것이다.',
    diagramType: 'pangea_causality_flow',
    diagramData: {
      event1: '페름기 말 여러 대륙의 충돌 → 초대륙 판게아 형성',
      event2: '대륙 연안 해안선 단순화 및 얕은 바다(대륙붕) 면적 급감',
      event3: '시베리아 트랩 화산 대폭발 → 이산화탄소 대량 방출 → 온난화 및 산성비',
      result: '해양 생물종 약 95% 절멸 (삼엽충, 방추충 영구 멸종)'
    },
    statementG: '판게아가 형성되면서 해양 생물의 주요 서식지인 대륙붕(얕은 바다)의 총면적이 크게 감소하였다.',
    statementN: '시베리아 트랩의 대규모 화산 분출로 방출된 온실가스는 전 지구적인 기온 급감(빙하기)을 유발하였다.',
    statementD: '판게아는 중생대 트라이아스기 말부터 다시 분열되기 시작하여 대서양이 열렸다.',
    options: ['① ㄱ', '② ㄴ', '③ ㄱ, ㄷ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄷ
    relatedEra: 'paleozoic',
    topic: '판게아와 3차 대멸종',
    analysisG: {
      isTrue: true,
      reason: '여러 대륙이 하나로 합쳐지면 외곽 해안선 길이가 짧아지고 대륙 사이의 얕은 바다가 사라져 대륙붕 면적이 급감합니다.'
    },
    analysisN: {
      isTrue: false,
      reason: '시베리아 화산 폭발로 온실가스(CO₂, 메탄)가 방출되어 "극심한 지구 온난화와 산성비, 해양 산성화"가 일어났습니다. 빙하기가 아닙니다.'
    },
    analysisD: {
      isTrue: true,
      reason: '판게아는 고생대 말에 형성되어 중생대 트라이아스기 말부터 분열을 시작, 쥐라기와 백악기를 거치며 대서양이 점차 넓어졌습니다.'
    },
    coreCausalityConcept: '판게아 형성 → 대륙붕 감소 + 시베리아 화산 폭발 → 온난화/산성비 → 3차 대멸종으로 이어지는 인과관계 사슬이 핵심입니다.'
  },
  {
    id: 5,
    source: '2023학년도 6월 평가원 모의평가 지구과학I 3번 변형 (고1·2 통합과학2 수준)',
    title: '고생대 실루리아기 오존층 형성과 생물의 육상 진출',
    materialDescription: '그림은 지구 역사 동안 대기 중 산소(O₂) 농도와 성층권 오존층(O₃)의 두께 변화, 그리고 생물의 서식지 확장을 나타낸 모식도이다.',
    diagramType: 'plant_animal_timeline',
    diagramData: {
      step1: '선캄브리아 시생누대: 남세균 광합성 시작 (스트로마톨라이트)',
      step2: '원생누대: 대기 중 산소 농도 점진적 증가',
      step3: '고생대 실루리아기: 성층권 오존층(O₃) 형성 완료 → 자외선(UV) 차단',
      step4: '실루리아기~데본기: 식물(쿡소니아) 및 동물(원시 양서류)의 최초 육상 진출'
    },
    statementG: '대기 중 산소 농도의 증가는 선캄브리아 시대 남세균(시아노박테리아)의 광합성 작용이 시발점이 되었다.',
    statementN: '오존층이 성층권에 두껍게 형성되면서 생명체에 유해한 자외선이 차단되었다.',
    statementD: '생물이 최초로 육상으로 진출하기 시작한 시기는 선캄브리아 시대 말기이다.',
    options: ['① ㄱ', '② ㄷ', '③ ㄱ, ㄴ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄴ
    relatedEra: 'paleozoic',
    topic: '오존층과 육상진출',
    analysisG: {
      isTrue: true,
      reason: '약 35억 년 전부터 번성한 남세균의 광합성으로 대기 중에 산소가 서서히 축적되었습니다.'
    },
    analysisN: {
      isTrue: true,
      reason: '산소 분자가 자외선과 반응하여 오존층을 형성하였고, 이 오존층이 유해 자외선을 흡수하여 육상 생물계를 보호했습니다.'
    },
    analysisD: {
      isTrue: false,
      reason: '최초의 육상 진출은 고생대 실루리아기(약 4억 3000만 년 전)에 일어났습니다. 선캄브리아 시대에는 육상에 자외선이 강해 바다에만 살았습니다.'
    },
    coreCausalityConcept: '광합성 → 산소 축적 → 오존층 형성 → 자외선 차단 → 육상 진출의 5단계 필수 인과관계입니다.'
  },
  {
    id: 6,
    source: '2022학년도 대학수학능력시험 지구과학I 6번 변형 (고1·2 통합과학2 수준)',
    title: '중생대 기후의 독보적 특성과 식물·동물의 공진화',
    materialDescription: '자료는 중생대(252Ma~66Ma) 동안의 대기 중 CO₂ 농도와 전 지구적 빙하 퇴적물 분포 여부를 조사한 결과이다.',
    diagramType: 'climate_curve',
    diagramData: {
      era: '중생대 (트라이아스기, 쥐라기, 백악기)',
      co2Level: '현재의 3~5배 이상 (강한 온실효과)',
      glacialDeposit: '전 지구적으로 빙하 퇴적물 전무 (0회)',
      biome: '극지방까지 온난 삼림 분포, 거대 파충류와 겉씨식물 번성'
    },
    statementG: '중생대에는 전 기간에 걸쳐 빙하기가 단 한 번도 발생하지 않고 전반적으로 온난하였다.',
    statementN: '중생대 육상에서는 밑씨가 겉으로 드러난 겉씨식물(소철, 은행나무 등)이 크게 번성하였다.',
    statementD: '중생대 말 백악기에 이르러 최초의 척추동물인 어류가 출현하였다.',
    options: ['① ㄱ', '② ㄷ', '③ ㄱ, ㄴ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄴ
    relatedEra: 'mesozoic',
    topic: '중생대 기후와 생물',
    analysisG: {
      isTrue: true,
      reason: '중생대는 전 기간 빙하기가 전혀 없는 초온난 기후였습니다 (수능 빈출 절대 공식).'
    },
    analysisN: {
      isTrue: true,
      reason: '중생대는 겉씨식물의 시대로 소철, 은행, 송백류가 번성하여 공룡의 먹이가 되었습니다.'
    },
    analysisD: {
      isTrue: false,
      reason: '최초의 척추동물인 원시 어류(갑주어 등)는 고생대 오르도비스기에 이미 출현했습니다. 백악기에는 속씨식물이 최초로 출현했습니다.'
    },
    coreCausalityConcept: '중생대의 온난 기후(빙하기 전무)와 겉씨식물-파충류의 동반 번성 관계를 파악합니다.'
  },
  {
    id: 7,
    source: '2024년 3월 전국연합학력평가 지구과학I 4번 변형 (고1·2 통합과학2 수준)',
    title: '신생대 기후 변동과 포유류 및 속씨식물의 번성 메커니즘',
    materialDescription: '자료는 신생대(66Ma~현재)를 팔레오기, 네오기, 제4기로 구분하고 기후 변화와 대표 화석을 정리한 것이다.',
    diagramType: 'climate_curve',
    diagramData: {
      earlyCenozoic: '팔레오기~네오기: 온난한 기후, 화폐석(얕은 바다) 번성',
      lateCenozoic: '제4기: 점차 한랭화, 빙하기 4회와 간빙기 3회 반복, 매머드 번성',
      vegetation: '속씨식물 번성 (단풍나무, 참나무 활엽수 및 초원)',
      mammals: '포유류의 폭발적 분화 및 인류의 조상 출현'
    },
    statementG: '신생대 제4기에는 4회의 빙하기와 3회의 간빙기가 교대로 나타났다.',
    statementN: '꽃과 열매를 맺는 속씨식물이 널리 번성하여 대규모 초원과 활엽수림을 형성하였다.',
    statementD: '신생대의 대표 표준화석인 화폐석은 한랭한 기후의 육상 툰드라 환경을 지시한다.',
    options: ['① ㄱ', '② ㄴ', '③ ㄱ, ㄴ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄴ
    relatedEra: 'cenozoic',
    topic: '신생대 기후와 생물',
    analysisG: {
      isTrue: true,
      reason: '신생대 제4기에는 4번의 빙하기와 3번의 간빙기가 주기적으로 반복되었습니다.'
    },
    analysisN: {
      isTrue: true,
      reason: '신생대는 속씨식물의 전성기로, 초원의 형성은 초식 포유류와 인류 조상의 진화에 결정적 환경을 제공했습니다.'
    },
    analysisD: {
      isTrue: false,
      reason: '화폐석은 신생대 전기 따뜻하고 얕은 바다에 살았던 대형 유공충입니다. 한랭 툰드라 육상 화석은 매머드입니다.'
    },
    coreCausalityConcept: '신생대 전기의 온난 바다(화폐석)와 후기 제4기 빙하기(매머드)의 환경 대비가 필수적입니다.'
  },
  {
    id: 8,
    source: '2023학년도 9월 평가원 모의평가 지구과학I 7번 변형 (고1·2 통합과학2 수준)',
    title: '백악기 말 5차 대멸종의 메커니즘과 포유류의 생존',
    materialDescription: '자료는 백악기 말(약 6600만 년 전) 멕시코 유카탄 반도에 충돌한 칙술루브 소행성과 그에 따른 지구 생태계 붕괴 모식도이다.',
    diagramType: 'mass_extinction_curve',
    diagramData: {
      asteroid: '직경 약 10km 소행성 충돌 (충돌 에너지 히로시마 원폭 수십억 배)',
      atmosphere: '성층권에 수천만 톤의 분진 및 황 에어로졸 확산 → 태양광 90% 이상 차단',
      consequence: '수년간 충돌 겨울 지속, 식물 광합성 중단, 대형 초식/육식 공룡 굶주려 절멸',
      extinctTaxa: '공룡, 익룡, 어룡, 암모나이트 완전 절멸 (생물종 약 75% 멸종)'
    },
    statementG: '소행성 충돌로 발생한 막대한 먼지 구름이 태양광을 차단하여 지표 기온이 급감하였다.',
    statementN: '햇빛 차단으로 식물의 광합성이 중단되면서 먹이사슬의 최상위 포식자인 거대 육식공룡까지 멸종하였다.',
    statementD: '이 5차 대멸종 사건으로 바다의 대표적인 표준화석인 삼엽충도 함께 멸종하였다.',
    options: ['① ㄱ', '② ㄷ', '③ ㄱ, ㄴ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄴ
    relatedEra: 'mesozoic',
    topic: '5차 백악기 대멸종',
    analysisG: {
      isTrue: true,
      reason: '충돌 분진과 에어로졸이 성층권을 가려 수년간 지표면에 도달하는 태양광을 차단(충돌 겨울)했습니다.'
    },
    analysisN: {
      isTrue: true,
      reason: '광합성 중단 → 식물 고사 → 초식공룡 멸종 → 육식공룡 멸종으로 이어지는 먹이사슬 연쇄 붕괴가 일어났습니다.'
    },
    analysisD: {
      isTrue: false,
      reason: '삼엽충은 고생대 페름기 말 3차 대멸종 때 이미 절멸했습니다. 백악기 말에 절멸한 바다 생물은 암모나이트입니다.'
    },
    coreCausalityConcept: '외적 충격(운석)이 먹이사슬 시스템(광합성→생산자→소비자)을 어떻게 붕괴시켰는지 파악해야 합니다.'
  },
  {
    id: 9,
    source: '2022학년도 9월 평가원 모의평가 지구과학I 2번 변형 (고1·2 통합과학2 수준)',
    title: '식물계와 척추동물 진화 계통의 시대별 정합성 평가',
    materialDescription: '표는 지질 시대 (가)~(다)에 번성했던 식물군과 척추동물군을 나타낸 것이다. (가)~(다)는 각각 고생대, 중생대, 신생대 중 하나이다.',
    diagramType: 'plant_animal_timeline',
    diagramData: {
      eraA: { label: '(가)', plant: '양치식물 (인목, 봉인목 등 거대 삼림)', animal: '어류(갑주어) 번성, 양서류 출현 및 번성', period: '고생대' },
      eraB: { label: '(나)', plant: '겉씨식물 (소철, 은행나무 등)', animal: '파충류(공룡)의 시대, 시조새 출현', period: '중생대' },
      eraC: { label: '(다)', plant: '속씨식물 (단풍나무, 초본류)', animal: '포유류 및 조류 번성, 인류 조상 출현', period: '신생대' }
    },
    statementG: '(가) 시대(고생대)의 석탄기에는 거대한 양치식물이 퇴적되어 오늘날의 대규모 석탄층을 형성하였다.',
    statementN: '(나) 시대(중생대)에 출현한 시조새는 파충류의 특징과 조류의 특징을 함께 지니고 있다.',
    statementD: '지질 시대 순서는 (다) → (나) → (가) 순으로 진행되었다.',
    options: ['① ㄱ', '② ㄴ', '③ ㄱ, ㄴ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄴ
    relatedEra: 'mesozoic',
    topic: '생물계 변천사',
    analysisG: {
      isTrue: true,
      reason: '고생대 석탄기에는 수십 미터의 인목, 봉인목 등 양치식물 삼림이 묻혀 현재 인류가 쓰는 석탄층이 되었습니다.'
    },
    analysisN: {
      isTrue: true,
      reason: '시조새는 날개와 깃털(조류)뿐 아니라 부리의 이빨과 긴 꼬리뼈(파충류)를 가진 진화의 중간 화석입니다.'
    },
    analysisD: {
      isTrue: false,
      reason: '올바른 지질 시대 순서는 (가)고생대 → (나)중생대 → (다)신생대 순입니다.'
    },
    coreCausalityConcept: '식물: 양치 → 겉씨 → 속씨 / 동물: 어류 → 양서류 → 파충류 → 포유류의 병렬적 진화 순서를 확립합니다.'
  },
  {
    id: 10,
    source: '2025학년도 6월 평가원 모의평가 지구과학I 1번 변형 (고1·2 통합과학2 수준)',
    title: '오르도비스기 무악어류 사카밤바스피스와 1차 대멸종',
    materialDescription: '자료는 고생대 오르도비스기 얕은 바다에 서식했던 원시 무악어류 "사카밤바스피스"와 오르도비스기 말 1차 대멸종의 환경 요인을 분석한 것이다.',
    diagramType: 'mass_extinction_curve',
    diagramData: {
      organism: '사카밤바스피스 (Sacabambaspis)',
      period: '고생대 오르도비스기 (약 4억 7000만 년 전)',
      structure: '턱이 없고 머리 앞쪽에 눈이 몰려 있는 원시 척추동물',
      extinction1st: '남극 대륙 빙하 형성 → 기온 급감 및 해수면 수십 m 급강하 → 해양 생물종 약 85% 절멸'
    },
    statementG: '사카밤바스피스는 턱이 발달하지 않은 원시 척추동물(무악어류)로서 고생대 어류 진화 초기에 해당한다.',
    statementN: '1차 대멸종의 주요 원인은 대륙 빙하 형성에 따른 기온 급감과 급격한 해수면 하강이다.',
    statementD: '사카밤바스피스가 살던 당시 육상에는 울창한 속씨식물 활엽수림이 번성하고 있었다.',
    options: ['① ㄱ', '② ㄷ', '③ ㄱ, ㄴ', '④ ㄴ, ㄷ', '⑤ ㄱ, ㄴ, ㄷ'],
    correctIndex: 2, // ③ ㄱ, ㄴ
    relatedEra: 'paleozoic',
    topic: '1차 대멸종과 원시 어류',
    analysisG: {
      isTrue: true,
      reason: '사카밤바스피스는 고생대 오르도비스기에 서식한 턱 없는 무악어류(갑주어류)로 척추동물 어류 진화의 귀중한 표본입니다.'
    },
    analysisN: {
      isTrue: true,
      reason: '1차 대멸종은 곤드와나 대륙의 남극 이동으로 빙하가 생겨 기온이 급감하고 해수면이 내려가 얕은 바다 생물 85%가 절멸했습니다.'
    },
    analysisD: {
      isTrue: false,
      reason: '오르도비스기에는 오존층이 완전히 완성되지 않아 육상에 생물이 살 수 없었습니다. 속씨식물은 아득히 먼 신생대에 번성했습니다.'
    },
    coreCausalityConcept: '오르도비스기 무악어류와 당시의 해양 환경, 그리고 1차 대멸종(기온 급감/해수면 하강)의 인과관계를 종합 평가합니다.'
  }
];
