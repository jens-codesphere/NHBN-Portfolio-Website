import React from 'react';

const LoadingScreen: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-midnight z-50 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-sapphire border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-white font-body text-lg">Loading resources...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;