/**
* An array of three numbers representing the red, green, and blue values of a color.
* Each value must be between 0 and 15.
*/
export type RGB = [number, number, number];

/**
 * Convert an RGB array to a full hexadecimal string.
 * @param rgb - An array of three numbers representing the red, green, and blue values of a color.
 * Each value must be between 0 and 15.
 * @returns A hexadecimal color string.
 */
export const rgbToHex = (rgb: RGB): string => {
  return rgb.map(value => {
    const hex = (value * 17).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
};

/**
 * Convert a full hexadecimal color string to an RGB array.
 * @param hex - A hexadecimal color string.
 * @returns An array of three numbers representing the red, green, and blue values of a color. 
 * Each value is between 0 and 15.
 */
export const hexToRgb = (hex: string): RGB | null => {
  if (hex.charAt(0) === '#') {
    hex = hex.substr(1);
  }

  if (hex.length !== 6) {
    return null;
  }

  const red = Math.round(parseInt(hex.substr(0, 2), 16) / 17);
  const green = Math.round(parseInt(hex.substr(2, 2), 16) / 17);
  const blue = Math.round(parseInt(hex.substr(4, 2), 16) / 17);

  if([red, green, blue].some(value => isNaN(value) || value < 0 || value > 15)) {
    return null;
  }

  return [red, green, blue] as RGB;
};