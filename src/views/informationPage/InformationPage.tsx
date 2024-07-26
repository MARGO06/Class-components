import React from 'react';
import style from 'src/views/informationPage/InformationPage.module.scss';
import { People } from 'src/types';
import { useLocation } from 'react-router-dom';
import { getName } from 'src/utils/GetName';
import { Cart } from 'src/components/cart/Cart';
import { useGetPersonQuery } from 'src/store/apiRequests/GetPeople';
import { Loader } from 'src/components/loader/LoaderInfo';

export const InformationPage: React.FC = () => {
  const location = useLocation();
  const name = getName(location.pathname);

  const {
    data: peopleData,
    isFetching,
    isSuccess,
  } = useGetPersonQuery(name) as {
    data: People;
    isFetching: boolean;
    isSuccess: boolean;
  };

  let content;

  if (isFetching) {
    content = <Loader />;
  } else if (isSuccess) {
    content = (
      <div className={style.information}>
        {peopleData.results.map((person) => (
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
    );
  }

  return <div className={style.wrapper}>{content}</div>;
};
