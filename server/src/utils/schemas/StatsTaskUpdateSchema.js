export const createStatsTaskUpdateSchema = {
    email: {
    isEmail: { errorMessage: "Invalid email format" },
    notEmpty: { errorMessage: "Email is required" },
    normalizeEmail: true,
    trim: true
  },
};

export const createCompleteTaskUpdateSchema = {
  email: {
    isEmail: { errorMessage: "Invalid email format" },
    notEmpty: { errorMessage: "Email is required" },
    normalizeEmail: true,
    trim: true
  },
  title:{
    isString: { errorMessage: "Title must be a string" },
    notEmpty: { errorMessage: "Title is required" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "Title must be between 1 and 32 characters"
    },
    trim: true
  }
}

export const createProgressTaskUpdateSchema = {
    email: {
    isEmail: { errorMessage: "Invalid email format" },
    notEmpty: { errorMessage: "Email is required" },
    normalizeEmail: true,
    trim: true
  },
  title:{
    isString: { errorMessage: "Title must be a string" },
    notEmpty: { errorMessage: "Title is required" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "Title must be between 1 and 32 characters"
    },
    trim: true
  }
}
