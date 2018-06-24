import validator from "validator";
import DefaultForm from "./DefaultForm";

class UserInfoForm extends DefaultForm{
    static runValidation (fields) {
        return DefaultForm.validate(fields, UserInfoForm.rules);
    }
}

UserInfoForm.rules = {
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
};

export default UserInfoForm;

