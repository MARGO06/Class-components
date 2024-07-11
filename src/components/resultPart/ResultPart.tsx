import style from 'src/components/resultPart/ResultPart.module.scss';
import { PeopleResult } from 'src/components/peoplePart/PeoplePart';

export const ResultPart: React.FC = () => {
  return (
    <section className={style.people}>
      <PeopleResult />
    </section>
  );
};
