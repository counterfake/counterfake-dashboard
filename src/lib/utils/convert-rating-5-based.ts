/**
 * Convert rating from 100-based scale to 5-based scale
 * @param rating - Rating value (0-100)
 * @returns Rating value in 5-based scale
 */
export const convertRatingTo5Based = (rating: number) => {
  if (!rating || rating < 0 || rating > 100) return null;

  // Convert rating from 100-based scale to 5-based scale
  const convertedRating = rating / 20;

  // Format to always show one decimal place, even for whole numbers
  return parseFloat(convertedRating.toFixed(1));
};

/**
 * Format rating to always show one decimal place, even for whole numbers
 * @param rating - Rating value
 * @returns Rating value formatted to always show one decimal place
 */
export const formatRatingDisplay = (rating: number) => {
  return rating.toFixed(1);
};
