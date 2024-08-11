import React, { useEffect, useState } from 'react';
import style from 'src/details/InformationPage.module.scss';
import { Person } from 'src/types';
import { Cart } from 'src/components/cart/Cart';
import { Loader } from 'src/components/loader/LoaderInfo';

type InformationPageProps = {
  person: Person;
};

const InformationPage: React.FC<InformationPageProps> = ({ person }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (person) {
      setIsLoading(false);
    }
  }, [person]);

  let content;

  if (isLoading) {
    content = <Loader />;
  } else if (person) {
    content = (
      <div className={style.information} data-testid="information">
        <Cart key={person.url} person={person} />
      </div>
    );
  } else {
    content = <p>No people found.</p>;
  }

  return (
    <div className={style.wrapper} data-testid="wrapper">
      {content}
    </div>
  );
};

export default InformationPage;
