import { useState, useContext, useEffect } from 'react';
import { Button } from 'src/components/button/Button';
import { Input } from 'src/components/input/Input';
import { PeopleContext } from 'src/hooks/ContextHook';
import style from 'src/components/searchPart/SearchPart.module.scss';
import { useSaveName } from 'src/hooks/SaveName';
import { useNavigate } from 'react-router-dom';

export const SearchPart: React.FC = () => {
  const [inputValue, setInputValue] = useSaveName();
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const { handleSearch, isActive } = useContext(PeopleContext);
  const navigation = useNavigate();

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleNameSave = () => {
    if (inputValue.endsWith(' ')) {
      setErrorMessage('Please remove the space at the end of the line');
    } else {
      handleSearch(inputValue);
      navigation(`?search=${inputValue}&page=1`);
    }
  };

  const handleError = () => setHasError(true);

  useEffect(() => {
    const searchName = localStorage.getItem('searchName');
    if (searchName) {
      setInputValue(searchName);
      handleSearch(searchName);
    }
  }, [setInputValue, handleSearch]);

  if (hasError) throw new Error('Mistake');

  return (
    <section className={`${style.searchPart} ${isActive ? style.active : ''}`}>
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
