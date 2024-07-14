import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';
import { useContext } from 'react';
import { PeopleContext } from 'src/hooks/ContextHook';

export const ResultPart: React.FC = () => {
  const { isActive } = useContext(PeopleContext);
  return (
    <section className={`${style.people} ${isActive ? style.active : ''}`}>
      <PeopleResult />
    </section>
  );
};
