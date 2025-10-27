// src/components/TeamsPage.jsx
import React from 'react';

const team = [
  {
    name: 'Vaibhav Gupta',
    title: 'Managing Partner',
    img: '#', // Replace with actual image URL
    linkedinUrl: 'https://www.linkedin.com/in/advocatevaibhavgupta/',
  },
  
  // First row members (total 4 for the first row)
  {
    name: 'S.K. Sen',
    title: 'Senior Consultant - Disputes',
    img: '#', // Replace with actual image URL
    linkedinUrl: 'https://www.linkedin.com/in/rajesh-kumar-lawyer/',
  },
  {
    name: 'Kush Gupta',
    title: 'Senior Consultant - ADR',
    img: '#', // Replace with actual image URL
    linkedinUrl: 'https://www.linkedin.com/in/priya-singh-legal/',
  },
  {
    name: 'Shriya Agrawal',
    title: 'Team Lead - Family Disputes',
    img: '#', // Replace with actual image URL
    linkedinUrl: 'https://www.linkedin.com/in/shriya-agrawal-435680203/',
  },

  // Second row members (total 3 for the second row)
  {
    name: 'Apoorv Bansal',
    title: 'Taxation - Policy & Compliance',
    img: '#', // Replace with actual image URL
    linkedinUrl: 'https://www.linkedin.com/in/amit-patel-advocate/',
  },
  {
    name: 'Aakriti Bhandari',
    title: 'Team Lead - Real Estate & Consumers Law',
    img: '#', // Replace with actual image URL
    linkedinUrl: 'https://www.linkedin.com/in/shriya-agrawal-435680203/',
  },
  {
    name: 'Madhur Soni',
    title: 'Jabalpur High Court @MP',
    img: '#', // Replace with actual image URL
    linkedinUrl: 'https://www.linkedin.com/in/neha-sharma-law/',
  },
  
];

// LinkedIn Icon Component
function LinkedInIcon({ className }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M4.98 3.5A2.5 2.5 0 1 0 5 8.5a2.5 2.5 0 0 0-.02-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.77-1.95 4.04 0 4.78 2.66 4.78 6.12V21H18v-5.33c0-1.27-.02-2.9-1.77-2.9-1.77 0-2.04 1.38-2.04 2.8V21h-4V9Z" />
    </svg>
  );
}

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
          <a
            href={member.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={[
              'ml-3 p-2 rounded-lg',
              'bg-white/10 text-white',
              'hover:bg-white/20 hover:text-white',
              'transition-colors duration-200',
              'focus:outline-none focus:ring-2 focus:ring-white/50',
              'self-start',
            ].join(' ')}
            aria-label={`View ${member.name}'s LinkedIn profile`}
          >
            <LinkedInIcon className="h-5 w-5" />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function TeamsPage() {
  // Split into two rows: first 4 for col-span 4, last 3 for col-span 3
  const firstRow = team.slice(0, 4); // First 4 members
  const secondRow = team.slice(4, 7); // Last 3 members (indices 4-6)

  return (
    <main className="font-sans bg-white min-h-screen">
      {/* Page heading, top-left */}
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

        {/* Second Row: 3 cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
          {secondRow.map((m) => (
            <div key={m.name} className="w-full max-w-sm mx-auto">
              <TeamCard member={m} />
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}