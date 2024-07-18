import React, { useCallback, useEffect, useState } from 'react';
import style from 'src/views/informationPage/InformationPage.module.scss';
import { Person, api } from 'src/apiRequests/GetPeople';
import { useLocation } from 'react-router-dom';
import { getName } from 'src/utils/GetName';
import { Cart } from 'src/components/cart/Cart';

export const InformationPage: React.FC = () => {
  const [information, setInformation] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const handlePerson = useCallback(async () => {
    const name = getName(location.pathname);
    const personResult = await api.getPerson(name);
    setInformation(personResult.results);
    setIsLoading(false);
  }, [location.pathname]);

  useEffect(() => {
    handlePerson();
  }, [handlePerson]);

  return (
    <div className={style.wrapper}>
      {isLoading ? (
        <div className={style.container}>
          <div className={style.loading} data-testid="loading" />
        </div>
      ) : (
        <div className={style.information}>
          {information.map((person) => (
            <Cart
              key={person.url}
              name={person.name}
              birth_year={person.birth_year}
              created={person.created}
              edited={person.edited}
              eye_color={person.eye_color}
              gender={person.gender}
              hair_color={person.hair_color}
              height={person.height}
              homeworld={person.homeworld}
              mass={person.mass}
              skin_color={person.skin_color}
              url={person.url}
            />
          ))}
        </div>
      )}
    </div>
  );
};
