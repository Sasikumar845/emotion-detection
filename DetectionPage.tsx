
import React, { useState, useCallback } from 'react';
import { EmotionResult } from '../types';
import { detectEmotion } from '../services/geminiService';
import EmotionChart from './EmotionChart';

const DetectionPage: React.FC = () => {
  const [text, setText] = useState<string>('');
  const [results, setResults] = useState<EmotionResult[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent) => {
    event.preventDefault();
    if (!text.trim()) {
      setError('Please enter some text to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setResults(null);

    try {
      const detectedEmotions = await detectEmotion(text);
      setResults(detectedEmotions);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [text]);

  const ResultCard = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center h-full">
          <svg className="animate-spin h-10 w-10 text-blue-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="mt-4 text-slate-400">Analyzing emotions...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-red-400 font-semibold">Error</p>
          <p className="text-slate-400 mt-2">{error}</p>
        </div>
      );
    }

    if (results) {
        return <EmotionChart data={results} />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-full text-center">
          <p className="text-slate-400">Enter text above and click "Detect Emotion" to see the analysis.</p>
        </div>
    );
  };


  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="lg:w-1/2 bg-slate-800/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Analyze Text</h2>
        <form onSubmit={handleSubmit}>
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text to analyze for emotions..."
            className="w-full h-48 p-4 bg-slate-900 border border-slate-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-shadow resize-none text-slate-300 placeholder-slate-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading}
            className="mt-4 w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-md hover:bg-blue-700 disabled:bg-slate-600 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </>
            ) : (
              'Detect Emotion'
            )}
          </button>
        </form>
      </div>
      <div className="lg:w-1/2 min-h-[320px] bg-slate-800/50 p-6 rounded-lg border border-slate-700 backdrop-blur-sm">
        <h2 className="text-2xl font-semibold mb-4 text-slate-200">Results</h2>
        <div className="h-full">
            <ResultCard />
        </div>
      </div>
    </div>
  );
};

export default DetectionPage;
