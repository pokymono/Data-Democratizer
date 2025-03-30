import React from 'react';
import { useSelector } from 'react-redux';
import { AlertCircle } from 'lucide-react';

export default function LoadingIndicator() {
  const error = useSelector((state) => state.query.error);

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 dark:bg-red-900/20 dark:border-red-800 dark:text-red-400 px-4 py-3 rounded relative my-4" role="alert">
        <div className="flex items-center">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span className="font-bold">Error</span>
        </div>
        <span className="block sm:inline mt-1">{error}</span>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-900 dark:border dark:border-gray-700 rounded-lg shadow-md p-8 flex flex-col items-center justify-center">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg className="h-16 w-16 text-purple-500" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8"
              strokeLinecap="round"
              className="opacity-20"
            />
            <circle 
              cx="50" 
              cy="50" 
              r="45" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="283"
              strokeDashoffset="80"
              className="animate-spin"
              style={{ transformOrigin: 'center' }}
            />
          </svg>
        </div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-12 w-12 rounded-full bg-white flex items-center justify-center">
            <svg className="h-8 w-8 text-purple-600 animate-pulse" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3.5V2M5.06 5.06L4 4M5.06 13.94L4 15M12 21V22.5M18.94 13.94L20 15M18.94 5.06L20 4M17 8L15.5 7.5M17 12L19 12M14 14.5L11.5 17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2"/>
            </svg>
          </div>
        </div>
      </div>
      
      <h3 className="mt-6 text-xl font-semibold dark:text-white">Processing Your Query</h3>
      <p className="mt-2 text-center text-gray-500 dark:text-gray-400 max-w-md">
        Our AI is analyzing your request and preparing visualizations with relevant business insights...
      </p>
      
      <div className="mt-6 space-y-2 w-full max-w-md">
        <div className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div className="h-full bg-purple-600 rounded-full animate-progress" style={{ width: '0%', animation: 'progress 2s ease-in-out forwards' }}></div>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
          <span>Analyzing data</span>
          <span>Generating visualizations</span>
          <span>Preparing insights</span>
        </div>
      </div>
    </div>
  );
}

// Add this to your CSS file
// @keyframes progress {
//   0% { width: 0%; }
//   50% { width: 70%; }
//   100% { width: 100%; }
// }
