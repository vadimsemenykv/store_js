class DefaultForm {
    static validate (data, rules) {
        let errors = {};
        for (const field in data) {
            if (data.hasOwnProperty(field) && rules.hasOwnProperty(field)) {
                const isArr = Array.isArray(rules[field]);
                if (isArr) {
                    for (let i = 0; i < rules[field].length; i++) {
                        if (!rules[field][i].rule(data[field])) {
                            if (!errors[field]) {
                                errors[field] = [];
                            }
                            errors[field].push(rules[field][i].message)
                        }
                    }
                } else {
                    const fieldErrors = DefaultForm.validate(data[field], rules[field]);
                    if (Object.getOwnPropertyNames(fieldErrors).length > 0) {
                        errors[field] = fieldErrors;
                    }
                }
            } else {
                errors[field] = ['Not found rule for field'];
            }
        }

        return errors;
    }
}

export default DefaultForm;

