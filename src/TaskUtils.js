
  export const isValidDueDate = (dueDate) => {
    const today = new Date().toISOString().split('T')[0]; // Format YYYY-MM-DD
    return dueDate >= today;
  };