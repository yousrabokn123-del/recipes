import React from 'react';
import { RecipeCard } from '../components/RecipeCard';
import { usePreferences } from '../context/PreferencesContext';
import { RECIPES_DATA } from '../data/recipes';
import { Bookmark, Heart, ArrowLeft } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

interface SavedRecipesPageProps {
  onSelectRecipe: (slug: string) => void;
  onNavigateHome: () => void;
}

export const SavedRecipesPage: React.FC<SavedRecipesPageProps> = ({
  onSelectRecipe,
  onNavigateHome,
}) => {
  const { savedRecipes } = usePreferences();
  const bookmarkedList = RECIPES_DATA.filter(r => savedRecipes.includes(r.id));

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs flex flex-wrap items-center justify-between gap-4">
        <div>
          <button
            onClick={onNavigateHome}
            className="flex items-center space-x-1.5 text-xs uppercase tracking-wider text-amber-800 font-bold mb-2 hover:underline"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Recipes</span>
          </button>
          <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170b] flex items-center gap-3">
            <Heart className="w-8 h-8 fill-red-500 text-red-500" />
            <span>Your Saved Recipe Box</span>
          </h1>
          <p className="text-stone-600 text-sm sm:text-base mt-1">
            You have saved {bookmarkedList.length} recipes to your personal kitchen collection.
          </p>
        </div>

        {bookmarkedList.length > 0 && (
          <span className="text-xs text-stone-500 font-medium bg-stone-100 px-3 py-1.5 rounded-full border border-stone-200">
            Stored in your browser
          </span>
        )}
      </div>

      {bookmarkedList.length === 0 ? (
        <div className="bg-white border-2 border-dashed border-stone-300 rounded-3xl p-12 text-center max-w-xl mx-auto">
          <Bookmark className="w-12 h-12 text-stone-400 mx-auto mb-3" />
          <h2 className="font-serif text-2xl font-bold text-stone-800 mb-2">Your recipe box is empty</h2>
          <p className="text-stone-600 text-sm mb-6">
            Click the heart or bookmark icon on any recipe to save it here for fast access while grocery shopping or cooking!
          </p>
          <button
            onClick={onNavigateHome}
            className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl text-sm transition-all shadow-sm"
          >
            Browse Popular Recipes
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {bookmarkedList.map(recipe => (
            <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
          ))}
        </div>
      )}

      {/* Native Ad Placement */}
      <AdBanner slot="native" />
    </div>
  );
};
