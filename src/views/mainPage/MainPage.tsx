import { ResultPart } from '../../components/resultPart/ResultPart';
import { SearchPart } from '../../components/searchPart/SearchPart';

export function MainPage() {
  return (
    <div className="wrapper">
      <SearchPart />
      <ResultPart />
    </div>
  );
}
