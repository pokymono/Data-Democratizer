import React, { createContext, useContext, useState } from 'react';

// Create the context
export const SidebarContext = createContext();

// Create a provider component
export function SidebarProvider({ children }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleSidebar = () => {
    setIsCollapsed(prevState => !prevState);
  };

  // The value that will be provided to consumers of this context
  const value = {
    isCollapsed,
    toggleSidebar
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}

// Custom hook for consuming the context
export function useSidebar() {
  const context = useContext(SidebarContext);
  if (context === undefined) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
}
