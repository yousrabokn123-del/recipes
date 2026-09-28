import React, { useState, useEffect } from 'react';
import { Recipe } from '../types/recipe';
import { X, ChevronLeft, ChevronRight, CheckCircle2, Circle, Timer, Lightbulb } from 'lucide-react';
import { KitchenTimer } from './KitchenTimer';

interface CookModeModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export const CookModeModal: React.FC<CookModeModalProps> = ({ recipe, isOpen, onClose }) => {
  const [currentStepIdx, setCurrentStepIdx] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showTimer, setShowTimer] = useState(false);

  useEffect(() => {
    // Attempt to keep screen awake during cook mode if supported
    let wakeLock: any = null;
    if (isOpen && 'wakeLock' in navigator) {
      (navigator as any).wakeLock.request('screen').then((lock: any) => {
        wakeLock = lock;
      }).catch(() => {});
    }
    return () => {
      if (wakeLock) wakeLock.release();
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const currentStep = recipe.instructions[currentStepIdx];
  const isLast = currentStepIdx === recipe.instructions.length - 1;
  const isFirst = currentStepIdx === 0;

  const toggleStepCompleted = (idx: number) => {
    setCompletedSteps(prev =>
      prev.includes(idx) ? prev.filter(i => i !== idx) : [...prev, idx]
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#FAF7F2] flex flex-col no-print overflow-hidden select-none">
      {/* Top Bar */}
      <div className="bg-[#451A03] text-amber-50 px-6 py-4 flex items-center justify-between shadow-md">
        <div>
          <span className="text-xs uppercase tracking-wider text-amber-300 font-bold">Cook Mode (Hands-Free Focus)</span>
          <h2 className="text-xl font-serif font-bold text-white truncate max-w-md sm:max-w-xl">
            {recipe.title}
          </h2>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => setShowTimer(!showTimer)}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-amber-800/80 hover:bg-amber-700 text-amber-100 rounded-xl text-sm font-semibold transition-colors"
          >
            <Timer className="w-4 h-4 text-amber-300" />
            <span>{showTimer ? 'Hide Timer' : 'Timer'}</span>
          </button>

          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-amber-950 hover:bg-amber-900 text-amber-200 transition-colors"
            aria-label="Exit Cook Mode"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Timer overlay drawer if active */}
      {showTimer && (
        <div className="p-4 bg-amber-100/90 border-b border-amber-300 flex justify-center">
          <KitchenTimer
            initialMinutes={currentStep.suggestedMinutes || 10}
            label={`Step ${currentStep.step} Timer`}
            onClose={() => setShowTimer(false)}
          />
        </div>
      )}

      {/* Main Focus Area with Extra-Large Typography */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-6 py-8 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Progress Indicator */}
          <div className="flex items-center justify-between mb-6 pb-3 border-b-2 border-stone-200">
            <span className="text-base sm:text-lg font-bold text-amber-900">
              Step {currentStepIdx + 1} of {recipe.instructions.length}
            </span>
            <div className="flex items-center space-x-1.5">
              {recipe.instructions.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentStepIdx(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    idx === currentStepIdx
                      ? 'bg-amber-800 scale-125'
                      : completedSteps.includes(idx)
                      ? 'bg-green-600'
                      : 'bg-stone-300'
                  }`}
                  aria-label={`Jump to step ${idx + 1}`}
                />
              ))}
            </div>
          </div>

          {/* Current Step Content */}
          <div className="bg-white rounded-3xl p-8 sm:p-10 border-2 border-amber-900/10 shadow-lg">
            {currentStep.title && (
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 mb-4">
                {currentStep.title}
              </h3>
            )}

            <p className="text-stone-800 text-xl sm:text-2xl leading-relaxed sm:leading-loose font-normal">
              {currentStep.text}
            </p>

            {currentStep.suggestedMinutes && (
              <div className="mt-6 flex items-center gap-3">
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-amber-50 text-amber-900 font-bold rounded-xl text-base border border-amber-300">
                  <Timer className="w-5 h-5 text-amber-700" />
                  Suggested time: {currentStep.suggestedMinutes} minutes
                </span>
                {!showTimer && (
                  <button
                    onClick={() => setShowTimer(true)}
                    className="text-sm font-bold text-amber-800 underline hover:text-amber-950"
                  >
                    Open timer &rarr;
                  </button>
                )}
              </div>
            )}

            {/* Chef Tip if available */}
            {recipe.chefTips && recipe.chefTips[0] && currentStepIdx === 0 && (
              <div className="mt-8 p-4 bg-amber-50/70 border border-amber-200 rounded-2xl flex items-start space-x-3">
                <Lightbulb className="w-6 h-6 text-amber-700 shrink-0 mt-0.5" />
                <p className="text-sm sm:text-base text-amber-950 font-medium">
                  <strong>Sweet Pea's Tip:</strong> {recipe.chefTips[0]}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Nav Controls */}
        <div className="pt-8 pb-4 flex items-center justify-between gap-4">
          <button
            onClick={() => setCurrentStepIdx(prev => Math.max(0, prev - 1))}
            disabled={isFirst}
            className={`flex items-center space-x-2 px-6 py-4 rounded-2xl text-lg font-bold transition-all shadow-sm ${
              isFirst
                ? 'opacity-40 bg-stone-200 text-stone-400 cursor-not-allowed'
                : 'bg-white border-2 border-stone-300 text-stone-800 hover:bg-stone-100'
            }`}
          >
            <ChevronLeft className="w-6 h-6" />
            <span>Previous Step</span>
          </button>

          <button
            onClick={() => toggleStepCompleted(currentStepIdx)}
            className={`flex items-center space-x-2 px-6 py-4 rounded-2xl text-lg font-bold transition-all ${
              completedSteps.includes(currentStepIdx)
                ? 'bg-green-100 text-green-800 border-2 border-green-500'
                : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-2 border-stone-300'
            }`}
          >
            {completedSteps.includes(currentStepIdx) ? (
              <>
                <CheckCircle2 className="w-6 h-6 text-green-700" />
                <span>Step Completed!</span>
              </>
            ) : (
              <>
                <Circle className="w-6 h-6 text-stone-400" />
                <span>Mark Done</span>
              </>
            )}
          </button>

          <button
            onClick={() => {
              if (isLast) {
                onClose();
              } else {
                setCurrentStepIdx(prev => prev + 1);
              }
            }}
            className="flex items-center space-x-2 px-8 py-4 bg-amber-800 hover:bg-amber-900 text-white rounded-2xl text-lg font-bold shadow-md transition-all"
          >
            <span>{isLast ? 'Finish Cooking!' : 'Next Step'}</span>
            {!isLast && <ChevronRight className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
};
