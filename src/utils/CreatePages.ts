export const createPages = (result: string) => {
  const countPage = Math.ceil(Number(result) / 10);
  const pages = Array.from({ length: countPage }, (_, i) => i + 1);
  return pages;
};
