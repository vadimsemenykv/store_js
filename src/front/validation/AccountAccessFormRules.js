import validator from "validator";

class LoginFormValidator {}

LoginFormValidator.rules = {
    password: [
        {
            rule: value => validator.isByteLength(value, { min: 1 }),
            message: "Password is required"
        },
        {
            rule: value => validator.isByteLength(value, { min: 4 }),
            message: "Password must be at least 4 characters"
        }
    ]
};

LoginFormValidator.run = (fields) => {
    let errors = {};
    const rules = LoginFormValidator.rules;
    for (const field in rules) {
        if (rules.hasOwnProperty(field) && fields.hasOwnProperty(field)) {
            for (let i = 0; i < rules[field].length; i++) {
                if (!rules[field][i].rule(fields[field])) {
                    if (!errors[field]) {
                        errors[field] = [];
                    }
                    errors[field].push(rules[field][i].message)
                }
            }
        }
    }

    return errors;
};

export default LoginFormValidator;