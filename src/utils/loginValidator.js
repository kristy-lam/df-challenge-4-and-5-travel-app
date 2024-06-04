export const validateEmail = (emailToValidate) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(emailToValidate);
}

export const validatePassword = (passwordToValidate) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(passwordToValidate);
}

export const confirmPassword = (firstPassword, secondPassword) => {
    return firstPassword === secondPassword;
}

