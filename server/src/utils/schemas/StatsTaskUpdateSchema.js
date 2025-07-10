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
  title: {
    isString: { errorMessage: "Title must be a string" },
    notEmpty: { errorMessage: "Title is required" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "Title must be between 1 and 32 characters"
    },
    trim: true
  },
  deadlineDate: {
    isInt: {
      options: { min: 1, max: 31 },
      errorMessage: "Deadline date must be between 1 and 31"
    },
    notEmpty: { errorMessage: "Deadline date is required" }
  },
  deadlineMonth: {
    isInt: {
      options: { min: 1, max: 12 },
      errorMessage: "Deadline month must be between 1 and 12"
    },
    notEmpty: { errorMessage: "Deadline month is required" }
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
