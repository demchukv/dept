export const cc_format = (cardNumber: string) => {
  const strippedInput = cardNumber.replace(/\s/g, '');
  // Insert a space after every 4 numbers using regular expressions
  const formattedInput = strippedInput.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formattedInput;
};

export const cc_validate = (cardNumber: string) => {
  const strippedInput = cardNumber.replace(/\s/g, '');
  const regex = /^\d{16}$/;
  console.log(strippedInput);
  return regex.test(strippedInput);
};

export const cc_type = (cardNumber: string) => {
  const cardTypes = {
    visa: /^4/,
    mastercard: /^5[1-5]/,
    amex: /^3[47]/,
    // Add more card types as needed
  };

  return (
    Object.keys(cardTypes).find((type) =>
      cardTypes[type as keyof typeof cardTypes].test(cardNumber),
    ) || 'unknown'
  );
};
