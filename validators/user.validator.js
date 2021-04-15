const Joi = require("joi");

exports.UserListValidator = Joi.object().keys({
    sFirstName: Joi.string().max(50).allow(''),
    sLastName: Joi.string().max(50).allow(''),
    sEmployeeId: Joi.string().max(50).allow(''),
    sort: Joi.string().valid('sFirstName', 'sLastName', 'sEmployeeId').allow(''),
    order: Joi.string().valid('ASC', 'DESC').allow(''),
    offset: Joi.number().allow(''),
    limit: Joi.number().allow(''),
});