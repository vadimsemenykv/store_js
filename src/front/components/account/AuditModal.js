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
            auditModal: false
        };
    }

    toggleAuditModal() {
        this.setState({
            auditModal: !this.state.auditModal
        });
    }

    render() {
        const auditTpl = this.state.auditEvents.map((auditEvent, index) => {
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

AuditModal.propTypes = {
    auditEvents: PropTypes.array.isRequired
};
