/**
 * Creates the hash of custom length consisting of A-Za-z0-9 characterss
 * @param len {number} – the length of returning string
 */

const hastString = (len: number): string => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;

  for (let i = 0; i < len; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
};

export default hastString;
