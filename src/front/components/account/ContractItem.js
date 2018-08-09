/** Common */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import {numberWithCommas} from '../../utils/formater';

/** Components */
import {
    ButtonDropdown,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row,
    Modal, ModalHeader, ModalBody, ModalFooter, Button
} from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import '../../styles/CatalogItem.sass';
import '../../styles/CreateOrderForm.sass';
import '../../styles/account/OrderItem.sass';

export default class ContractItem extends React.Component {
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
        fetch('/api/catalog/audit/' + this.props.contract.audit.toString(), {
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

    render() {
        const contract = this.props.contract;
        const id = contract._id.toString();
        let createdAt = moment(contract.createdAt);

        const auditTpl = this.state.auditData.map((auditEvent, index) => {
            return (
                <Row key={index}>
                    <Col>
                        <Row>
                            Created: {auditEvent.createdAt}
                        </Row>
                        <Row>
                            Type: {auditEvent.eventType}
                        </Row>
                        <Row>
                            Name: {auditEvent.eventName}
                        </Row>
                        <Row style={{overflow: 'auto'}}>
                            Data: {JSON.stringify(auditEvent.data)}
                        </Row>
                    </Col>
                </Row>
            );
        });

        return (
            <Row className="catalog-item">
                <Col>
                    <Row className="item-cell-row">
                        <Col>
                            Contract ID: { id }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
                            Order ID: { contract.order._id.toString() }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Merchant ID: {contract.merchant}</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Client ID: {contract.client}</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Type: <span className={ contract.order._type === 'buy' ? 'text-success' : 'text-info' }>{ contract.order._type === 'buy' ? 'Buy' : 'Sell' }</span></Col>
                        <Col>Currency: { contract.order.currency.title }</Col>
                        <Col>Collection: { contract.order.categoryCollection.title }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Price: { '$' + numberWithCommas(contract.price) }</Col>
                        <Col>Quantity: { contract.quantity }</Col>
                        <Col>Total: { '$' + numberWithCommas(contract.totalPrice) }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Contract Date (MST): { createdAt.utcOffset(-7).format('YYYY-MM-DD HH:mm:ss') }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
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
                                    <DropdownItem>Create a Delivery Ticket</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                </Col>

                <Modal isOpen={this.state.auditModal} toggle={::this.toggleAuditModal}>
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

ContractItem.propTypes = {
    contract: PropTypes.object.isRequired
};
