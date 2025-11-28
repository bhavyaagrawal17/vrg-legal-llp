// src/components/TeamsPage.jsx
import React from 'react';

const team = [
  {
    name: 'Vaibhav Gupta',
    title: 'Managing Partner - Taxation & White collar crimes',
    img: '#', // Replace with actual image URL
    
  },
   {
    name: 'Mohit Gupta',
    title: 'GST - Compliance & Advisory',
    img: '#', // Replace with actual image URL
   
  },
  {
    name: 'Shriya Agrawal',
    title: 'Team Lead - Family Disputes',
    img: '#', // Replace with actual image URL
    
  },
  {
    name: 'D. S. Bhangari',
    title: 'Team Lead - Family Disputes',
    img: '#', // Replace with actual image URL
    
  },
  {
    name: 'Kush Gupta',
    title: 'Senior Consultant - ADR',
    img: '#', // Replace with actual image URL
    
  },
  {
    name: 'Apoorv Bansal',
    title: 'Taxation - Policy & Compliance',
    img: '#', // Replace with actual image URL
   
  },
   
  {
    name: 'Aakriti Bhandari',
    title: 'Team Lead - Real Estate & Consumers Law',
    img: '#', // Replace with actual image URL
  
  },
  {
    name: 'S.K. Sen',
    title: 'Senior Consultant - Disputes',
    img: '#', // Replace with actual image URL
  
  },
 
  {
    name: 'Madhur Soni',
    title: 'Jabalpur High Court @MP',
    img: '#', // Replace with actual image URL
   
  },
  
];

// LinkedIn Icon Component


function TeamCard({ member }) {
  return (
    <article
      className={[
        'group w-full overflow-hidden rounded-2xl',
        'bg-[#0D234A] text-white',
        'shadow-lg ring-1 ring-black/5',
        // Professional, subtle hover effects
        'transition-transform duration-300 ease-out',
        'hover:-translate-y-1 hover:shadow-2xl',
        // Fixed height for consistency
        'h-full flex flex-col',
      ].join(' ')}
    >
      {/* Photo: square, upper portion */}
      <div className="relative overflow-hidden">
        <img
          src={member.img}
          alt={`Portrait of ${member.name}`}
          className="block w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-[1.02]"
          loading="lazy"
        />
      </div>

      {/* Text block */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex items-start justify-between h-full">
          <div className="flex-1">
            <h3 className="text-lg font-semibold leading-tight">
              {member.name}
            </h3>
            <p className="mt-1 text-sm text-white/80">
              {member.title}
            </p>
          </div>
          
          {/* LinkedIn Link */}
          
        </div>
      </div>
    </article>
  );
}

export default function TeamsPage() {
  // Split into two rows: first 4 for col-span 4, last 3 for col-span 3
  const firstRow = team.slice(0, 4); // First 4 members
  const secondRow = team.slice(4); // Last 3 members (indices 4-6)

  return (
    <main className="font-sans bg-white min-h-screen">
      {/* Page heading, top-left */}
      <section id='team'>
      <header className="px-6 pt-8">
        <h1 className="text-3xl font-semibold text-slate-900 text-center">
          Meet our team!
        </h1>
      </header>

      {/* Central container without background box */}
      <section className="mx-auto mt-6 max-w-6xl px-6 py-10">
        
        {/* First Row: 4 cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {firstRow.map((m) => (
            <div key={m.name} className="w-full max-w-sm mx-auto">
              <TeamCard member={m} />
            </div>
          ))}
        </div>

        {/* Second Row: 5 cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 justify-items-center">
          {secondRow.map((m) => (
            <div key={m.name} className="w-full max-w-sm mx-auto">
              <TeamCard member={m} />
            </div>
          ))}
        </div>

      </section>
      </section>
    </main>
  );
}