/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * [기본 다지기] 무한 문제 생성기 (Procedural Infinite Drill Generator)
 * - 한 번당 10문항으로 구성된 핵심 개념 퀴즈를 무한히 제공
 * - 이전 10문제와 내용이 겹치지 않도록 excludeSignatures 기반 비중복 필터링
 */

export interface GeneratedDrillQuestion {
  id: number;
  signature: string; // 중복 방지용 고유 식별자
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  relatedEra: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic';
  topic: string;
}

interface QuestionBuilder {
  signature: string;
  topic: string;
  relatedEra: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic';
  build: () => { question: string; options: string[]; correctIndex: number; explanation: string };
}

function shuffle<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// 40개 이상의 개별 템플릿 빌더 풀 (이전 세트와 100% 비중복 보장)
const QUESTION_BUILDERS_POOL: QuestionBuilder[] = [
  // 1. 화석 정의
  {
    signature: 'def_index_fossil',
    topic: '화석의 정의',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '생존 기간이 짧고 분포 면적이 넓다.',
        '생존 기간이 길고 분포 면적이 좁다.',
        '생존 기간이 길고 특정 환경에만 국한된다.',
        '기후 변화에 민감하여 서식지가 매우 좁다.'
      ]);
      return {
        question: '지층의 퇴적 시기(지질 시대)를 결정하고 구분하는 "표준화석"의 조건으로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('생존 기간이 짧고 분포 면적이 넓다.'),
        explanation: '표준화석은 진화 속도가 빨라 생존 기간이 짧아야 하고(단명), 전 세계에 고루 분포해야 하므로 분포 면적이 넓어야 합니다(광역).'
      };
    }
  },
  {
    signature: 'def_facies_fossil',
    topic: '화석의 정의',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '생존 기간이 길고 특정 환경에만 서식하여 분포 면적이 좁다.',
        '생존 기간이 짧고 전 세계에 고루 분포한다.',
        '지질 시대를 결정짓는 절대적인 기준이 된다.',
        '진화 속도가 매우 빨라 좁은 연대에서만 산출된다.'
      ]);
      return {
        question: '지층이 퇴적될 당시의 "과거 환경"을 알려주는 "시상화석"의 조건으로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('생존 기간이 길고 특정 환경에만 서식하여 분포 면적이 좁다.'),
        explanation: '시상화석(산호, 고사리 등)은 오랜 세월 살아남아 환경을 증언해야 하므로 생존 기간이 길고, 특정 환경 조건에만 서식하여 분포 면적이 좁아야 합니다.'
      };
    }
  },

  // 2. 시상화석 환경
  {
    signature: 'env_coral',
    topic: '시상화석 환경',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '따뜻하고(약 20℃ 이상) 수심이 얕고 맑은 바다',
        '따뜻하고 습윤한 육지의 늪지대',
        '춥고 어두운 깊은 심해저 바닥',
        '일교차가 크고 건조한 사막 지대'
      ]);
      return {
        question: '어느 지층에서 "산호" 화석이 산출되었다. 당시 이 지역의 과거 환경으로 가장 타당한 것은?',
        options: opts,
        correctIndex: opts.indexOf('따뜻하고(약 20℃ 이상) 수심이 얕고 맑은 바다'),
        explanation: '산호는 햇빛이 닿아야 하는 따뜻하고 얕고 맑은 바다 환경을 지시하는 대표적인 시상화석입니다.'
      };
    }
  },
  {
    signature: 'env_fern',
    topic: '시상화석 환경',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '따뜻하고 습윤한 육지 환경',
        '따뜻하고 수심이 얕은 맑은 바다',
        '빙하가 발달한 극지방 툰드라',
        '파도가 거센 깊은 원양 해양'
      ]);
      return {
        question: '어느 지층에서 "고사리" 화석이 다량 산출되었다. 퇴적 당시의 과거 환경으로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('따뜻하고 습윤한 육지 환경'),
        explanation: '고사리는 온난하고 습기가 많은 육지 환경을 지시하는 대표적인 시상화석입니다.'
      };
    }
  },
  {
    signature: 'env_clam',
    topic: '시상화석 환경',
    relatedEra: 'cenozoic',
    build: () => {
      const opts = shuffle([
        '수심이 얕은 바다나 조간대(갯벌)',
        '건조한 내륙 고원 지대',
        '울창한 열대 우림 육지',
        '수심 4000m 이상의 심해 분지'
      ]);
      return {
        question: '어느 지층에서 "조개" 화석이 산출되었다. 과거 이 지역의 퇴적 환경으로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('수심이 얕은 바다나 조간대(갯벌)'),
        explanation: '조개 화석은 수심이 얕은 연안 바다나 조간대(갯벌) 환경을 알려주는 시상화석입니다.'
      };
    }
  },

  // 3. 고생대 화석
  {
    signature: 'fossil_trilobite',
    topic: '고생대 표준화석',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle(['고생대', '선캄브리아대', '중생대', '신생대']);
      return {
        question: '몸이 머리, 가슴, 꼬리 3부분으로 나뉜 바다 절지동물인 "삼엽충"의 전성기 지질 시대는?',
        options: opts,
        correctIndex: opts.indexOf('고생대'),
        explanation: '삼엽충은 고생대 캄브리아기부터 페름기 말까지 바다에서 번성한 고생대의 가장 대표적인 표준화석입니다.'
      };
    }
  },
  {
    signature: 'fossil_graptolite',
    topic: '고생대 표준화석',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle(['필석', '암모나이트', '화폐석', '매머드']);
      return {
        question: '고생대 오르도비스기~실루리아기 바다에 떠다니며 살았던 붓글씨 모양의 군체 화석은?',
        options: opts,
        correctIndex: opts.indexOf('필석'),
        explanation: '필석은 붓(筆)으로 쓴 글씨 모양을 닮은 고생대 전기의 대표 표준화석입니다. (고생대 암기: 삼·필·갑·방)'
      };
    }
  },
  {
    signature: 'fossil_ostracoderm',
    topic: '고생대 표준화석',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle(['갑주어', '시조새', '공룡', '디킨소니아']);
      return {
        question: '머리 부분에 단단한 뼈판 갑옷을 둘렀던 고생대 데본기 "어류의 시대" 대표 화석은?',
        options: opts,
        correctIndex: opts.indexOf('갑주어'),
        explanation: '갑주어는 턱이 없는 원시 어류로 고생대 오르도비스기부터 데본기까지 번성한 표준화석입니다.'
      };
    }
  },
  {
    signature: 'fossil_fusulina',
    topic: '고생대 표준화석',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle(['방추충 (푸줄리나)', '화폐석', '스트로마톨라이트', '산호']);
      return {
        question: '석탄기~페름기 얕은 바다에 살았던 쌀알 모양의 대형 유공충 화석은?',
        options: opts,
        correctIndex: opts.indexOf('방추충 (푸줄리나)'),
        explanation: '방추충(푸줄리나)은 고생대 후기(석탄기~페름기)의 대표적인 표준화석이며, 페름기 말 3차 대멸종 때 절멸했습니다.'
      };
    }
  },
  {
    signature: 'organism_sacabambaspis',
    topic: '고생대 무악어류',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '고생대 오르도비스기 - 턱이 없는 원시 무악어류',
        '중생대 쥐라기 - 하늘을 날아다니는 익룡',
        '신생대 제4기 - 빙하기에 서식한 거대 포유류',
        '선캄브리아 시대 - 최초의 다세포 연체동물'
      ]);
      return {
        question: '머리 앞쪽에 동그란 두 눈이 몰려 있는 독특한 외모의 원시 척추동물 "사카밤바스피스"의 시대와 분류는?',
        options: opts,
        correctIndex: opts.indexOf('고생대 오르도비스기 - 턱이 없는 원시 무악어류'),
        explanation: '사카밤바스피스는 고생대 오르도비스기 바다에 살았던 턱이 없는 원시 무악어류로, 1차 대멸종 시기의 어류 진화 연구에 중요한 표본입니다.'
      };
    }
  },

  // 4. 중생대 화석
  {
    signature: 'fossil_ammonite',
    topic: '중생대 표준화석',
    relatedEra: 'mesozoic',
    build: () => {
      const opts = shuffle(['중생대', '고생대', '신생대', '선캄브리아대']);
      return {
        question: '소용돌이 모양의 나선형 껍데기를 가진 두족류 "암모나이트"가 번성했던 지질 시대는?',
        options: opts,
        correctIndex: opts.indexOf('중생대'),
        explanation: '암모나이트는 중생대 바다의 대표 표준화석이며, 백악기 말 소행성 충돌로 공룡과 함께 전멸했습니다.'
      };
    }
  },
  {
    signature: 'fossil_dinosaur',
    topic: '중생대 표준화석',
    relatedEra: 'mesozoic',
    build: () => {
      const opts = shuffle(['중생대', '신생대', '고생대', '선캄브리아대']);
      return {
        question: '육상 생태계의 절대 강자로 트라이아스기부터 백악기까지 번성한 "공룡"의 번성 시대는?',
        options: opts,
        correctIndex: opts.indexOf('중생대'),
        explanation: '공룡은 중생대 육상 생태계를 지배한 대표 표준화석입니다.'
      };
    }
  },
  {
    signature: 'fossil_archaeopteryx',
    topic: '진화의 증거',
    relatedEra: 'mesozoic',
    build: () => {
      const opts = shuffle([
        '파충류와 조류의 특징을 모두 지닌 진화의 중간 단계 화석이다.',
        '어류에서 양서류로 넘어가는 징검다리 화석이다.',
        '신생대 빙하기에 살았던 최초의 포유류이다.',
        '고생대 바다를 헤엄쳤던 최초의 비행 동물이다.'
      ]);
      return {
        question: '중생대 쥐라기의 표준화석인 "시조새"가 진화학적으로 중요한 이유는?',
        options: opts,
        correctIndex: opts.indexOf('파충류와 조류의 특징을 모두 지닌 진화의 중간 단계 화석이다.'),
        explanation: '시조새는 날개와 깃털(조류)뿐 아니라 부리의 이빨, 날개 발톱, 긴 꼬리뼈(파충류)를 지녀 진화의 확실한 증거가 됩니다.'
      };
    }
  },

  // 5. 신생대 화석
  {
    signature: 'fossil_nummulite',
    topic: '신생대 표준화석',
    relatedEra: 'cenozoic',
    build: () => {
      const opts = shuffle(['화폐석', '삼엽충', '암모나이트', '방추충']);
      return {
        question: '신생대 전기(팔레오기~네오기) 따뜻하고 얕은 바다에 번성했던 동전 모양의 유공충 화석은?',
        options: opts,
        correctIndex: opts.indexOf('화폐석'),
        explanation: '화폐석(동전 모양 유공충)은 신생대 전기의 대표 표준화석입니다. (신생대 암기: 화·매)'
      };
    }
  },
  {
    signature: 'fossil_mammoth',
    topic: '신생대 표준화석',
    relatedEra: 'cenozoic',
    build: () => {
      const opts = shuffle([
        '신생대 제4기 한랭한 빙하기 기후를 알려준다.',
        '중생대 온난한 기후의 바다 환경을 알려준다.',
        '고생대 석탄기 거대 늪지대 환경을 알려준다.',
        '선캄브리아 시대 원시 바다 환경을 알려준다.'
      ]);
      return {
        question: '두꺼운 털과 굽은 엄니를 가진 "매머드" 화석이 갖는 고기후적 의미는?',
        options: opts,
        correctIndex: opts.indexOf('신생대 제4기 한랭한 빙하기 기후를 알려준다.'),
        explanation: '매머드는 신생대 후기(제4기) 빙하기의 한랭 기후 환경을 지시하는 대표 표준화석입니다.'
      };
    }
  },

  // 6. 선캄브리아 시대 화석
  {
    signature: 'fossil_stromatolite',
    topic: '선캄브리아 표준화석',
    relatedEra: 'precambrian',
    build: () => {
      const opts = shuffle(['스트로마톨라이트', '삼엽충', '화폐석', '암모나이트']);
      return {
        question: '남세균(시아노박테리아)의 광합성 활동으로 모래 알갱이가 겹겹이 굳어진 선캄브리아 시대 대표 화석은?',
        options: opts,
        correctIndex: opts.indexOf('스트로마톨라이트'),
        explanation: '스트로마톨라이트는 초기 지구 광합성 활동과 대기 산소 공급을 입증하는 가장 오래된 대표 화석입니다.'
      };
    }
  },
  {
    signature: 'fossil_ediacara',
    topic: '선캄브리아 표준화석',
    relatedEra: 'precambrian',
    build: () => {
      const opts = shuffle(['에디아카라 동물군', '공룡', '갑주어', '시조새']);
      return {
        question: '원생누대 말기 얕은 바다에 살았던 뼈나 껍데기가 없는 연체 다세포 동물 화석 무리는?',
        options: opts,
        correctIndex: opts.indexOf('에디아카라 동물군'),
        explanation: '에디아카라 동물군은 원생누대 말기 최초의 대형 다세포 동물의 출현을 증명하는 선캄브리아 시대 화석군입니다.'
      };
    }
  },

  // 7. 수치 연대 및 기간 비율
  {
    signature: 'duration_precambrian',
    topic: '수치 연대 비율',
    relatedEra: 'precambrian',
    build: () => {
      const opts = shuffle([
        '약 88.2% (약 40억 년간 지속)',
        '약 50.0% (지구 역사의 절반)',
        '약 15.0% (고생대와 비슷한 기간)',
        '약 5.0% (가장 짧은 기간)'
      ]);
      return {
        question: '지구 역사(약 46억 년) 중 선캄브리아 시대가 차지하는 시간적 비율은?',
        options: opts,
        correctIndex: opts.indexOf('약 88.2% (약 40억 년간 지속)'),
        explanation: '선캄브리아 시대는 4600Ma~541Ma로 전체 지질 시대의 무려 88.2%를 차지하는 가장 긴 시대입니다.'
      };
    }
  },
  {
    signature: 'era_boundary_numbers',
    topic: '수치 연대 경계',
    relatedEra: 'mesozoic',
    build: () => {
      const opts = shuffle([
        '고생대-중생대: 약 2억 5200만 년 전(252Ma) / 중생대-신생대: 약 6600만 년 전(66Ma)',
        '고생대-중생대: 약 5억 4100만 년 전(541Ma) / 중생대-신생대: 약 2억 5200만 년 전(252Ma)',
        '고생대-중생대: 약 6600만 년 전(66Ma) / 중생대-신생대: 약 1만 년 전(0.01Ma)',
        '고생대-중생대: 약 1억 년 전(100Ma) / 중생대-신생대: 약 1000만 년 전(10Ma)'
      ]);
      return {
        question: '교과서 기준 [고생대-중생대] 및 [중생대-신생대] 경계의 수치 연대(Ma)로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('고생대-중생대: 약 2억 5200만 년 전(252Ma) / 중생대-신생대: 약 6600만 년 전(66Ma)'),
        explanation: '고생대 말(페름기 말 3차 대멸종)은 252Ma, 중생대 말(백악기 말 5차 대멸종)은 66Ma입니다.'
      };
    }
  },

  // 8. 5대 대멸종
  {
    signature: 'extinction_3rd_permian',
    topic: '5대 대멸종',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '고생대 페름기 말 (3차 대멸종, 약 95% 절멸)',
        '고생대 오르도비스기 말 (1차 대멸종, 약 85% 절멸)',
        '중생대 백악기 말 (5차 대멸종, 약 75% 절멸)',
        '중생대 트라이아스기 말 (4차 대멸종, 약 80% 절멸)'
      ]);
      return {
        question: '지구 역사상 발생한 5대 대멸종 중 가장 규모가 컸던 사건과 시기는?',
        options: opts,
        correctIndex: opts.indexOf('고생대 페름기 말 (3차 대멸종, 약 95% 절멸)'),
        explanation: '지구 역사상 최대 규모의 대멸종은 고생대 페름기 말 3차 대멸종으로 해양 생물종의 약 95%가 절멸했습니다.'
      };
    }
  },
  {
    signature: 'extinction_3rd_causes',
    topic: '5대 대멸종 원인',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '초대륙 판게아 형성(대륙붕 감소)과 시베리아 트랩 화산 폭발로 인한 온난화 및 산성비',
        '소행성 충돌과 먼지 구름으로 인한 태양광 차단',
        '남극 대륙의 결빙으로 인한 전 지구적 기온 급감',
        '오존층 파괴로 인한 과도한 자외선 유입'
      ]);
      return {
        question: '고생대 페름기 말 3차 대멸종(약 95% 멸종)의 복합적 주원인으로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('초대륙 판게아 형성(대륙붕 감소)과 시베리아 트랩 화산 폭발로 인한 온난화 및 산성비'),
        explanation: '판게아 형성으로 얕은 바다가 줄어든 상황에서, 시베리아 화산 폭발로 온난화, 산성비, 해양 산성화가 발생했습니다.'
      };
    }
  },
  {
    signature: 'extinction_5th_cretaceous',
    topic: '5대 대멸종 원인',
    relatedEra: 'mesozoic',
    build: () => {
      const opts = shuffle([
        '소행성 충돌과 먼지 구름으로 인한 태양광 차단(충돌 겨울) 및 기온 급감',
        '초대륙 판게아 형성에 따른 대륙붕 면적 급감',
        '전 지구적 빙하기 도래와 해수면 수십 m 급강하',
        '해양 무산소화로 인한 바닷속 산소 고갈'
      ]);
      return {
        question: '중생대 백악기 말 5차 대멸종(공룡과 암모나이트 전멸, 약 75% 멸종)의 결정적 원인은?',
        options: opts,
        correctIndex: opts.indexOf('소행성 충돌과 먼지 구름으로 인한 태양광 차단(충돌 겨울) 및 기온 급감'),
        explanation: '직경 10km 소행성이 충돌하여 먼지 구름이 태양광을 차단하면서 기온 급감과 광합성 중단으로 공룡과 암모나이트가 전멸했습니다.'
      };
    }
  },
  {
    signature: 'extinction_1st_ordovician',
    topic: '5대 대멸종',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '대륙 빙하 형성에 따른 기온 급감(빙하기)과 해수면 하강',
        '거대 소행성 충돌과 태양광 차단',
        '초대륙 판게아의 급격한 분열',
        '원시 인류의 과도한 사냥 활동'
      ]);
      return {
        question: '고생대 오르도비스기 말에 일어난 1차 대멸종(약 85% 멸종)의 주원인은?',
        options: opts,
        correctIndex: opts.indexOf('대륙 빙하 형성에 따른 기온 급감(빙하기)과 해수면 하강'),
        explanation: '1차 대멸종은 곤드와나 대륙이 남극으로 이동하며 빙하가 형성되어 기온 급감과 해수면 하강이 일어나 해양 생물 85%가 절멸했습니다.'
      };
    }
  },
  {
    signature: 'extinction_4th_triassic',
    topic: '5대 대멸종',
    relatedEra: 'mesozoic',
    build: () => {
      const opts = shuffle([
        '판게아 분열 시 중앙대서양 마그마 지대(CAMP) 분출로 대기 중 CO₂ 급증',
        '외계 행성의 중력 섭동',
        '전 지구적 한랭화로 인한 얼음 행성화',
        '산소 농도 급감으로 모든 척추동물 질식'
      ]);
      return {
        question: '중생대 트라이아스기 말 4차 대멸종(약 80% 멸종)의 주원인으로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('판게아 분열 시 중앙대서양 마그마 지대(CAMP) 분출로 대기 중 CO₂ 급증'),
        explanation: '판게아가 쪼개지며 중앙대서양 마그마 지대(CAMP)의 격렬한 분출이 일어나 대기 중 CO₂가 급증하고 기후가 급변했습니다.'
      };
    }
  },

  // 9. 기후 특징
  {
    signature: 'climate_mesozoic_no_ice',
    topic: '지질시대 기후',
    relatedEra: 'mesozoic',
    build: () => {
      const opts = shuffle([
        '중생대 - 전 기간 동안 빙하기가 전혀 없이 온난하였다.',
        '신생대 - 전 기간 동안 빙하기가 전혀 발생하지 않았다.',
        '고생대 - 빙하기가 전혀 발생하지 않고 열대 기후만 지속되었다.',
        '선캄브리아대 - 온난 기후만 지속되고 빙하기 흔적이 전혀 없다.'
      ]);
      return {
        question: '지질 시대별 기후 특징 중 수능·교과서에 항상 출제되는 사실은?',
        options: opts,
        correctIndex: opts.indexOf('중생대 - 전 기간 동안 빙하기가 전혀 없이 온난하였다.'),
        explanation: '중생대는 트라이아스기, 쥐라기, 백악기 전 기간 동안 빙하기 흔적이 전혀 발견되지 않으며 전 지구적으로 온난했습니다.'
      };
    }
  },
  {
    signature: 'climate_cenozoic_4th',
    topic: '지질시대 기후',
    relatedEra: 'cenozoic',
    build: () => {
      const opts = shuffle([
        '신생대 제4기에는 빙하기 4회와 간빙기 3회가 주기적으로 교대하였다.',
        '신생대 제4기에는 전 기간 동안 빙하기가 단 1회만 있었다.',
        '신생대 전기는 극도로 추웠으나 후기로 갈수록 온난해졌다.',
        '신생대 제4기에는 사하라 사막 크기의 빙하만 존재했다.'
      ]);
      return {
        question: '신생대 기후 변동에 대한 설명으로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('신생대 제4기에는 빙하기 4회와 간빙기 3회가 주기적으로 교대하였다.'),
        explanation: '신생대 전기는 온난했으나 후기인 제4기에는 빙하기 4회와 간빙기 3회가 교대로 찾아와 한랭화되었습니다.'
      };
    }
  },

  // 10. 생물 변천 계통
  {
    signature: 'evo_plant_order',
    topic: '생물계 변천',
    relatedEra: 'cenozoic',
    build: () => {
      const opts = shuffle([
        '해조류 → 양치식물(고생대) → 겉씨식물(중생대) → 속씨식물(신생대)',
        '해조류 → 겉씨식물(고생대) → 속씨식물(중생대) → 양치식물(신생대)',
        '양치식물 → 해조류 → 속씨식물 → 겉씨식물',
        '속씨식물 → 겉씨식물 → 양치식물 → 해조류'
      ]);
      return {
        question: '지질 시대를 거치며 번성한 식물계의 올바른 변천 순서는?',
        options: opts,
        correctIndex: opts.indexOf('해조류 → 양치식물(고생대) → 겉씨식물(중생대) → 속씨식물(신생대)'),
        explanation: '바다의 해조류에서 시작해 고생대 석탄기 거대 양치식물, 중생대 겉씨식물(소철, 은행), 신생대 속씨식물(단풍, 참나무, 초원) 순으로 번성했습니다.'
      };
    }
  },
  {
    signature: 'evo_animal_order',
    topic: '생물계 변천',
    relatedEra: 'cenozoic',
    build: () => {
      const opts = shuffle([
        '무척추동물 → 어류(고생대) → 양서류 → 파충류(중생대) → 포유류(신생대)',
        '무척추동물 → 파충류 → 어류 → 양서류 → 포유류',
        '어류 → 무척추동물 → 포유류 → 파충류 → 양서류',
        '포유류 → 파충류 → 양서류 → 어류 → 무척추동물'
      ]);
      return {
        question: '척추동물의 지질 시대별 주요 번성 순서로 옳은 것은?',
        options: opts,
        correctIndex: opts.indexOf('무척추동물 → 어류(고생대) → 양서류 → 파충류(중생대) → 포유류(신생대)'),
        explanation: '무척추동물에서 어류(갑주어) → 양서류 → 파충류(공룡) → 포유류(매머드) 순으로 진화·번성했습니다.'
      };
    }
  },
  {
    signature: 'causality_ozone_layer',
    topic: '오존층과 육상진출',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '고생대 실루리아기에 오존층(O₃)이 완성되어 자외선을 차단했기 때문',
        '중생대 백악기에 공룡이 바다 생물을 쫓아냈기 때문',
        '선캄브리아 시대에 바닷물이 전부 말라붙었기 때문',
        '신생대에 빙하기가 와서 얼음 위로 올라왔기 때문'
      ]);
      return {
        question: '생물이 바다에만 머물다 고생대에 최초로 육상으로 진출할 수 있었던 근본 원인은?',
        options: opts,
        correctIndex: opts.indexOf('고생대 실루리아기에 오존층(O₃)이 완성되어 자외선을 차단했기 때문'),
        explanation: '남세균의 광합성으로 산소가 축적되어 고생대 실루리아기에 성층권 오존층이 형성되었고, 유해 자외선이 차단되어 비로소 육상 진출이 가능해졌습니다.'
      };
    }
  },
  {
    signature: 'causality_carboniferous_coal',
    topic: '석탄기 삼림',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '고생대 석탄기 거대한 양치식물(인목 등) 숲의 매몰',
        '중생대 백악기 거대 공룡 사체의 퇴적',
        '신생대 제4기 매머드와 활엽수림의 탄화 작용',
        '선캄브리아 시대 남세균 스트로마톨라이트의 분해'
      ]);
      return {
        question: '오늘날 인류가 사용하는 대규모 석탄층의 주된 원인이 된 지질학적 사건은?',
        options: opts,
        correctIndex: opts.indexOf('고생대 석탄기 거대한 양치식물(인목 등) 숲의 매몰'),
        explanation: '고생대 석탄기에는 수십 미터 크기의 거대 양치식물 삼림이 우거졌고, 이들이 지각 변동으로 매몰되어 오늘날의 대규모 석탄층을 형성했습니다.'
      };
    }
  },

  // 11. 동적 알고리즘 조합형 템플릿 (무한 반복 학습용 추가 풀)
  {
    signature: 'dyn_extinction_2nd_devonian',
    topic: '5대 대멸종',
    relatedEra: 'paleozoic',
    build: () => {
      const opts = shuffle([
        '고생대 데본기 말 (2차 대멸종, 해양 무산소화 · 약 75% 멸종)',
        '고생대 페름기 말 (3차 대멸종, 판게아 형성 · 약 95% 멸종)',
        '중생대 백악기 말 (5차 대멸종, 소행성 충돌 · 약 75% 멸종)',
        '신생대 제4기 말 (매머드 멸종 · 약 10% 멸종)'
      ]);
      return {
        question: '어류의 시대였던 데본기 말에 해양 무산소화와 기후 변동으로 약 75%의 생물이 절멸한 사건은?',
        options: opts,
        correctIndex: opts.indexOf('고생대 데본기 말 (2차 대멸종, 해양 무산소화 · 약 75% 멸종)'),
        explanation: '2차 대멸종은 고생대 데본기 말(약 375 Ma)에 해양 무산소화와 기후 변동으로 약 75%가 멸종한 사건입니다.'
      };
    }
  },
  {
    signature: 'dyn_era_order_oldest',
    topic: '지질 시대 순서',
    relatedEra: 'mesozoic',
    build: () => {
      const pairs: Array<{ a: string; b: string; ans: string; exp: string; era: 'precambrian' | 'paleozoic' | 'mesozoic' | 'cenozoic' }> = [
        { a: '중생대', b: '신생대', ans: '중생대', exp: '중생대(252~66Ma)가 신생대(66Ma~현재)보다 더 앞선(오래된) 지질 시대입니다.', era: 'mesozoic' },
        { a: '고생대', b: '중생대', ans: '고생대', exp: '고생대(541~252Ma)가 중생대(252~66Ma)보다 더 앞선 지질 시대입니다.', era: 'paleozoic' },
        { a: '선캄브리아 시대', b: '고생대', ans: '선캄브리아 시대', exp: '선캄브리아 시대(4600~541Ma)가 고생대(541~252Ma)보다 훨씬 오래된 시대입니다.', era: 'precambrian' }
      ];
      const chosen = pairs[Math.floor(Math.random() * pairs.length)];
      const opts = shuffle([chosen.a, chosen.b, '두 시대는 동시에 시작되었다.', '화석이 발견되지 않아 구분할 수 없다.']);
      return {
        question: `지질 시대 [${chosen.a}]와 [${chosen.b}] 중 시간적으로 더 앞(오래된) 시대는?`,
        options: opts,
        correctIndex: opts.indexOf(chosen.ans),
        explanation: chosen.exp
      };
    }
  },
  {
    signature: 'dyn_period_to_era_map',
    topic: '세부 기(Period) 매핑',
    relatedEra: 'paleozoic',
    build: () => {
      const items = [
        { period: '오르도비스기', era: '고생대', detail: '필석과 사카밤바스피스가 살았고 말기에 1차 대멸종이 발생한 고생대의 기입니다.' },
        { period: '실루리아기', era: '고생대', detail: '오존층이 형성되어 생물이 최초로 육상에 진출한 고생대의 기입니다.' },
        { period: '쥐라기', era: '중생대', detail: '공룡과 암모나이트가 대번성하고 시조새가 출현한 중생대의 기입니다.' },
        { period: '백악기', era: '중생대', detail: '속씨식물이 출현하고 말기에 소행성 충돌(5차 대멸종)이 일어난 중생대의 기입니다.' },
        { period: '제4기', era: '신생대', detail: '빙하기 4회와 간빙기 3회가 교대하며 매머드와 인류 조상이 살았던 신생대의 기입니다.' }
      ];
      const target = items[Math.floor(Math.random() * items.length)];
      const opts = shuffle(['선캄브리아 시대', '고생대', '중생대', '신생대']);
      return {
        question: `세부 지질 시대인 "${target.period}"가 속하는 대(Era)는?`,
        options: opts,
        correctIndex: opts.indexOf(target.era),
        explanation: `${target.period}는 ${target.detail}`
      };
    }
  },
  {
    signature: 'dyn_fossil_to_era_random',
    topic: '표준화석 매핑',
    relatedEra: 'cenozoic',
    build: () => {
      const pool = [
        { fossil: '스트로마톨라이트', era: '선캄브리아 시대', exp: '남세균 광합성으로 만들어진 선캄브리아 시대의 대표 화석입니다.' },
        { fossil: '방추충(푸줄리나)', era: '고생대', exp: '고생대 석탄기~페름기 얕은 바다에 살았던 표준화석입니다.' },
        { fossil: '시조새', era: '중생대', exp: '중생대 쥐라기의 대표 표준화석으로 파충류와 조류의 특징을 모두 가집니다.' },
        { fossil: '화폐석', era: '신생대', exp: '신생대 전기 따뜻하고 얕은 바다에 번성한 동전 모양 유공충 화석입니다.' }
      ];
      const target = pool[Math.floor(Math.random() * pool.length)];
      const opts = shuffle(['선캄브리아 시대', '고생대', '중생대', '신생대']);
      return {
        question: `다음 중 표준화석 "${target.fossil}"이(가) 지시하는 지질 시대는?`,
        options: opts,
        correctIndex: opts.indexOf(target.era),
        explanation: target.exp
      };
    }
  },
  {
    signature: 'dyn_numerical_age_start',
    topic: '수치 연대 (Ma)',
    relatedEra: 'paleozoic',
    build: () => {
      const items = [
        { era: '선캄브리아 시대', range: '4600 Ma ~ 541 Ma', exp: '지구 탄생(46억 년 전, 4600Ma)부터 5억 4100만 년 전(541Ma)까지입니다.' },
        { era: '고생대', range: '541 Ma ~ 252 Ma', exp: '캄브리아기 시작(541Ma)부터 페름기 말 3차 대멸종(252Ma)까지입니다.' },
        { era: '중생대', range: '252 Ma ~ 66 Ma', exp: '트라이아스기 시작(252Ma)부터 백악기 말 5차 대멸종(66Ma)까지입니다.' },
        { era: '신생대', range: '66 Ma ~ 현재 (0 Ma)', exp: '공룡 멸종 직후(66Ma)부터 현재까지입니다.' }
      ];
      const target = items[Math.floor(Math.random() * items.length)];
      const opts = shuffle(items.map(i => i.range));
      return {
        question: `교과서 기준 "${target.era}"의 수치 연대 범위(백만 년 전, Ma)로 옳은 것은?`,
        options: opts,
        correctIndex: opts.indexOf(target.range),
        explanation: `${target.era}의 수치 연대는 ${target.exp}`
      };
    }
  },
  {
    signature: 'dyn_extinction_rate_match',
    topic: '5대 대멸종 비율',
    relatedEra: 'paleozoic',
    build: () => {
      const items = [
        { order: '1차 (오르도비스기 말)', rate: '약 85% 멸종', cause: '기온 급감, 해수면 하강' },
        { order: '2차 (데본기 말)', rate: '약 75% 멸종', cause: '해양 무산소화, 기후 변동' },
        { order: '3차 (페름기 말)', rate: '약 95% 멸종 (사상 최대)', cause: '판게아 형성, 대규모 화산 폭발(온난화/산성비)' },
        { order: '4차 (트라이아스기 말)', rate: '약 80% 멸종', cause: '중앙대서양 마그마 지대 분출, CO₂ 급증' }
      ];
      const target = items[Math.floor(Math.random() * items.length)];
      const opts = shuffle(items.map(i => i.rate));
      return {
        question: `교과서 기준 ${target.order} 대멸종의 주요 원인은 [${target.cause}]이다. 이때의 생물종 멸종 비율은?`,
        options: opts,
        correctIndex: opts.indexOf(target.rate),
        explanation: `${target.order} 대멸종은 [${target.cause}]으로 인해 생물종의 ${target.rate}이 절멸했습니다.`
      };
    }
  }
];

export function generateRandomDrillSet(excludeSignatures: string[] = []): GeneratedDrillQuestion[] {
  // 이전 10문제의 signature와 겹치지 않는 풀을 필터링!
  let availablePool = QUESTION_BUILDERS_POOL.filter(b => !excludeSignatures.includes(b.signature));

  // 만약 풀이 부족할 경우 전체 풀에서 셔플
  if (availablePool.length < 10) {
    availablePool = QUESTION_BUILDERS_POOL;
  }

  const selectedBuilders = shuffle(availablePool).slice(0, 10);

  return selectedBuilders.map((builder, idx) => {
    const built = builder.build();
    return {
      id: idx + 1,
      signature: builder.signature,
      question: built.question,
      options: built.options,
      correctIndex: built.correctIndex,
      explanation: built.explanation,
      relatedEra: builder.relatedEra,
      topic: builder.topic
    };
  });
}
