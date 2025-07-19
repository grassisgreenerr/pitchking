import React, { useState } from 'react';
import { Crown, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { PitchCompressor } from './components/PitchCompressor';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900 relative overflow-hidden">
      {/* Chess pattern background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 64 }).map((_, i) => (
            <div
              key={i}
              className={`${
                Math.floor(i / 8) % 2 === i % 2 ? 'bg-white' : 'bg-zinc-900'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Header */}
      <header className="relative z-10 pt-8 pb-4">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Crown className="w-8 h-8 text-yellow-400" />
            <h1 className="text-4xl font-bold text-white tracking-tight">
              Pitch<span className="text-yellow-400">King</span>
            </h1>
          </div>
          <p className="text-center text-zinc-400 text-lg max-w-2xl mx-auto leading-relaxed">
            Transform your messy startup pitch into crystal-clear messaging. 
            Get a killer one-liner, catchy slogan, and bar-friendly elevator pitch.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 pb-12">
        <PitchCompressor />
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-6 border-t border-zinc-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-zinc-500 text-sm">
            Powered by Google Gemini AI • Built for hustlers, by hustlers
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;