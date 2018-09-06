/** Common */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import {numberWithCommas} from '../../../utils/formater';

/** Components */
import {
    Col,
    Row
} from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../../styles/account/AuditRow.sass';

export default class AuditRow extends React.Component {
    render() {
        const auditEvent = this.props.auditEvent;
        return (
            <Row className={'audit-row'}>
                <Col xs={{size: 3}}>{auditEvent.entityType}</Col>
                <Col xs={{size: 9}}>{AuditRow.renderData(auditEvent)}</Col>
            </Row>
        );
    }

    static renderData(auditEvent) {
        switch (auditEvent.eventName) {
            case 'Init':
                return AuditRow.renderInitEvent(auditEvent);
            case 'SentOffer':
                return AuditRow.renderSentOfferEvent(auditEvent);
            case 'CreateContract':
                return AuditRow.renderCreateContractEvent(auditEvent);
            default:
                return '';
        }
    }

    static renderInitEvent(auditEvent) {
        const data = auditEvent.data;
        const meta = auditEvent.meta;
        return (
            <Row className={'no-gutters'}>
                <Col>
                    <Row>
                        <Col>Order ID: {data._id}</Col>
                    </Row>
                    <Row>
                        <Col>Merchant ID: {data.owner}</Col>
                    </Row>
                    <Row>
                        <Col>Type: {data._type === 'buy' ? 'Buy' : 'Sell'}</Col>
                        <Col>Currency: {meta.currency.title}</Col>
                        <Col>Collection: {meta.collection.title}</Col>
                    </Row>
                    <Row>
                        <Col>Price: { !data.offerOnly ? '$' + numberWithCommas(data.price) : 'Offer Only' }</Col>
                        <Col>Quantity: { data.quantity }</Col>
                        <Col>Order Total: { !data.offerOnly ? '$' + numberWithCommas(data.totalPrice) : ' - ' }</Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    static renderSentOfferEvent(auditEvent) {
        const data = auditEvent.data;
        return (
            <Row className={'no-gutters'}>
                <Col>
                    <Row>
                        <Col>Offer ID: {data._id}</Col>
                    </Row>
                    <Row>
                        <Col>Workflow was sent from Client ID: {data.client}</Col>
                    </Row>
                    <Row>
                        <Col>To Client ID: {data.merchant}</Col>
                    </Row>
                    <Row>
                        <Col>Offer price: ${data.price}</Col>
                    </Row>
                    <Row>
                        <Col>Offer date: {moment(data.createdAt).utcOffset(-7).format('YYYY-MM-DD HH:mm:ss')}</Col>
                    </Row>
                    <Row>
                        <Col>Payment information:</Col>
                    </Row>
                </Col>
            </Row>
        );
    }

    static renderCreateContractEvent(auditEvent) {
        const data = auditEvent.data;
        const meta = auditEvent.meta;
        return (
            <Row className={'no-gutters'}>
                <Col>
                    <Row>
                        <Col>Contract ID: {data._id}</Col>
                    </Row>
                    <Row>
                        <Col>Workflow was sent from Client ID: {meta.acceptedBy}</Col>
                    </Row>
                    <Row>
                        <Col>Order ID: {data.order}</Col>
                    </Row>
                    <Row>
                        <Col>Client ID: {data.client}</Col>
                    </Row>
                    <Row>
                        <Col>Merchant ID: {data.merchant}</Col>
                    </Row>
                    <Row>
                        <Col>Type: {meta.order._type === 'buy' ? 'Buy' : 'Sell'}</Col>
                        <Col>Currency: {meta.currency.title}</Col>
                        <Col>Collection: {meta.collection.title}</Col>
                    </Row>
                    <Row>
                        <Col>Price: {'$' + numberWithCommas(data.price)}</Col>
                        <Col>Quantity: {data.quantity}</Col>
                        <Col>Order Total: {'$' + numberWithCommas(data.totalPrice)}</Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

AuditRow.propTypes = {
    auditEvent: PropTypes.object.isRequired
};
