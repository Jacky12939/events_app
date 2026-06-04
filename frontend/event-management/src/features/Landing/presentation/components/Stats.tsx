import React from 'react';

export const Stats: React.FC = () => {
  const stats = [
    { value: '500+', label: 'Événements créés' },
    { value: '12K+', label: 'Participants actifs' },
    { value: '200+', label: 'Organisateurs' },
    { value: '98%', label: 'Satisfaction' },
  ];

  return (
    <section className="py-12 border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="space-y-2">
              <div className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-[#7c3aed] dark:from-rose-400 dark:to-purple-500">
                {stat.value}
              </div>
              <div className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};