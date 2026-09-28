import React from 'react';
import { Recipe } from '../types/recipe';
import { RecipeCard } from '../components/RecipeCard';
import { AdBanner } from '../components/AdBanner';
import { KitchenTimer } from '../components/KitchenTimer';
import { Sparkles, Utensils, Award, Clock, Heart, ArrowRight } from 'lucide-react';
import { CATEGORIES } from '../data/recipes';

interface HomePageProps {
  recipes: Recipe[];
  onSelectRecipe: (slug: string) => void;
  onSelectCategory: (category: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  recipes,
  onSelectRecipe,
  onSelectCategory,
}) => {
  const featuredRecipe = recipes.find(r => r.featured) || recipes[0];
  const trendingRecipes = recipes.filter(r => r.trending && r.id !== featuredRecipe.id).slice(0, 4);
  const dinnerRecipes = recipes.filter(r => r.category === 'Casseroles' || r.category === 'Main Dishes').slice(0, 4);
  const dessertRecipes = recipes.filter(r => r.category === 'Desserts').slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8 space-y-12">
      {/* Featured Recipe Hero Banner */}
      <section className="bg-white border-2 border-stone-200/90 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
        <div className="grid grid-cols-1 lg:grid-cols-12 items-stretch">
          <div className="lg:col-span-7 relative h-72 sm:h-96 lg:h-auto overflow-hidden bg-stone-100">
            <img
              src={featuredRecipe.image}
              alt={featuredRecipe.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-amber-900 text-white font-bold text-xs uppercase tracking-wider px-3 py-1.5 rounded-xl shadow-md flex items-center gap-1.5">
              <Award className="w-4 h-4 text-amber-300" />
              <span>Today's Featured Recipe</span>
            </div>
          </div>

          <div className="lg:col-span-5 p-6 sm:p-10 flex flex-col justify-between bg-white">
            <div>
              <div className="flex items-center space-x-2 text-xs font-bold text-amber-800 uppercase tracking-wider mb-2">
                <span>{featuredRecipe.category}</span>
                <span>•</span>
                <span className="flex items-center gap-1 text-stone-500">
                  <Clock className="w-3.5 h-3.5" />
                  {featuredRecipe.totalTimeMinutes} mins
                </span>
              </div>

              <h2
                onClick={() => onSelectRecipe(featuredRecipe.slug)}
                className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2a170b] leading-tight mb-4 hover:text-amber-800 cursor-pointer transition-colors"
              >
                {featuredRecipe.title}
              </h2>

              <p className="text-stone-600 text-base sm:text-lg leading-relaxed mb-6 font-normal">
                {featuredRecipe.tagline}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-stone-500">
                {featuredRecipe.servings} Servings • {featuredRecipe.rating} ★★★★★
              </span>
              <button
                onClick={() => onSelectRecipe(featuredRecipe.slug)}
                className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl text-base shadow-sm transition-all flex items-center gap-2"
              >
                <span>Get Recipe</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Categories Exploration Grid */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2a170b] flex items-center gap-2">
            <Utensils className="w-6 h-6 text-amber-800" />
            <span>Browse Recipe Categories</span>
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {CATEGORIES.filter(c => c !== 'All').map(cat => {
            const count = recipes.filter(r => r.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className="bg-white border-2 border-stone-200/90 hover:border-amber-700 hover:bg-amber-50/60 p-4 rounded-2xl text-center transition-all group shadow-2xs"
              >
                <div className="font-serif font-bold text-base sm:text-lg text-stone-900 group-hover:text-amber-900 mb-1">
                  {cat}
                </div>
                <div className="text-xs font-semibold text-amber-800/80">
                  {count} {count === 1 ? 'recipe' : 'recipes'}
                </div>
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Layout: 2 Columns (Content 8 cols + Sidebar 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-12">
          {/* Trending Reader Favorites */}
          <section>
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-stone-200">
              <div className="flex items-center space-x-2">
                <Sparkles className="w-6 h-6 text-amber-700" />
                <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170b]">
                  Trending Comfort Dishes
                </h2>
              </div>
              <button
                onClick={() => onSelectCategory('All')}
                className="text-sm font-bold text-amber-800 hover:underline"
              >
                View all recipes &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {trendingRecipes.map(r => (
                <RecipeCard key={r.id} recipe={r} onSelectRecipe={onSelectRecipe} />
              ))}
            </div>
          </section>

          {/* Ad Placement: In-feed 300x250 */}
          <div className="my-8 py-3 bg-stone-50 rounded-2xl border border-stone-200 flex justify-center">
            <AdBanner slot="in-content-300x250" />
          </div>

          {/* Hearty Dinners & Casseroles */}
          <section>
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-stone-200">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170b]">
                Easy Weeknight Dinners &amp; Casseroles
              </h2>
              <button
                onClick={() => onSelectCategory('Casseroles')}
                className="text-sm font-bold text-amber-800 hover:underline"
              >
                More dinners &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {dinnerRecipes.map(r => (
                <RecipeCard key={r.id} recipe={r} onSelectRecipe={onSelectRecipe} />
              ))}
            </div>
          </section>

          {/* Sweet Treats & Homestyle Desserts */}
          <section>
            <div className="flex items-center justify-between mb-6 pb-2 border-b-2 border-stone-200">
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2a170b]">
                Decadent Desserts &amp; Bakes
              </h2>
              <button
                onClick={() => onSelectCategory('Desserts')}
                className="text-sm font-bold text-amber-800 hover:underline"
              >
                More desserts &rarr;
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {dessertRecipes.map(r => (
                <RecipeCard key={r.id} recipe={r} onSelectRecipe={onSelectRecipe} />
              ))}
            </div>
          </section>

          {/* Native Banner Slot (pl29678874) */}
          <AdBanner slot="native" />
        </div>

        {/* Right Sidebar */}
        <aside className="lg:col-span-4 space-y-6">
          {/* Ad Placement: Right sidebar 300x250 */}
          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-4 flex flex-col items-center shadow-xs">
            <AdBanner slot="sidebar-300x250" />
          </div>

          {/* Meet Sweet Pea Story Box */}
          <div className="bg-amber-50 border-2 border-amber-200 rounded-3xl p-6 text-center shadow-xs">
            <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4 border-4 border-amber-300 shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80"
                alt="Sweet Pea in the kitchen"
                className="w-full h-full object-cover"
              />
            </div>
            <h3 className="font-serif text-2xl font-bold text-amber-950 mb-1">
              Hi, I'm Sweet Pea!
            </h3>
            <p className="text-xs uppercase font-bold tracking-wider text-amber-700 mb-3">
              Home Cook &amp; Comfort Food Fanatic
            </p>
            <p className="text-stone-700 text-sm leading-relaxed mb-4">
              Welcome to my kitchen table. Here you'll find tested homestyle recipes that bring back Sunday dinner memories — no fancy equipment, just good real food.
            </p>
            <button
              onClick={() => onSelectCategory('All')}
              className="px-5 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-xl text-sm transition-colors shadow-2xs"
            >
              Explore Recipes
            </button>
          </div>

          {/* Quick Kitchen Timer Widget */}
          <KitchenTimer initialMinutes={10} label="Kitchen Cooking Timer" />

          {/* Newsletter Box */}
          <div className="bg-[#451A03] text-amber-50 rounded-3xl p-6 shadow-md">
            <h4 className="font-serif text-xl font-bold text-amber-100 mb-2">
              Sunday Dinner Dispatch
            </h4>
            <p className="text-xs text-amber-200/80 leading-relaxed mb-4">
              Join over 45,000 home cooks. Get our top 3 new seasonal comfort food recipes delivered right to your inbox every Sunday morning.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Sweet Pea’s Kitchen!'); }} className="space-y-2">
              <input
                type="email"
                required
                placeholder="Enter your email address"
                className="w-full bg-white text-stone-900 px-3.5 py-2.5 rounded-xl text-sm font-medium focus:outline-hidden"
              />
              <button
                type="submit"
                className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-900 font-extrabold rounded-xl text-sm transition-colors"
              >
                Send Me Recipes Free
              </button>
            </form>
          </div>

          {/* Ad Placement: Sidebar vertical 160x600 */}
          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-4 flex flex-col items-center shadow-xs">
            <AdBanner slot="sidebar-160x600" />
          </div>
        </aside>
      </div>
    </div>
  );
};
