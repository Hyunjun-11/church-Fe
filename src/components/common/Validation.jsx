// utils/validation.js
export const isValidEmail = (email) => {
  const re = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,6}$/;
  return re.test(String(email).toLowerCase());
};

export const containsSpecialChar = (text) => {
  const re = /[!@#$%^&*()_-]/;
  return re.test(String(text));
};

export const isValidPassword = (password) => {
  const re = /^(?=.*[a-z])(?=.*\d)[a-z\d!@#$%^&*()_-]{5,12}$/;
  return re.test(String(password));
};
