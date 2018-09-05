/** Common */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import {numberWithCommas} from '../../utils/formater';

/** Components */
import {
    Badge,
    Button,
    ButtonDropdown,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Modal, ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import AuditRow from './audit/AuditRow';
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import '../../styles/CatalogItem.sass';
import '../../styles/CreateOrderForm.sass';
import '../../styles/account/OrderItem.sass';

export default class OfferItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            auditModal: false,
            auditData: []
        };
    }

    toggleMenu() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleAuditModal() {
        this.setState({
            auditModal: !this.state.auditModal
        });
    }

    viewTransactions() {
        fetch('/api/catalog/audit/' + this.props.offer.audit.toString(), {
            method: 'GET',
            credentials: 'same-origin',
            headers: {Accept: 'application/json', 'Content-Type': 'application/json'}
        })
            .then((response) => response.json())
            .then((response) => {
                // if (response.success) {
                this.toggleAuditModal();
                this.setState({
                    auditData: response.audit
                });
                console.log(response.audit);
                // } else {
                // dispatch({
                //     type: DECLINE_REJECT_OFFER_FAIL,
                //     payload: {offer: response.offer, errors: response.errors}
                // });
                // }
            });
        // .catch((error) => {
        // dispatch({
        //     type: DECLINE_REJECT_OFFER_FAIL,
        //     payload: {offer: offer, errors: [error.toString()]}
        // });
        // });
    }

    retract() {
        this.props.declineFunc(this.props.offer);
    }

    accept() {
        this.props.acceptFunc(this.props.offer);
    }

    decline() {
        this.props.declineFunc(this.props.offer);
    }

    declineAndPropose() {
        this.props.declineAndProposeNewFunc(this.props.offer);
    }

    render() {
        const offer = this.props.offer;
        const user = this.props.user;
        let createdAt = moment(offer.createdAt);

        let buttonDropdownTpl = '';
        if (offer.merchant.toString() === user._id.toString() && offer.status === 'active') {
            buttonDropdownTpl = (
                <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={::this.toggleMenu}
                >
                    <DropdownToggle
                        color={'info'}
                        caret
                    >
                        Actions
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={::this.viewTransactions}>View Transactions</DropdownItem>
                        <DropdownItem onClick={::this.accept}>Accept Offer</DropdownItem>
                        <DropdownItem onClick={::this.decline}>Decline Offer</DropdownItem>
                        <DropdownItem onClick={::this.declineAndPropose}>Decline & propose new Offer</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            );
        } else if (offer.client.toString() === user._id.toString() && offer.status === 'active') {
            buttonDropdownTpl = (
                <ButtonDropdown
                    isOpen={this.state.dropdownOpen}
                    toggle={::this.toggleMenu}
                >
                    <DropdownToggle
                        color={'info'}
                        caret
                    >
                        Actions
                    </DropdownToggle>
                    <DropdownMenu>
                        <DropdownItem onClick={::this.viewTransactions}>View Transactions</DropdownItem>
                        <DropdownItem onClick={::this.retract}>Retract Your Offer</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            );
        } else {
            buttonDropdownTpl = <Button onClick={::this.viewTransactions} color={'info'}>View Transactions</Button>;
        }

        let preloader = '';
        if (offer.requestLoading) {
            preloader = (
                <div className={'preloader-wrapper'}>
                    <PreloaderIcon
                        loader={Oval}
                        size={60}
                        strokeWidth={10}
                        strokeColor="#28a745"
                        duration={800}
                    />
                </div>
            );
        }

        const status = offer.status.charAt(0).toUpperCase() + offer.status.slice(1);
        let statusTpl = '';
        if (offer.status === 'active') {
            statusTpl = <Badge color="success" pill>{status}</Badge>;
        } else {
            statusTpl = <Badge color="warning" pill>{status}</Badge>;
        }

        const auditTpl = this.state.auditData.map((auditEvent, index) => {
            return (
                <AuditRow key={index} auditEvent={auditEvent}/>
            );
        });

        return (
            <Row className="catalog-item">
                <Col>
                    {preloader}
                    <Row className="item-cell-row">
                        <Col>
                            Offer ID: { offer._id.toString() }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
                            Status: { statusTpl }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
                            Order ID: { offer.order._id.toString() }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Merchant ID: { offer.merchant.toString() }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Client ID: { offer.client.toString() }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Type: <span className={ offer.order._type === 'buy' ? 'text-success' : 'text-info' }>{ offer.order._type === 'buy' ? 'Buy' : 'Sell' }</span></Col>
                        <Col>Currency: { offer.order.currency.title }</Col>
                        <Col>Collection: { offer.order.categoryCollection.title }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Price: { '$' + numberWithCommas(offer.price) }</Col>
                        <Col>Quantity: { offer.quantity }</Col>
                        <Col>Total: { '$' + numberWithCommas(offer.totalPrice) }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Offer Date (MST): { createdAt.utcOffset(-7).format('YYYY-MM-DD HH:mm:ss') }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
                            {buttonDropdownTpl}
                        </Col>
                    </Row>
                </Col>

                <Modal isOpen={this.state.auditModal} toggle={::this.toggleAuditModal} size={'lg'}>
                    <ModalHeader toggle={this.toggle}>Transactions</ModalHeader>
                    <ModalBody>{auditTpl}</ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={::this.toggleAuditModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </Row>
        );
    }
}

OfferItem.propTypes = {
    offer: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    declineFunc: PropTypes.func.isRequired,
    acceptFunc: PropTypes.func.isRequired,
    declineAndProposeNewFunc: PropTypes.func.isRequired
};
