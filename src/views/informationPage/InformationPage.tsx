import React, { useCallback, useEffect, useState } from 'react';
import style from 'src/views/informationPage/InformationPage.module.scss';
import { Person } from 'src/apiRequests/GetPeople';
import { getPerson } from 'src/apiRequests/SearchPerson';
import { useLocation } from 'react-router-dom';

export const InformationPage: React.FC = () => {
  const [information, setInformation] = useState<Person[]>([]);
  const location = useLocation();

  const handlePerson = useCallback(() => {
    const searchParams = location.pathname.split('/').splice(-2, 1)[0];
    const name = decodeURIComponent(searchParams.split('=')[1]);
    getPerson(name).then((data) => {
      setInformation(data.person);
    });
  }, [location.pathname]);

  useEffect(() => {
    handlePerson();
  }, [handlePerson]);

  return (
    <div className={style.wrapper}>
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
              <p className={style.inform}>Birthday: {birth_year}</p>
              <p className={style.inform}>Created: {created}</p>
              <p className={style.inform}>Edited: {edited}</p>
              <p className={style.inform}>Eye color: {eye_color}</p>
              <p className={style.inform}>Gender: {gender}</p>
              <p className={style.inform}>Hair color: {hair_color}</p>
              <p className={style.inform}>Height: {height}</p>
              <p className={style.inform}>Home world: {homeworld}</p>
              <p className={style.inform}>Weight: {mass}</p>
              <p className={style.inform}>Skin color: {skin_color}</p>
            </div>
          ),
        )}
      </div>
    </div>
  );
};
