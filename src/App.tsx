import React, { useState, useEffect } from 'react';
import { PreferencesProvider } from './context/PreferencesContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { MobileSocialBar } from './components/AdBanner';
import { HomePage } from './pages/HomePage';
import { CategoryPage } from './pages/CategoryPage';
import { RecipeDetailPage } from './pages/RecipeDetailPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { SavedRecipesPage } from './pages/SavedRecipesPage';
import { RECIPES_DATA } from './data/recipes';

type PageRoute = 'home' | 'recipe' | 'category' | 'about' | 'contact' | 'saved';

export default function App() {
  const [route, setRoute] = useState<PageRoute>('home');
  const [activeRecipeSlug, setActiveRecipeSlug] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Handle Hash-based Routing for static hosting / GitHub Pages compatibility
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace(/^#\/?/, '');
      if (!hash) {
        setRoute('home');
        return;
      }

      if (hash.startsWith('recipe/')) {
        const slug = hash.replace('recipe/', '');
        setActiveRecipeSlug(slug);
        setRoute('recipe');
      } else if (hash.startsWith('category/')) {
        const cat = decodeURIComponent(hash.replace('category/', ''));
        setActiveCategory(cat);
        setRoute('category');
      } else if (hash === 'about') {
        setRoute('about');
      } else if (hash === 'contact') {
        setRoute('contact');
      } else if (hash === 'saved') {
        setRoute('saved');
      } else {
        setRoute('home');
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Initial check
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (newRoute: PageRoute, param?: string) => {
    if (newRoute === 'recipe' && param) {
      window.location.hash = `/recipe/${param}`;
      setActiveRecipeSlug(param);
      setRoute('recipe');
    } else if (newRoute === 'category') {
      const cat = param || 'All';
      window.location.hash = `/category/${encodeURIComponent(cat)}`;
      setActiveCategory(cat);
      setRoute('category');
    } else if (newRoute === 'about') {
      window.location.hash = '/about';
      setRoute('about');
    } else if (newRoute === 'contact') {
      window.location.hash = '/contact';
      setRoute('contact');
    } else if (newRoute === 'saved') {
      window.location.hash = '/saved';
      setRoute('saved');
    } else {
      window.location.hash = '/';
      setRoute('home');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setActiveCategory('All');
      setRoute('category');
      window.location.hash = `/category/All`;
    }
  };

  const currentRecipe = RECIPES_DATA.find(r => r.slug === activeRecipeSlug) || RECIPES_DATA[0];

  return (
    <PreferencesProvider>
      <div className="min-h-screen flex flex-col bg-[#FAF7F2] text-[#24211e]">
        {/* Mobile Social Bar script injection for mobile pages */}
        <MobileSocialBar />

        {/* Header */}
        <Header
          currentCategory={route === 'category' ? activeCategory : route === 'home' ? 'Home' : ''}
          onSelectCategory={(cat) => {
            setSearchQuery('');
            navigateTo('category', cat);
          }}
          onNavigateHome={() => {
            setSearchQuery('');
            navigateTo('home');
          }}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateContact={() => navigateTo('contact')}
          onNavigateSaved={() => navigateTo('saved')}
          onSearch={handleSearch}
          searchQuery={searchQuery}
        />

        {/* Main Content Area */}
        <div className="flex-1">
          {route === 'home' && (
            <HomePage
              recipes={RECIPES_DATA}
              onSelectRecipe={(slug) => navigateTo('recipe', slug)}
              onSelectCategory={(cat) => navigateTo('category', cat)}
            />
          )}

          {route === 'category' && (
            <CategoryPage
              currentCategory={activeCategory}
              searchQuery={searchQuery}
              onSelectCategory={(cat) => {
                setActiveCategory(cat);
                window.location.hash = `/category/${encodeURIComponent(cat)}`;
              }}
              onSelectRecipe={(slug) => navigateTo('recipe', slug)}
              onClearSearch={() => setSearchQuery('')}
            />
          )}

          {route === 'recipe' && (
            <RecipeDetailPage
              recipe={currentRecipe}
              onSelectRecipe={(slug) => navigateTo('recipe', slug)}
              onNavigateHome={() => navigateTo('home')}
              onNavigateCategory={(cat) => navigateTo('category', cat)}
            />
          )}

          {route === 'about' && (
            <AboutPage
              onNavigateHome={() => navigateTo('home')}
              onNavigateContact={() => navigateTo('contact')}
            />
          )}

          {route === 'contact' && <ContactPage />}

          {route === 'saved' && (
            <SavedRecipesPage
              onSelectRecipe={(slug) => navigateTo('recipe', slug)}
              onNavigateHome={() => navigateTo('home')}
            />
          )}
        </div>

        {/* Footer */}
        <Footer
          onSelectCategory={(cat) => navigateTo('category', cat)}
          onNavigateHome={() => navigateTo('home')}
          onNavigateAbout={() => navigateTo('about')}
          onNavigateContact={() => navigateTo('contact')}
        />
      </div>
    </PreferencesProvider>
  );
}
