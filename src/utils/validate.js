export const checkValidateData = (email, pass) => {
    const isEmailValid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)
    const isPasswordValid = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(pass)
    if (!isEmailValid) return { type: "email", msg: "Email Id is invalid" };
    if (!isPasswordValid) return { type: "pass", msg: "Password is invalid" };
    return null;
}