const Joi = require("joi");

exports.RegisterValidator = Joi.object().keys({
    sFirstName: Joi.string().max(25).required(),
    sLastName: Joi.string().max(25).required(),
    sEmail: Joi.string().email().max(50).required(),
    sPassword: Joi.string().max(50).required(),
    sOrganization: Joi.string().max(50).required()
});

exports.LoginValidator = Joi.object().keys({
    sEmail: Joi.string().email().max(50).required(),
    sPassword: Joi.string().max(50).required()
});