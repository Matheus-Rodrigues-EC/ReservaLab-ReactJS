export const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
export const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

export const hasSpecialChar = (text) => /[!@#$%^&*(),.?":{}|<>]/.test(text);
export const hasUppercase = (text) => /[A-Z]/.test(text);
export const hasNumber = (text) => /[0-9]/.test(text);