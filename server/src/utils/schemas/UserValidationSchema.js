export const createUserValidationSchema = {
  firstName: {
    isString: { errorMessage: "Username must be a string" },
    notEmpty: { errorMessage: "Username is required" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "Username must be 5–32 characters"
    },
    trim: true
  },
  lastName: {
    isString: { errorMessage: "Username must be a string" },
    notEmpty: { errorMessage: "Username is required" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "Username must be 5–32 characters"
    },
    trim: true
  },
  email: {
    isEmail: { errorMessage: "Invalid email format" },
    notEmpty: { errorMessage: "Email is required" },
    normalizeEmail: true,
    trim: true
  },
  password: {
    isString: { errorMessage: "Password must be a string" },
    notEmpty: { errorMessage: "Password is required" },
    isLength: {
      options: { min: 6 },
      errorMessage: "Password must be at least 6 characters"
    },
    trim: true
  }
};
