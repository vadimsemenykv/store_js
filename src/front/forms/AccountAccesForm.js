import validator from "validator";
import DefaultForm from "./DefaultForm";

class AccountAccesForm extends DefaultForm{
    static runValidation (fields) {
        return DefaultForm.validate(fields, AccountAccesForm.rules);
    }
}

AccountAccesForm.rules = {
    password: [
        {
            rule: value => validator.isByteLength(value, { min: 1 }),
            message: "Password is required"
        },
        {
            rule: value => validator.isByteLength(value, { min: 8 }),
            message: "Password must be at least 8 characters"
        },
        {
            rule: value => {
                const regExp = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%&*()])/;
                return regExp.test(value);
            },
            message: "Password must contain at least one letter, upper case letter, number and symbol"
        }
    ]
};

export default AccountAccesForm;

