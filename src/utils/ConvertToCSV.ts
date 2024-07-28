import { Person } from 'src/types';

export const convertToCSV = (data: Person[]) => {
  if (data.length === 0) return '';

  const header = `${Object.keys(data[0]).join(',')}\n`;
  const information = data.map((item) => Object.values(item).join(',')).join('\n');
  const wholeInfo = header + information;

  const blob = new Blob([wholeInfo], { type: 'text/csv;charset=utf-8;' });
  return URL.createObjectURL(blob);
};
