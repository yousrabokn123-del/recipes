import React, { useState, useMemo } from 'react';
import { Recipe, RecipeCategory } from '../types/recipe';
import { RecipeCard } from '../components/RecipeCard';
import { AdBanner } from '../components/AdBanner';
import { KitchenTimer } from '../components/KitchenTimer';
import { RECIPES_DATA, CATEGORIES } from '../data/recipes';
import { Filter, SlidersHorizontal, Search, ArrowUpDown } from 'lucide-react';

interface CategoryPageProps {
  currentCategory: string;
  searchQuery: string;
  onSelectCategory: (cat: string) => void;
  onSelectRecipe: (slug: string) => void;
  onClearSearch: () => void;
}

export const CategoryPage: React.FC<CategoryPageProps> = ({
  currentCategory,
  searchQuery,
  onSelectCategory,
  onSelectRecipe,
  onClearSearch,
}) => {
  const [sortBy, setSortBy] = useState<'rating' | 'quickest' | 'reviews'>('rating');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const filteredRecipes = useMemo(() => {
    return RECIPES_DATA.filter(recipe => {
      // Category match
      const categoryMatch = currentCategory === 'All' || recipe.category === currentCategory;
      
      // Search match
      const q = searchQuery.toLowerCase().trim();
      const searchMatch = !q ||
        recipe.title.toLowerCase().includes(q) ||
        recipe.tagline.toLowerCase().includes(q) ||
        recipe.tags.some(t => t.toLowerCase().includes(q)) ||
        recipe.ingredients.some(i => i.item.toLowerCase().includes(q));

      // Difficulty match
      const diffMatch = selectedDifficulty === 'all' || recipe.difficulty.toLowerCase() === selectedDifficulty.toLowerCase();

      return categoryMatch && searchMatch && diffMatch;
    }).sort((a, b) => {
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'quickest') return a.totalTimeMinutes - b.totalTimeMinutes;
      if (sortBy === 'reviews') return b.reviewsCount - a.reviewsCount;
      return 0;
    });
  }, [currentCategory, searchQuery, selectedDifficulty, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Page Header */}
      <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs uppercase tracking-wider text-amber-800 font-bold mb-1">
              <span>Recipe Archive</span>
              <span>•</span>
              <span>{filteredRecipes.length} recipes found</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170b]">
              {searchQuery ? `Search Results for "${searchQuery}"` : `${currentCategory === 'All' ? 'All Comfort Food' : currentCategory} Recipes`}
            </h1>
            <p className="text-stone-600 text-sm sm:text-base mt-1">
              Tested, step-by-step family favorites created with everyday ingredients.
            </p>
          </div>

          {searchQuery && (
            <button
              onClick={onClearSearch}
              className="px-4 py-2 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl text-xs border border-stone-300 transition-colors"
            >
              Clear Search Filter
            </button>
          )}
        </div>

        {/* Category Pills Navigation */}
        <div className="mt-6 pt-6 border-t border-stone-100 flex flex-wrap items-center gap-2">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`px-4 py-2 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                currentCategory === cat
                  ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                  : 'bg-stone-100 text-stone-700 border-stone-300 hover:bg-amber-50 hover:border-amber-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Sorting & Filter Controls */}
      <div className="bg-amber-50/70 border border-amber-200 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center space-x-2 text-stone-800 font-semibold text-sm">
          <ArrowUpDown className="w-4 h-4 text-amber-800" />
          <span>Sort by:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-stone-800 focus:outline-hidden"
          >
            <option value="rating">Highest Rated ★</option>
            <option value="reviews">Most Reviewed</option>
            <option value="quickest">Quickest (Total Time)</option>
          </select>
        </div>

        <div className="flex items-center space-x-2 text-stone-800 font-semibold text-sm">
          <Filter className="w-4 h-4 text-amber-800" />
          <span>Difficulty:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value)}
            className="bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs sm:text-sm font-bold text-stone-800 focus:outline-hidden"
          >
            <option value="all">All Difficulties</option>
            <option value="easy">Easy (Beginner Friendly)</option>
            <option value="medium">Medium</option>
          </select>
        </div>
      </div>

      {/* Main Grid: Content (8 cols) + Sidebar (4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-8">
          {filteredRecipes.length === 0 ? (
            <div className="bg-white border-2 border-dashed border-stone-300 rounded-3xl p-12 text-center">
              <Search className="w-12 h-12 text-stone-400 mx-auto mb-3" />
              <h3 className="font-serif text-2xl font-bold text-stone-800 mb-2">No recipes matched your criteria</h3>
              <p className="text-stone-500 text-sm mb-6">
                Try searching for simple ingredients like "chicken", "beef", "potatoes", or "apples".
              </p>
              <button
                onClick={() => {
                  onSelectCategory('All');
                  onClearSearch();
                }}
                className="px-6 py-2.5 bg-amber-800 text-white font-bold rounded-xl text-sm"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {filteredRecipes.slice(0, 4).map(recipe => (
                  <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
                ))}
              </div>

              {/* In-feed Adsterra (300x250) */}
              <div className="my-8 py-3 bg-stone-50 rounded-2xl border border-stone-200 flex justify-center">
                <AdBanner slot="in-content-300x250" />
              </div>

              {filteredRecipes.length > 4 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {filteredRecipes.slice(4).map(recipe => (
                    <RecipeCard key={recipe.id} recipe={recipe} onSelectRecipe={onSelectRecipe} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* Native Ad Placement */}
          <AdBanner slot="native" />
        </main>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-4 flex flex-col items-center shadow-xs">
            <AdBanner slot="sidebar-300x250" />
          </div>

          <KitchenTimer initialMinutes={15} label="Side Cooking Timer" />

          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-4 flex flex-col items-center shadow-xs">
            <AdBanner slot="sidebar-160x600" />
          </div>
        </aside>
      </div>
    </div>
  );
};
