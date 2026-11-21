/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 고등학교 통합과학2 교과서 및 한국지질자원연구원(KIGAM), 국립중앙과학관 기준
 * 수치 연대(백만 년 단위, Ma), 지질 시대별 특징, 표준/시상 화석, 기후 변화, 5대 대멸종 데이터
 */

export interface GeologicalEra {
  id: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic';
  nameKo: string;
  nameEn: string;
  startMa: number; // 백만 년 전 (Million years ago)
  endMa: number;
  durationMa: number;
  percentageOfEarthHistory: number; // 전체 지질 시대(4600 Ma) 중 비율
  color: {
    bg: string;
    border: string;
    text: string;
    light: string;
    badgeBg: string;
  };
  periods: {
    nameKo: string;
    nameEn: string;
    startMa: number;
    endMa: number;
    keyFeature: string;
  }[];
  climateSummary: string;
  iceAges: string;
  atmosphereBioEvents: string[];
  plants: {
    evolutionState: string;
    representative: string[];
    detail: string;
  };
  animals: {
    evolutionState: string;
    representative: string[];
    detail: string;
  };
  indexFossils: {
    name: string;
    environment: '바다' | '육지' | '공중/육지';
    description: string;
    mnemonic: string;
    importance: string;
  }[];
  keyCausality: {
    title: string;
    cause: string;
    process: string;
    result: string;
  }[];
}

export const GEOLOGICAL_ERAS: GeologicalEra[] = [
  {
    id: 'precambrian',
    nameKo: '선캄브리아 시대',
    nameEn: 'Precambrian',
    startMa: 4600,
    endMa: 541,
    durationMa: 4059,
    percentageOfEarthHistory: 88.2,
    color: {
      bg: 'bg-rose-500',
      border: 'border-rose-400',
      text: 'text-rose-700 dark:text-rose-300',
      light: 'bg-rose-50 dark:bg-rose-950/30',
      badgeBg: 'bg-rose-100 dark:bg-rose-900/40',
    },
    periods: [
      { nameKo: '명왕누대 (하데스누대)', nameEn: 'Hadean', startMa: 4600, endMa: 4000, keyFeature: '지구 형성 및 마그마 바다, 원시 지각과 원시 바다 형성' },
      { nameKo: '시생누대', nameEn: 'Archean', startMa: 4000, endMa: 2500, keyFeature: '최초의 단세포 생명체(원핵생물) 및 광합성을 하는 남세균(시아노박테리아) 출현' },
      { nameKo: '원생누대', nameEn: 'Proterozoic', startMa: 2500, endMa: 541, keyFeature: '대기 중 산소 농도 급증, 진핵생물 및 다세포 동물(에디아카라 동물군) 출현' }
    ],
    climateSummary: '대체로 온난하였으나, 원생누대 말기에 대규모 빙하기(눈덩이 지구 가설)가 존재하였습니다.',
    iceAges: '원생누대 말기 빙하기 존재 (지구 전체가 얼어붙었던 전지구 동결 사건)',
    atmosphereBioEvents: [
      '약 38억~35억 년 전: 원시 바다에서 최초의 원핵생물 출현',
      '시아노박테리아(남세균)의 광합성 활동으로 바다와 대기에 산소($O_2$) 공급 시작',
      '화석이 매우 드문 이유: 단단한 골격(껍데기, 뼈)이 없고, 오랜 지각 변동으로 대부분 파괴됨'
    ],
    plants: {
      evolutionState: '해조류(단세포 및 원시 조류)',
      representative: ['남세균(시아노박테리아)', '원시 해조류'],
      detail: '대부분 바다에서 생활하였으며, 육상에는 유해 자외선 때문에 식물이 살 수 없었습니다.'
    },
    animals: {
      evolutionState: '원핵생물 → 진핵생물 → 무척추 다세포 동물',
      representative: ['에디아카라 동물군 (디킨소니아 등)'],
      detail: '골격이 없고 납작하고 부드러운 몸을 가진 원시 다세포 동물들이 번성했습니다.'
    },
    indexFossils: [
      {
        name: '스트로마톨라이트',
        environment: '바다',
        description: '시아노박테리아(남세균)가 점액질을 분비하여 모래 알갱이를 겹겹이 굳혀 만든 층 모양의 화석',
        mnemonic: '선 - 스트로마톨라이트',
        importance: '초기 지구 광합성 활동과 산소 대방출의 증거!'
      },
      {
        name: '에디아카라 동물군',
        environment: '바다',
        description: '원생누대 말기 얕은 바다에 살았던 껍데기나 뼈가 없는 연체 다세포 동물 화석군 (예: 디킨소니아)',
        mnemonic: '선 - 에디아카라',
        importance: '최초의 대형 다세포 생물 출현 입증'
      }
    ],
    keyCausality: [
      {
        title: '시아노박테리아 광합성과 지구 환경 대격변',
        cause: '시아노박테리아가 광합성을 하여 산소를 지속적으로 배출',
        process: '바다의 철 이온과 반응하여 침전된 후 대기로 산소가 뿜어져 나옴',
        result: '대기 중 산소 농도 증가 및 이후 오존층 형성의 토대 마련'
      }
    ]
  },
  {
    id: 'paleozoic',
    nameKo: '고생대',
    nameEn: 'Paleozoic',
    startMa: 541,
    endMa: 252,
    durationMa: 289,
    percentageOfEarthHistory: 6.3,
    color: {
      bg: 'bg-emerald-600',
      border: 'border-emerald-400',
      text: 'text-emerald-700 dark:text-emerald-300',
      light: 'bg-emerald-50 dark:bg-emerald-950/30',
      badgeBg: 'bg-emerald-100 dark:bg-emerald-900/40',
    },
    periods: [
      { nameKo: '캄브리아기', nameEn: 'Cambrian', startMa: 541, endMa: 485, keyFeature: '캄브리아기 대폭발(수많은 해양 무척추동물 출현), 삼엽충 번성' },
      { nameKo: '오르도비스기', nameEn: 'Ordovician', startMa: 485, endMa: 443, keyFeature: '필석과 완족류 번성, 최초의 척추동물(원시 어류) 출현, 말기에 1차 대멸종' },
      { nameKo: '실루리아기', nameEn: 'Silurian', startMa: 443, endMa: 419, keyFeature: '오존층 형성 완료로 자외선 차단 → 식물(쿡소니아)과 동물의 최초 육상 진출!' },
      { nameKo: '데본기', nameEn: 'Devonian', startMa: 419, endMa: 359, keyFeature: '어류의 시대(갑주어 등 번성), 최초의 양서류 출현, 말기에 2차 대멸종' },
      { nameKo: '석탄기', nameEn: 'Carboniferous', startMa: 359, endMa: 299, keyFeature: '거대 양치식물(인목 등) 대삼림 형성(석탄층 형성), 양서류와 거대 곤충 번성' },
      { nameKo: '페름기', nameEn: 'Permian', startMa: 299, endMa: 252, keyFeature: '방추충 번성, 초대륙 판게아 형성, 말기에 지구 역사상 최대 3차 대멸종 발생' }
    ],
    climateSummary: '대체로 온난하였으나, 오르도비스기 말과 석탄기 말~페름기 초에 뚜렷한 빙하기가 있었습니다.',
    iceAges: '오르도비스기 말 빙하기 (1차 대멸종 유발) 및 석탄기 말~페름기 초 빙하기 2회 발생',
    atmosphereBioEvents: [
      '실루리아기: 오존층($O_3$)이 두텁게 형성되어 태양의 유해 자외선 차단 → 바다 생물이 육상으로 진출 성공!',
      '석탄기: 산소 농도가 약 35%까지 치솟아 거대 곤충(거대 잠자리 메가네우라) 등장',
      '페름기 말: 모든 대륙이 하나로 뭉쳐 초대륙 판게아(Pangea) 형성'
    ],
    plants: {
      evolutionState: '해조류 → 육상 관다발 식물(쿡소니아) → 거대 양치식물 번성',
      representative: ['양치식물 (인목, 봉인목, 신경목, 고사리류)'],
      detail: '석탄기에 거대한 양치식물 숲이 조성되었고, 이들이 퇴적되어 오늘날의 대규모 석탄층을 형성했습니다.'
    },
    animals: {
      evolutionState: '무척추동물 → 어류(갑주어) → 양서류 → 원시 파충류 출현',
      representative: ['삼엽충', '필석', '갑주어', '방추충(푸줄리나)', '양서류'],
      detail: '해양에서는 삼엽충과 갑주어, 육상에서는 양서류가 지배적인 역할을 하였습니다.'
    },
    indexFossils: [
      {
        name: '삼엽충',
        environment: '바다',
        description: '고생대 캄브리아기부터 페름기까지 전 바다 밑바닥을 기어 다니며 번성한 절지동물',
        mnemonic: '삼 (고생대 암기: 삼·필·갑·방)',
        importance: '고생대 바다의 가장 대표적인 표준화석'
      },
      {
        name: '필석',
        environment: '바다',
        description: '고생대 오르도비스기와 실루리아기 바다에 떠다니며 살았던 군체 생물 (붓으로 쓴 글씨 모양)',
        mnemonic: '필 (고생대 암기: 삼·필·갑·방)',
        importance: '고생대 전기의 대표 표준화석'
      },
      {
        name: '갑주어',
        environment: '바다',
        description: '머리와 몸 앞부분통이 단단한 뼈판(갑옷)으로 둘러싸인 턱이 없는 원시 어류',
        mnemonic: '갑 (고생대 암기: 삼·필·갑·방)',
        importance: '고생대 데본기 "어류의 시대"를 대표하는 척추동물 화석'
      },
      {
        name: '방추충 (푸줄리나)',
        environment: '바다',
        description: '석탄기부터 페름기까지 따뜻하고 얕은 바다에 살았던 쌀알 모양의 대형 유공충',
        mnemonic: '방 (고생대 암기: 삼·필·갑·방)',
        importance: '고생대 후기의 대표 표준화석 (페름기 말 대멸종으로 완전 절멸)'
      }
    ],
    keyCausality: [
      {
        title: '오존층 형성과 생물의 육상 진출',
        cause: '남세균과 해조류의 오랜 광합성으로 대기 중 산소($O_2$) 농도 축적',
        process: '성층권에서 자외선($UV$)을 흡수하며 오존층($O_3$)이 형성됨',
        result: '자외선이 차단되어 고생대 실루리아기에 식물과 동물이 육상으로 진출 성공!'
      },
      {
        title: '판게아 형성과 해양 생물 감소',
        cause: '페름기 말 여러 대륙이 하나로 충돌하여 초대륙 판게아 형성',
        process: '대륙 연안의 얕은 바다(대륙붕) 면적이 급감하고 해안선 단순화',
        result: '해양 생물들의 서식지가 대폭 축소되며 생물 다양성 급감'
      }
    ]
  },
  {
    id: 'mesozoic',
    nameKo: '중생대',
    nameEn: 'Mesozoic',
    startMa: 252,
    endMa: 66,
    durationMa: 186,
    percentageOfEarthHistory: 4.0,
    color: {
      bg: 'bg-amber-600',
      border: 'border-amber-400',
      text: 'text-amber-700 dark:text-amber-300',
      light: 'bg-amber-50 dark:bg-amber-950/30',
      badgeBg: 'bg-amber-100 dark:bg-amber-900/40',
    },
    periods: [
      { nameKo: '트라이아스기', nameEn: 'Triassic', startMa: 252, endMa: 201, keyFeature: '원시 공룡과 최초의 원시 포유류 출현, 말기에 4차 대멸종' },
      { nameKo: '쥐라기', nameEn: 'Jurassic', startMa: 201, endMa: 145, keyFeature: '공룡과 암모나이트의 대전성기, 시조새 출현, 판게아 분열 본격화' },
      { nameKo: '백악기', nameEn: 'Cretaceous', startMa: 145, endMa: 66, keyFeature: '속씨식물 최초 출현, 말기에 소행성 충돌과 데칸 트랩 분출로 5차 대멸종(공룡 절멸)' }
    ],
    climateSummary: '★전 기간 동안 빙하기가 전혀 없었으며 전반적으로 매우 온난하였습니다!★ (교과서 핵심 빈출!)',
    iceAges: '빙하기 전혀 없음 (0회! 극지방에도 얼음이 없던 초온난 기후)',
    atmosphereBioEvents: [
      '판게아 분열: 트라이아스기 말부터 대륙이 쪼개지며 대서양이 열리고 해양 순환 활성화',
      '대기 중 이산화탄소 농도가 높아 온실효과 지속 → 극지방까지 울창한 삼림 분포',
      '파충류가 육상(공룡), 바다(어룡, 수장룡), 하늘(익룡)을 완전히 지배'
    ],
    plants: {
      evolutionState: '겉씨식물 대번성 (백악기에 속씨식물 출현)',
      representative: ['겉씨식물 (소철, 은행나무, 송백류/소나무류)'],
      detail: '씨방이 없어 밑씨가 겉으로 드러난 겉씨식물이 건조한 기후에 잘 견디며 번성하였습니다.'
    },
    animals: {
      evolutionState: '파충류의 시대 (공룡, 익룡, 어룡), 시조새 및 원시 포유류 등장',
      representative: ['공룡', '암모나이트', '시조새'],
      detail: '육상은 공룡, 바다는 암모나이트와 수장룡, 하늘은 익룡이 번성했습니다.'
    },
    indexFossils: [
      {
        name: '암모나이트',
        environment: '바다',
        description: '소용돌이 모양의 껍데기(방)를 가진 중생대 바다의 대표 두족류',
        mnemonic: '암 (중생대 암기: 암·공·시)',
        importance: '중생대 바다 환경을 결정짓는 대표 표준화석'
      },
      {
        name: '공룡',
        environment: '육지',
        description: '중생대 육상 생태계를 지배한 거대 파충류 화석 (골격 및 발자국 화석)',
        mnemonic: '공 (중생대 암기: 암·공·시)',
        importance: '중생대 육상 환경의 대표 표준화석 (백악기 말 멸종)'
      },
      {
        name: '시조새',
        environment: '공중/육지',
        description: '날개와 깃털(조류 특징) + 부리의 이빨, 날개 발톱, 긴 꼬리뼈(파충류 특징)를 가진 화석',
        mnemonic: '시 (중생대 암기: 암·공·시)',
        importance: '파충류가 조류로 진화해 가는 과정을 보여주는 중간 단계의 결정적 증거'
      }
    ],
    keyCausality: [
      {
        title: '판게아 분열과 해양 생물 다양성 증가',
        cause: '초대륙 판게아가 갈라지기 시작하며 대서양 등 새로운 바다 형성',
        process: '해안선이 길어지고 수심이 얕고 따뜻한 바다가 넓어짐',
        result: '암모나이트 등 해양 생물의 서식지가 급증하여 번성'
      },
      {
        title: '백악기 말 운석 충돌과 공룡 멸종',
        cause: '직경 약 10km의 거대 소행성이 멕시코 유카탄 반도에 충돌',
        process: '대기 중 분진 차단으로 햇빛이 가려져 기온 급강하 및 식물 광합성 중단',
        result: '초식공룡과 육식공룡, 암모나이트가 전멸하고 소형 포유류가 생존함'
      }
    ]
  },
  {
    id: 'cenozoic',
    nameKo: '신생대',
    nameEn: 'Cenozoic',
    startMa: 66,
    endMa: 0,
    durationMa: 66,
    percentageOfEarthHistory: 1.4,
    color: {
      bg: 'bg-cyan-600',
      border: 'border-cyan-400',
      text: 'text-cyan-700 dark:text-cyan-300',
      light: 'bg-cyan-50 dark:bg-cyan-950/30',
      badgeBg: 'bg-cyan-100 dark:bg-cyan-900/40',
    },
    periods: [
      { nameKo: '팔레오기', nameEn: 'Paleogene', startMa: 66, endMa: 23, keyFeature: '따뜻한 기후, 공룡의 빈자리를 채우며 포유류와 속씨식물 급격히 진화' },
      { nameKo: '네오기', nameEn: 'Neogene', startMa: 23, endMa: 2.6, keyFeature: '기온이 점차 하강, 초원 형성 및 초식 포유류 번성, 알프스·히말라야 산맥 형성' },
      { nameKo: '제4기', nameEn: 'Quaternary', startMa: 2.6, endMa: 0, keyFeature: '빙하기 4회, 간빙기 3회 교대로 반복, 매머드 서식, 인류의 조상 출현 및 현대 문명' }
    ],
    climateSummary: '전기(팔레오기~네오기)에는 온난하였으나, 후기(제4기)에는 점차 한랭해져 빙하기와 간빙기가 반복되었습니다.',
    iceAges: '제4기에 4회의 빙하기와 3회의 간빙기가 주기적으로 반복됨',
    atmosphereBioEvents: [
      '대륙 배치가 현재와 거의 유사해짐 (알프스, 히말라야 산맥 등 대규모 조산 운동)',
      '초원이 널리 발달하여 말, 들소, 코끼리 조상 등 초식 포유류의 폭발적 번성',
      '제4기에 인류의 조상(오스트랄로피테쿠스, 호모 사피엔스 등) 출현'
    ],
    plants: {
      evolutionState: '속씨식물 대번성 (초원과 단풍·참나무 등 활엽수림)',
      representative: ['속씨식물 (단풍나무, 참나무, 풀/초본류)'],
      detail: '씨방 속에 밑씨가 안전하게 보호되고 꽃과 열매로 동물과 공생하는 속씨식물이 전 지구를 뒤덮었습니다.'
    },
    animals: {
      evolutionState: '포유류와 조류의 번성, 인류의 출현',
      representative: ['화폐석', '매머드', '원시 말', '인류 조상'],
      detail: '항온 동물인 포유류가 털과 태반을 발달시켜 한랭한 빙하기 기후를 극복하며 번성했습니다.'
    },
    indexFossils: [
      {
        name: '화폐석',
        environment: '바다',
        description: '신생대 팔레오기~네오기 따뜻하고 얕은 바다에 살았던 동전(화폐) 모양의 대형 단세포 유공충',
        mnemonic: '화 (신생대 암기: 화·매)',
        importance: '신생대 전기 따뜻한 바다의 대표 표준화석'
      },
      {
        name: '매머드',
        environment: '육지',
        description: '신생대 제4기 한랭한 툰드라/초원 지대에 번성했던 긴 털과 굽은 엄니를 가진 거대 포유류',
        mnemonic: '매 (신생대 암기: 화·매)',
        importance: '신생대 후기 빙하기 한랭 기후를 나타내는 대표 표준화석'
      }
    ],
    keyCausality: [
      {
        title: '빙하기 극복과 포유류의 번성',
        cause: '신생대 제4기 기온이 하강하며 빙하기가 주기적으로 닥침',
        process: '체온을 일정하게 유지(항온성)하고 털과 두꺼운 지방층을 가진 포유류가 적응에 유리',
        result: '파충류를 대신하여 지구 육상 생태계의 절대 강자로 번성'
      }
    ]
  }
];

export interface FaciesFossil {
  name: string;
  habitat: string;
  environmentalMeaning: string;
  characteristics: string;
  mnemonicNote: string;
}

export const FACIES_FOSSILS: FaciesFossil[] = [
  {
    name: '산호',
    habitat: '따뜻하고(약 20℃ 이상) 수심이 얕고 맑은 바다',
    environmentalMeaning: '과거에 산호 화석이 발견된 지층은 그 당시 따뜻하고 얕은 바다 환경이었음을 증명합니다.',
    characteristics: '생존 기간이 매우 길고, 수온과 일조량 등 환경 변화에 대단히 민감하여 서식 범위가 좁음.',
    mnemonicNote: '산호 = 따뜻하고 얕은 바다'
  },
  {
    name: '고사리',
    habitat: '따뜻하고 습윤한 육지',
    environmentalMeaning: '과거 고사리 화석이 발견된 곳은 온난하고 습기가 많은 육지 환경이었음을 증명합니다.',
    characteristics: '고생대 석탄기부터 현재까지 오랜 기간 생존하며 온난 습윤한 환경에서만 무리를 이룸.',
    mnemonicNote: '고사리 = 온난 습윤한 육지'
  },
  {
    name: '조개',
    habitat: '수심이 얕은 바다나 조간대(갯벌)',
    environmentalMeaning: '얕은 바다 또는 민물과 바닷물이 만나는 기수역 환경이었음을 나타냅니다.',
    characteristics: '생존 기간이 길고 특정 해안 수심 조건에 국한됨.',
    mnemonicNote: '조개 = 얕은 바다 또는 갯벌'
  }
];

export interface OrganismProfile {
  id: string;
  nameKo: string;
  nameEn: string;
  eraId: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic';
  periodKo: string;
  category: '무악어류' | '절지동물' | '두족류' | '파충류' | '포유류' | '단세포/남세균' | '조류/파충류' | '유공충';
  fossilRole: '표준화석' | '진화중간단계' | '고생물표본';
  habitat: string;
  features: string[];
  funFact: string;
  imageUrl?: string;
  svgBadgeColor: string;
}

export const FAMOUS_ORGANISMS: OrganismProfile[] = [
  {
    id: 'sacabambaspis',
    nameKo: '사카밤바스피스',
    nameEn: 'Sacabambaspis',
    eraId: 'paleozoic',
    periodKo: '고생대 오르도비스기 (~4억 7000만 년 전)',
    category: '무악어류',
    fossilRole: '고생물표본',
    habitat: '얕은 바다 연안',
    features: [
      '턱이 없는 원시 무악어류(갑주어의 일종)',
      '머리 앞쪽에 두 눈이 동그랗게 몰려 있어 특유의 귀여운 외모로 유명함',
      '지느러미가 발달하지 않아 꼬리를 흔들며 서툴게 헤엄침'
    ],
    funFact: '오르도비스기 얕은 바다에 서식한 턱 없는 원시 척추동물로 고생대 어류 진화의 시발점입니다.',
    svgBadgeColor: 'bg-emerald-600'
  },
  {
    id: 'trilobite',
    nameKo: '삼엽충',
    nameEn: 'Trilobite',
    eraId: 'paleozoic',
    periodKo: '고생대 캄브리아기~페름기',
    category: '절지동물',
    fossilRole: '표준화석',
    habitat: '전 세계 바다 밑바닥',
    features: [
      '몸이 머리, 가슴, 꼬리 3부분(세 잎)으로 나뉨',
      '고생대 바다의 절대 지배자이자 대표 표준화석',
      '페름기 말 3차 대멸종으로 완전히 절멸'
    ],
    funFact: '고생대 바다의 청소부이자 고등학생이 가장 먼저 외워야 할 고생대 대표 표준화석!',
    svgBadgeColor: 'bg-emerald-700'
  },
  {
    id: 'ammonite',
    nameKo: '암모나이트',
    nameEn: 'Ammonite',
    eraId: 'mesozoic',
    periodKo: '중생대 트라이아스기~백악기',
    category: '두족류',
    fossilRole: '표준화석',
    habitat: '따뜻한 얕은 바다',
    features: [
      '소용돌이 모양의 나선형 껍데기(방)를 가진 두족류',
      '오징어·문어의 조상과 가까움',
      '백악기 말 5차 대멸종(소행성 충돌) 때 공룡과 함께 전멸'
    ],
    funFact: '중생대 바다의 대표 표준화석으로 껍데기 내부의 격벽 모양으로 시대를 세밀히 구분합니다.',
    svgBadgeColor: 'bg-amber-600'
  },
  {
    id: 'mammoth',
    nameKo: '매머드',
    nameEn: 'Mammoth',
    eraId: 'cenozoic',
    periodKo: '신생대 제4기 (빙하기)',
    category: '포유류',
    fossilRole: '표준화석',
    habitat: '한랭한 툰드라 및 한대 초원',
    features: [
      '추위를 견디기 위한 두꺼운 피하지방과 긴 털',
      '길게 휘어진 거대한 엄니(상아)',
      '신생대 제4기 빙하기 한랭 기후를 알려주는 표준화석'
    ],
    funFact: '신생대 후기 인류의 조상과 공존하였으며 벽화에도 자주 등장하는 빙하기의 상징 포유류입니다.',
    svgBadgeColor: 'bg-cyan-700'
  },
  {
    id: 'dinosaur',
    nameKo: '공룡',
    nameEn: 'Dinosaur',
    eraId: 'mesozoic',
    periodKo: '중생대 트라이아스기~백악기',
    category: '파충류',
    fossilRole: '표준화석',
    habitat: '육상 전역',
    features: [
      '중생대 육상 생태계를 완전 지배한 거대 파충류',
      '온난한 기후와 겉씨식물 삼림을 배경으로 번성',
      '백악기 말 소행성 충돌(5차 대멸종)로 절멸'
    ],
    funFact: '중생대 육상의 지배자였으나 백악기 말 10km 운석 충돌로 인한 충돌 겨울에 적응하지 못하고 멸종했습니다.',
    svgBadgeColor: 'bg-amber-700'
  },
  {
    id: 'archaeopteryx',
    nameKo: '시조새',
    nameEn: 'Archaeopteryx',
    eraId: 'mesozoic',
    periodKo: '중생대 쥐라기',
    category: '조류/파충류',
    fossilRole: '진화중간단계',
    habitat: '원시 삼림과 관목 지대',
    features: [
      '깃털과 날개(조류 특징) 보유',
      '부리의 이빨, 날개의 발톱, 긴 꼬리뼈(파충류 특징) 보유',
      '파충류에서 조류로 진화해 가는 결정적 중간 화석'
    ],
    funFact: '교과서 진화 단원의 필수 출제 생물로 파충류와 조류의 징검다리 화석입니다.',
    svgBadgeColor: 'bg-amber-600'
  },
  {
    id: 'nummulite',
    nameKo: '화폐석',
    nameEn: 'Nummulites',
    eraId: 'cenozoic',
    periodKo: '신생대 팔레오기~네오기',
    category: '유공충',
    fossilRole: '표준화석',
    habitat: '따뜻하고 얕은 바다 (테티스해 연안)',
    features: [
      '동전(화폐) 모양을 닮은 거대 단세포 유공충',
      '따뜻하고 얕은 바다에 서식',
      '신생대 전기의 대표 표준화석'
    ],
    funFact: '단세포 생물이지만 지름이 수 cm에 달하며, 이집트 피라미드 석회암 석재 속에도 흔히 발견됩니다.',
    svgBadgeColor: 'bg-cyan-600'
  },
  {
    id: 'stromatolite',
    nameKo: '스트로마톨라이트',
    nameEn: 'Stromatolite',
    eraId: 'precambrian',
    periodKo: '선캄브리아 시대 시생누대~원생누대',
    category: '단세포/남세균',
    fossilRole: '표준화석',
    habitat: '원시 얕은 바다',
    features: [
      '광합성을 하는 남세균(시아노박테리아) 군체',
      '모래 알갱이를 점액질로 굳혀 만든 겹겹의 층상 구조',
      '원시 지구 대기에 산소를 최초로 뿜어낸 증거'
    ],
    funFact: '약 35억 년 전 지구에 산소를 선물하여 훗날 오존층과 육상 생물 진출의 토대를 닦은 위대한 화석입니다.',
    svgBadgeColor: 'bg-rose-600'
  }
];

export interface MassExtinction {
  order: 1 | 2 | 3 | 4 | 5;
  name: string;
  timingPeriod: string;
  timingMa: number;
  era: '고생대' | '중생대';
  eraId: 'paleozoic' | 'mesozoic';
  isWorstInEarthHistory?: boolean;
  extinctionRateSpecies: number; // 종 멸종 비율 (%)
  extinctionRateFamily: number;  // 과 멸종 비율 (%)
  causes: string[];
  causeMechanism: string;
  ecologicalImpact: string;
  survivorsAndEvolution: string;
  examCheckPoints: string[];
}

export const MASS_EXTINCTIONS: MassExtinction[] = [
  {
    order: 1,
    name: '1차 대멸종 (오르도비스기 말)',
    timingPeriod: '고생대 오르도비스기 말',
    timingMa: 443,
    era: '고생대',
    eraId: 'paleozoic',
    extinctionRateSpecies: 85,
    extinctionRateFamily: 26,
    causes: [
      '곤드와나 대륙의 남극 이동 및 빙하 형성',
      '급격한 기온 급감(기후 한랭화/빙하기 도래)',
      '해수면 급격한 하강으로 얕은 바다 서식지 파괴'
    ],
    causeMechanism: '대륙이 남극에 모이면서 거대한 빙하가 발달하여 기온이 급감하였고, 바닷물이 빙하로 묶이며 해수면이 크게 낮아져 얕은 바다에 살던 해양 생물들이 서식지를 잃었습니다.',
    ecologicalImpact: '삼엽충의 다양성이 크게 줄어들었고, 완족류, 필석류, 산호 등 해양 무척추동물 종의 약 85%가 절멸했습니다.',
    survivorsAndEvolution: '살아남은 생물들은 이후 실루리아기에 다시 번성하며, 최초의 육상 진출을 준비하게 되었습니다.',
    examCheckPoints: [
      '고생대 첫 번째 대멸종',
      '핵심 원인은 기온 급감(빙하기)과 해수면 하강',
      '당시 생물은 거의 전부 바다에만 살고 있었음 (오존층 형성 이전)'
    ]
  },
  {
    order: 2,
    name: '2차 대멸종 (데본기 말)',
    timingPeriod: '고생대 데본기 말',
    timingMa: 375,
    era: '고생대',
    eraId: 'paleozoic',
    extinctionRateSpecies: 75,
    extinctionRateFamily: 22,
    causes: [
      '해양 무산소화(Ocean Anoxia) 사건',
      '육상 식물 대번성으로 인한 영양염류 유입 및 부영양화',
      '해수 온도 저하 및 기후 변동'
    ],
    causeMechanism: '육상에 거대한 삼림이 우거지면서 토양의 풍화와 영양염류가 바다로 쏟아져 들어갔고, 식물 플랑크톤이 폭발적으로 증식한 뒤 사체가 분해되면서 바닷속 산소를 고갈시켰습니다.',
    ecologicalImpact: '산호초 생태계가 괴멸되었고, 데본기를 주름잡던 갑주어 등 원시 어류 무리가 대부분 멸종했습니다.',
    survivorsAndEvolution: '갑주어가 사라진 바다에는 판피류 대신 연골어류(상어)와 경골어류가 진화의 주도권을 잡았습니다.',
    examCheckPoints: [
      '어류의 시대(데본기)를 끝낸 대멸종',
      '갑주어의 대량 멸종',
      '해양 무산소화(바닷속 산소 결핍)와 기후 변동이 핵심 키워드'
    ]
  },
  {
    order: 3,
    name: '3차 대멸종 (페름기 말) ★지구 역사상 최대 규모★',
    timingPeriod: '고생대 페름기 말 (고생대-중생대 경계)',
    timingMa: 252,
    era: '고생대',
    eraId: 'paleozoic',
    isWorstInEarthHistory: true,
    extinctionRateSpecies: 95,
    extinctionRateFamily: 54,
    causes: [
      '★초대륙 판게아(Pangea) 형성으로 대륙붕(얕은 바다) 면적 급감',
      '★시베리아 트랩의 대규모 화산 폭발로 인한 온난화 및 산성비',
      '막대한 이산화탄소(CO₂) 및 온실가스 방출, 해양 산성화 및 심해 무산소화'
    ],
    causeMechanism: '판게아가 합쳐지며 해안선이 대폭 축소된 상태에서, 시베리아 지역에서 수백만 년간 용암이 뿜어져 나왔습니다. 배출된 온실가스로 지구가 끓어오르고 바다는 산성화되고 산소가 사라져 생태계가 완전히 붕괴되었습니다.',
    ecologicalImpact: '해양 생물종의 약 95% 절멸! 육상 척추동물 70% 이상 멸종! 고생대를 대표하던 삼엽충과 방추충(푸줄리나)이 영원히 지구상에서 사라졌습니다.',
    survivorsAndEvolution: '지구 생태계의 90% 이상이 청소된 거대한 빈자리에서, 중생대 파충류와 공룡의 조상이 폭발적으로 분화할 수 있는 기틀이 마련되었습니다.',
    examCheckPoints: [
      '★★지구 역사상 가장 규모가 컸던 최대의 대멸종 (약 95% 멸종)★★',
      '고생대와 중생대의 경계를 짓는 결정적 사건',
      '삼엽충과 방추충이 완전히 멸종함',
      '원인: 초대륙 판게아 형성 + 시베리아 대규모 화산 폭발로 인한 온난화 및 산성비'
    ]
  },
  {
    order: 4,
    name: '4차 대멸종 (트라이아스기 말)',
    timingPeriod: '중생대 트라이아스기 말',
    timingMa: 201,
    era: '중생대',
    eraId: 'mesozoic',
    extinctionRateSpecies: 80,
    extinctionRateFamily: 22,
    causes: [
      '초대륙 판게아 분열 시작',
      '중앙대서양 마그마 지대(CAMP) 분출',
      '대기 중 이산화탄소 급증 및 기후 급변'
    ],
    causeMechanism: '판게아가 쪼개지면서 대서양이 벌어지는 틈새에서 중앙대서양 마그마 지대(CAMP)의 격렬한 분출이 일어나 대기 중 CO₂가 급증하고 기후가 급변하였습니다.',
    ecologicalImpact: '원시 지배파충류의 경쟁 무리, 대형 양서류 등 생물종 약 80%가 멸종했습니다.',
    survivorsAndEvolution: '강력한 경쟁자였던 원시 파충류들이 제거되자, 공룡 무리가 생태계의 최고 포식자로 자리매김하며 쥐라기 "공룡의 황금기"가 열렸습니다.',
    examCheckPoints: [
      '중생대 첫 번째 대멸종 (약 80% 멸종)',
      '원인: 판게아 분열 + 중앙대서양 마그마 지대 분출로 인한 CO₂ 급증',
      '결과: 공룡이 경쟁자를 제치고 쥐라기에 전성기를 맞이하게 됨'
    ]
  },
  {
    order: 5,
    name: '5차 대멸종 (백악기 말)',
    timingPeriod: '중생대 백악기 말 (중생대-신생대 경계)',
    timingMa: 66,
    era: '중생대',
    eraId: 'mesozoic',
    extinctionRateSpecies: 75,
    extinctionRateFamily: 17,
    causes: [
      '★소행성 충돌 (멕시코 유카탄 반도 칙술루브 충돌구)',
      '먼지 구름으로 인한 태양광 차단 (충돌 겨울)',
      '기온 급감, 식물 광합성 중단, 지구 먹이사슬 완전 붕괴'
    ],
    causeMechanism: '지름 10km의 거대한 소행성이 충돌하며 수천만 톤의 먼지 구름이 태양광을 차단했습니다. 수년간 암흑과 기온 급감이 이어져 식물이 죽어가며 공룡과 암모나이트가 전멸했습니다.',
    ecologicalImpact: '공룡, 익룡, 어룡 등 파충류와 바다의 대표 표준화석인 암모나이트가 전멸했습니다 (약 75% 멸종).',
    survivorsAndEvolution: '소형 포유류와 속씨식물이 살아남아 신생대 포유류의 폭발적 번성으로 이어졌습니다.',
    examCheckPoints: [
      '중생대와 신생대의 경계를 짓는 대멸종 (약 75% 멸종)',
      '공룡과 암모나이트가 완전히 전멸한 사건',
      '원인: 소행성 충돌 + 먼지 구름 태양광 차단으로 인한 기온 급감',
      '결과: 신생대 포유류와 속씨식물의 번성 계기 마련'
    ]
  }
];

export interface ExamQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  relatedEra: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic';
  topic: '연대비율' | '표준화석' | '시상화석' | '기후변화' | '5대대멸종' | '생물진화인과관계';
  causalityExplanation: string;
  tip: string;
}

export const EXAM_QUESTIONS: ExamQuestion[] = [
  {
    id: 1,
    question: '지질 시대의 상대적 길이와 수치 연대에 대한 설명으로 옳은 것만을 고른 것은?',
    options: [
      '선캄브리아 시대는 전체 지질 시대의 약 50%를 차지한다.',
      '중생대는 고생대보다 지속된 기간이 더 길다.',
      '전체 지질 시대 중 선캄브리아 시대가 약 88.2%로 가장 긴 기간을 차지한다.',
      '신생대는 약 2억 5200만 년 전에 시작되었다.'
    ],
    correctIndex: 2,
    relatedEra: 'precambrian',
    topic: '연대비율',
    causalityExplanation: '지구 역사(약 46억 년 전~현재) 중 선캄브리아 시대는 4600 Ma ~ 541 Ma로 전체의 약 88.2%에 달합니다. 고생대는 약 2억 8900만 년간 지속되어 중생대(약 1억 8600만 년)보다 깁니다. 신생대는 약 6600만 년 전 시작되었습니다.',
    tip: '선캄브리아대(88.2%) > 고생대(6.3%) > 중생대(4.0%) > 신생대(1.4%)'
  },
  {
    id: 2,
    question: '고생대 실루리아기에 일어난 생물계의 일대 변천과 그 원인으로 가장 타당한 인과관계는?',
    options: [
      '운석 충돌로 기온이 급격히 내려가 생물들이 동굴로 피신하였다.',
      '대기 중 산소 축적으로 성층권에 오존층(O₃)이 형성되어 자외선이 차단되면서 생물이 육상으로 진출하였다.',
      '판게아가 분열되어 바다가 갈라져 육상 식물이 물속으로 들어갔다.',
      '빙하기가 찾아와 바다가 모두 얼어붙어 생물들이 억지로 얼음 위로 올라왔다.'
    ],
    correctIndex: 1,
    relatedEra: 'paleozoic',
    topic: '생물진화인과관계',
    causalityExplanation: '원시 바다에서 광합성을 한 남세균과 해조류 덕분에 산소 농도가 높아졌고, 실루리아기 무렵 성층권에 충분한 오존층(O₃)이 생겨 생명체에 치명적인 자외선(UV)을 차단해주었기 때문에 비로소 육상 진출이 가능해졌습니다.',
    tip: '인과관계 공식: 광합성 누적 → 산소 증가 → 오존층 형성 → 자외선 차단 → 육상 진출!'
  },
  {
    id: 3,
    question: '표준화석과 시상화석의 조건 및 연결이 올바르게 짝지어진 것은?',
    options: [
      '표준화석: 생존 기간이 길고 분포 면적이 좁다 (예: 산호, 고사리)',
      '시상화석: 생존 기간이 짧고 분포 면적이 넓다 (예: 삼엽충, 암모나이트)',
      '표준화석: 생존 기간이 짧고 분포 면적이 넓다 (예: 삼엽충, 공룡, 화폐석)',
      '시상화석: 특정 시대를 알려주는 화석이다 (예: 매머드)'
    ],
    correctIndex: 2,
    relatedEra: 'paleozoic',
    topic: '표준화석',
    causalityExplanation: '표준화석은 특정한 "시대"를 알려주므로 진화 속도가 빨라 생존 기간은 짧고, 널리 퍼져 살아야 하므로 분포 면적이 넓어야 합니다. 반면 시상화석은 "환경"을 알려주므로 오랜 세월 특정 기후 조건에서만 좁게 서식해야 합니다.',
    tip: '표준화석 = 시대(단명광역), 시상화석 = 환경(장수협역: 산호=따뜻얕은바다, 고사리=온난습윤육지)'
  },
  {
    id: 4,
    question: '중생대 기후의 가장 독보적인 특징으로 시험에 항상 출제되는 사실은 무엇인가?',
    options: [
      '수차례의 혹독한 빙하기와 간빙기가 4회 반복되었다.',
      '전 기간에 걸쳐 빙하기가 전혀 없이 전반적으로 매우 온난하였다.',
      '초기에는 극도로 추운 눈덩이 지구 상태였다.',
      '페름기보다 기온이 20도 이상 낮아져 파충류가 겨울잠만 잤다.'
    ],
    correctIndex: 1,
    relatedEra: 'mesozoic',
    topic: '기후변화',
    causalityExplanation: '중생대(252~66 Ma)는 트라이아스기, 쥐라기, 백악기 전 기간 동안 빙하기 흔적이 전혀 발견되지 않으며 전 지구적으로 매우 온난했습니다. 극지방에도 얼음이 없고 울창한 겉씨식물 삼림과 공룡이 서식했습니다.',
    tip: '빙하기 전무(0회) = 중생대만의 절대 공식! (신생대 제4기에는 빙하기 4회, 간빙기 3회)'
  },
  {
    id: 5,
    question: '지구 역사상 최대 규모의 대멸종인 "3차 대멸종(페름기 말)"의 주요 원인들의 조합으로 옳은 것은?',
    options: [
      '판게아 분열과 소행성 충돌',
      '초대륙 판게아 형성에 따른 대륙붕 감소 + 시베리아 트랩 화산 폭발과 극심한 지구 온난화 및 해양 무산소화',
      '인간의 무분별한 포획과 온실가스 배출',
      '남극 대륙의 결빙과 극심한 한랭화 빙하기'
    ],
    correctIndex: 1,
    relatedEra: 'paleozoic',
    topic: '5대대멸종',
    causalityExplanation: '페름기 말에는 대륙들이 하나로 합쳐져 "판게아"를 이루며 해안선 대륙붕 면적이 줄어든 상황에서, 시베리아 트랩에서 거대한 현무암질 화산이 대폭발하여 막대한 온실가스를 방출했습니다. 이로 인해 온난화, 해양 산성화, 무산소화가 닥쳐 해양 생물종의 약 96%가 절멸했습니다.',
    tip: '페름기 말 3차 대멸종 = 판게아 형성 + 시베리아 화산 폭발 + 온실효과 온난화 (삼엽충·방추충 완전 멸종)'
  },
  {
    id: 6,
    question: '중생대와 신생대의 식물 및 척추동물 번성 순서를 바르게 나열한 것은?',
    options: [
      '중생대: 속씨식물·포유류 번성 → 신생대: 겉씨식물·파충류 번성',
      '중생대: 양치식물·양서류 번성 → 신생대: 조류·어류 번성',
      '중생대: 겉씨식물(소철, 은행)·파충류(공룡) 번성 → 신생대: 속씨식물(단풍, 참나무, 풀)·포유류(매머드 등) 번성',
      '중생대: 해조류·삼엽충 번성 → 신생대: 양치식물·갑주어 번성'
    ],
    correctIndex: 2,
    relatedEra: 'mesozoic',
    topic: '생물진화인과관계',
    causalityExplanation: '식물 진화 순서는 해조류 → 양치식물(고생대 석탄기 번성) → 겉씨식물(중생대 번성) → 속씨식물(신생대 번성)입니다. 척추동물은 어류(고생대 데본기) → 양서류(고생대 석탄기) → 파충류(중생대) → 포유류(신생대) 순서입니다.',
    tip: '식물: 양(고생대) - 겉(중생대) - 속(신생대) / 동물: 어 - 양 - 파(중생대) - 포(신생대)'
  },
  {
    id: 7,
    question: '백악기 말(약 6600만 년 전) 5차 대멸종으로 지구상에서 완전히 사라진 대표적인 생물 조합은?',
    options: [
      '삼엽충과 방추충',
      '공룡과 암모나이트',
      '갑주어와 필석',
      '매머드와 화폐석'
    ],
    correctIndex: 1,
    relatedEra: 'mesozoic',
    topic: '5대대멸종',
    causalityExplanation: '백악기 말에는 멕시코 유카탄 반도 소행성 충돌과 인도 데칸 트랩 화산 분출로 먼지구름이 햇빛을 가려 충돌 겨울이 발생했고, 중생대를 대표하던 "공룡"과 바다의 "암모나이트"가 완전히 절멸했습니다.',
    tip: '삼엽충·방추충 절멸 = 페름기 말(고생대 끝) / 공룡·암모나이트 절멸 = 백악기 말(중생대 끝)'
  },
  {
    id: 8,
    question: '어느 지층에서 "화폐석"과 "매머드" 화석이 함께 발견되었다면, 이 지층이 퇴적된 시대로 옳은 것은?',
    options: [
      '고생대',
      '선캄브리아 시대',
      '중생대',
      '신생대'
    ],
    correctIndex: 3,
    relatedEra: 'cenozoic',
    topic: '표준화석',
    causalityExplanation: '화폐석은 신생대 전기(팔레오기~네오기)의 따뜻한 얕은 바다 표준화석이고, 매머드는 신생대 후기(제4기) 한랭한 육상의 표준화석입니다. 두 화석 모두 "신생대"를 대표합니다.',
    tip: '신생대 암기 비법: "화·매" (화폐석, 매머드)'
  },
  {
    id: 9,
    question: '어느 퇴적암 지층을 조사하였더니 수많은 "산호" 화석이 산출되었다. 당시 이 지역의 과거 환경을 추론한 것으로 옳은 것은?',
    options: [
      '춥고 깊은 심해 바다였다.',
      '수온이 약 20℃ 이상인 따뜻하고 수심이 얕으며 맑은 바다였다.',
      '따뜻하고 습윤한 육지의 늪지대였다.',
      '건조한 사막 기후의 내륙 호수였다.'
    ],
    correctIndex: 1,
    relatedEra: 'paleozoic',
    topic: '시상화석',
    causalityExplanation: '산호는 환경에 민감한 대표적인 시상화석입니다. 산호가 잘 자라려면 햇빛이 닿아야 하므로 얕고 맑아야 하며, 수온이 20℃ 이상인 따뜻한 바다여야 합니다. (온난 습윤한 육지는 고사리)',
    tip: '산호 = 따뜻하고 얕고 맑은 바다 / 고사리 = 온난 습윤한 육지'
  },
  {
    id: 10,
    question: '4차 대멸종(트라이아스기 말) 이후 생태계에 나타난 결과로 가장 적절한 것은?',
    options: [
      '공룡의 강력한 경쟁자였던 원시 파충류와 대형 양서류가 멸종하여, 공룡이 쥐라기 전성기로 도약하였다.',
      '인류가 최초로 출현하여 농경을 시작하였다.',
      '모든 파충류가 멸종하고 포유류의 시대가 열렸다.',
      '오존층이 파괴되어 생물들이 다시 바다로 퇴각하였다.'
    ],
    correctIndex: 0,
    relatedEra: 'mesozoic',
    topic: '5대대멸종',
    causalityExplanation: '트라이아스기 말 판게아 분열과 화산 활동으로 4차 대멸종이 일어나면서 공룡과 경쟁하던 원시 지배파충류 무리가 사라졌습니다. 살아남은 공룡은 비어있는 생태계 지위를 독점하며 쥐라기~백악기에 거대한 크기로 번성했습니다.',
    tip: '4차 대멸종의 인과관계: 경쟁자 멸종 → 공룡의 쥐라기 독점 전성기 개막!'
  }
];
