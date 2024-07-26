import React, { createContext, ReactNode, useState, useMemo, useCallback } from 'react';

export type ThemeContextType = {
  isDark: boolean;
  changeTheme: () => void;
};

export const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isDark, setIsDark] = useState(true);

  const changeTheme = useCallback(() => {
    setIsDark((prevTheme) => !prevTheme);
  }, []);

  const contextTheme = useMemo(() => {
    return { isDark, changeTheme };
  }, [isDark, changeTheme]);

  return <ThemeContext.Provider value={contextTheme}>{children}</ThemeContext.Provider>;
};
