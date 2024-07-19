export const getName = (location: string) => {
  const searchParams = location.split('/').splice(-2, 1)[0];
  const name = decodeURIComponent(searchParams.split('=')[1]);
  return name;
};
