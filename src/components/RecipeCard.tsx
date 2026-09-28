import React from 'react';
import { Recipe } from '../types/recipe';
import { Clock, Users, Star, Bookmark } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';

interface RecipeCardProps {
  recipe: Recipe;
  onSelectRecipe: (slug: string) => void;
  layout?: 'grid' | 'horizontal';
}

export const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSelectRecipe,
  layout = 'grid',
}) => {
  const { isSaved, toggleSaveRecipe } = usePreferences();
  const saved = isSaved(recipe.id);

  if (layout === 'horizontal') {
    return (
      <div className="bg-white border-2 border-stone-200/90 rounded-2xl overflow-hidden hover:shadow-xl hover:border-amber-300 transition-all duration-200 flex flex-col sm:flex-row group">
        <div className="relative sm:w-1/3 h-52 sm:h-auto overflow-hidden bg-stone-100">
          <img
            src={recipe.image}
            alt={recipe.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveRecipe(recipe.id);
            }}
            aria-label={saved ? 'Remove from saved' : 'Save recipe'}
            className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-stone-700 shadow-md hover:text-red-600 transition-colors"
          >
            <Bookmark className={`w-5 h-5 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
          </button>
        </div>

        <div className="p-5 sm:w-2/3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="font-bold text-amber-800 tracking-wider uppercase bg-amber-50 px-2.5 py-1 rounded-md border border-amber-200">
                {recipe.category}
              </span>
              <div className="flex items-center text-amber-600 font-bold">
                <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-1" />
                <span>{recipe.rating.toFixed(1)}</span>
                <span className="text-stone-500 ml-1">({recipe.reviewsCount})</span>
              </div>
            </div>

            <h3
              onClick={() => onSelectRecipe(recipe.slug)}
              className="text-xl sm:text-2xl font-serif font-bold text-stone-900 group-hover:text-amber-800 cursor-pointer transition-colors leading-snug mb-2"
            >
              {recipe.title}
            </h3>

            <p className="text-stone-600 text-sm line-clamp-2 mb-4 leading-relaxed">
              {recipe.tagline}
            </p>
          </div>

          <div className="flex items-center justify-between pt-3 border-t border-stone-100 text-xs sm:text-sm text-stone-600">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1 font-medium">
                <Clock className="w-4 h-4 text-amber-700" />
                {recipe.totalTimeMinutes} mins
              </span>
              <span className="flex items-center gap-1 font-medium">
                <Users className="w-4 h-4 text-amber-700" />
                {recipe.servings} {recipe.servingUnit || 'servings'}
              </span>
            </div>
            <button
              onClick={() => onSelectRecipe(recipe.slug)}
              className="px-4 py-2 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-sm transition-all shadow-sm"
            >
              View Recipe
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={() => onSelectRecipe(recipe.slug)}
      className="bg-white border-2 border-stone-200/90 rounded-2xl overflow-hidden hover:shadow-xl hover:border-amber-400 transition-all duration-200 flex flex-col h-full cursor-pointer group"
    >
      <div className="relative h-56 w-full overflow-hidden bg-stone-100">
        <img
          src={recipe.image}
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute top-3 left-3">
          <span className="font-bold text-xs tracking-wider uppercase bg-amber-900/90 text-white backdrop-blur-xs px-2.5 py-1 rounded-md shadow-sm">
            {recipe.category}
          </span>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleSaveRecipe(recipe.id);
          }}
          aria-label={saved ? 'Remove from saved' : 'Save recipe'}
          className="absolute top-3 right-3 p-2 rounded-full bg-white/95 text-stone-700 shadow-md hover:text-red-600 transition-colors"
        >
          <Bookmark className={`w-5 h-5 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
        </button>

        <div className="absolute bottom-2 left-2 bg-stone-900/80 backdrop-blur-xs text-white text-xs px-2.5 py-1 rounded-md font-semibold flex items-center gap-1">
          <Clock className="w-3.5 h-3.5 text-amber-400" />
          <span>{recipe.totalTimeMinutes} mins</span>
        </div>
      </div>

      <div className="p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center text-amber-600 font-bold text-sm">
              <Star className="w-4 h-4 fill-amber-500 text-amber-500 mr-1" />
              <span>{recipe.rating.toFixed(1)}</span>
              <span className="text-stone-500 text-xs ml-1 font-normal">({recipe.reviewsCount} reviews)</span>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 border border-stone-200">
              {recipe.difficulty}
            </span>
          </div>

          <h3 className="text-xl font-serif font-bold text-stone-900 group-hover:text-amber-800 transition-colors leading-snug mb-2 line-clamp-2">
            {recipe.title}
          </h3>

          <p className="text-stone-600 text-sm line-clamp-2 mb-4 leading-relaxed">
            {recipe.tagline}
          </p>
        </div>

        <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
          <span className="text-xs text-stone-500 font-medium">
            Yield: {recipe.servings} {recipe.servingUnit || 'servings'}
          </span>
          <span className="text-amber-800 font-bold text-sm group-hover:underline">
            Get Recipe &rarr;
          </span>
        </div>
      </div>
    </div>
  );
};
