export const getErrorMessage = (error: any): string => {
  // Axios error
  if (error?.response) {
    const data = error.response.data;

    // Common API patterns
    if (typeof data === 'string') return data;

    if (data?.message) return data.message;

    if (data?.error) return data.error;

    // Validation errors (object)
    if (data?.errors && typeof data.errors === 'object') {
      const firstKey = Object.keys(data.errors)[0];
      return data.errors[firstKey]?.[0] || 'Validation error';
    }
  }

  // Fallbacks
  if (error?.message) return error.message;

  return 'Something went wrong. Please try again.';
};
