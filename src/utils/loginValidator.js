import {loginData} from "../../data/dummyLoginData.json" assert {type: "json"};

export const checkUserEmail = (emailToCheck) => { 
    return loginData.some(data => data.userEmail === emailToCheck);
}

export const checkUserPassword = (passwordToCheck) => { 
    return loginData.some(data => data.userPassword === passwordToCheck);
}

export const validateNewEmail = (emailToValidate) => {
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    return emailRegex.test(emailToValidate);
}

export const validateNewPassword = (passwordToValidate) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    return passwordRegex.test(passwordToValidate);
}

export const confirmNewPassword = (firstPassword, secondPassword) => {
    return firstPassword === secondPassword;
}

