import ContractAuditDao from '../dao/ContractAudit';
import Order from '../dao/Order';
import Currency from '../dao/Currency';
import Collection from '../dao/Collection';

export default class ContractAuditModel {
    constructor(dao) {
        this.dao = dao;
    }

    static async getById(id) {
        let auditDao = await ContractAuditDao.findById(id);
        return new ContractAuditModel(auditDao);
    }

    static async initAudit(order) {
        const currency = await Currency.findById(order.currency).lean();
        const collection = await Collection.findById(order.categoryCollection).lean();
        const event = {
            entityType: 'Order',
            eventName: 'Init',
            data: order,
            meta: {currency: currency, collection: collection}
        };
        let auditDao = new ContractAuditDao({events: [event]});
        await auditDao.save();

        return new ContractAuditModel(auditDao);
    }

    async createOffer(offer) {
        this.addEvent({
            entityType: 'Offer',
            eventName: 'SentOffer',
            data: offer
        });
    }

    async createContract(contract, acceptedBy) {
        const order = await Order.findById(contract.order).lean();
        const currency = await Currency.findById(order.currency).lean();
        const collection = await Collection.findById(order.categoryCollection).lean();
        this.addEvent({
            entityType: 'Contract',
            eventName: 'CreateContract',
            data: contract,
            meta: {acceptedBy: acceptedBy, order: order, currency: currency, collection: collection}
        });
    }

    addEvent(event) {
        this.dao.events.push(event);
        this.dao.save();
    }
}
