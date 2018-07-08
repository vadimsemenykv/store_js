/** Common */
import validator from "validator";
import OrderDao from "../../dao/Order";
import CurrencyDao from "../../dao/Currency";
import CollectionDao from "../../dao/Collection";
import mongoose from "mongoose";

export default class OrderController {}

function getCurrency(id) {
    return CurrencyDao.findById(id).lean();
}

OrderController.create = async (req, res) => {
    //TODO add validators for
    //_type, offersOnly, price, quantity, currency, collectionCategory
    let errors = {};
    if (!req.body._type || !validator.isIn(req.body._type, ["buy", "sell"])) {
        errors._type = "invalid_value__type"
    }
    
    const currency = req.body.currency ? await CurrencyDao.findById(req.body.currency).lean() : false;
    if (!currency) {
        errors.currency = "failed_to_fetch_currency"
    }
    
    const collection = req.body.categoryCollection ? await CollectionDao.findById(req.body.categoryCollection).lean() : false;
    if (!collection) {
        errors.categoryCollection = "failed_to_fetch_categoryCollection"
    }
    
    if (!req.body.offerOnly && (!req.body.price || !validator.isDecimal(req.body.price))) {
        errors.price = "invalid_value_price"
    }

    if (!req.body.offerOnly && (!req.body.quantity || !validator.isDecimal(req.body.quantity))) {
        errors.quantity = "invalid_value_quantity"
    }

    if (Number.isNaN(req.body.price * req.body.quantity)) {
        errors.price_quantity = "invalid_value_price_quantity"
    }

    if (req.body.offerOnly === undefined || req.body.offerOnly == null || !validator.isBoolean(""+req.body.offerOnly)) {
        errors.price = "invalid_value_offerOnly"
    }

    if (Object.getOwnPropertyNames(errors).length > 0) {
        res.status(400).send({success: false, errors: errors});
        return;
    }

    OrderDao.create({
        _type: req.body._type,
        owner: req.user._id,
        currency: currency._id,
        categoryCollection: collection._id,
        offerOnly: req.body.offerOnly,
        price: req.body.price,
        quantity: req.body.quantity,
        totalPrice: req.body.offerOnly ? 0 : Math.round(req.body.price * req.body.quantity * 100) / 100

    });

    res.status(200).send({success: true});
    //
    // UserDao.findOne({ email: req.body.email }).catch(err => {
    //     res.status(500).send({
    //         success: false,
    //         error: err
    //     });
    // }).then(user => {
    //     if (user) {
    //         errors.email = ['User with such email already registered'];
    //         res.status(200).send({success: false, validationErrors: errors});
    //         return;
    //     }
    //
    //     UserDao.create({
    //         firstName: req.body.firstName,
    //         email: req.body.email,
    //         password: passwordHash.generate(req.body.password, {algorithm:'md5'})
    //     }).catch(err => {
    //         res.status(500).send({
    //             success: false,
    //             error: err
    //         });
    //     }).then(user => {
    //         req.session.userId = user._id;
    //         res.status(200).send({success: true, redirect: urlFor('account:statusAndNotifications', {id: user._id}) });
    //     });
    // });
};
