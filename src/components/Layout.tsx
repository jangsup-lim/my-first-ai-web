/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Home, Info, Lightbulb, Calculator, MessageSquare, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const navItems = [
    { id: 'home', label: '홈', icon: Home },
    { id: 'policy', label: '정보실', icon: Info },
    { id: 'tips', label: '꿀팁', icon: Lightbulb },
    { id: 'calc', label: '계산기', icon: Calculator },
    { id: 'community', label: '성공수기', icon: MessageSquare },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-4 py-3">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
              <span className="text-white font-black text-xl">자</span>
            </div>
            <h1 className="text-xl font-black text-primary hidden sm:block">자립지원 가이드</h1>
          </div>
          <button className="flex items-center gap-2 bg-accent text-white px-4 py-2 rounded-full font-bold shadow-lg shadow-accent/20 hover:scale-105 transition-transform active:scale-95">
            <Phone size={20} />
            <span>상담 연결</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation (Mobile First) */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-2 py-2 z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]">
        <div className="max-w-4xl mx-auto flex justify-around items-center">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`flex flex-col items-center gap-1 p-2 rounded-2xl transition-all ${
                  isActive ? 'text-primary' : 'text-gray-400'
                }`}
              >
                <div className={`p-2 rounded-xl transition-all ${isActive ? 'bg-primary/10' : ''}`}>
                  <Icon size={isActive ? 28 : 24} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                <span className={`text-xs font-bold ${isActive ? 'text-primary' : 'text-gray-500'}`}>
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Button (FAB) for Desktop/Tablet */}
      <button className="fixed bottom-24 right-6 hidden md:flex w-14 h-14 bg-primary text-white rounded-full items-center justify-center shadow-2xl shadow-primary/40 hover:scale-110 transition-transform active:scale-95 z-40">
        <Phone size={28} />
      </button>
    </div>
  );
}
