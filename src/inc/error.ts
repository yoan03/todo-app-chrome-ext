const errorCodes = {
    WRONG_PASSWORD: "auth/wrong-password",
    EMAIL_ALREADY_IN_USE: "auth/email-already-in-use"
};

export const getErrorMessage = (code: string): string => {
    switch (code) {
        case errorCodes.WRONG_PASSWORD: return "Invalid Username and Password";
        case errorCodes.EMAIL_ALREADY_IN_USE: return "Email is already registered";
        default:
            return `Unknown error code ${code}`
    }
};