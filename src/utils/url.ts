/**
 * Slugify a string to be url-compliant
 * @param value string to be slugified
 * @returns string
 */
export const slugify = (value: string) => {
  return value.trim().toLocaleLowerCase().replace(' ', '-');
};
