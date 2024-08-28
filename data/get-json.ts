import { promises as fs } from 'fs';

export const getJson = async (url: string) => {
  const file = await fs.readFile(process.cwd() + url, 'utf8');
  const data = JSON.parse(file);
  // console.log(data);
  return data;
};
