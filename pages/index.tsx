import MainPage from 'pages/mainPage/MainPage';
import { People } from 'src/types';

const ALL_PEOPLE_URL = 'https://swapi.dev/api/people/';

export async function getServerSideProps(context: {
  query: { inputValue?: string; page?: string };
}) {
  const { inputValue = '', page = '1' } = context.query;
  try {
    const response = await fetch(`${ALL_PEOPLE_URL}?search=${inputValue}&page=${page}`);
    const data: People = await response.json();

    return {
      props: {
        people: data,
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      props: {
        people: [],
      },
    };
  }
}

type HomePageTypes = {
  people: People;
};
export default function HomePage({ people }: HomePageTypes) {
  return <MainPage people={people} />;
}
