import { useState, useContext, useEffect } from 'react';
import { Button } from 'src/components/button/Button';
import { Input } from 'src/components/input/Input';
import { PeopleContext } from 'src/hooks/ContextHook';
import { getName } from 'src/utils/GetLocalStorage';
import style from 'src/components/searchPart/SearchPart.module.scss';
import { useSaveName } from 'src/hooks/SaveName';
import { useTheme } from 'src/hooks/ThemeHook';

type SearchPartProps = {
  onSearchClick: (searchValue: string) => void;
};

export const SearchPart: React.FC<SearchPartProps> = ({ onSearchClick }) => {
  const [inputValue, setInputValue] = useSaveName();
  const [errorMessage, setErrorMessage] = useState('');
  const { isDark, changeTheme } = useTheme();
  const { isActive } = useContext(PeopleContext);
  // const navigation = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNameSave = () => {
    if (inputValue.endsWith(' ')) {
      setErrorMessage('Please remove the space at the end of the line');
    } else {
      onSearchClick(inputValue);
      //  navigation(`?search=${inputValue}&page=1`);
    }
  };

  useEffect(() => {
    const searchName = getName('searchName');
    if (searchName) {
      setInputValue(searchName);
      onSearchClick(searchName);
    }
  }, [setInputValue, onSearchClick]);

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
