export const createTaskDeletionSchema = {
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
    isArray: { errorMessage: "tags" },
    notEmpty: { errorMessage: "tags" },
    custom: {
      options: (value) => Array.isArray(value) && value.length <= 4,
      errorMessage: "tags"
    }
  },
}