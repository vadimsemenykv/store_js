import validator from "validator";
import DefaultForm from "./DefaultForm";

class AccountAccesForm extends DefaultForm{
    static runValidation (fields) {
        return DefaultForm.validate(fields, AccountAccesForm.rules);
    }
}

AccountAccesForm.rules = {
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

export default AccountAccesForm;

