/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, CheckCircle2, ChevronRight } from 'lucide-react';
import { POLICIES } from '../constants';
import { PolicyCategory } from '../types';

export default function PolicyInfo() {
  const [activeCategory, setActiveCategory] = useState<PolicyCategory | '전체'>('전체');
  const [searchQuery, setSearchQuery] = useState('');

  const categories: (PolicyCategory | '전체')[] = ['전체', '생계', '의료', '주거', '교육'];

  const filteredPolicies = POLICIES.filter(policy => {
    const matchesCategory = activeCategory === '전체' || policy.category === activeCategory;
    const matchesSearch = policy.title.includes(searchQuery) || policy.description.includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-3xl font-black">맞춤형 정책 정보</h2>
        <p className="text-gray-600">나에게 꼭 필요한 혜택을 카테고리별로 확인해보세요.</p>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        <input 
          type="text"
          placeholder="궁금한 정책을 검색해보세요 (예: 주거, 의료)"
          className="w-full bg-white border border-gray-200 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-6 py-2 rounded-full font-bold whitespace-nowrap transition-all ${
              activeCategory === cat 
                ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                : 'bg-white text-gray-500 border border-gray-100 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Policy List */}
      <div className="space-y-4">
        {filteredPolicies.length > 0 ? (
          filteredPolicies.map((policy) => (
            <div key={policy.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all group">
              <div className="flex justify-between items-start mb-4">
                <span className="bg-gray-100 text-gray-600 px-3 py-1 rounded-lg text-sm font-bold">
                  {policy.category}
                </span>
                {policy.isPopular && (
                  <span className="bg-accent/10 text-accent px-3 py-1 rounded-lg text-sm font-bold flex items-center gap-1">
                    인기
                  </span>
                )}
              </div>
              <h3 className="text-xl font-bold mb-2">{policy.title}</h3>
              <p className="text-gray-600 mb-4">{policy.description}</p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-bold text-sm block">주요 혜택</span>
                    <ul className="text-sm text-gray-500 list-disc list-inside">
                      {policy.benefits.map((benefit, i) => (
                        <li key={i}>{benefit}</li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <CheckCircle2 className="text-primary shrink-0 mt-1" size={18} />
                  <div>
                    <span className="font-bold text-sm block">지원 대상</span>
                    <p className="text-sm text-gray-500">{policy.eligibility}</p>
                  </div>
                </div>
              </div>

              <button className="w-full bg-gray-50 text-gray-700 py-3 rounded-xl font-bold flex items-center justify-center gap-2 group-hover:bg-primary group-hover:text-white transition-all">
                상세 내용 보기
                <ChevronRight size={18} />
              </button>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-gray-200">
            <p className="text-gray-400">검색 결과가 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
}
