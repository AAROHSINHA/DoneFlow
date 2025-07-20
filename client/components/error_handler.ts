interface localSignInValidation {
    firstname: string,
    lastname: string,
    password: string,
    email: string,
    other: string
}
interface localSignInInterface {
    validation: localSignInValidation,
    server: string,
    other: string
}
interface localLoginValidation {
    email: string,
    password: string
}
interface localLoginErrorInterface {
    validation: localLoginValidation,
    credentials: string,
    server: string,
    other: string
}

export const localSignInError: localSignInInterface = {
    "validation": {
        "firstname": "Firstname is Invalid. Must be a string of length 1-32",
        "lastname": "Lastname is Invalid. Must be a string of length 1-32",
        "password": "Password is Invalid. Must be a string of length 6-32",
        "email": "Email is Invalid. Please enter a valid Email!",
        "other": "Unexpected Error Occurred!"
    },
    "server": "Internal Server Error! Please try again in some time...",
    "other": "Error Occurred! Please try again later...."
}

export const localLoginError: localLoginErrorInterface = {
    "validation": {
        "email": "Email is Invalid. Please enter a valid Email!",
        "password": "Password is Invalid. Must be a string of length 6-32",
    },
    "credentials": "Username/Password Incorrect!",
    "server": "Internal Server Error! Please try again in some time...",
    "other": "Error Occurred! Please try again later...."
}

export const changePasswordError = {
    "server": "Internal Server Error! Please try again in some time...",
    "credentials": "Invalid credentials",
    "other": "Error Occurred! Please try again later...."
}

type AddTaskValidationErrors = {
  email: string;
  title: string;
  tag: string;
  priority: string;
  progress: string;
  time: string;
  date: string;
  month: string;
};

export type AddTaskErrorType = {
  validation: AddTaskValidationErrors;
  server: string;
  other: string
};


export const addTaskError: AddTaskErrorType = {
    "validation": {
        "email": "Internal Server Error! Try adding later...",
        "title": "Invalid Title! Title must be a string of size 1-32",
        "tag": "Error adding tags. You can add a maximum of 4 tags to each task",
        "priority": "Some unknown error occurred! Try again in some time...",
        "progress": "Some unknown error occurred! Try again in some time...",
        "time": "Invalid estimate/spend time. Estimate/Spend time must be a number",
        "date": "Invalid date! Please enter correct date.",
        "month": "Invalid month! Please enter correct month."
    },
    "server": "Internal Server Error! Please try again in some time...",
    "other": "Error Occurred! Please try again later...."
}
