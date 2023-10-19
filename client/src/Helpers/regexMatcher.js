export function isEmail(string){
    return string.match(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/)
}

export function isValidPassword(string){
    return string.match(/^(?=.*[!@#$%^&*])(?=.*[A-Z]).{6,16}$/)
}