import React from 'react';

export const Testimonial: React.FC = () => {
  return (
    <section className="py-16 max-w-4xl mx-auto px-4 text-center">
      <div className="flex justify-center gap-1 text-amber-400 mb-4 text-xl">
        ★★★★★
      </div>
      <blockquote className="text-xl sm:text-2xl font-medium text-gray-900 dark:text-white leading-relaxed max-w-3xl mx-auto">
        "Eventory a transformé la façon dont nous organisons nos conférences. Gain de temps considérable et zéro friction."
      </blockquote>
      <div className="mt-6 flex items-center justify-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#7c3aed] text-white flex items-center justify-center font-bold text-sm">
          ML
        </div>
        <div className="text-left">
          <div className="text-sm font-bold text-gray-900 dark:text-white">Marie Laurent</div>
          <div className="text-xs text-gray-500 dark:text-gray-400">Directrice événementielle, TechForum Paris</div>
        </div>
      </div>
    </section>
  );
};