import React, { useState, useEffect } from 'react';
import { Recipe, CommentItem } from '../types/recipe';
import {
  Clock,
  Users,
  ChefHat,
  Bookmark,
  Printer,
  Share2,
  PlayCircle,
  CheckCircle,
  Flame,
  Star,
  Sparkles,
  MessageSquare,
  ThumbsUp,
  Send,
  Timer as TimerIcon
} from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { AdBanner } from '../components/AdBanner';
import { KitchenTimer } from '../components/KitchenTimer';
import { CookModeModal } from '../components/CookModeModal';
import { SocialShareModal } from '../components/SocialShareModal';
import { RECIPES_DATA } from '../data/recipes';

interface RecipeDetailPageProps {
  recipe: Recipe;
  onSelectRecipe: (slug: string) => void;
  onNavigateHome: () => void;
  onNavigateCategory: (category: string) => void;
}

export const RecipeDetailPage: React.FC<RecipeDetailPageProps> = ({
  recipe,
  onSelectRecipe,
  onNavigateHome,
  onNavigateCategory,
}) => {
  const { unitSystem, setUnitSystem, isSaved, toggleSaveRecipe } = usePreferences();
  const saved = isSaved(recipe.id);

  const [servingMultiplier, setServingMultiplier] = useState<number>(1);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<number, boolean>>({});
  const [completedSteps, setCompletedSteps] = useState<Record<number, boolean>>({});
  const [isCookModeOpen, setIsCookModeOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [activeTimerMins, setActiveTimerMins] = useState<number | null>(null);

  // Comments state with localStorage persistence
  const [comments, setComments] = useState<CommentItem[]>(() => {
    try {
      const stored = localStorage.getItem(`spk_comments_${recipe.id}`);
      return stored ? JSON.parse(stored) : recipe.comments || [];
    } catch {
      return recipe.comments || [];
    }
  });

  const [newAuthor, setNewAuthor] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newCommentText, setNewCommentText] = useState('');
  const [commentSuccess, setCommentSuccess] = useState(false);

  // Calculate dynamic servings
  const currentServings = Math.round(recipe.servings * servingMultiplier * 10) / 10;

  // Sync Schema.org JSON-LD to document head
  useEffect(() => {
    document.title = `${recipe.title} - Sweet Pea's Kitchen`;

    const scriptId = 'recipe-jsonld-schema';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
      '@context': 'https://schema.org',
      '@type': 'Recipe',
      name: recipe.title,
      image: [recipe.image],
      author: {
        '@type': 'Person',
        name: recipe.author || "Sweet Pea's Kitchen",
      },
      datePublished: recipe.datePublished,
      description: recipe.tagline,
      prepTime: `PT${recipe.prepTimeMinutes}M`,
      cookTime: `PT${recipe.cookTimeMinutes}M`,
      totalTime: `PT${recipe.totalTimeMinutes}M`,
      keywords: recipe.tags.join(', '),
      recipeYield: `${currentServings} ${recipe.servingUnit || 'servings'}`,
      recipeCategory: recipe.category,
      nutrition: {
        '@type': 'NutritionInformation',
        calories: `${recipe.nutrition.calories} calories`,
        fatContent: recipe.nutrition.fat,
        carbohydrateContent: recipe.nutrition.carbohydrates,
        proteinContent: recipe.nutrition.protein,
      },
      recipeIngredient: recipe.ingredients.map(
        i => `${formatAmount(i.amount * servingMultiplier)} ${i.unit} ${i.item}`
      ),
      recipeInstructions: recipe.instructions.map(ins => ({
        '@type': 'HowToStep',
        name: ins.title || `Step ${ins.step}`,
        text: ins.text,
      })),
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: recipe.rating,
        reviewCount: recipe.reviewsCount + (comments.length - recipe.comments.length),
      },
    };

    script.textContent = JSON.stringify(schemaData);

    return () => {
      // clean up on unmount
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [recipe, servingMultiplier, comments]);

  function formatAmount(num: number): string {
    if (num <= 0) return '';
    // Format fractions for cooks: 0.25 -> 1/4, 0.33 -> 1/3, 0.5 -> 1/2, 0.75 -> 3/4
    const rounded = Math.round(num * 100) / 100;
    const whole = Math.floor(rounded);
    const remainder = rounded - whole;

    let fraction = '';
    if (Math.abs(remainder - 0.25) < 0.05) fraction = '¼';
    else if (Math.abs(remainder - 0.33) < 0.05) fraction = '⅓';
    else if (Math.abs(remainder - 0.5) < 0.05) fraction = '½';
    else if (Math.abs(remainder - 0.66) < 0.05) fraction = '⅔';
    else if (Math.abs(remainder - 0.75) < 0.05) fraction = '¾';
    else if (remainder > 0.05) fraction = (Math.round(remainder * 10) / 10).toString().replace(/^0/, '');

    if (whole > 0 && fraction) return `${whole} ${fraction}`;
    if (whole > 0) return `${whole}`;
    return fraction || `${rounded}`;
  }

  const toggleIngredient = (idx: number) => {
    setCheckedIngredients(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const toggleStep = (idx: number) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handlePrint = () => {
    window.print();
  };

  const handleJumpToRecipe = () => {
    const el = document.getElementById('recipe-card-box');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newCommentText.trim()) return;

    const newComment: CommentItem = {
      id: `c_${Date.now()}`,
      author: newAuthor.trim(),
      date: new Date().toISOString().split('T')[0],
      rating: newRating,
      content: newCommentText.trim(),
      helpfulCount: 0,
    };

    const updated = [newComment, ...comments];
    setComments(updated);
    localStorage.setItem(`spk_comments_${recipe.id}`, JSON.stringify(updated));

    setNewAuthor('');
    setNewCommentText('');
    setCommentSuccess(true);
    setTimeout(() => setCommentSuccess(false), 4000);
  };

  // Find related recipes in same or other categories
  const relatedRecipes = RECIPES_DATA.filter(r => r.id !== recipe.id).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      {/* Breadcrumb Navigation */}
      <nav className="text-sm font-semibold text-stone-500 mb-4 flex items-center space-x-2 no-print">
        <button onClick={onNavigateHome} className="hover:text-amber-900 transition-colors">
          Home
        </button>
        <span>/</span>
        <button
          onClick={() => onNavigateCategory(recipe.category)}
          className="hover:text-amber-900 transition-colors"
        >
          {recipe.category}
        </button>
        <span>/</span>
        <span className="text-stone-800 font-bold truncate max-w-xs sm:max-w-md">{recipe.title}</span>
      </nav>

      {/* Main Grid: Left Content (2/3) + Right Sidebar (1/3) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <main className="lg:col-span-8 space-y-6">
          {/* Recipe Hero Info */}
          <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
              <span className="font-bold text-xs uppercase tracking-wider text-amber-900 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                {recipe.category}
              </span>

              <div className="flex items-center space-x-1 text-amber-600 font-bold text-base">
                {[1, 2, 3, 4, 5].map(star => (
                  <Star
                    key={star}
                    className={`w-5 h-5 ${
                      star <= Math.round(recipe.rating)
                        ? 'fill-amber-500 text-amber-500'
                        : 'text-stone-300'
                    }`}
                  />
                ))}
                <span className="ml-2 text-stone-900 font-extrabold">{recipe.rating.toFixed(1)}</span>
                <span className="text-stone-500 text-sm font-normal">
                  ({recipe.reviewsCount + (comments.length - recipe.comments.length)} reviews)
                </span>
              </div>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#2a170b] leading-tight mb-4">
              {recipe.title}
            </h1>

            <p className="text-stone-700 text-base sm:text-lg leading-relaxed mb-6 font-normal">
              {recipe.tagline}
            </p>

            <div className="flex flex-wrap items-center justify-between gap-4 py-3 border-y border-stone-200 text-xs sm:text-sm text-stone-600 font-medium">
              <div className="flex items-center space-x-2">
                <ChefHat className="w-5 h-5 text-amber-800" />
                <span>Recipe by <strong className="text-stone-900">{recipe.author}</strong></span>
              </div>
              <div>Published: {recipe.datePublished}</div>
              <div className="text-amber-800 font-bold">Tested &amp; Family-Approved</div>
            </div>

            {/* Quick Action Buttons for Cooks */}
            <div className="mt-6 flex flex-wrap items-center gap-3 no-print">
              <button
                onClick={handleJumpToRecipe}
                className="flex items-center space-x-2 px-5 py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl text-sm transition-all shadow-sm"
              >
                <span>Jump to Recipe</span>
                <span>&darr;</span>
              </button>

              <button
                onClick={() => setIsCookModeOpen(true)}
                className="flex items-center space-x-2 px-5 py-3 bg-green-800 hover:bg-green-900 text-white font-bold rounded-2xl text-sm transition-all shadow-sm"
                title="Open full-screen hands-free cooking mode"
              >
                <PlayCircle className="w-5 h-5" />
                <span>Start Cook Mode</span>
              </button>

              <button
                onClick={handlePrint}
                className="flex items-center space-x-1.5 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-2xl text-sm border border-stone-300 transition-colors"
              >
                <Printer className="w-4 h-4 text-stone-600" />
                <span>Print</span>
              </button>

              <button
                onClick={() => toggleSaveRecipe(recipe.id)}
                className={`flex items-center space-x-1.5 px-4 py-3 font-bold rounded-2xl text-sm border transition-colors ${
                  saved
                    ? 'bg-red-50 text-red-700 border-red-300 hover:bg-red-100'
                    : 'bg-stone-100 text-stone-800 border-stone-300 hover:bg-stone-200'
                }`}
              >
                <Bookmark className={`w-4 h-4 ${saved ? 'fill-red-600 text-red-600' : ''}`} />
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>

              <button
                onClick={() => setIsShareModalOpen(true)}
                className="flex items-center space-x-1.5 px-4 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-2xl text-sm border border-stone-300 transition-colors"
              >
                <Share2 className="w-4 h-4 text-stone-600" />
                <span>Share</span>
              </button>
            </div>
          </div>

          {/* Hero Recipe Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-md border-2 border-stone-200 bg-stone-100">
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-[360px] sm:h-[460px] object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-stone-900/80 backdrop-blur-md rounded-2xl p-4 text-white flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center space-x-6">
                <div>
                  <div className="text-xs text-stone-300 uppercase tracking-wider font-bold">Prep Time</div>
                  <div className="text-lg font-bold text-amber-300">{recipe.prepTimeMinutes} mins</div>
                </div>
                <div className="h-8 w-px bg-stone-600" />
                <div>
                  <div className="text-xs text-stone-300 uppercase tracking-wider font-bold">Cook Time</div>
                  <div className="text-lg font-bold text-amber-300">{recipe.cookTimeMinutes} mins</div>
                </div>
                <div className="h-8 w-px bg-stone-600" />
                <div>
                  <div className="text-xs text-stone-300 uppercase tracking-wider font-bold">Total Time</div>
                  <div className="text-lg font-bold text-amber-300">{recipe.totalTimeMinutes} mins</div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-xs text-stone-300 uppercase tracking-wider font-bold">Yield</div>
                  <div className="text-lg font-bold text-amber-300">{currentServings} {recipe.servingUnit || 'servings'}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Recipe Card Box */}
          <div id="recipe-card-box" className="printable-recipe-card bg-white border-2 border-amber-900/20 rounded-3xl p-6 sm:p-10 shadow-md">
            <div className="border-b-2 border-amber-900/10 pb-6 mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="font-serif text-2xl sm:text-3xl font-extrabold text-[#2c1a0e]">
                  {recipe.title}
                </h2>
                <p className="text-stone-600 text-sm mt-1">Homestyle recipe card with dynamic measurements</p>
              </div>

              {/* Action shortcuts */}
              <div className="flex items-center space-x-3 no-print">
                <button
                  onClick={handlePrint}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold rounded-xl text-xs transition-colors"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Card</span>
                </button>
              </div>
            </div>

            {/* Serving Adjuster & Unit System Controls */}
            <div className="bg-[#FAF7F2] border border-amber-200/80 rounded-2xl p-4 sm:p-5 mb-8 flex flex-wrap items-center justify-between gap-4 no-print">
              <div>
                <span className="block text-xs uppercase tracking-wider text-amber-900 font-bold mb-1.5">
                  Adjust Servings:
                </span>
                <div className="flex items-center space-x-1.5">
                  {[0.5, 1, 1.5, 2, 3].map(mult => (
                    <button
                      key={mult}
                      onClick={() => setServingMultiplier(mult)}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all border ${
                        servingMultiplier === mult
                          ? 'bg-amber-800 text-white border-amber-800 shadow-sm'
                          : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                      }`}
                    >
                      {mult}x ({Math.round(recipe.servings * mult)})
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <span className="block text-xs uppercase tracking-wider text-amber-900 font-bold mb-1.5">
                  Measurement System:
                </span>
                <div className="flex items-center bg-white rounded-xl border border-stone-300 p-0.5">
                  <button
                    onClick={() => setUnitSystem('us')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      unitSystem === 'us'
                        ? 'bg-amber-800 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    US Customary
                  </button>
                  <button
                    onClick={() => setUnitSystem('metric')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-colors ${
                      unitSystem === 'metric'
                        ? 'bg-amber-800 text-white shadow-2xs'
                        : 'text-stone-600 hover:text-stone-900'
                    }`}
                  >
                    Metric (g/ml)
                  </button>
                </div>
              </div>
            </div>

            {/* Ingredients Section */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <ChefHat className="w-6 h-6 text-amber-800" />
                  <span>Ingredients</span>
                </h3>
                <span className="text-xs text-stone-500 font-medium no-print">
                  (Check off items as you prep)
                </span>
              </div>

              <div className="bg-white border-2 border-stone-200/80 rounded-2xl p-4 sm:p-6 divide-y divide-stone-100">
                {recipe.ingredients.map((ing, idx) => {
                  const isChecked = !!checkedIngredients[idx];
                  const displayAmount = unitSystem === 'metric' && ing.metricAmount
                    ? `${formatAmount(ing.metricAmount * servingMultiplier)} ${ing.metricUnit || 'g'}`
                    : `${formatAmount(ing.amount * servingMultiplier)} ${ing.unit}`;

                  return (
                    <label
                      key={idx}
                      onClick={() => toggleIngredient(idx)}
                      className={`flex items-start py-3 cursor-pointer select-none transition-colors group ${
                        isChecked ? 'opacity-40' : 'hover:bg-amber-50/50'
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="mt-1 w-5 h-5 rounded border-stone-300 text-amber-800 focus:ring-amber-700 cursor-pointer"
                      />
                      <span className="ml-3.5 text-base sm:text-lg font-medium text-stone-800 leading-snug">
                        <strong className="text-stone-950 font-bold mr-1.5">{displayAmount}</strong>
                        <span className={isChecked ? 'line-through text-stone-500' : ''}>
                          {ing.item}
                        </span>
                        {ing.note && (
                          <span className="text-stone-500 text-sm ml-1.5 italic">
                            ({ing.note})
                          </span>
                        )}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Ad Placement: In-content after recipe ingredients (300x250) */}
            <div className="my-8 py-2 border-y border-stone-200/60 flex justify-center bg-stone-50/60 rounded-2xl">
              <AdBanner slot="in-content-300x250" />
            </div>

            {/* Step-by-Step Instructions */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-serif text-2xl font-bold text-stone-900 flex items-center gap-2">
                  <CheckCircle className="w-6 h-6 text-amber-800" />
                  <span>Step-by-Step Instructions</span>
                </h3>
              </div>

              <div className="space-y-6">
                {recipe.instructions.map((step, idx) => {
                  const isDone = !!completedSteps[idx];
                  return (
                    <div
                      key={idx}
                      className={`border-2 rounded-2xl p-5 sm:p-6 transition-all ${
                        isDone
                          ? 'bg-green-50/50 border-green-300'
                          : 'bg-white border-stone-200/90 shadow-2xs'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <div className="flex items-center space-x-3">
                          <span className="w-9 h-9 rounded-xl bg-amber-800 text-white font-serif font-bold text-lg flex items-center justify-center shrink-0 shadow-2xs">
                            {step.step}
                          </span>
                          {step.title && (
                            <h4 className="text-xl font-serif font-bold text-stone-900">
                              {step.title}
                            </h4>
                          )}
                        </div>

                        <button
                          onClick={() => toggleStep(idx)}
                          className={`text-xs font-bold px-3 py-1.5 rounded-lg border transition-colors no-print ${
                            isDone
                              ? 'bg-green-700 text-white border-green-700'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-300'
                          }`}
                        >
                          {isDone ? '✓ Completed' : 'Mark Done'}
                        </button>
                      </div>

                      <p className="text-stone-800 text-base sm:text-lg leading-relaxed pl-12 mt-2">
                        {step.text}
                      </p>

                      {step.suggestedMinutes && (
                        <div className="mt-3 pl-12 flex items-center gap-3 no-print">
                          <button
                            onClick={() => setActiveTimerMins(step.suggestedMinutes || 15)}
                            className="inline-flex items-center space-x-1.5 px-3 py-1 bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold rounded-lg text-xs border border-amber-300 transition-colors"
                          >
                            <TimerIcon className="w-3.5 h-3.5 text-amber-700" />
                            <span>Set {step.suggestedMinutes}m Timer</span>
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Ad Placement: Below recipe instructions (728x90 desktop / 320x50 mobile) */}
            <div className="my-8 py-3 border-y border-stone-200 flex justify-center bg-stone-50 rounded-2xl">
              <AdBanner slot="below-content-responsive" />
            </div>

            {/* Chef's Tips & Storage Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="bg-amber-50/80 border-2 border-amber-200/90 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center space-x-2 text-amber-950 font-bold mb-3 text-lg font-serif">
                  <Sparkles className="w-5 h-5 text-amber-700" />
                  <span>Sweet Pea's Recipe Tips</span>
                </div>
                <ul className="space-y-2.5 text-sm sm:text-base text-amber-950/90 leading-relaxed list-disc list-inside">
                  {recipe.chefTips.map((tip, idx) => (
                    <li key={idx} className="font-medium">{tip}</li>
                  ))}
                </ul>
              </div>

              <div className="bg-stone-50 border-2 border-stone-200 rounded-2xl p-5 sm:p-6">
                <div className="flex items-center space-x-2 text-stone-900 font-bold mb-3 text-lg font-serif">
                  <Clock className="w-5 h-5 text-stone-600" />
                  <span>Storage &amp; Reheating</span>
                </div>
                <p className="text-sm sm:text-base text-stone-700 leading-relaxed">
                  {recipe.storageTips}
                </p>
              </div>
            </div>

            {/* Nutrition Facts Label */}
            <div className="bg-white border-2 border-stone-900 rounded-2xl p-6 max-w-md mx-auto shadow-sm">
              <h4 className="font-serif text-2xl font-black border-b-8 border-stone-900 pb-1 uppercase tracking-tight">
                Nutrition Facts
              </h4>
              <div className="text-xs font-semibold py-1 border-b border-stone-300 flex justify-between">
                <span>Serving Size:</span>
                <span>1 of {currentServings} servings</span>
              </div>
              <div className="py-2 border-b-4 border-stone-900 flex justify-between items-baseline">
                <div>
                  <div className="text-xs font-bold uppercase">Amount Per Serving</div>
                  <div className="text-3xl font-black">Calories</div>
                </div>
                <div className="text-4xl font-black">{recipe.nutrition.calories}</div>
              </div>
              <div className="divide-y divide-stone-200 text-sm font-semibold">
                <div className="py-1.5 flex justify-between">
                  <span><strong>Total Fat</strong> {recipe.nutrition.fat}</span>
                </div>
                {recipe.nutrition.saturatedFat && (
                  <div className="py-1.5 pl-4 flex justify-between text-stone-600 text-xs">
                    <span>Saturated Fat {recipe.nutrition.saturatedFat}</span>
                  </div>
                )}
                {recipe.nutrition.cholesterol && (
                  <div className="py-1.5 flex justify-between">
                    <span><strong>Cholesterol</strong> {recipe.nutrition.cholesterol}</span>
                  </div>
                )}
                {recipe.nutrition.sodium && (
                  <div className="py-1.5 flex justify-between">
                    <span><strong>Sodium</strong> {recipe.nutrition.sodium}</span>
                  </div>
                )}
                <div className="py-1.5 flex justify-between">
                  <span><strong>Total Carbohydrates</strong> {recipe.nutrition.carbohydrates}</span>
                </div>
                {recipe.nutrition.fiber && (
                  <div className="py-1.5 pl-4 flex justify-between text-stone-600 text-xs">
                    <span>Dietary Fiber {recipe.nutrition.fiber}</span>
                  </div>
                )}
                {recipe.nutrition.sugar && (
                  <div className="py-1.5 pl-4 flex justify-between text-stone-600 text-xs">
                    <span>Sugars {recipe.nutrition.sugar}</span>
                  </div>
                )}
                <div className="py-1.5 flex justify-between">
                  <span><strong>Protein</strong> {recipe.nutrition.protein}</span>
                </div>
              </div>
              <p className="text-[11px] text-stone-500 mt-3 pt-2 border-t border-stone-300">
                *Percent Daily Values are based on a 2,000 calorie diet. Nutrition is calculated per serving.
              </p>
            </div>
          </div>

          {/* Native Banner Slot (pl29678874) */}
          <div className="my-8">
            <AdBanner slot="native" />
          </div>

          {/* Comments & Rating Section */}
          <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs no-print">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-stone-200">
              <div className="flex items-center space-x-3">
                <MessageSquare className="w-6 h-6 text-amber-800" />
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  Reader Reviews &amp; Comments ({comments.length})
                </h3>
              </div>
              <span className="text-xs font-semibold text-amber-900 bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
                Verified Recipes
              </span>
            </div>

            {/* Leave a review form */}
            <form onSubmit={handleCommentSubmit} className="bg-amber-50/60 border border-amber-200 rounded-2xl p-5 mb-8">
              <h4 className="font-serif text-lg font-bold text-stone-900 mb-2">
                Have you made this recipe? Leave a review!
              </h4>
              <p className="text-stone-600 text-xs mb-4">
                Share your tips, ingredient swaps, and baking notes with fellow home cooks.
              </p>

              {commentSuccess && (
                <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-800 text-sm font-bold rounded-xl flex items-center space-x-2">
                  <CheckCircle className="w-5 h-5 text-green-700" />
                  <span>Thank you! Your review has been posted.</span>
                </div>
              )}

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4">
                  <div className="flex-1 min-w-[200px]">
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      placeholder="e.g. Grandma Rose, or Chef Dave"
                      className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-sm text-stone-900 focus:outline-hidden focus:border-amber-700"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Your Rating</label>
                    <div className="flex items-center space-x-1 py-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setNewRating(star)}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star
                            className={`w-6 h-6 ${
                              star <= newRating
                                ? 'fill-amber-500 text-amber-500'
                                : 'text-stone-300'
                            }`}
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase mb-1">Your Comment / Review</label>
                  <textarea
                    required
                    rows={3}
                    value={newCommentText}
                    onChange={(e) => setNewCommentText(e.target.value)}
                    placeholder="How did the dish turn out? Any favorite sides you served it with?"
                    className="w-full bg-white border border-stone-300 rounded-xl p-3 text-sm text-stone-900 focus:outline-hidden focus:border-amber-700"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center space-x-2 px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-sm rounded-xl transition-all shadow-sm"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Recipe Review</span>
                </button>
              </div>
            </form>

            {/* Existing Comments List */}
            <div className="space-y-4">
              {comments.map(c => (
                <div key={c.id} className="p-4 rounded-2xl bg-stone-50 border border-stone-200">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-bold text-stone-900 text-sm">{c.author}</span>
                      <span className="text-stone-400 text-xs">•</span>
                      <span className="text-stone-500 text-xs">{c.date}</span>
                    </div>

                    <div className="flex items-center space-x-0.5">
                      {[1, 2, 3, 4, 5].map(s => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= c.rating ? 'fill-amber-500 text-amber-500' : 'text-stone-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>

                  <p className="text-stone-700 text-sm leading-relaxed">{c.content}</p>
                </div>
              ))}
            </div>
          </div>
        </main>

        {/* Right Sidebar (Desktop) */}
        <aside className="lg:col-span-4 space-y-6 no-print">
          {/* Active Kitchen Timer Widget if initiated */}
          {activeTimerMins !== null && (
            <KitchenTimer
              initialMinutes={activeTimerMins}
              label="Active Step Timer"
              onClose={() => setActiveTimerMins(null)}
            />
          )}

          {/* Ad Placement: Right sidebar banner (300x250) */}
          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-4 flex flex-col items-center shadow-xs">
            <AdBanner slot="sidebar-300x250" />
          </div>

          {/* Popular Recipes in this category */}
          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-5 shadow-xs">
            <h4 className="font-serif text-lg font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200 flex items-center gap-2">
              <Flame className="w-5 h-5 text-amber-700" />
              <span>You Might Also Love</span>
            </h4>

            <div className="space-y-4">
              {relatedRecipes.map(rel => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRecipe(rel.slug)}
                  className="flex items-center space-x-3 cursor-pointer group"
                >
                  <img
                    src={rel.image}
                    alt={rel.title}
                    className="w-16 h-16 rounded-xl object-cover group-hover:scale-105 transition-transform shrink-0"
                  />
                  <div>
                    <h5 className="font-serif text-sm font-bold text-stone-900 group-hover:text-amber-800 line-clamp-2 transition-colors">
                      {rel.title}
                    </h5>
                    <div className="flex items-center text-xs text-stone-500 mt-1 space-x-2">
                      <span className="flex items-center text-amber-600 font-bold">
                        <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                        {rel.rating}
                      </span>
                      <span>•</span>
                      <span>{rel.totalTimeMinutes} mins</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kitchen Standalone Timer Tool */}
          {activeTimerMins === null && (
            <KitchenTimer initialMinutes={15} label="Quick Kitchen Timer" />
          )}

          {/* Ad Placement: Sidebar vertical banner (160x600) */}
          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-4 flex flex-col items-center shadow-xs">
            <AdBanner slot="sidebar-160x600" />
          </div>
        </aside>
      </div>

      {/* Modals */}
      <CookModeModal
        recipe={recipe}
        isOpen={isCookModeOpen}
        onClose={() => setIsCookModeOpen(false)}
      />

      <SocialShareModal
        recipe={recipe}
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />
    </div>
  );
};
