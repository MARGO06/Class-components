export const getPeople = async () => {
  const response = await fetch('https://swapi.dev/api/people/', {
    method: 'GET',
  });
  const people = await response.json();
  console.log(people);
  return people;
};
