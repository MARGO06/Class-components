import { useContext } from 'react';
import { ThemeContext, ThemeContextType } from 'src/hooks/ThemeContext';

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('you need to use useTheme hook  within a ThemeProvider');
  }
  return context;
};
