export const createTaskDeletionSchema = {
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
    isArray: { errorMessage: "Tags must be an array" },
    notEmpty: { errorMessage: "Tags are required" },
    custom: {
      options: (value) => Array.isArray(value) && value.length <= 4,
      errorMessage: "You can assign a maximum of 4 tags"
    }
  },
}