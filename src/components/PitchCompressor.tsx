import React, { useState } from 'react';
import { Wand2, Loader2, Sparkles, MessageCircle, Zap } from 'lucide-react';
import { generatePitchCompressions } from '../services/geminiService';

interface CompressionResult {
  elevator_pitch: string;
  tagline: string;
  casual_version: string;
}

export function PitchCompressor() {
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<CompressionResult | null>(null);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setLoading(true);
    setError('');
    setResult(null);

    try {
      const compression = await generatePitchCompressions(input);
      setResult(compression);
    } catch (err) {
      setError('Failed to compress your pitch. Please try again.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setInput('');
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-4xl mx-auto px-6">
      {/* Input Section */}
      <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-8 mb-8 shadow-2xl border border-zinc-700/50 hover:border-yellow-400/30 transition-all duration-300">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="pitch-input" className="block text-lg font-semibold text-white mb-3">
              Your Messy Pitch
            </label>
            <textarea
              id="pitch-input"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste your startup/product description here (1-4 sentences)..."
              className="w-full h-32 px-4 py-3 bg-zinc-800/80 border border-zinc-600 rounded-xl text-white placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent resize-none transition-all duration-200"
              maxLength={500}
            />
            <div className="flex justify-between mt-2">
              <span className="text-sm text-zinc-500">
                {input.length}/500 characters
              </span>
              {input && (
                <button
                  type="button"
                  onClick={handleClear}
                  className="text-sm text-zinc-400 hover:text-white transition-colors"
                >
                  Clear
                </button>
              )}
            </div>
          </div>

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-full bg-gradient-to-r from-yellow-400 to-yellow-500 text-zinc-900 font-bold py-4 px-6 rounded-xl hover:from-yellow-300 hover:to-yellow-400 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center space-x-2 shadow-lg hover:shadow-yellow-400/25"
          >
            {loading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                <span>Compressing...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-5 h-5" />
                <span>Compress My Pitch</span>
              </>
            )}
          </button>
        </form>

        {error && (
          <div className="mt-4 p-4 bg-red-900/50 border border-red-700 rounded-lg text-red-300">
            {error}
          </div>
        )}
      </div>

      {/* Results Section */}
      {result && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white text-center mb-8">
            Your Compressed Pitch
          </h2>

          {/* One-liner */}
          <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-zinc-700/50 hover:border-yellow-400/30 transition-all duration-300 group">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400/20 p-3 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                <Sparkles className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">The One-Liner</h3>
                <p className="text-zinc-200 leading-relaxed text-lg">
                  "{result.elevator_pitch}"
                </p>
                <span className="text-sm text-zinc-500 mt-2 block">
                  Perfect for cold emails and quick introductions
                </span>
              </div>
            </div>
          </div>

          {/* Five-word slogan */}
          <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-zinc-700/50 hover:border-yellow-400/30 transition-all duration-300 group">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400/20 p-3 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                <Zap className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">5-Word Slogan</h3>
                <p className="text-zinc-200 leading-relaxed text-lg font-medium">
                  "{result.tagline}"
                </p>
                <span className="text-sm text-zinc-500 mt-2 block">
                  Memorable tagline for marketing and branding
                </span>
              </div>
            </div>
          </div>

          {/* Bar-friendly version */}
          <div className="bg-zinc-900/60 backdrop-blur-sm rounded-2xl p-6 shadow-xl border border-zinc-700/50 hover:border-yellow-400/30 transition-all duration-300 group">
            <div className="flex items-start space-x-4">
              <div className="bg-yellow-400/20 p-3 rounded-lg group-hover:bg-yellow-400/30 transition-colors">
                <MessageCircle className="w-6 h-6 text-yellow-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">Bar-Friendly Version</h3>
                <p className="text-zinc-200 leading-relaxed text-lg">
                  "{result.casual_version}"
                </p>
                <span className="text-sm text-zinc-500 mt-2 block">
                  Easy to explain to anyone, anywhere
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}