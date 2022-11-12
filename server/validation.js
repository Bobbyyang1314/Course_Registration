const Joi = require("joi");
const {date} = require("joi");


// register validation
const registerValidation = (date) => {
    const schema = Joi.object({
        username: Joi.string().min(3).max(50).required(),
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(225).required(),
        role: Joi.string().required().valid("student", "instructor"),
    });
    return schema.validate(date);
};

const loginValidation = (date) => {
    const schema = Joi.object({
        email: Joi.string().min(6).max(50).required().email(),
        password: Joi.string().min(6).max(225).required(),
    });
    return schema.validate(date);
};

const courseValidation = (date) => {
    const schema = Joi.object({
        title: Joi.string().min(6).max(50).required(),
        description: Joi.string().min(6).max(50).required(),
        price: Joi.number().min(10).max(9999).required(),
    });
    return schema.validate(date);
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
module.exports.courseValidation = courseValidation;
