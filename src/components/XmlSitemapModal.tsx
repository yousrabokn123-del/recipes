import React, { useState } from 'react';
import { X, Copy, Check, Download, FileCode } from 'lucide-react';
import { RECIPES_DATA, CATEGORIES } from '../data/recipes';

interface XmlSitemapModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const XmlSitemapModal: React.FC<XmlSitemapModalProps> = ({ isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const baseUrl = 'https://sweetpeaskitchen.com';
  const currentDate = new Date().toISOString().split('T')[0];

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <!-- Core Static Pages -->
  <url>
    <loc>${baseUrl}/</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/about</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/contact</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>

  <!-- Recipe Category Hubs -->
  ${CATEGORIES.filter(c => c !== 'All').map(cat => `
  <url>
    <loc>${baseUrl}/category/${encodeURIComponent(cat.toLowerCase().replace(/\s+/g, '-'))}</loc>
    <lastmod>${currentDate}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.85</priority>
  </url>`).join('')}

  <!-- Individual Recipe Pages with Images -->
  ${RECIPES_DATA.map(recipe => `
  <url>
    <loc>${baseUrl}/recipe/${recipe.slug}</loc>
    <lastmod>${recipe.datePublished || currentDate}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.9</priority>
    <image:image>
      <image:loc>${recipe.image}</image:loc>
      <image:title><![CDATA[${recipe.title}]]></image:title>
      <image:caption><![CDATA[${recipe.tagline}]]></image:caption>
    </image:image>
  </url>`).join('')}
</urlset>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(xmlContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownload = () => {
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'sitemap.xml';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 no-print">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[85vh] flex flex-col shadow-2xl border border-stone-300 overflow-hidden animate-in fade-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 bg-amber-50/70">
          <div className="flex items-center space-x-2 text-stone-900 font-bold">
            <FileCode className="w-5 h-5 text-amber-700" />
            <h2 className="text-lg">XML Sitemap (Google SEO Compliant)</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-stone-500 hover:text-stone-800 hover:bg-stone-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 text-sm">
          <p className="text-stone-600 mb-4 leading-relaxed">
            This XML sitemap indexes all {RECIPES_DATA.length} recipes, category archives, and static pages with standard Google sitemap schema and image extensions. Ready to submit to Google Search Console or deploy directly as <code className="bg-stone-100 px-1.5 py-0.5 rounded font-mono text-xs text-amber-800 font-bold">sitemap.xml</code> on your hosting root.
          </p>

          <div className="relative bg-stone-900 text-stone-100 rounded-xl p-4 font-mono text-xs overflow-x-auto max-h-72 border border-stone-800">
            <pre>{xmlContent}</pre>
          </div>
        </div>

        <div className="px-6 py-4 bg-stone-50 border-t border-stone-200 flex flex-wrap items-center justify-between gap-3">
          <span className="text-xs text-stone-500 font-medium">
            Standard: sitemaps.org 0.9 + Google Image Extension
          </span>
          <div className="flex items-center space-x-3">
            <button
              onClick={handleCopy}
              className="flex items-center space-x-1.5 px-4 py-2 bg-stone-200 hover:bg-stone-300 text-stone-800 rounded-xl text-sm font-semibold transition-colors"
            >
              {copied ? <Check className="w-4 h-4 text-green-700" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? 'Copied XML!' : 'Copy to Clipboard'}</span>
            </button>
            <button
              onClick={handleDownload}
              className="flex items-center space-x-1.5 px-5 py-2 bg-amber-800 hover:bg-amber-900 text-white rounded-xl text-sm font-bold shadow-sm transition-colors"
            >
              <Download className="w-4 h-4" />
              <span>Download sitemap.xml</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
