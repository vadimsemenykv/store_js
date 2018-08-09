import ContractAuditDao from '../dao/ContractAudit';

export default class ContractAuditModel {
    constructor(dao) {
        this.dao = dao;
    }

    static async getById(id) {
        let auditDao = await ContractAuditDao.findById(id);
        return new ContractAuditModel(auditDao);
    }

    static async initAudit(order) {
        const event = {
            entityType: 'Order',
            eventName: 'Init',
            data: order
        };
        let auditDao = new ContractAuditDao({events: [event]});
        await auditDao.save();

        return new ContractAuditModel(auditDao);
    }

    createOffer(offer) {
        this.addEvent({
            entityType: 'Offer',
            eventName: 'SentOffer',
            data: offer
        });
    }

    createContract(contract) {
        this.addEvent({
            entityType: 'Contract',
            eventName: 'CreateContract',
            data: contract
        });
    }

    addEvent(event) {
        this.dao.events.push(event);
        this.dao.save();
    }
}
