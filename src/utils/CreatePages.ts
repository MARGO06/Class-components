export const createPages = (count: number) => {
  const countPage = Math.ceil(count / 10);
  const pages = Array.from({ length: countPage }, (_, i) => i + 1);
  return pages;
};
