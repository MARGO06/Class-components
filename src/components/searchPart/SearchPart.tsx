import { useState, useContext, useEffect } from 'react';
import { Button } from 'src/components/button/Button';
import { useRouter } from 'next/router';
import { Input } from 'src/components/input/Input';
import { PeopleContext } from 'src/hooks/ContextHook';
import style from 'src/components/searchPart/SearchPart.module.scss';
import { useTheme } from 'src/hooks/ThemeHook';

type SearchPartProps = {
  onSearchClick: (searchValue: string) => void;
};

export const SearchPart: React.FC<SearchPartProps> = ({ onSearchClick }) => {
  const [inputValue, setInputValue] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState('');
  const { isDark, changeTheme } = useTheme();
  const { isActive } = useContext(PeopleContext);
  const router = useRouter();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNameSave = () => {
    if (inputValue.endsWith(' ')) {
      setErrorMessage('Please remove the space at the end of the line');
    } else {
      onSearchClick(inputValue);
      router.push(`/?search=${encodeURIComponent(inputValue)}&page=1`);
    }
  };

  useEffect(() => {
    const { query } = router;
    const searchName = query.search as string;
    if (searchName) {
      setInputValue(searchName);
    }
  }, [router]);

  return (
    <section
      className={`${style.searchPart} ${isActive ? style.active : ''} ${isDark ? '' : style.dark}`}
    >
      <Button title="Theme" className={style.button_theme} onClick={changeTheme} />
      <Input
        className={style.input_main}
        placeholder="name"
        value={inputValue}
        onChange={handleNameChange}
      />
      <Button title="Search" className={style.button_search} onClick={handleNameSave} />
      {errorMessage && <div className={style.error_input}>{errorMessage}</div>}
    </section>
  );
};
