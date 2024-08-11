import MainPage from 'pages/mainPage/MainPage';
import { People } from 'src/types';
import { GetServerSideProps } from 'next';

const ALL_PEOPLE_URL = 'https://swapi.dev/api/people/';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const query = context.query.search;
  const page = context.query.page || '1';
  const searchValue = Array.isArray(query) ? query.join(' ') : query || '';
  let peopleResults = null;

  try {
    const response = await fetch(
      `${ALL_PEOPLE_URL}?search=${encodeURIComponent(searchValue)}&page=${page}`,
    );
    const data: People = await response.json();
    peopleResults = data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }

  return {
    props: {
      peopleResults,
      searchValue,
    },
  };
};

type HomePageTypes = {
  peopleResults: People | null;
};

export default function HomePage({ peopleResults }: HomePageTypes) {
  return <MainPage people={peopleResults} />;
}
