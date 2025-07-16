export const createFeedbackSchema = {
  email: {
    optional: true,
    isEmail: {
      errorMessage: "Invalid email format",
    },
    normalizeEmail: true,
    trim: true,
  },

  rating: {
    optional: true,
    isNumeric: {
      errorMessage: "Rating must be a number",
    },
    toInt: true,
  },

  feedback: {
    optional: true,
    isString: {
      errorMessage: "Feedback must be a string",
    },
    trim: true,
  },
};
