/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { ArrowRight, Star, TrendingUp, BookOpen } from 'lucide-react';
import { POLICIES } from '../constants';

interface HomeProps {
  setActiveTab: (tab: string) => void;
}

export default function Home({ setActiveTab }: HomeProps) {
  const popularPolicies = POLICIES.filter(p => p.isPopular);

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-white rounded-3xl p-8 shadow-sm border border-gray-50 overflow-hidden relative">
        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1 rounded-full text-sm font-bold">
            <Star size={16} fill="currentColor" />
            <span>자립을 위한 첫걸음</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black leading-tight">
            당신의 새로운 내일을<br />
            <span className="text-primary">함께 준비합니다</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-md">
            복잡한 정책 정보부터 자립 시뮬레이션까지, 
            어르신과 청년 모두가 쉽게 이해할 수 있도록 도와드립니다.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button 
              onClick={() => setActiveTab('calc')}
              className="bg-primary text-white px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
            >
              나의 예상 혜택 확인하기
              <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setActiveTab('policy')}
              className="bg-accent text-white px-6 py-4 rounded-2xl font-bold text-lg flex items-center justify-center gap-2 shadow-lg shadow-accent/20 hover:opacity-90 transition-opacity"
            >
              자립 지원 가이드북
              <BookOpen size={20} />
            </button>
          </div>
        </div>
        
        {/* Abstract Illustration Background */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-48 h-48 bg-accent/5 rounded-full -mr-10 -mb-10 blur-2xl"></div>
      </section>

      {/* Quick Stats / Popular Policies */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-bold flex items-center gap-2">
            <TrendingUp className="text-primary" />
            실시간 인기 정책
          </h3>
          <button 
            onClick={() => setActiveTab('policy')}
            className="text-primary font-bold text-sm hover:underline"
          >
            전체 보기
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {popularPolicies.map((policy) => (
            <div 
              key={policy.id}
              className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => setActiveTab('policy')}
            >
              <div className="w-12 h-12 bg-gray-50 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-primary/10 transition-colors">
                <span className="text-2xl font-bold text-primary">{policy.category[0]}</span>
              </div>
              <h4 className="font-bold text-lg mb-2 line-clamp-1">{policy.title}</h4>
              <p className="text-gray-500 text-sm line-clamp-2">{policy.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Info Card */}
      <section className="bg-primary text-white rounded-3xl p-8 flex flex-col sm:flex-row items-center gap-6">
        <div className="flex-1 space-y-2">
          <h3 className="text-2xl font-bold">어려운 용어가 있으신가요?</h3>
          <p className="opacity-90">
            부양의무자, 중위소득 등 어려운 행정 용어를 
            알기 쉽게 풀어서 설명해 드립니다.
          </p>
        </div>
        <button 
          onClick={() => setActiveTab('tips')}
          className="bg-white text-primary px-6 py-3 rounded-2xl font-bold whitespace-nowrap hover:bg-gray-100 transition-colors"
        >
          용어 사전 보기
        </button>
      </section>
    </div>
  );
}
