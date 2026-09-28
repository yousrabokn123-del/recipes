import React from 'react';
import { ChefHat, Heart, Award, Sparkles, BookOpen, Clock } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

interface AboutPageProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateHome, onNavigateContact }) => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
          Our Homestyle Story
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#2a170b] mt-4 mb-6 leading-tight">
          Welcome to Sweet Pea's Kitchen
        </h1>
        <p className="text-stone-700 text-lg sm:text-xl leading-relaxed">
          Where cozy memories, uncomplicated ingredients, and hearty Sunday dinners come to life on your table.
        </p>
      </div>

      {/* Main Feature Image & Story */}
      <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-10 shadow-xs space-y-8">
        <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 shadow-sm">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
            alt="Baking fresh comforting food"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-6 sm:p-8">
            <p className="text-white font-serif text-xl sm:text-2xl italic font-bold">
              "Cooking comfort food isn't about perfection — it's about sharing love and second helpings."
            </p>
          </div>
        </div>

        <div className="prose max-w-none text-stone-800 space-y-4 text-base sm:text-lg leading-relaxed">
          <p>
            Sweet Pea's Kitchen was born out of a lifelong passion for real, comforting food. Growing up in a home where the kitchen was always the warmest room in the house, the aromas of bubbling casseroles, simmering pot roasts, and warm cinnamon pies were the soundtrack to our family gatherings.
          </p>
          <p>
            In today's fast-paced world, finding time to cook shouldn't mean sacrificing authentic homestyle flavor or spending hours hunting down obscure ingredients at specialty markets. Every recipe published on Sweet Pea's Kitchen has been rigorously tested in an everyday kitchen with standard pots, pans, and grocery store staples.
          </p>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900 pt-4">
            Our Kitchen Promise to You
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 not-prose">
            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center mb-3">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-950 mb-1">Tested With Love</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Every recipe is prepared multiple times until the measurements, cook times, and flavor profiles are foolproof.
              </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center mb-3">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-950 mb-1">Clear Instructions</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                Step-by-step guidance formatted with large, readable fonts and helpful chef tips so anyone can cook with confidence.
              </p>
            </div>

            <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-amber-800 text-white flex items-center justify-center mb-3">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-serif font-bold text-lg text-amber-950 mb-1">Everyday Ingredients</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                No chef jargon or hard-to-find spices. We use pantry-friendly goods that make your grocery shopping stress-free.
              </p>
            </div>
          </div>
        </div>

        {/* Ad Placement: In-Content 300x250 */}
        <div className="my-8 py-4 border-y border-stone-200 flex justify-center bg-stone-50 rounded-2xl">
          <AdBanner slot="in-content-300x250" />
        </div>

        <div className="text-center pt-4">
          <h3 className="font-serif text-2xl font-bold text-stone-900 mb-3">
            Have a family recipe you'd love us to feature?
          </h3>
          <p className="text-stone-600 text-sm max-w-lg mx-auto mb-6">
            We love hearing from our readers and recreating cherished heritage recipes. Drop us a note anytime!
          </p>
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={onNavigateContact}
              className="px-6 py-3 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl text-base shadow-sm transition-all"
            >
              Get In Touch
            </button>
            <button
              onClick={onNavigateHome}
              className="px-6 py-3 bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold rounded-2xl text-base border border-stone-300 transition-colors"
            >
              Browse Recipes
            </button>
          </div>
        </div>
      </div>

      {/* Native Ad Banner */}
      <AdBanner slot="native" />
    </div>
  );
};
