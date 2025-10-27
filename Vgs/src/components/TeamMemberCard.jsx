import React from 'react';

// Team Member Card component to match the new design
const TeamMemberCard = ({ name, title, image }) => {
  return (
    <div className="relative overflow-hidden rounded-2xl shadow-lg transition-transform duration-300 ease-in-out transform hover:scale-105 group">
      <div
        className="relative w-full h-80 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
        aria-label={`Photo of ${name}`}
      >
        <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 backdrop-blur-sm rounded-t-2xl px-6 py-4 transition-all duration-300 ease-in-out group-hover:bg-opacity-100">
          <h3 className="text-xl font-bold text-gray-900">{name}</h3>
          <p className="text-sm font-medium text-blue-600">{title}</p>
        </div>
      </div>
    </div>
  );
};

// Main App component for the full page
const App = () => {
  const teamMembers = [
    {
      name: "Vaibhav Gupta",
      title: "UI/UX Designer",
      image: "https://placehold.co/400x400/007bff/FFFFFF?text=Ketty+Suni",
    },
    {
      name: "Shriya Agrawal",
      title: "Graphic Designer",
      image: "https://placehold.co/400x400/007bff/FFFFFF?text=Peter+Burke",
    },
    
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-800 p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <p className="text-blue-600 font-semibold uppercase tracking-wide">
            Our Team
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 relative inline-block mt-2">
            Meet Our Professionals
            <span className="absolute -right-3 top-0 h-4 w-4 rounded-full bg-blue-600"></span>
          </h2>
        </div>

        {/* Team Grid Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard
              key={index}
              name={member.name}
              title={member.title}
              image={member.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
