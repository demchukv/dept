export const getAllFlags = async () => {
  // const response = await fetch('https://flagcdn.com/en/codes.json');
  const response2 = await fetch(
    'https://countriesnow.space/api/v0.1/countries/flag/images',
  );
  const data2 = await response2.json();
  const response = await fetch(
    'http://localhost:3000/public/test-data/country-phone-code.json',
  );
  console.log(response);
  // const data = await response.json();
  return data2.data;
};
