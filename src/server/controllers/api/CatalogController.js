/** Common */
import validator from 'validator';

import CurrencyDao from '../../dao/Currency';
import CollectionDao from '../../dao/Collection';
import OrderDao from '../../dao/Order';
import ContractDao from '../../dao/Contract';
import OfferDao from '../../dao/Offer';

import ContractAuditModel from '../../model/ContractAuditModel';

export default class CatalogController {}

CatalogController.orderCreate = async (req, res) => {
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

CatalogController.orderUpdateStatus = async (req, res) => {
    if (!['active', 'deactivated'].includes(req.body.order.status)) {
        res.status(400).send({success: false, errors: ['inappropriate_status_value']});
    } else {
        OrderDao.findOneAndUpdate(
            {_id: req.body.order.id, owner: req.user._id},
            {status: req.body.order.status}
        ).then((order) => {
            if (!order) {
                res.status(404).send({success: false, errors: ['failed_to_fetch_order']});
            } else {
                order.status = req.body.order.status;
                res.status(200).send({success: true, order: order});
            }
        });
    }
};

CatalogController.orderUpdate = async (req, res) => {
    OrderDao.findOne(
        {_id: req.body.order.id, owner: req.user._id},
    ).then((order) => {
        if (!order) {
            res.status(404).send({success: false, errors: ['failed_to_fetch_order']});
        } else {
            let updatingData = req.body.order.data;
            if (order.quantity !== parseInt(updatingData.quantity, 10)) {
                updatingData.isVerified = false;
            }
            order.set(updatingData);
            order.save();
            res.status(200).send({success: true, order: order});
        }
    });
};

CatalogController.contractReserveOrder = async (req, res) => {
    //TODO add check for already reserved orders by this user, if count > 0, then show to user popup
    //TODO add check for order not in contract
    //TODO rewrite request req.body.order._id
    //TODO rewrite works from dao to model
    //TODO in all response errors is array of messages
    //TODO rewrite all text values to constants
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
                        {'reserved.until': {$lte: new Date()}},
                        {'reserved.by': req.user._id}
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

CatalogController.freeReservation = async (req, res) => {
    OrderDao.findOneAndUpdate(
        {$and: [{_id: req.body.order._id}, {'reserved.by': req.user._id}]},
        {availableStatus: 'available', reserved: null}
    ).then((order) => {
        if (!order) {
            res.status(404).send({success: false, errors: [{code: 'order_not_found', attribute: 'order'}]});
        }
        res.status(200).send({success: true});
    });
};

CatalogController.createOffer = async (req, res) => {
    if (!req.body.offer.price || !validator.isDecimal(req.body.offer.price.toString())) {
        res.status(400).send({success: false, errors: {price: 'invalid_value_price'}});
        return;
    }

    const [order, basedOnOffer] = await Promise.all([
        OrderDao.findById(req.body.offer.order._id),
        OfferDao.findById(req.body.offer.basedOnOffer)
    ]);

    let audit = await ContractAuditModel.initAudit(order);

    OfferDao.create({
        client: req.user._id,
        merchant: basedOnOffer ? basedOnOffer.client : order.owner,
        order: order._id,
        price: req.body.offer.price,
        totalPrice: Math.round(req.body.offer.price * order.quantity * 100) / 100,
        basedOnOffer: req.body.offer.basedOnOffer,
        audit: audit.dao._id
    }).then((offer) => {
        audit.createOffer(offer);
        res.status(200).send({success: true, offer: offer});
    });
};

CatalogController.contractCreateFromOrder = async (req, res) => {
    const order = await OrderDao.findById(req.body.orderId);
    if (!order) {
        res.status(404).send({success: false, errors: 'failed_to_fetch_offer'});
        return;
    }

    if (order.status !== 'active'
        || order.availableStatus !== 'transaction_in_progress'
        || !order.reserved
        || order.reserved.until < new Date()
        || order.reserved.by.toString() !== req.user._id.toString()
    ) {
        res.status(200).send({success: false, errors: 'order_is_not_available'});
        return;
    }

    let audit = await ContractAuditModel.initAudit(order);

    ContractDao.create({
        client: req.user._id,
        merchant: order.owner,
        order: order._id,
        price: order.price,
        quantity: order.quantity,
        totalPrice: order.totalPrice,
        audit: audit.dao._id
    }).then((contract) => {
        order.set({contract: contract._id, status: 'in_contract'});
        order.save();

        OfferDao.update(
            {status: 'active', order: order._id},
            {$set: {status: 'expired'}},
            {multi: true}
        ).exec();

        audit.createContract(contract, req.user._id);
    });
    res.status(200).send({success: true});
};

CatalogController.acceptOffer = async (req, res) => {
    const offer = await OfferDao.findOne({_id: req.body.offer.id, merchant: req.user._id}).populate('order');
    if (!offer) {
        res.status(404).send({success: false, errors: 'failed_to_fetch_offer'});
        return;
    }

    if (offer.status !== 'active') {
        res.status(200).send({success: false, errors: 'offer_is_not_active'});
        return;
    }
    if (offer.order.status !== 'active'
        || offer.order.availableStatus !== 'transaction_in_progress'
        || !offer.order.reserved
        || offer.order.reserved.until < new Date()
        || offer.order.reserved.by.toString() !== req.user._id.toString()
    ) {
        res.status(200).send({success: false, errors: 'order_is_not_available'});
        return;
    }

    let audit = await ContractAuditModel.getById(offer.audit);
    const client = offer.client.toString() !== offer.order.owner.toString() ? offer.client : offer.merchant;
    ContractDao.create({
        client: client,
        merchant: offer.order.owner,
        order: offer.order._id,
        price: offer.price,
        quantity: offer.order.quantity,
        totalPrice: offer.totalPrice,
        audit: audit.dao._id
    }).then((contract) => {
        offer.set({contract: contract._id, status: 'in_contract'});
        offer.save();

        offer.order.set({contract: contract._id, status: 'in_contract'});
        offer.order.save();

        OfferDao.update(
            {status: 'active', order: offer.order._id, _id: {$ne: offer._id}},
            {$set: {status: 'expired'}},
            {multi: true}
        ).exec();

        audit.createContract(contract, req.user._id);

        res.status(200).send({success: true, contract: contract});
    });
};

CatalogController.declineOffer = async (req, res) => {
    const offer = await OfferDao.findOne(
        {
            $and: [
                {
                    _id: req.body.offer.id
                },
                {
                    $or: [
                        {merchant: req.user._id},
                        {client: req.user._id}
                    ]
                }
            ]
        }
    )
        .populate('order')
        .populate({
            path: 'order',
            populate: {path: 'currency'}
        }).populate({
            path: 'order',
            populate: {path: 'categoryCollection'}
        });

    if (!offer) {
        res.status(400).send({success: false, offer: {}, errors: {offer: 'failed_to_fetch_offer'}});
    }
    if (offer.status !== 'active') {
        res.status(400).send({success: false, offer: offer, errors: {offer: 'offer_is_not_active'}});
    }

    offer.status = offer.client.toString() === req.user._id.toString() ? 'retracted' : 'declined';
    offer.save();

    res.status(200).send({success: true, offer: offer});
};

CatalogController.catalogAudit = async (req, res) => {
    const audit = await ContractAuditModel.getById(req.params.auditId);
    res.status(200).send({success: true, audit: audit.dao.events});
};
