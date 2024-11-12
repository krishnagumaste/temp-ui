export const APP_URL = window.location.origin;

// auth
export const authBase = `${APP_URL}/auth/get-session`;
export const authenticationUrl = `auth/token?base_url=${APP_URL}`;
export const forgetPasswordRegister = 'auth/register';
