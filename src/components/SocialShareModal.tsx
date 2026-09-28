import React, { useState } from 'react';
import { Recipe } from '../types/recipe';
import { X, Copy, Check, Mail, Share2 } from 'lucide-react';

interface SocialShareModalProps {
  recipe: Recipe;
  isOpen: boolean;
  onClose: () => void;
}

export const SocialShareModal: React.FC<SocialShareModalProps> = ({ recipe, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentUrl = typeof window !== 'undefined' ? window.location.href : `https://sweetpeaskitchen.com/recipe/${recipe.slug}`;
  const shareText = `Check out this delicious recipe: ${recipe.title} from Sweet Pea's Kitchen!`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(currentUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleEmailRecipe = () => {
    const subject = encodeURIComponent(`Recipe: ${recipe.title} - Sweet Pea's Kitchen`);
    const ingredientsList = recipe.ingredients
      .map(i => `• ${i.amount} ${i.unit} ${i.item} ${i.note ? `(${i.note})` : ''}`)
      .join('\n');
    const instructionsList = recipe.instructions
      .map(ins => `${ins.step}. ${ins.text}`)
      .join('\n\n');

    const body = encodeURIComponent(
      `Hi there,\n\nThought you would love this recipe from Sweet Pea's Kitchen:\n\n${recipe.title}\n"${recipe.tagline}"\n\nPrep Time: ${recipe.prepTimeMinutes} mins | Cook Time: ${recipe.cookTimeMinutes} mins | Servings: ${recipe.servings}\n\nINGREDIENTS:\n${ingredientsList}\n\nINSTRUCTIONS:\n${instructionsList}\n\nView the full recipe online at: ${currentUrl}\n\nHappy cooking!`
    );

    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  const shareToFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`, '_blank', 'width=600,height=450');
  };

  const shareToPinterest = () => {
    window.open(
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(currentUrl)}&media=${encodeURIComponent(recipe.image)}&description=${encodeURIComponent(recipe.title + ' - ' + recipe.tagline)}`,
      '_blank',
      'width=750,height=550'
    );
  };

  const shareToTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(currentUrl)}`,
      '_blank',
      'width=600,height=400'
    );
  };

  const shareToWhatsApp = () => {
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + currentUrl)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden animate-in fade-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-amber-50">
          <div className="flex items-center space-x-2 text-stone-900 font-bold">
            <Share2 className="w-5 h-5 text-amber-800" />
            <h2 className="text-lg">Share This Recipe</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="flex items-center space-x-3 bg-stone-50 p-3 rounded-xl border border-stone-200">
            <img src={recipe.image} alt={recipe.title} className="w-16 h-16 rounded-lg object-cover" />
            <div className="flex-1 min-w-0">
              <h3 className="font-serif font-bold text-stone-900 text-sm truncate">{recipe.title}</h3>
              <p className="text-stone-500 text-xs truncate">{recipe.category} • {recipe.totalTimeMinutes} mins</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={shareToPinterest}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-[#E60023] hover:bg-[#c9001f] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              <span>📌 Pinterest</span>
            </button>

            <button
              onClick={shareToFacebook}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-[#1877F2] hover:bg-[#0c65d6] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              <span>Facebook</span>
            </button>

            <button
              onClick={shareToTwitter}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-stone-900 hover:bg-black text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              <span>X (Twitter)</span>
            </button>

            <button
              onClick={shareToWhatsApp}
              className="flex items-center justify-center space-x-2 py-3 px-4 bg-[#25D366] hover:bg-[#20ba59] text-white font-bold rounded-xl text-sm transition-colors shadow-xs"
            >
              <span>WhatsApp</span>
            </button>
          </div>

          <div className="pt-2 border-t border-stone-200">
            <button
              onClick={handleEmailRecipe}
              className="w-full flex items-center justify-center space-x-2 py-3 px-4 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-sm transition-colors shadow-sm mb-3"
            >
              <Mail className="w-4 h-4" />
              <span>Email Recipe with Ingredients</span>
            </button>

            <div className="flex items-center space-x-2">
              <input
                type="text"
                readOnly
                value={currentUrl}
                className="flex-1 bg-stone-100 border border-stone-300 rounded-xl px-3 py-2 text-xs font-mono text-stone-700 truncate"
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center space-x-1 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-xs font-bold transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
