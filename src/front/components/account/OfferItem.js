/** Common */
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';

/** Components */
import {
    ButtonDropdown,
    Col,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Row
} from 'reactstrap';

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
            dropdownOpen: false
        };
    }

    toggleMenu() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const offer = this.props.offer;
        const user = this.props.user;
        const id = offer._id.toString();
        let createdAt = moment(offer.createdAt);

        let buttonDropdownTpl = '';
        if (offer.merchant === user._id.toString() && offer.status === 'active') {
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
                        <DropdownItem>View gdf</DropdownItem>
                        <DropdownItem>Create a Delivery Ticket</DropdownItem>
                    </DropdownMenu>
                </ButtonDropdown>
            );
        }


        return (
            <Row className="catalog-item">
                <Col>
                    <Row className="item-cell-row">
                        <Col>
                            Offer ID: { id }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
                            Order ID: { offer.order._id.toString() }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Merchant ID: {offer.merchant}</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Client ID: {offer.client}</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Type: <span className={ offer.order._type === 'buy' ? 'text-success' : 'text-info' }>{ offer.order._type === 'buy' ? 'Buy' : 'Sell' }</span></Col>
                        <Col>Currency: { offer.order.currency.title }</Col>
                        <Col>Collection: { offer.order.categoryCollection.title }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Price: { '$' + offer.price }</Col>
                        <Col>Quantity: { offer.quantity }</Col>
                        <Col>Total: { '$' + offer.totalPrice }</Col>
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
            </Row>
        );
    }
}

OfferItem.propTypes = {
    offer: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
