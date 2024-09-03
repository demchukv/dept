export const cc_format_number = (cardNumber: string) => {
  return cardNumber.replace(/\s/g, '');
};
export const cc_format = (cardNumber: string) => {
  const strippedInput = cc_format_number(cardNumber);
  // Insert a space after every 4 numbers using regular expressions
  const formattedInput = strippedInput.replace(/(\d{4})(?=\d)/g, '$1 ');
  return formattedInput;
};

export const cc_validate = (cardNumber: string) => {
  const strippedInput = cc_format_number(cardNumber);
  const regex = /^\d{16}$/;
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
      cardTypes[type as keyof typeof cardTypes].test(
        cc_format_number(cardNumber),
      ),
    ) || 'unknown'
  );
};
