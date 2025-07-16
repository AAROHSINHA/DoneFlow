export const createTaskValidationSchema = {
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
  tags: {
  optional: true,  // ✅ allow it to be skipped
  isArray: { errorMessage: "Tags must be an array" },
  custom: {
    options: (value) => Array.isArray(value) && value.length <= 4,
    errorMessage: "You can assign a maximum of 4 tags"
  }
},
  "tags.*": {
    isString: { errorMessage: "Each tag must be a string" },
    notEmpty: { errorMessage: "Tags cannot be empty strings" },
    trim: true
  },
  priority: {
    optional: true,
    isString: { errorMessage: "Priority must be a string" },
    isIn: {
      options: [["low", "medium", "high"]],
      errorMessage: "Priority must be one of: low, medium, high"
    },
    trim: true
  },
  progress: {
    optional: true,
    isNumeric: { errorMessage: "Progress must be a number" },
    custom: {
      options: (val) => val >= 0 && val <= 100,
      errorMessage: "Progress must be between 0 and 100"
    }
  },
  estimateTime: {
    optional: true,
    isNumeric: { errorMessage: "Estimate Time must be a number" }
  },
  spendTime: {
    optional: true,
    isNumeric: { errorMessage: "Spend Time must be a number" }
  },
  deadlineDate: {
    optional: true,
    isInt: {
      options: { min: 0, max: 31 },
      errorMessage: "Deadline date must be between 0 and 31"
    }
  },
  deadlineMonth: {
    optional: true,
    isInt: {
      options: { min: 0, max: 12 },
      errorMessage: "Deadline date must be between 0 and 31"
    }
  }
};

export const createAddTimeSchema = {
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
  spendTime: {
    optional: true,
    isNumeric: { errorMessage: "Spend Time must be a number" }
  }
}
