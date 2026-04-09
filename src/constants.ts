/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Policy, ProTip, SuccessStory } from './types';

export const POLICIES: Policy[] = [
  {
    id: '1',
    category: '생계',
    title: '생계급여 (맞춤형 급여)',
    description: '생활이 어려운 분들에게 최저 생활비를 지원하여 일상생활을 돕습니다.',
    benefits: ['매월 현금 급여 지급', '주민세 및 TV 수신료 면제', '에너지바우처 지원'],
    eligibility: '중위소득 32% 이하 가구',
    isPopular: true,
  },
  {
    id: '2',
    category: '의료',
    title: '의료급여 지원',
    description: '질병, 부상 등에 대해 의료 서비스 이용 시 본인부담금을 지원합니다.',
    benefits: ['진료비, 약제비 본인부담금 면제 또는 감면', '건강검진 지원'],
    eligibility: '중위소득 40% 이하 가구',
    isPopular: true,
  },
  {
    id: '3',
    category: '주거',
    title: '주거급여 (임차료 지원)',
    description: '안정적인 주거 생활을 위해 임차료나 주택 수리비를 지원합니다.',
    benefits: ['매월 월세 지원금 지급', '자가 가구 수선유지비 지원'],
    eligibility: '중위소득 48% 이하 가구',
    isPopular: true,
  },
  {
    id: '4',
    category: '교육',
    title: '교육급여',
    description: '저소득층 학생들의 교육 기회 보장을 위해 교육 활동비를 지원합니다.',
    benefits: ['교육활동 지원비 지급', '교과서 및 입학금 지원'],
    eligibility: '중위소득 50% 이하 가구',
  },
  {
    id: '5',
    category: '생계',
    title: '희망저축계좌 I',
    description: '일하는 수급 가구의 자산 형성을 위해 정부가 근로소득장려금을 매칭 지원합니다.',
    benefits: ['본인 저축액의 3배 매칭 지원', '3년 만기 시 최대 1,440만원+알파'],
    eligibility: '일하는 생계·의료급여 수급 가구',
  },
];

export const PRO_TIPS: ProTip[] = [
  {
    id: '1',
    title: '부양의무자 기준 완화 활용하기',
    content: '2021년부터 생계급여 부양의무자 기준이 폐지되었습니다. 부모님이나 자녀의 소득 때문에 포기하셨다면 다시 확인해보세요.',
    category: '자격 요건',
    icon: 'Users',
  },
  {
    id: '2',
    title: '소득 산정에서 제외되는 항목',
    content: '장애인 연금, 아동수당, 보육료 등은 실제 소득에서 제외됩니다. 꼼꼼히 체크하여 수급 자격을 유지하세요.',
    category: '소득 계산',
    icon: 'Calculator',
  },
  {
    id: '3',
    title: '자활 근로 참여의 장점',
    content: '자활 근로에 참여하면 근로소득의 30%를 공제받을 수 있어 수급액이 늘어나고 자립 기반을 닦을 수 있습니다.',
    category: '자립 지원',
    icon: 'Briefcase',
  },
];

export const SUCCESS_STORIES: SuccessStory[] = [
  {
    id: '1',
    author: '희망나무',
    title: '희망저축계좌로 내 집 마련의 꿈을 시작했습니다',
    content: '처음엔 막막했지만 3년 동안 꾸준히 저축하고 정부 지원금을 받으니 큰 목돈이 되었어요. 덕분에 자립할 용기를 얻었습니다.',
    date: '2024-03-15',
    likes: 128,
  },
  {
    id: '2',
    author: '자립성공',
    title: '자활 기업 창업으로 수급자에서 사장님이 되기까지',
    content: '정부의 자활 지원 프로그램을 통해 기술을 배우고 동료들과 함께 창업했습니다. 이제는 제가 다른 분들을 돕고 싶어요.',
    date: '2024-02-28',
    likes: 95,
  },
];
