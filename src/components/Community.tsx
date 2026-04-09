/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Heart, MessageCircle, Share2, Plus } from 'lucide-react';
import { SUCCESS_STORIES } from '../constants';

export default function Community() {
  const [stories, setStories] = useState(SUCCESS_STORIES);

  const handleLike = (id: string) => {
    setStories(prev => prev.map(s => s.id === id ? { ...s, likes: s.likes + 1 } : s));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <h2 className="text-3xl font-black">성공 수기 게시판</h2>
          <p className="text-gray-600">자립에 성공한 선배들의 이야기를 읽고 용기를 얻으세요.</p>
        </div>
        <button className="bg-primary text-white p-3 rounded-2xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform active:scale-95">
          <Plus size={24} />
        </button>
      </div>

      <div className="space-y-4">
        {stories.map((story) => (
          <div key={story.id} className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-primary">
                  {story.author[0]}
                </div>
                <div>
                  <span className="font-bold block">{story.author}</span>
                  <span className="text-xs text-gray-400">{story.date}</span>
                </div>
              </div>
              <button className="text-gray-300 hover:text-primary transition-colors">
                <Share2 size={20} />
              </button>
            </div>
            
            <div className="space-y-2">
              <h3 className="text-xl font-bold">{story.title}</h3>
              <p className="text-gray-600 leading-relaxed line-clamp-3">
                {story.content}
              </p>
            </div>

            <div className="flex items-center gap-6 pt-2 border-t border-gray-50">
              <button 
                onClick={() => handleLike(story.id)}
                className="flex items-center gap-2 text-gray-400 hover:text-red-500 transition-colors group"
              >
                <Heart size={20} className="group-active:scale-125 transition-transform" />
                <span className="text-sm font-bold">{story.likes}</span>
              </button>
              <button className="flex items-center gap-2 text-gray-400 hover:text-primary transition-colors">
                <MessageCircle size={20} />
                <span className="text-sm font-bold">댓글 쓰기</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Motivation Banner */}
      <div className="text-center py-12 space-y-4">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full text-accent mb-2">
          <Heart size={32} fill="currentColor" />
        </div>
        <h3 className="text-2xl font-black">당신도 할 수 있습니다!</h3>
        <p className="text-gray-500 max-w-xs mx-auto">
          작은 실천이 모여 큰 변화를 만듭니다.<br />
          여러분의 성공 수기를 기다립니다.
        </p>
      </div>
    </div>
  );
}
