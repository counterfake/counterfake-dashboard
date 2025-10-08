export function formatDateForUserLocale(dateString: string): string | null {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);
    // Format according to the user's browser language settings
    return date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch (error) {
    return null; // Return original string in case of error
  }
}

export function calculateDaysSince(dateString: string): number | null {
  if (!dateString) return null;

  try {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  } catch (error) {
    return null; // Return null in case of error
  }
}
