/** Common */
import React from 'react';
import PropTypes from "prop-types";

/** Components */
import {Badge, ButtonDropdown, Col, DropdownItem, DropdownMenu, DropdownToggle, Row} from "reactstrap";

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

    render() {
        const order = this.props.order;
        const verifyBadge = () => {
            if (order.isVerified) {
                return <Badge color="success" pill>Verified</Badge>
            } else {
                return <Badge color="warning" pill>Not Verified</Badge>
            }
        };
        const availableBadge = () => {
            if (order.availableStatus === 'available') {
                return <Badge color="success" pill>Available</Badge>
            } else {
                return <Badge color="secondary" pill>Transaction in Progress</Badge>
            }
        };

        return (
            <Row className="catalog-item">
                <Col>
                    <Row className="item-cell-row">
                        <Col className="item-id">
                            #{ order._id }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Type: <span className={ order._type === "buy" ? "text-success" : "text-info" }>{ order._type === "buy" ? "Buy" : "Sell" }</span></Col>
                        <Col>Currency: { order.currency.uid }</Col>
                        <Col>Collection: { order.collection.uid }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Price: { !order.offerOnly ? "$" + order.price : "Offer Only" }</Col>
                        <Col>Quantity: { order.quantity }</Col>
                        <Col>Order Total: { !order.offerOnly ? "$" + order.totalPrice : " - " }</Col>
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
                                toggle={order.availableStatus !== "available" ? () => {} : ::this.toggle}
                            >
                                <DropdownToggle
                                    className={order.availableStatus !== "available" ? "disabled" : ""}
                                    color={order.availableStatus !== "available" ? "secondary" : "info" }
                                    caret
                                >
                                    Actions
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem disabled={order.availableStatus !== "available" || order.offerOnly }>Buy</DropdownItem>
                                    <DropdownItem disabled={order.availableStatus !== "available"}>Send an Offer</DropdownItem>
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
    order: PropTypes.object.isRequired
};