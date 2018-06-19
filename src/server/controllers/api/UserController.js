/** Common */
import {urlFor} from 'express-named-router-url-generator';
import passwordHash from "password-hash";
import RegistrationFormValidator from "../../../front/validation/registrationFormRules";
import UserDao from "../../dao/User";

export default class UserController {}

UserController.create = (req, res) => {
    let errors = RegistrationFormValidator.run({
        firstName: req.body.firstName,
        email: req.body.email,
        password: req.body.password,
    });

    if (Object.getOwnPropertyNames(errors).length > 0) {
        res.status(200).send({success: false, validationErrors: errors});
        return;
    }

    UserDao.findOne({ email: req.body.email }).catch(err => {
        res.status(500).send({
            success: false,
            error: err
        });
    }).then(user => {
        if (user) {
            errors.email = ['User with such email already registered'];
            res.status(200).send({success: false, validationErrors: errors});
            return;
        }

        UserDao.create({
            firstName: req.body.firstName,
            email: req.body.email,
            password: passwordHash.generate(req.body.password, {algorithm:'md5'})
        }).catch(err => {
            res.status(500).send({
                success: false,
                error: err
            });
        }).then(user => {
            req.session.userId = user._id;
            res.status(200).send({success: true, redirect: urlFor('account:statusAndNotifications', {id: user._id}) });
        });
    });
};

UserController.login = (req, res) => {
    UserDao.findOne({ email: req.body.email }).catch(err => {
        res.status(500).send({
            success: false,
            error: err
        });
    }).then(user => {
        if (!user) {
            res.status(500).send({
                success: false,
                error: new Error('Failed to fetch user')
            });
        }

        req.session.userId = user._id;

        //TODO update last login
        // user.update();
        res.status(200).send({ success: true, redirect: urlFor('account:statusAndNotifications', {id: user._id}) });
    });
};

UserController.logout = (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if(err) {
                return next(err);
            } else {
                return res.status(200).send({ success: true, redirect: urlFor('main') });
            }
        });
    }

    res.status(500).send({ success: false, error: 'Session not found' });
};

UserController.change = (req, res) => {
    // if password - hash password
    //if file - send it to storage and save result to user

    UserDao.findOneAndUpdate(
        { _id: req.session.userId },
        {
            email: 'vadimsemenykv+4@gmail.com'
        }
    ).catch(err => {
        res.status(500).send({
            success: false,
            error: err
        });
    }).then(user => {
        if (!user) {
            res.status(500).send({
                success: false,
                error: new Error('Failed to fetch user')
            });
        }

        res.status(200).send({ success: true });
    });
};