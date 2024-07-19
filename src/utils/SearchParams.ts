export const handleSearchParams = (location: string) => {
  const searchParams = new URLSearchParams(location);
  const searchName = searchParams.get('search') || '';
  const page = parseInt(searchParams.get('page') || '1', 10);
  return { searchName, page };
};
