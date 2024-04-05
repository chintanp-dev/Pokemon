export const SignUpValidator = (formData) => {
  const validationError = {};

  if (!formData.fullname) {
    validationError.fullname = 'Name is required';
  }

  if (!formData.age) {
    validationError.age = 'Age is required';
  }

  if (!formData.email) {
    validationError.email = 'Email is required';
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    validationError.email = 'Please enter a valid email address';
  }

  if (!formData.password) {
    validationError.password = 'Password is required';
  } else if (
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@.#$!%*?&])[A-Za-z\d@.#$!%*?&]{8,}$/.test(
      formData.password
    )
  ) {
  } else {
    validationError.password =
      'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*()), and cannot contain spaces or be the same as your username.';
  }

  if (formData.confirmPassword !== formData.password) {
    validationError.confirmPassword = 'Password Doesn’t match';
  }

  return validationError;
};

export const LoginValidator = (loginFormData) => {
  const loginvalidationError = {};

  if (!loginFormData.email) {
    loginvalidationError.email = 'Email is required';
  }
  if (!loginFormData.password) {
    loginvalidationError.password = 'Password is required';
  }
  return loginvalidationError;
};
