const { RegisterValidator, LoginValidator } = require("./auth.validator");
const { UserListValidator } = require("./user.validator");

const validate = (schema = null) => (req, res, next) => {
    switch (schema) {
        // AUTH VALIDATION
        case 'register': var Schema = RegisterValidator; break;
        case 'login': var Schema = LoginValidator; break;

        // USER VALIDATION
        case 'get_user_list': var Schema = UserListValidator; break;
    }
    if (!Schema) {
        return res.status(400).json({ status: 500, message: 'Schema flag is not defined in validation' });
    } else {
        var body = req.body;
        var query = req.query;
        var params = req.params;
        var data = Object.assign({}, body, query, params)
        if (typeof data == 'string') {
            data = JSON.parse(data)
        }
        var validation = Schema.validate(data);
        if (!validation.error) return next();
        return res.status(400).json({ status: 400, error: validation });
    }
}

module.exports = validate;