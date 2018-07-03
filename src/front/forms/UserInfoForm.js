import validator from "validator";
import DefaultForm from "./DefaultForm";
import moment from "moment/moment";

class UserInfoForm extends DefaultForm{
    static runValidation (fields) {
        return DefaultForm.validate(fields, UserInfoForm.rules);
    }
}

UserInfoForm.rules = {
    firstName: [
        {
            rule: value => validator.isByteLength(value, { min: 1 }),
            message: "First Name is required"
        },
        {
            rule: value => validator.isByteLength(value, { min: 3 }),
            message: "First Name must be at least 3 characters"
        }
    ],
    lastName: [
        {
            rule: value => validator.isByteLength(value, { min: 1 }),
            message: "Last Name is required"
        },
        {
            rule: value => validator.isByteLength(value, { min: 3 }),
            message: "Last Name must be at least 3 characters"
        }
    ],
    company: [
        {
            rule: value => validator.isByteLength(value, { min: 1 }),
            message: "Company is required"
        },
        {
            rule: value => validator.isByteLength(value, { min: 2 }),
            message: "Company must be at least 2 characters"
        }
    ],
    dateOfBirth: [
        {
            rule: value => {
                return moment(value).isValid();
            },
            message: "Date of birth is required"
        }
    ],
    address: {
        country: [
            {
                rule: value => validator.isByteLength(value, { min: 1 }),
                message: "Country is required"
            }
        ],
        street: [
            {
                rule: value => validator.isByteLength(value, { min: 1 }),
                message: "Street is required"
            }
        ],
    },
};

export default UserInfoForm;

