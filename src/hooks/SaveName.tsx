import { useEffect, useState } from 'react';

export const useSaveName = (): [string, React.Dispatch<React.SetStateAction<string>>] => {
  const [inputValue, setInputValue] = useState(localStorage.getItem('searchName') ?? '');

  useEffect(() => {
    localStorage.setItem('searchName', inputValue);
  }, [inputValue]);

  return [inputValue, setInputValue];
};
