/** Common */
import validator from 'validator';
import OrderDao from '../../dao/Order';
import CurrencyDao from '../../dao/Currency';
import CollectionDao from '../../dao/Collection';
import ContractDao from "../../dao/Contract";

export default class CatalogController {}

CatalogController.create = async (req, res) => {
    let errors = {};
    if (!req.body._type || !validator.isIn(req.body._type, ['buy', 'sell'])) {
        errors._type = 'invalid_value__type';
    }

    const currency = req.body.currency ? await CurrencyDao.findById(req.body.currency).lean() : false;
    if (!currency) {
        errors.currency = 'failed_to_fetch_currency';
    }

    const collection = req.body.categoryCollection ? await CollectionDao.findById(req.body.categoryCollection).lean() : false;
    if (!collection) {
        errors.categoryCollection = 'failed_to_fetch_categoryCollection';
    }

    if (!req.body.offerOnly && (!req.body.price || !validator.isDecimal(req.body.price))) {
        errors.price = 'invalid_value_price';
    }

    if (!req.body.offerOnly && (!req.body.quantity || !validator.isDecimal(req.body.quantity))) {
        errors.quantity = 'invalid_value_quantity';
    }

    if (Number.isNaN(req.body.price * req.body.quantity)) {
        errors.priceToQuantity = 'invalid_value_price_quantity';
    }

    if (req.body.offerOnly === undefined || req.body.offerOnly === null || !validator.isBoolean('' + req.body.offerOnly)) {
        errors.price = 'invalid_value_offerOnly';
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
};

CatalogController.reserveOrder = async (req, res) => {
    //TODO add check for already reserved orders by this user, if count > 0, then show to user popup
    //TODO add check for order not in contract
    let now = new Date();
    now.setMinutes(now.getMinutes() + 10);

    OrderDao.findOneAndUpdate(
        {
            $and: [
                {
                    _id: req.body.orderId
                },
                {
                    $or: [
                        {availableStatus: 'available'},
                        {'reserved.until': {$lte: new Date()}}
                    ]
                }
            ]
        },
        {
            availableStatus: 'transaction_in_progress',
            reserved: {
                until: now,
                by: req.user._id
            }
        }
    ).then((order) => {
        if (!order) {
            res.status(409).send({success: false, error: 'already_reserved'});
        }
        res.status(200).send({success: true});
    });
};

CatalogController.createContract = async (req, res) => {
    //TODO check is order reserved by this user, if not - show popup
    const order = await OrderDao.findById(req.body.orderId);
    ContractDao.create({
        client: req.user._id,
        merchant: order.owner,
        order: order._id
    });
    res.status(200).send({success: true});
};

CatalogController.createOffer = () => {
};

CatalogController.acceptOffer = () => {
};
