import validator from "validator";

class RegistrationFormValidator {}

RegistrationFormValidator.rules = {
    firstName: [
        {
            rule: value => validator.isByteLength(value, { min: 1 }),
            message: "Name is required"
        },
        {
            rule: value => validator.isByteLength(value, { min: 4 }),
            message: "Name must be at least 4 characters"
        }
    ],
    email: [
        {
            rule: value => validator.isByteLength(value, { min: 1 }),
            message: "Email is required"
        },
        {
            rule: value => validator.isEmail(value),
            message: "Email is not valid"
        }
    ],
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

RegistrationFormValidator.run = (fields) => {
    let errors = {};
    const rules = RegistrationFormValidator.rules;
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

export default RegistrationFormValidator;