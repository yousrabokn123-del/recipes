import React, { useState } from 'react';
import { ChefHat, Heart, Mail, FileCode, Shield, Info, ArrowUp } from 'lucide-react';
import { CATEGORIES } from '../data/recipes';
import { XmlSitemapModal } from './XmlSitemapModal';

interface FooterProps {
  onSelectCategory: (cat: string) => void;
  onNavigateHome: () => void;
  onNavigateAbout: () => void;
  onNavigateContact: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onNavigateHome,
  onNavigateAbout,
  onNavigateContact,
}) => {
  const [sitemapOpen, setSitemapOpen] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#2D1507] text-stone-200 pt-12 pb-8 border-t-4 border-amber-800 print:hidden mt-16">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top Footer: Brand, Categories, Newsletter */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-amber-900/60">
          {/* Brand Info */}
          <div className="lg:col-span-5 space-y-4">
            <div
              onClick={onNavigateHome}
              className="flex items-center space-x-3 cursor-pointer group select-none"
            >
              <div className="w-11 h-11 rounded-2xl bg-amber-700 flex items-center justify-center text-amber-100 shadow-sm">
                <ChefHat className="w-6 h-6" />
              </div>
              <span className="font-serif text-2xl font-black text-amber-100 group-hover:text-amber-300 transition-colors">
                Sweet Pea's Kitchen
              </span>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed max-w-sm font-normal">
              Sweet Pea's Kitchen brings you tried-and-true homestyle comfort food, foolproof casseroles, slow-cooker favorites, and decadent Southern desserts made for family gatherings.
            </p>

            <div className="pt-2 text-xs text-stone-400">
              <p>Designed with love for home cooks of every generation.</p>
            </div>
          </div>

          {/* Quick Categories */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-serif text-lg font-bold text-amber-200">
              Popular Categories
            </h4>
            <ul className="space-y-2 text-sm text-stone-300">
              {CATEGORIES.slice(0, 6).map(cat => (
                <li key={cat}>
                  <button
                    onClick={() => {
                      if (cat === 'All') onNavigateHome();
                      else onSelectCategory(cat);
                    }}
                    className="hover:text-amber-300 transition-colors text-left"
                  >
                    {cat === 'All' ? 'All Recipes' : cat}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="font-serif text-lg font-bold text-amber-200 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-400" />
              <span>Free Sunday Recipe Dispatch</span>
            </h4>
            <p className="text-stone-300 text-xs leading-relaxed">
              Never miss a new casserole, weeknight dinner, or warm holiday dessert. Straight to your inbox every Sunday.
            </p>

            {subscribed ? (
              <div className="p-3 bg-amber-900/60 border border-amber-600 rounded-xl text-amber-200 text-xs font-bold">
                ✓ You're on the Sunday Dinner list! Happy cooking!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Your email address"
                  className="w-full bg-stone-900/90 text-stone-100 placeholder-stone-400 border border-amber-800/80 rounded-xl px-3.5 py-2.5 text-xs font-medium focus:outline-hidden focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-600 hover:bg-amber-500 text-stone-950 font-extrabold rounded-xl text-xs transition-colors shadow-xs"
                >
                  Join 45,000+ Recipe Lovers
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Middle Footer: Technical & SEO utilities */}
        <div className="py-6 flex flex-wrap items-center justify-between gap-4 border-b border-amber-900/40 text-xs text-stone-400">
          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onNavigateAbout}
              className="hover:text-amber-200 transition-colors"
            >
              About Sweet Pea
            </button>
            <span>•</span>
            <button
              onClick={onNavigateContact}
              className="hover:text-amber-200 transition-colors"
            >
              Contact &amp; FAQ
            </button>
            <span>•</span>
            {/* Sitemap Modal Trigger */}
            <button
              onClick={() => setSitemapOpen(true)}
              className="flex items-center space-x-1 hover:text-amber-300 text-amber-400 font-semibold transition-colors"
            >
              <FileCode className="w-3.5 h-3.5" />
              <span>View XML Sitemap</span>
            </button>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center space-x-1 text-stone-400 hover:text-amber-200 text-xs transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom Disclosures & Copyright */}
        <div className="pt-6 text-[11px] text-stone-400/80 space-y-2 leading-relaxed">
          <p>
            <strong>Disclosure:</strong> Sweet Pea's Kitchen is supported by reader advertising and affiliate partnerships. When you view ads or purchase through our links, we may earn an affiliate commission at no extra cost to you.
          </p>
          <p>
            <strong>Nutrition Disclaimer:</strong> Nutritional values provided on Sweet Pea's Kitchen are estimates calculated via online nutritional software and should be used as a helpful guideline.
          </p>
          <div className="pt-3 flex flex-wrap items-center justify-between gap-2 border-t border-amber-950 text-stone-400">
            <span>&copy; {new Date().getFullYear()} Sweet Pea's Kitchen. All rights reserved.</span>
            <span>Inspired by the original Sweet Pea's Kitchen home cooking tradition.</span>
          </div>
        </div>
      </div>

      <XmlSitemapModal isOpen={sitemapOpen} onClose={() => setSitemapOpen(false)} />
    </footer>
  );
};
