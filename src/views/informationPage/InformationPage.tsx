import React, { useCallback, useEffect, useState } from 'react';
import style from 'src/views/informationPage/InformationPage.module.scss';
import { Person, People } from 'src/types';
import { useLocation } from 'react-router-dom';
import { getName } from 'src/utils/GetName';
import { Cart } from 'src/components/cart/Cart';
import { useGetPersonQuery } from 'src/store/apiRequests/GetPeople';

export const InformationPage: React.FC = () => {
  const [information, setInformation] = useState<Person[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();

  const name = getName(location.pathname);

  const { data } = useGetPersonQuery(name) as { data: People };

  const handlePerson = useCallback(() => {
    setInformation(data?.results ?? []);
    setIsLoading(false);
  }, [data]);

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
