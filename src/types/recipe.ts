export interface Ingredient {
  item: string;
  amount: number; // base amount for 1x
  unit: string;
  metricAmount?: number;
  metricUnit?: string;
  note?: string;
}

export interface Instruction {
  step: number;
  title?: string;
  text: string;
  tip?: string;
  suggestedMinutes?: number;
}

export interface NutritionInfo {
  calories: number;
  fat: string;
  saturatedFat?: string;
  cholesterol?: string;
  sodium?: string;
  carbohydrates: string;
  fiber?: string;
  sugar?: string;
  protein: string;
}

export interface CommentItem {
  id: string;
  author: string;
  date: string;
  rating: number;
  content: string;
  helpfulCount?: number;
}

export interface Recipe {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: RecipeCategory;
  image: string;
  author: string;
  datePublished: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  servingUnit: string;
  difficulty: 'Easy' | 'Medium' | 'Intermediate';
  rating: number;
  reviewsCount: number;
  featured?: boolean;
  trending?: boolean;
  ingredients: Ingredient[];
  instructions: Instruction[];
  nutrition: NutritionInfo;
  chefTips: string[];
  storageTips: string;
  tags: string[];
  comments: CommentItem[];
}

export type RecipeCategory =
  | 'All'
  | 'Casseroles'
  | 'Main Dishes'
  | 'Slow Cooker'
  | 'Desserts'
  | 'Soups & Salads'
  | 'Appetizers'
  | 'Breakfast';
