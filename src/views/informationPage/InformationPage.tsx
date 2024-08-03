/* import React from 'react';
import style from 'src/views/informationPage/InformationPage.module.scss';
import { People, Person } from 'src/types';
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
        {peopleData.results.map((person: Person) => (
          <Cart key={person.url} person={person} />
        ))}
      </div>
    );
  }

  return (
    <div className={style.wrapper} data-testid="wrapper">
      {content}
    </div>
  );
};
*/
