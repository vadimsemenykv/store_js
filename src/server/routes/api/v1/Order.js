import express from 'express';
import CollectionDao from '../../../dao/Collection';
import CurrencyDao from '../../../dao/Currency';
import validator from 'validator';

async function getAll(req, res) {
    res.status(200).send({});
}

export async function create(req, res) {
    let errors = [];
    // order = {
    //     _type: '',
    //     currency: '',
    //     category: '',
    //     price: '',
    //     quantity: '',
    //     offerOnly: ''
    // }
    const orderRequest = req.body.order;
    if (!orderRequest._type || !validator.isIn(orderRequest._type, ['buy', 'sell'])) {
        errors.push('invalid_value__type');
    }

    const currencyObj = orderRequest.currency
        ? await CurrencyDao.findById(orderRequest.currency).lean()
        : false;
    if (!currencyObj) {
        errors.push('failed_to_fetch_currency');
    }

    const collectionObj = orderRequest.categoryCollection
        ? await CollectionDao.findById(orderRequest.categoryCollection).lean()
        : false;
    if (!collectionObj) {
        errors.push('failed_to_fetch_categoryCollection');
    }

    if (!orderRequest.offerOnly && (!orderRequest.price || !validator.isDecimal(orderRequest.price))) {
        errors.push('invalid_value_price');
    }

    if (!orderRequest.offerOnly && (!orderRequest.quantity || !validator.isDecimal(orderRequest.quantity))) {
        errors.push('invalid_value_quantity');
    }

    if (Number.isNaN(orderRequest.price * orderRequest.quantity)) {
        errors.push('invalid_value_price_quantity');
    }

    if (orderRequest.offerOnly === undefined || orderRequest.offerOnly === null || !validator.isBoolean('' + orderRequest.offerOnly)) {
        errors.push('invalid_value_offer_only');
    }

    if (Object.getOwnPropertyNames(errors).length > 0) {
        res.status(400).send({success: false, errors: errors});
        return;
    }

    const id = createOrder(orderRequest);
    res.status(200).send({success: true, order: {_id: id}});
}

export async function update(req, res) {
}

export async function updateStatus(req, res) {
}

export async function lock(req, res) {
}

export async function freeLock(req, res) {
}

let router = express.Router();
router.get('/', getAll);
router.post('/create', create);
router.patch('/update', update);
router.patch('/update-status', updateStatus);
router.patch('/lock', lock);
router.patch('/free-lock', freeLock);

export default router;
