import React, { useState } from 'react';
import { Search, Heart, Menu, X, ChefHat, Type } from 'lucide-react';
import { usePreferences } from '../context/PreferencesContext';
import { AdBanner } from './AdBanner';
import { CATEGORIES } from '../data/recipes';

interface HeaderProps {
  currentCategory: string;
  onSelectCategory: (cat: string) => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
  onNavigateSaved: () => void;
  onSearch: (query: string) => void;
  searchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
  onNavigateSaved,
  onSearch,
  searchQuery,
}) => {
  const { fontSize, setFontSize, savedRecipes } = usePreferences();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState(searchQuery);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearch);
    setMobileMenuOpen(false);
  };

  return (
    <header className="bg-[#FAF7F2] border-b-2 border-amber-900/15 sticky top-0 z-40 shadow-xs print:hidden">
      {/* Top Accessibility Bar & Fast Utilities */}
      <div className="bg-[#451A03] text-amber-50 px-4 py-1.5 text-xs sm:text-sm">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-amber-200">Welcome to Sweet Pea's Kitchen!</span>
            <span className="hidden md:inline text-amber-300/60">•</span>
            <span className="hidden md:inline text-amber-200/90">Comforting homestyle food tested with love</span>
          </div>

          <div className="flex items-center space-x-4">
            {/* Font Size Accessibility Scaler for seniors */}
            <div className="flex items-center space-x-1.5 bg-amber-950/70 px-2 py-0.5 rounded-lg border border-amber-700/50">
              <Type className="w-3.5 h-3.5 text-amber-300" />
              <span className="text-[11px] text-amber-300 uppercase tracking-wider font-bold mr-1">Text:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded font-bold transition-colors ${
                  fontSize === 'normal' ? 'bg-amber-500 text-stone-900' : 'text-amber-200 hover:text-white'
                }`}
                title="Normal text size"
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded font-bold text-sm transition-colors ${
                  fontSize === 'large' ? 'bg-amber-500 text-stone-900' : 'text-amber-200 hover:text-white'
                }`}
                title="Large text size (Senior friendly)"
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('huge')}
                className={`px-1.5 py-0.5 rounded font-bold text-base transition-colors ${
                  fontSize === 'huge' ? 'bg-amber-500 text-stone-900' : 'text-amber-200 hover:text-white'
                }`}
                title="Extra large text size"
              >
                A++
              </button>
            </div>

            {/* Saved Recipes Heart Button */}
            <button
              onClick={onNavigateSaved}
              className="flex items-center space-x-1.5 bg-amber-800/60 hover:bg-amber-700 text-white px-2.5 py-0.5 rounded-lg transition-colors font-medium"
            >
              <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
              <span>Saved ({savedRecipes.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Brand & Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo / Brand Name */}
          <div
            onClick={onNavigateHome}
            className="cursor-pointer group flex items-center space-x-3 select-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-800 flex items-center justify-center text-amber-100 shadow-md group-hover:bg-amber-900 transition-colors">
              <ChefHat className="w-7 h-7" />
            </div>
            <div>
              <span className="font-serif text-2xl sm:text-3xl font-extrabold text-[#3a1d0d] tracking-tight block group-hover:text-amber-800 transition-colors">
                Sweet Pea's Kitchen
              </span>
              <span className="text-xs sm:text-sm font-medium text-amber-900/80 tracking-wide">
                Comforting Homestyle Recipes Made Simple
              </span>
            </div>
          </div>

          {/* Desktop Search Bar */}
          <form
            onSubmit={handleSearchSubmit}
            className="hidden md:flex items-center flex-1 max-w-md relative ml-6"
          >
            <input
              type="text"
              value={localSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              placeholder="Search comfort food, casseroles, desserts..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border-2 border-stone-300 focus:border-amber-700 focus:outline-hidden rounded-xl text-stone-900 placeholder-stone-400 font-medium shadow-2xs transition-all"
            />
            <Search className="w-5 h-5 text-stone-400 absolute left-3.5 pointer-events-none" />
            {localSearch && (
              <button
                type="button"
                onClick={() => {
                  setLocalSearch('');
                  onSearch('');
                }}
                className="absolute right-14 text-stone-400 hover:text-stone-600 text-xs font-bold"
              >
                Clear
              </button>
            )}
            <button
              type="submit"
              className="absolute right-1.5 px-3 py-1.5 bg-amber-800 hover:bg-amber-900 text-white font-bold text-xs rounded-lg transition-colors"
            >
              Search
            </button>
          </form>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl bg-amber-100/80 text-amber-950 hover:bg-amber-200 transition-colors"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        <form onSubmit={handleSearchSubmit} className="mt-3 flex md:hidden relative">
          <input
            type="text"
            value={localSearch}
            onChange={(e) => setLocalSearch(e.target.value)}
            placeholder="Search homestyle recipes..."
            className="w-full pl-10 pr-20 py-2.5 bg-white border-2 border-stone-300 focus:border-amber-700 focus:outline-hidden rounded-xl text-stone-900 font-medium text-sm"
          />
          <Search className="w-5 h-5 text-stone-400 absolute left-3 top-3 pointer-events-none" />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3 py-1.5 bg-amber-800 text-white font-bold text-xs rounded-lg"
          >
            Search
          </button>
        </form>
      </div>

      {/* Desktop Navigation Links */}
      <nav className="bg-white border-t border-stone-200 hidden md:block">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
          <div className="flex items-center space-x-1 py-1">
            <button
              onClick={onNavigateHome}
              className={`px-3.5 py-2 font-bold text-sm rounded-lg transition-colors ${
                currentCategory === 'Home'
                  ? 'text-amber-900 bg-amber-100/70 border border-amber-300'
                  : 'text-stone-700 hover:text-amber-800 hover:bg-amber-50'
              }`}
            >
              Home
            </button>

            {CATEGORIES.filter(c => c !== 'All').map(cat => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3 py-2 font-bold text-sm rounded-lg transition-colors ${
                  currentCategory === cat
                    ? 'text-amber-900 bg-amber-100/70 border border-amber-300'
                    : 'text-stone-700 hover:text-amber-800 hover:bg-amber-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex items-center space-x-1 text-sm font-semibold text-stone-600">
            <button
              onClick={onNavigateAbout}
              className="px-3 py-2 hover:text-amber-900 rounded-lg hover:bg-amber-50 transition-colors"
            >
              About
            </button>
            <button
              onClick={onNavigateContact}
              className="px-3 py-2 hover:text-amber-900 rounded-lg hover:bg-amber-50 transition-colors"
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-stone-200 px-4 py-4 space-y-2 shadow-lg">
          <div className="font-bold text-xs uppercase tracking-wider text-stone-400 mb-2">Recipe Categories</div>
          <button
            onClick={() => {
              onNavigateHome();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left px-3 py-2.5 rounded-lg font-bold text-stone-800 hover:bg-amber-50"
          >
            All Recipes
          </button>
          {CATEGORIES.filter(c => c !== 'All').map(cat => (
            <button
              key={cat}
              onClick={() => {
                onSelectCategory(cat);
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg font-bold text-stone-800 hover:bg-amber-50"
            >
              {cat}
            </button>
          ))}
          <div className="pt-3 border-t border-stone-100 space-y-1">
            <button
              onClick={() => {
                onNavigateAbout();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-stone-600"
            >
              About Sweet Pea
            </button>
            <button
              onClick={() => {
                onNavigateContact();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-stone-600"
            >
              Contact & Inquiries
            </button>
            <button
              onClick={() => {
                onNavigateSaved();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-3 py-2 rounded-lg font-medium text-amber-800"
            >
              Saved Recipes ({savedRecipes.length})
            </button>
          </div>
        </div>
      )}

      {/* Top Header Banner Ad Placement (728x90 desktop / 320x50 mobile) */}
      <div className="bg-[#FAF7F2] py-2 border-t border-stone-200/50">
        <AdBanner slot="header-responsive" />
      </div>
    </header>
  );
};
