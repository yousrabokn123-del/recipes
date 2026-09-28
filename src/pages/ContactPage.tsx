import React, { useState } from 'react';
import { Mail, MessageCircle, Send, CheckCircle, HelpCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { AdBanner } from '../components/AdBanner';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Recipe Question');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setName('');
      setEmail('');
      setMessage('');
    }, 1500);
  };

  const faqs = [
    {
      q: 'Can I substitute ingredients in your casseroles?',
      a: 'Absolutely! Most of our casseroles are very forgiving. For instance, in our Million Dollar Spaghetti or Amish Country Casserole, ground turkey or pork sausage can readily replace ground beef, and Greek yogurt can stand in for sour cream in a 1:1 ratio.'
    },
    {
      q: 'How do I freeze casseroles for later?',
      a: 'To freeze before baking, assemble in a disposable aluminum foil pan or freezer-safe dish, cover tightly with plastic wrap and then aluminum foil. Freeze for up to 3 months. Thaw in the refrigerator overnight before baking as directed (add 10-15 minutes if slightly chilled).'
    },
    {
      q: 'How do I print a recipe without all the ads?',
      a: 'Simply click the "Print Recipe" button located at the top and bottom of each recipe card! Our website automatically optimizes the layout to print only the recipe card, instructions, and ingredients on crisp white paper without any banners or sidebars.'
    },
    {
      q: 'Can I request a specific homestyle recipe?',
      a: 'Yes, please do! Send us your favorite dish or childhood memory using the contact form on this page. Sweet Pea reviews recipe requests weekly for upcoming kitchen testing.'
    }
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 sm:py-12 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto">
        <span className="text-xs uppercase font-extrabold tracking-widest text-amber-800 bg-amber-100 px-3.5 py-1.5 rounded-full border border-amber-300">
          We'd Love To Hear From You
        </span>
        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-[#2a170b] mt-4 mb-4">
          Contact Sweet Pea's Kitchen
        </h1>
        <p className="text-stone-700 text-base sm:text-lg leading-relaxed">
          Questions about baking time? Want to request a retro casserole? Reach out and we'll gladly assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Contact Form */}
        <div className="lg:col-span-7 bg-white border-2 border-stone-200/90 rounded-3xl p-6 sm:p-8 shadow-xs">
          <h2 className="font-serif text-2xl font-bold text-stone-900 mb-2 flex items-center gap-2">
            <Mail className="w-6 h-6 text-amber-800" />
            <span>Send a Message</span>
          </h2>
          <p className="text-stone-600 text-sm mb-6">
            Fill out the form below and we will get back to your email within 24-48 business hours.
          </p>

          {submitted ? (
            <div className="p-8 bg-green-50 border-2 border-green-300 rounded-2xl text-center space-y-3">
              <CheckCircle className="w-12 h-12 text-green-700 mx-auto" />
              <h3 className="font-serif text-2xl font-bold text-green-900">Message Received!</h3>
              <p className="text-green-800 text-sm">
                Thank you for reaching out to Sweet Pea's Kitchen. We will respond to your inquiry shortly!
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-5 py-2 bg-green-800 text-white font-bold rounded-xl text-sm"
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Mary Higgins"
                  className="w-full bg-white border-2 border-stone-300 focus:border-amber-700 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. mary@example.com"
                  className="w-full bg-white border-2 border-stone-300 focus:border-amber-700 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-hidden font-medium"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Topic / Subject
                </label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-white border-2 border-stone-300 focus:border-amber-700 rounded-xl px-4 py-2.5 text-stone-900 text-sm focus:outline-hidden font-semibold"
                >
                  <option value="Recipe Question">Recipe Question or Substitution</option>
                  <option value="Recipe Request">Request a Family Heritage Recipe</option>
                  <option value="Feedback">Website Feedback or Bug Report</option>
                  <option value="Advertising">Advertising or Partnership Inquiries</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write your note, question, or request here..."
                  className="w-full bg-white border-2 border-stone-300 focus:border-amber-700 rounded-xl p-4 text-stone-900 text-sm focus:outline-hidden font-medium"
                />
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center space-x-2 py-3.5 bg-amber-800 hover:bg-amber-900 text-white font-bold rounded-2xl text-base shadow-sm transition-all"
              >
                <Send className="w-5 h-5" />
                <span>Send Message to Sweet Pea</span>
              </button>
            </form>
          )}
        </div>

        {/* Sidebar with FAQ & Ad */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white border-2 border-stone-200/90 rounded-3xl p-6 shadow-xs">
            <h3 className="font-serif text-xl font-bold text-stone-900 mb-4 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-amber-800" />
              <span>Frequently Asked Questions</span>
            </h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="border border-stone-200 rounded-2xl overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full text-left p-3.5 bg-amber-50/50 hover:bg-amber-100/50 flex items-center justify-between text-xs sm:text-sm font-bold text-stone-800 transition-colors"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 shrink-0" /> : <ChevronDown className="w-4 h-4 shrink-0" />}
                    </button>
                    {isOpen && (
                      <div className="p-3.5 bg-white text-xs sm:text-sm text-stone-600 leading-relaxed border-t border-stone-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Ad Placement: 300x250 */}
          <div className="bg-white border-2 border-stone-200/90 rounded-2xl p-4 flex flex-col items-center shadow-xs">
            <AdBanner slot="sidebar-300x250" />
          </div>
        </div>
      </div>
    </div>
  );
};
