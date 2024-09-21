export const getAllFlags = async () => {
  const response = await fetch('https://flagcdn.com/en/codes.json');
  const data = await response.json();
  return data;
};
