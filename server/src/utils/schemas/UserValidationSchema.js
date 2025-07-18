export const createUserValidationSchema = {
  firstName: {
    isString: { errorMessage: "firstname" },
    notEmpty: { errorMessage: "firstname" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "firstname"
    },
    trim: true
  },
  lastName: {
    isString: { errorMessage: "lastname" },
    notEmpty: { errorMessage: "lastname" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "lastname"
    },
    trim: true
  },
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
      options: { min: 6, max:32 },
      errorMessage: "password"
    },
    trim: true
  }
};
