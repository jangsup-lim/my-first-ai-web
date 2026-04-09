/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Lightbulb, Users, Calculator, Briefcase, ChevronRight } from 'lucide-react';
import { PRO_TIPS } from '../constants';

const iconMap: Record<string, any> = {
  Users,
  Calculator,
  Briefcase,
};

export default function ProTips() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-black">자립을 위한 꿀팁</h2>
        <p className="text-gray-600">수급 자격 유지와 자립 준비에 도움이 되는 핵심 노하우를 모았습니다.</p>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {PRO_TIPS.map((tip) => {
          const Icon = iconMap[tip.icon] || Lightbulb;
          return (
            <div key={tip.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm flex gap-6 items-start hover:shadow-md transition-all group cursor-pointer">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-all">
                <Icon size={32} />
              </div>
              <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center">
                  <span className="text-primary font-bold text-sm uppercase tracking-wider">{tip.category}</span>
                  <ChevronRight size={20} className="text-gray-300 group-hover:text-primary transition-colors" />
                </div>
                <h3 className="text-xl font-bold">{tip.title}</h3>
                <p className="text-gray-600 leading-relaxed">{tip.content}</p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Featured Tip / Card News Style */}
      <div className="bg-primary rounded-3xl p-8 text-white space-y-6 overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <h3 className="text-2xl font-bold">카드뉴스로 보는<br />자산 형성 지원 사업</h3>
          <p className="opacity-80">희망저축계좌, 청년내일저축계좌 등<br />나에게 맞는 저축 상품을 찾아보세요.</p>
          <button className="bg-white text-primary px-6 py-3 rounded-2xl font-bold hover:bg-gray-100 transition-colors">
            지금 바로 확인하기
          </button>
        </div>
        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute top-10 right-10 opacity-20">
          <Lightbulb size={120} />
        </div>
      </div>
    </div>
  );
}
