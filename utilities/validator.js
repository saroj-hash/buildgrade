let validator = {}
validator.validateEmail = (email) => {
    const regEx2 = new RegExp(/^[A-z0-9_%$\.]{3,}@[A-z]{3,30}.com$/)
    if (!regEx2.test(email)){
        let err = new Error("Please enter a valid Email ID!")
        err.status = 401
        throw err
    }
}
module.exports = validator