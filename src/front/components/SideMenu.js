/** Common */
import React, {Component} from 'react';

/** Components */
import { Collapse, Col, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink } from 'reactstrap';

/** Styles */
import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';

class SideMenu extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false
        };
    };

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render () {
        return (
            <Col lg={{ size: '3' }} md={{ size: '12' }} className="side-menu menu-wrapper" >
                <Navbar className="cm-bordered cm-content main-menu-wrapper" light expand="lg">
                    <NavbarBrand href="/" className="mr-auto d-lg-none">Account Menu</NavbarBrand>
                    <NavbarToggler onClick={::this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav vertical >
                            <NavLink className="sub-link text-secondary" href='/my/account'> My Account </NavLink>
                            <div className="dropdown-divider"/>
                            <NavLink className="sub-link text-secondary" href='/my/account/status-and-notifications'> Status & Notifications </NavLink>
                            <NavLink className="sub-link text-secondary" href='/my/account/kyc'> Know Your Client (KYC) </NavLink>
                            <NavLink className="sub-link text-secondary" href='/my/account/bank-wire-instructions'> Bank Wire Instructions </NavLink>
                            <div className="dropdown-divider"/>
                            <NavLink className="sub-link text-secondary" href='/catalog'> View OTC Order Book </NavLink>
                            <NavLink className="sub-link text-secondary" href='/catalog/create-new'> New Buy/Sell Contract </NavLink>
                            <NavLink className="sub-link text-secondary" href='/my/deliveries'> Grain Deliveries </NavLink>
                            <div className="dropdown-divider"/>
                            <NavLink className="sub-link text-secondary" href='/my/orders'> My Orders </NavLink>
                            <NavLink className="sub-link text-secondary" href='/my/offers'> My Offers </NavLink>
                            <NavLink className="sub-link text-secondary" href='/my/contracts'> My Contracts </NavLink>
                            <div className="dropdown-divider"/>
                            <NavLink className="sub-link text-secondary" href='/my/tracker'> ACTIONs Tracker </NavLink>
                            <NavLink className="sub-link text-secondary" href='/my/payments'> Payment History </NavLink>
                            <NavLink className="sub-link text-secondary" href='/forms-policies'> Forms & Policies </NavLink>
                            <NavLink className="sub-link text-secondary" href='/social'> Social & Coffee Chats </NavLink>
                        </Nav>
                    </Collapse>
                </Navbar>
            </Col>
        )
    }
}

export default SideMenu;