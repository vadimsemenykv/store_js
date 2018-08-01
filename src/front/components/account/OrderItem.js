/** Common */
import React from 'react';
import PropTypes from 'prop-types';
import DefaultForm from '../../forms/DefaultForm';
import validator from 'validator';
import {numberWithCommas} from '../../utils/formater';

/** Components */
import {
    Badge, Button,
    ButtonDropdown,
    Col,
    Collapse, CustomInput,
    DropdownItem,
    DropdownMenu,
    DropdownToggle, Form, FormFeedback, FormGroup, Input, Label, Popover, PopoverBody, PopoverHeader,
    Row
} from 'reactstrap';
import PreloaderIcon from 'react-preloader-icon';
import Oval from 'react-preloader-icon/loaders/Oval';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/Common.sass';
import '../../styles/CatalogItem.sass';
import '../../styles/CreateOrderForm.sass';
import '../../styles/account/OrderItem.sass';

export default class OrderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            dropdownOpen: false,
            formOpen: false,
            quantityPopoverOpen: false,
            data: this.getClearOrderState(),
            interacted: {}
        };
    }

    getClearOrderState() {
        return {
            price: this.props.order.price,
            quantity: this.props.order.quantity,
            offerOnly: this.props.order.offerOnly
        };
    }

    toggleMenu() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    toggleForm() {
        this.setState({ formOpen: !this.state.formOpen, data: this.getClearOrderState(), interacted: {} });
    }

    toggleQuantityPopover() {
        this.setState({ quantityPopoverOpen: !this.state.quantityPopoverOpen });
    }

    handleChangeCheckOfferOnly() {
        this.setState({data: {...this.state.data, offerOnly: !this.state.data.offerOnly}});
    }

    handleChangeInput(e) {
        const name = e.target.name;
        const value = e.target.value;
        this.setState({data: {...this.state.data, [name]: value}});
    }

    handleFocusOut(e) {
        this.setState({interacted: {...this.state.interacted, [e.target.name]: true}});
        this.forceUpdate();
    }

    collectData() {
        let data = {
            offerOnly: !!this.state.data.offerOnly,
            price: '' + (this.state.data.price ? this.state.data.price : ''),
            quantity: '' + (this.state.data.quantity ? this.state.data.quantity : '')
        };
        if (this.state.data.offerOnly) {
            data.price = '';
        }
        return data;
    }

    collectDataForValidation() {
        let data = this.collectData();
        delete data.offerOnly;
        if (this.state.data.offerOnly) {
            delete data.price;
        }
        return data;
    }

    validate() {
        let validators = OrderItem.rules();
        if (this.state.data.offerOnly) {
            delete validators.price;
        }
        return DefaultForm.validate(this.collectDataForValidation(), validators);
    }

    changeOrderActivationStatus() {
        this.props.changeStatus({
            id: this.props.order._id,
            status: this.props.order.status === 'active' ? 'deactivated' : 'active'
        });
    }

    save() {
        if (parseFloat(this.state.data.price) === parseFloat(this.props.order.price)
            && parseInt(this.state.data.quantity, 10) === parseInt(this.props.order.quantity, 10)
            && !!this.state.data.offerOnly === !!this.props.order.offerOnly
        ) {
            this.toggleForm();
            return;
        }

        if (Object.getOwnPropertyNames(this.validate()).length > 0) {
            this.setState({
                interacted: {
                    price: true,
                    quantity: true
                }
            });
            return;
        }

        this.props.changeOrder({
            id: this.props.order._id,
            data: this.collectData()
        });
        this.toggleForm();
    }

    render() {
        const errors = this.validate();

        const order = this.props.order;
        const id = order._id.toString();

        const price = this.state.data.price ? this.state.data.price : 0;
        const quantity = this.state.data.quantity ? this.state.data.quantity : 0;
        const totalPrice = !Number.isNaN(price * quantity) ? Math.round(price * quantity * 100) / 100 : 0;
        const offerOnly = this.state.data.offerOnly;

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

        let preloader = '';
        if (order.requestLoading) {
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

        return (
            <Row className="catalog-item">
                <Col>
                    {preloader}
                    <Row className="item-cell-row">
                        <Col className="item-id">
                            Order ID: { id }
                        </Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Type: <span className={ order._type === 'buy' ? 'text-success' : 'text-info' }>{ order._type === 'buy' ? 'Buy' : 'Sell' }</span></Col>
                        <Col>Currency: { order.currency.title }</Col>
                        <Col>Collection: { order.categoryCollection.title }</Col>
                    </Row>
                    <Row className="item-cell-row">
                        <Col>Price: { !order.offerOnly ? '$' + numberWithCommas(order.price) : 'Offer Only' }</Col>
                        <Col>Quantity: { order.quantity }</Col>
                        <Col>Order Total: { !order.offerOnly ? '$' + numberWithCommas(order.totalPrice) : ' - ' }</Col>
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
                                toggle={order.availableStatus !== 'available' ? () => {} : ::this.toggleMenu}
                            >
                                <DropdownToggle
                                    className={order.availableStatus !== 'available' ? 'disabled' : ''}
                                    color={order.availableStatus !== 'available' ? 'secondary' : 'info' }
                                    caret
                                >
                                    Actions
                                </DropdownToggle>
                                <DropdownMenu>
                                    <DropdownItem onClick={::this.toggleForm} disabled={this.state.formOpen}>Edit</DropdownItem>
                                    <DropdownItem onClick={::this.changeOrderActivationStatus}>{order.status === 'active' ? 'Deactivate' : 'Activate'}</DropdownItem>
                                </DropdownMenu>
                            </ButtonDropdown>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Collapse isOpen={this.state.formOpen}>
                                <Form>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="form-text label float-right">Price</Label></Col>
                                            <Col xs={{ size: 8 }}>
                                                <Input
                                                    type="text" name="price"
                                                    disabled={offerOnly}
                                                    value={this.state.data.price}
                                                    onChange={ ::this.handleChangeInput }
                                                    onBlur={ ::this.handleFocusOut }
                                                    invalid={ this.state.interacted.price && !!errors.price }
                                                />
                                                { this.state.interacted.price ? OrderItem.formateFormErrorFeedback('price', errors) : '' }
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={{ size: 4 }}><div className="form-text float-right">Price - "Offer Only"</div></Col>
                                            <Col xs={{ size: 8 }}>
                                                <CustomInput
                                                    id={'offerOnly_' + id} type="checkbox" className="cm-hidden-text checkbox" inline bsSize="lg" label=""
                                                    name="offerOnly"
                                                    checked={offerOnly}
                                                    onChange={::this.handleChangeCheckOfferOnly}
                                                />
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="form-text label float-right">Quantity</Label></Col>
                                            <Col xs={{ size: 8 }}>
                                                <Popover placement="top" isOpen={this.state.quantityPopoverOpen} target={'quantity-input_' + id} toggle={::this.toggleQuantityPopover}>
                                                    <PopoverHeader className="bg-warning">Warning!</PopoverHeader>
                                                    <PopoverBody>When changing the value of quantity, it is necessary to re-pass the verification.</PopoverBody>
                                                </Popover>
                                                <Input
                                                    id={'quantity-input_' + id}
                                                    text="select" name="quantity"
                                                    onFocus={::this.toggleQuantityPopover}
                                                    value={this.state.data.quantity}
                                                    onChange={ ::this.handleChangeInput }
                                                    onBlur={ ::this.handleFocusOut }
                                                    invalid={ this.state.interacted.quantity && !!errors.quantity }
                                                />
                                                { this.state.interacted.quantity ? OrderItem.formateFormErrorFeedback('quantity', errors) : '' }
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <FormGroup>
                                        <Row>
                                            <Col xs={{ size: 4 }}><Label className="form-text label float-right">Order Total</Label></Col>
                                            <Col xs={{ size: 8 }} className={'total-value'}>
                                                {offerOnly ? '' : totalPrice}
                                            </Col>
                                        </Row>
                                    </FormGroup>
                                    <div>
                                        <Button onClick={::this.save} color="success">Save</Button>{' '}
                                        <Button onClick={::this.toggleForm} color="warning">Cancel</Button>
                                    </div>
                                </Form>
                            </Collapse>
                        </Col>
                    </Row>
                </Col>
            </Row>
        );
    }
}

OrderItem.propTypes = {
    order: PropTypes.object.isRequired,
    changeStatus: PropTypes.func.isRequired,
    changeOrder: PropTypes.func.isRequired
};

OrderItem.formateFormErrorFeedback = (field, errors = []) => {
    if (errors && errors[field] && errors[field][0]) {
        return <FormFeedback key={0} >{ errors[field][0] }</FormFeedback>;
    }
    return '';
};

//TODO move rules to another file(All rules in one place)
OrderItem.rules = () => {
    return {
        price: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Price is required'
            },
            {
                rule: (value) => validator.isDecimal(value, { min: 1 }),
                message: 'Price must be a decimal'
            }
        ],
        quantity: [
            {
                rule: (value) => validator.isByteLength(value, { min: 1 }),
                message: 'Quantity is required'
            },
            {
                rule: (value) => validator.isInt(value, { min: 1 }),
                message: 'Quantity must be an integer and must be grater or equal 1'
            }
        ]
    };
};
