import React, { createContext, useContext, useState, useEffect } from 'react';

type FontSizePreference = 'normal' | 'large' | 'huge';
type UnitSystem = 'us' | 'metric';

interface PreferencesContextType {
  fontSize: FontSizePreference;
  setFontSize: (size: FontSizePreference) => void;
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  savedRecipes: string[];
  toggleSaveRecipe: (recipeId: string) => void;
  isSaved: (recipeId: string) => boolean;
}

const PreferencesContext = createContext<PreferencesContextType | undefined>(undefined);

export const PreferencesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [fontSize, setFontSizeState] = useState<FontSizePreference>(() => {
    return (localStorage.getItem('spk_font_size') as FontSizePreference) || 'normal';
  });

  const [unitSystem, setUnitSystemState] = useState<UnitSystem>(() => {
    return (localStorage.getItem('spk_unit_system') as UnitSystem) || 'us';
  });

  const [savedRecipes, setSavedRecipes] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem('spk_saved_recipes');
      return stored ? JSON.parse(stored) : ['spk-1', 'spk-3'];
    } catch {
      return ['spk-1', 'spk-3'];
    }
  });

  const setFontSize = (size: FontSizePreference) => {
    setFontSizeState(size);
    localStorage.setItem('spk_font_size', size);
  };

  const setUnitSystem = (system: UnitSystem) => {
    setUnitSystemState(system);
    localStorage.setItem('spk_unit_system', system);
  };

  const toggleSaveRecipe = (recipeId: string) => {
    setSavedRecipes(prev => {
      const next = prev.includes(recipeId)
        ? prev.filter(id => id !== recipeId)
        : [...prev, recipeId];
      localStorage.setItem('spk_saved_recipes', JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (recipeId: string) => savedRecipes.includes(recipeId);

  // Apply root font class for older readers
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('font-size-normal', 'font-size-large', 'font-size-huge');
    if (fontSize === 'large') {
      root.classList.add('font-size-large');
      root.style.fontSize = '18px';
    } else if (fontSize === 'huge') {
      root.classList.add('font-size-huge');
      root.style.fontSize = '20px';
    } else {
      root.classList.add('font-size-normal');
      root.style.fontSize = '16px';
    }
  }, [fontSize]);

  return (
    <PreferencesContext.Provider
      value={{
        fontSize,
        setFontSize,
        unitSystem,
        setUnitSystem,
        savedRecipes,
        toggleSaveRecipe,
        isSaved,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
};

export const usePreferences = () => {
  const context = useContext(PreferencesContext);
  if (!context) {
    throw new Error('usePreferences must be used within a PreferencesProvider');
  }
  return context;
};
