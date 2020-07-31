/**
 * Compose strings of classes into one
 *
 * @param {string} args – array of strings of one or many classes
 * @returns {string|null} – string of nicely concatenated classes
 */

const composeClasses = (...args: string[]) => {
  const classes = args.join(' ').trim().replace(/ false | +/g, ' ');
  return classes || null;
};
export default composeClasses;
