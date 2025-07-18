export const createUserLoginSchema = {
    email: {
    isEmail: { errorMessage: "email" },
    notEmpty: { errorMessage: "email" },
    normalizeEmail: true,
    trim: true
  },
  password: {
    isString: { errorMessage: "password" },
    notEmpty: { errorMessage: "password" },
    isLength: {
      options: { min: 5 },
      errorMessage: "password"
    },
    trim: true
  }
}


