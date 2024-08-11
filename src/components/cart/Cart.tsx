import React, { useContext } from 'react';
import { Person } from 'src/types';
import closeIcon from 'src/assets/close_button.png';
import { PeopleContext } from 'src/hooks/ContextHook';
import style from 'src/details/InformationPage.module.scss';
import { useTheme } from 'src/hooks/ThemeHook';
import Image from 'next/image';
import { useRouter } from 'next/router';

type CartProps = {
  person: Person;
};

export const Cart: React.FC<CartProps> = ({ person }) => {
  const { setIsActive, setShowInformationPage } = useContext(PeopleContext);
  const { isDark } = useTheme();
  const router = useRouter();
  const { query } = router;
  const searchName = query.search as string;

  const handleCloseClick = () => {
    setIsActive(false);
    setShowInformationPage(false);
    router.push(`/?search=${searchName}&page=${query.page}`);
  };

  return (
    <>
      <div
        className={`${style.dates} ${isDark ? '' : style.dark}`}
        key={person.url}
        data-testid="person-card"
      >
        <h2 className={style.name}>Name: {person.name}</h2>
        <p>Birthday: {person.birth_year}</p>
        <p>Created: {person.created}</p>
        <p>Edited: {person.edited}</p>
        <p>Eye color: {person.eye_color}</p>
        <p>Gender: {person.gender}</p>
        <p>Hair color: {person.hair_color}</p>
        <p>Height: {person.height}</p>
        <p>Home world: {person.homeworld}</p>
        <p>Weight: {person.mass}</p>
        <p>Skin color: {person.skin_color}</p>
      </div>
      <div
        className={style.button_close}
        onClick={handleCloseClick}
        data-testid="button close"
        onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            handleCloseClick();
          }
        }}
        role="button"
        tabIndex={0}
      >
        <Image src={closeIcon} className={style.button_close} alt="close_image" />
      </div>
    </>
  );
};
