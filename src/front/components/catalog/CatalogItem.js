/** Common */
import React from 'react';
import PropTypes from 'prop-types';

/** Components */
import {Badge, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row} from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/CatalogItem.sass';

export default class CatalogItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false
        };
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    buySell() {
        fetch('/api/catalog/contracts/reserve', {
            method: 'POST',
            credentials: "same-origin",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                orderId: this.props.order._id
            })
        })
            .then((response) => response.json())
            .then((response) => {
                if (response.success) {
                    window.location.replace('/catalog/contracts/create/' + this.props.order._id.toString());
                } else {
                    //TODO show popup
                    console.log(response.error)
                }
            })
            .catch((error) => console.log(error));
    }

    offer() {
        window.location.replace('/catalog/offers/create/' + this.props.order._id.toString());
    }

    render() {
        const order = this.props.order;
        const user = this.props.user;
        const id = order._id.toString();
        const disabledActions = order.availableStatus !== 'available' || user._id.toString() === order.owner;

        const verifyBadge = () => {
            if (order.isVerified) {
                return <Badge color="success" pill>Verified</Badge>;
            }
            return <Badge color="warning" pill>Not Verified</Badge>;
        };
        const availableBadge = () => {
            if (order.availableStatus === 'available') {
                return <Badge color="success" pill>Available</Badge>;
            }
            return <Badge color="secondary" pill>Transaction in Progress</Badge>;
        };

        return (
            <Row className="catalog-item">
                <Col>
                    <Row className="item-cell-row">
                        <Col className="item-id">
                            Order ID: { id } {user._id.toString() === order.owner ? 'Your order' : ''}
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Type: <span className={ order._type === 'buy' ? 'text-success' : 'text-info' }>{ order._type === 'buy' ? 'Buy' : 'Sell' }</span></Col>
                        <Col>Currency: { order.currency.title }</Col>
                        <Col>Collection: { order.categoryCollection.title }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Price: { !order.offerOnly ? '$' + order.price : 'Offer Only' }</Col>
                        <Col>Quantity: { order.quantity }</Col>
                        <Col>Order Total: { !order.offerOnly ? '$' + order.totalPrice : ' - ' }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
                             Status:
                            { verifyBadge() }
                            { availableBadge() }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>
                            <ButtonDropdown
                                isOpen={this.state.dropdownOpen}
                                toggle={order.availableStatus !== 'available' ? () => {} : ::this.toggle}
                            >
                                <DropdownToggle
                                    className={order.availableStatus !== 'available' ? 'disabled' : ''}
                                    color={order.availableStatus !== 'available' ? 'secondary' : 'info' }
                                    caret
                                >
                                    Actions
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={::this.buySell} disabled={order.availableStatus !== 'available' || order.offerOnly }>Buy</DropdownItem>
                                    <DropdownItem onClick={::this.offer} disabled={order.availableStatus !== 'available'}>Send an Offer</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

CatalogItem.propTypes = {
    order: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired
};
