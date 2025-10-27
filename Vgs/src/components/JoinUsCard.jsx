import React from 'react';

const JoinUsCard = ({ icon, title, description, buttonText, variant, onApply }) => {
  const isIntern = variant === 'intern';
  
  return (
    <div className={`relative p-8 rounded-2xl shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
      isIntern 
        ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200' 
        : 'bg-gradient-to-br from-amber-50 to-amber-100 border-2 border-amber-200'
    }`}>
      {/* Icon */}
      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-6 ${
        isIntern 
          ? 'bg-gradient-to-br from-blue-400 to-blue-600 text-white' 
          : 'bg-gradient-to-br from-amber-400 to-amber-600 text-slate-900'
      }`}>
        {icon}
      </div>
      
      {/* Content */}
      <h3 className={`text-2xl font-bold mb-4 ${
        isIntern ? 'text-blue-900' : 'text-amber-900'
      }`}>
        {title}
      </h3>
      
      <p className={`text-lg mb-8 leading-relaxed ${
        isIntern ? 'text-blue-700' : 'text-amber-700'
      }`}>
        {description}
      </p>
      
      {/* Button */}
      <button
        onClick={onApply}
        className={`w-full py-4 px-6 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 ${
          isIntern
            ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:from-blue-500 hover:to-blue-600'
            : 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-500 hover:to-amber-600'
        }`}
      >
        {buttonText}
      </button>
      
      {/* Decorative elements */}
      <div className={`absolute top-4 right-4 w-8 h-8 rounded-full opacity-20 ${
        isIntern ? 'bg-blue-400' : 'bg-amber-400'
      }`} />
      <div className={`absolute bottom-4 left-4 w-4 h-4 rounded-full opacity-30 ${
        isIntern ? 'bg-blue-400' : 'bg-amber-400'
      }`} />
    </div>
  );
};

export { JoinUsCard };