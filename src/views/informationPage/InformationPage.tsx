import React, { useCallback, useContext, useEffect, useState } from 'react';
import style from 'src/views/informationPage/InformationPage.module.scss';
import { Person, api } from 'src/apiRequests/GetPeople';
import { useLocation, useNavigate } from 'react-router-dom';
import closeIcon from 'src/assets/close_button.png';
import { PeopleContext } from 'src/hooks/ContextHook';
import { handleSearchParams } from 'src/utils/SearchParams';
import { getName } from 'src/utils/GetName';

export const InformationPage: React.FC = () => {
  const [information, setInformation] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const navigation = useNavigate();
  const { setIsActive } = useContext(PeopleContext);

  const handlePerson = useCallback(async () => {
    const name = getName(location.pathname);
    const personResult = await api.getPerson(name);
    setInformation(personResult.results);
    setIsLoading(false);
  }, [location.pathname]);

  const handleCloseClick = () => {
    const { searchName, page } = handleSearchParams(location.search);
    setIsActive(false);
    navigation(`/RS-School_React/?search=${searchName}&page=${page}`);
  };

  useEffect(() => {
    handlePerson();
  }, [handlePerson]);

  return (
    <div className={style.wrapper}>
      {isLoading ? (
        <div className={style.container}>
          <div className={style.loading} />
        </div>
      ) : (
        <div className={style.information}>
          {information.map(
            ({
              name,
              birth_year,
              created,
              edited,
              eye_color,
              gender,
              hair_color,
              height,
              homeworld,
              mass,
              skin_color,
              url,
            }) => (
              <div className={style.dates} key={url}>
                <h2 className={style.name}>Name: {name}</h2>
                <p>Birthday: {birth_year}</p>
                <p>Created: {created}</p>
                <p>Edited: {edited}</p>
                <p>Eye color: {eye_color}</p>
                <p>Gender: {gender}</p>
                <p>Hair color: {hair_color}</p>
                <p>Height: {height}</p>
                <p>Home world: {homeworld}</p>
                <p>Weight: {mass}</p>
                <p>Skin color: {skin_color}</p>
              </div>
            ),
          )}
          <div
            className={style.button_close}
            onClick={handleCloseClick}
            onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
              if (e.key === 'Enter' || e.key === ' ') {
                handleCloseClick();
              }
            }}
            role="button"
            tabIndex={0}
          >
            <img src={closeIcon} className={style.button_close} alt="close_image" />
          </div>
        </div>
      )}
    </div>
  );
};
