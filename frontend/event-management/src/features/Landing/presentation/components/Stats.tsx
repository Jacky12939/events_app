import React from 'react';

export const Stats: React.FC = () => {
  const stats = [
    { value: '10+', label: 'Événements créés' },
    { value: '12+', label: 'Participants actifs' },
    { value: '20+', label: 'Organisateurs' },
    { value: '98%', label: 'Satisfaction' },
  ];

  return (
    <section className="py-10 sm:py-14 border-y border-gray-100 dark:border-gray-900 bg-gray-50/50 dark:bg-gray-950/20 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* GRILLE ADAPTATIVE : 1 col sur mini mobile -> 2 cols sur mobile standard -> 4 cols sur PC */}
        <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4 sm:gap-8 text-center">
          {stats.map((stat, idx) => (
            <div key={idx} className="flex flex-col items-center space-y-1.5 sm:space-y-2">
              
              {/* CHIFFRE EN GRADIENT */}
              <div className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-[#7c3aed] dark:from-rose-400 dark:to-purple-400 select-none">
                {stat.value}
              </div>
              
              {/* LABEL TEXTUEL */}
              <div className="text-xs sm:text-sm font-bold text-gray-500 dark:text-slate-400 uppercase tracking-wider max-w-[180px] sm:max-w-none px-2">
                {stat.label}
              </div>
              
            </div>
          ))}
        </div>
        
      </div>
    </section>
  );
};