import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, Dropdown, DropdownToggle, DropdownMenu, UncontrolledDropdown} from 'reactstrap';

import './Header.sass';

let links = [
    {
        toggler: "Buy / Sell",
        links: [
            { link: "/learn-the-process", label: "Learn the Process" },
            { link: "/catalog", label: "Buy Grains" },
            { link: "/sell", label: "Sell Grains - New Sell Contract" },
            { link: "/terms", label: "Standard Terms - Contracts" },
            { link: "/counterparty-risk-management", label: "Clearing: Counterparty Risk Management" },
            { link: "/physical-delivery", label: "Physical Delivery" },
            { link: "/contract-defaults", label: "Contract Defaults" }
        ]
    },
    {
        toggler: "Explore",
        links: [
            { link: "/grains-overview", label: "Grains Overview" },
            { link: "/learn-about-the-market", label: "Learn about the Market" },
            { link: "/what-is-a-sell-otc-contract", label: "What is a Sell OTC Contract" },
            { link: "/learn-our-platform-strategies", label: "Learn our Platform Strategies" },
            { link: "/understand-the-risks", label: "Understand the risks" }
        ]
    },
    {
        toggler: "Community",
        links: [
            { link: "/why-use-our-platform", label: "Why use our Platform" },
            { link: "/about", label: "About XYZ inc" },
            { link: "/roadmap", label: "2020 Roadmap" },
            { link: "/membership-benefits", label: "Membership Benefits" },
            { link: "/become-a-member", label: "Become a Member" },
            { link: "/membership-events", label: "Membership Events" },
            { link: "/membership-vision", label: "Membership Vision 2020" }
        ]
    }
];

export default class Header extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isOpen: false,
            dropdownOpen: false
        };
    };

    toggleNavbar() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    render() {
        return (
            <header className="fixed-top main-menu">
                <Navbar className='main-menu-wrapper' color="faded" light expand="lg">
                    <NavbarBrand href="/" className="mr-auto">GrainStore</NavbarBrand>
                    <NavbarToggler onClick={::this.toggleNavbar} className="mr-2" />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav navbar className="ml-auto">
                            <SubMenu toggler={links[0].toggler} links={links[0].links}/>
                            <SubMenu toggler={links[1].toggler} links={links[1].links}/>
                            <SubMenu toggler={links[2].toggler} links={links[2].links}/>
                        </Nav>
                    </Collapse>
                </Navbar>
            </header>
        );
    }
}

class SubMenu extends React.Component {
    propTypes = {
        toggler: PropTypes.string.isRequired,
        links: PropTypes.arrayOf(PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string.isRequired,
        })).isRequired
    };

    render() {
        let links = this.props.links;
        let linkTpl = links.map(function(item, index) {
            return	(
                <NavItem><NavLink href={item.link}>{item.label}</NavLink></NavItem>
            )
        });
        return (
            <UncontrolledDropdown nav inNavbar size="lg">
                <DropdownToggle nav caret>{this.props.toggler}</DropdownToggle>
                <DropdownMenu right>
                    <Nav vertical>
                        {linkTpl}
                    </Nav>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}