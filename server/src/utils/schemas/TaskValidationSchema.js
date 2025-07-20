export const createTaskValidationSchema = {
  email: {
    isEmail: { errorMessage: "email" },
    notEmpty: { errorMessage: "email" },
    normalizeEmail: true,
    trim: true
  },
  title: {
    isString: { errorMessage: "title" },
    notEmpty: { errorMessage: "title" },
    isLength: {
      options: { min: 1, max: 32 },
      errorMessage: "title"
    },
    trim: true
  },
  tags: {
  optional: true,  // ✅ allow it to be skipped
  isArray: { errorMessage: "tag" },
  custom: {
    options: (value) => Array.isArray(value) && value.length <= 4,
    errorMessage: "tag"
  }
},
  "tags.*": {
    isString: { errorMessage: "tag" },
    notEmpty: { errorMessage: "tag" },
    trim: true
  },
  priority: {
    optional: true,
    isString: { errorMessage: "priority" },
    isIn: {
      options: [["low", "medium", "high"]],
      errorMessage: "priority"
    },
    trim: true
  },
  progress: {
    optional: true,
    isNumeric: { errorMessage: "progress" },
    custom: {
      options: (val) => val >= 0 && val <= 100,
      errorMessage: "progress"
    }
  },
  estimateTime: {
    optional: true,
    isInt: {
      options: {min: 0},
      errorMessage: "time" }
  },
  spendTime: {
    optional: true,
    isNumeric: { errorMessage: "time" }
  },
  deadlineDate: {
    optional: true,
    isInt: {
      options: { min: 0, max: 31 },
      errorMessage: "date"
    }
  },
  deadlineMonth: {
    optional: true,
    isInt: {
      options: { min: 0, max: 12 },
      errorMessage: "month"
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
