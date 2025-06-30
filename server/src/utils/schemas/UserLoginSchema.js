export const createUserLoginSchema = {
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
      options: { min: 5 },
      errorMessage: "Password must be at least 6 characters"
    },
    trim: true
  }
}


