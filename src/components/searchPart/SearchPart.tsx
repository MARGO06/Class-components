import { useState, useContext, useEffect } from 'react';
import { Button } from 'src/components/button/Button';
import { Input } from 'src/components/input/Input';
import { PeopleContext } from 'src/views/mainPage/MainPage';
import { useSaveName } from 'src/hooks/SaveName';
import style from 'src/components/searchPart/SearchPart.module.scss';

export const SearchPart: React.FC = () => {
  const [inputValue, setInputValue] = useSaveName();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSearch } = useContext(PeopleContext);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;
    setInputValue(newName);
  };

  const handleNameSave = () => {
    if (inputValue.endsWith(' ')) {
      setErrorMessage('Please remove the space at the end of the line');
    } else {
      handleSearch(inputValue);
    }
  };

  const handleError = () => setHasError(true);

  useEffect(() => {
    const searchName = localStorage.getItem('searchName');
    if (searchName) {
      setInputValue(searchName);
      handleSearch(searchName);
    }
  }, [handleSearch, setInputValue]);

  if (hasError) throw new Error('Mistake');

  return (
    <section className={style.searchPart}>
      <Input
        id={style.input_main}
        placeholder="name"
        value={inputValue}
        onChange={handleNameChange}
      />
      <Button title="Search" className={style.button_search} onClick={handleNameSave} />
      <Button title="Error" className={style.button_error} onClick={handleError} />
      {errorMessage && <div className={style.error_input}>{errorMessage}</div>}
    </section>
  );
};
