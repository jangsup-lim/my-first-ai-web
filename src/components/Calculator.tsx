/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Calculator as CalcIcon, AlertCircle, RefreshCcw, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Calculator() {
  const [step, setStep] = useState(1);
  const [data, setData] = useState({
    familySize: 1,
    income: 0,
    property: 0,
    debt: 0,
  });

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('calc_data');
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse saved data');
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem('calc_data', JSON.stringify(data));
  }, [data]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const numValue = value === '' ? 0 : parseInt(value.replace(/[^0-9]/g, ''));
    setData(prev => ({ ...prev, [name]: numValue }));
  };

  const resetData = () => {
    const fresh = { familySize: 1, income: 0, property: 0, debt: 0 };
    setData(fresh);
    setStep(1);
    localStorage.removeItem('calc_data');
  };

  // Simple Mock Calculation Logic
  // 2024 Median Income (approx)
  const medianIncomes: Record<number, number> = {
    1: 2228445,
    2: 3682609,
    3: 4714657,
    4: 5729913,
  };

  const currentMedian = medianIncomes[data.familySize] || medianIncomes[4];
  const threshold32 = currentMedian * 0.32;
  const netProperty = Math.max(0, data.property - data.debt);
  // Property to Income conversion (very simplified for demo)
  const propertyIncome = netProperty * 0.04; 
  const totalIncome = data.income + propertyIncome;
  
  const isEligible = totalIncome <= threshold32;
  const riskPercentage = Math.min(100, Math.round((totalIncome / threshold32) * 100));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-3xl font-black">모의 계산기</h2>
          <p className="text-gray-600">나의 소득과 재산을 입력하고 수급 자격을 확인해보세요.</p>
        </div>
        <button 
          onClick={resetData}
          className="text-gray-400 hover:text-primary flex items-center gap-1 text-sm font-bold pb-1"
        >
          <RefreshCcw size={16} />
          초기화
        </button>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-2 mb-8">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <div 
              className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${
                step >= s ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
              }`}
            >
              {s}
            </div>
            {s < 3 && <div className={`flex-1 h-1 rounded-full ${step > s ? 'bg-primary' : 'bg-gray-200'}`} />}
          </React.Fragment>
        ))}
      </div>

      <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm min-h-[400px] flex flex-col">
        {step === 1 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 flex-1">
            <div className="space-y-4">
              <label className="block font-bold text-xl">가구원 수는 몇 명인가요?</label>
              <div className="grid grid-cols-4 gap-3">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => setData(prev => ({ ...prev, familySize: num }))}
                    className={`py-4 rounded-2xl font-bold text-lg transition-all ${
                      data.familySize === num 
                        ? 'bg-primary text-white shadow-lg shadow-primary/20' 
                        : 'bg-gray-50 text-gray-500 border border-gray-100'
                    }`}
                  >
                    {num}인
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-4">
              <label className="block font-bold text-xl">월 평균 소득은 얼마인가요?</label>
              <div className="relative">
                <input 
                  type="text"
                  name="income"
                  value={data.income.toLocaleString()}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 text-2xl font-black text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-gray-400">원</span>
              </div>
              <p className="text-sm text-gray-400">근로소득, 사업소득, 연금소득 등을 모두 포함해주세요.</p>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 flex-1">
            <div className="space-y-4">
              <label className="block font-bold text-xl">보유하신 재산은 총 얼마인가요?</label>
              <div className="relative">
                <input 
                  type="text"
                  name="property"
                  value={data.property.toLocaleString()}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 text-2xl font-black text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-gray-400">원</span>
              </div>
              <p className="text-sm text-gray-400">주택, 토지, 자동차, 예금 등을 합산해주세요.</p>
            </div>
            <div className="space-y-4">
              <label className="block font-bold text-xl">갚아야 할 부채가 있으신가요?</label>
              <div className="relative">
                <input 
                  type="text"
                  name="debt"
                  value={data.debt.toLocaleString()}
                  onChange={handleInputChange}
                  className="w-full bg-gray-50 border border-gray-100 rounded-2xl py-5 px-6 text-2xl font-black text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
                />
                <span className="absolute right-6 top-1/2 -translate-y-1/2 font-bold text-gray-400">원</span>
              </div>
              <p className="text-sm text-gray-400">금융기관 대출금, 공공기관 대출금 등입니다.</p>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-8 flex-1">
            <div className="text-center space-y-4">
              <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${isEligible ? 'bg-primary' : 'bg-accent'}`}>
                {isEligible ? <CheckCircle2 size={40} className="text-white" /> : <AlertCircle size={40} className="text-white" />}
              </div>
              <h3 className="text-2xl font-black">
                {isEligible ? '수급 자격 유지 가능성이 높습니다' : '수급 탈락 위험이 있습니다'}
              </h3>
              <p className="text-gray-500">
                {isEligible 
                  ? '현재 소득과 재산 기준을 충족하고 계신 것으로 보입니다.' 
                  : '소득 인정액이 기준치를 초과할 가능성이 있습니다.'}
              </p>
            </div>

            {/* Risk Chart */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span>자격 유지 위험도</span>
                <span className={riskPercentage > 80 ? 'text-red-500' : 'text-primary'}>{riskPercentage}%</span>
              </div>
              <div className="w-full h-4 bg-gray-100 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: `${riskPercentage}%` }}
                  className={`h-full ${riskPercentage > 80 ? 'bg-red-500' : 'bg-primary'}`}
                />
              </div>
              <div className="flex justify-between text-[10px] text-gray-400 uppercase font-bold tracking-wider">
                <span>안전</span>
                <span>주의</span>
                <span>위험</span>
              </div>
            </div>

            <div className="bg-gray-50 rounded-2xl p-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">가구원 수</span>
                <span className="font-bold">{data.familySize}인 가구</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">생계급여 선정기준</span>
                <span className="font-bold">{Math.round(threshold32).toLocaleString()}원 이하</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-200 pt-2 mt-2">
                <span className="text-gray-500">나의 소득 인정액(추정)</span>
                <span className={`font-black text-lg ${isEligible ? 'text-primary' : 'text-red-500'}`}>
                  {Math.round(totalIncome).toLocaleString()}원
                </span>
              </div>
            </div>
          </motion.div>
        )}

        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button 
              onClick={() => setStep(s => s - 1)}
              className="flex-1 bg-gray-100 text-gray-600 py-4 rounded-2xl font-bold hover:bg-gray-200 transition-colors"
            >
              이전으로
            </button>
          )}
          {step < 3 ? (
            <button 
              onClick={() => setStep(s => s + 1)}
              className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
            >
              다음 단계로
            </button>
          ) : (
            <button 
              onClick={() => setStep(1)}
              className="flex-[2] bg-primary text-white py-4 rounded-2xl font-bold shadow-lg shadow-primary/20 hover:bg-primary-light transition-colors"
            >
              다시 계산하기
            </button>
          )}
        </div>
      </div>

      <div className="bg-accent/10 rounded-3xl p-6 flex gap-4 items-start border border-accent/20">
        <AlertCircle className="text-accent shrink-0" size={24} />
        <p className="text-sm text-accent-dark font-medium leading-relaxed">
          본 계산 결과는 입력하신 데이터를 바탕으로 한 <strong>단순 모의 계산</strong>이며, 
          실제 수급 자격 결정은 관할 읍면동 주민센터의 정밀 조사를 통해 이루어집니다. 
          정확한 상담은 129 보건복지상담센터를 이용해주세요.
        </p>
      </div>
    </div>
  );
}
