export const validateEmail = (email) => {
  // Regular expression for email validation
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  // Test the email against the regular expression
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  // Regular expression for password validation
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#@$!%*?&])[A-Za-z\d#@$!%*?&]{8,}$/;
  // Test the password against the regular expression
  return passwordRegex.test(password);
};

export const validateMobileNumber = (mobileNumber) => {
  // Regular expression for numeric digits only
  const numericRegex = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/;
  // Check if the mobile number contains only numeric digits
  return numericRegex.test(mobileNumber);
};
