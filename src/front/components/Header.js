import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Row, Col, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, DropdownToggle, DropdownMenu, UncontrolledDropdown} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/Header.sass';

let links = [
    {
        toggler: "Buy / Sell",
        links: [
            { link: "/learn-the-process", label: "Learn the Process" },
            { link: "/catalog", label: "Buy Grains" },
            { link: "/sell", label: "Sell Grains - New Sell Contract" },
            { divider: true },
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
            { divider: true },
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
            { divider: true },
            { link: "/membership-benefits", label: "Membership Benefits" },
            { link: "/become-a-member", label: "Become a Member" },
            { link: "/membership-events", label: "Membership Events" },
            { link: "/membership-vision", label: "Membership Vision 2020" },
            { divider: true },
            { link: "/contact-us", label: "Contact us" }
        ]
    }
];

export default class Header extends React.Component {
    static propTypes = {
        isFixed: PropTypes.bool,
        topLinks: PropTypes.arrayOf(
            PropTypes.shape({
                toggler: PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    link: PropTypes.string,
                }).isRequired,
                links: PropTypes.arrayOf(PropTypes.oneOfType([
                    PropTypes.shape({
                        label: PropTypes.string.isRequired,
                        link: PropTypes.string.isRequired,
                    }),
                    PropTypes.shape({
                        divider: PropTypes.bool.isRequired
                    })
                ])).isRequired
            })
        ),
        bottomLinks: PropTypes.arrayOf(
            PropTypes.shape({
                toggler: PropTypes.shape({
                    label: PropTypes.string.isRequired,
                    link: PropTypes.string,
                }).isRequired,
                links: PropTypes.arrayOf(PropTypes.oneOfType([
                    PropTypes.shape({
                        label: PropTypes.string.isRequired,
                        link: PropTypes.string.isRequired,
                    }),
                    PropTypes.shape({
                        divider: PropTypes.bool.isRequired
                    })
                ])).isRequired
            })
        )
    };

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

    render() {
        const isFixed = this.props.isFixed;
        const topLinks = this.props.topLinks;
        const bottomLinks = this.props.bottomLinks;

        let linksTplRender = function (links) {
            let tpl;
            if (links) {
                tpl = links.map(function (item, index) {
                    return <SubMenu key={index} toggler={item.toggler} links={item.links}/>
                });
                tpl = <div className="nav-group clearfix"><Nav navbar className="nav-row">{ tpl }</Nav></div>
            } else {
                tpl = <div />;
            }
            return tpl;
        };

        return (
            <header className="header">
                <Navbar className='main-menu-wrapper' fixed={ isFixed !== undefined ? "top" : '' } color="faded" light expand="lg">
                    <Container>
                        <NavbarBrand href="/" className="mr-auto">GrainStore</NavbarBrand>
                        <NavbarToggler onClick={::this.toggleNavbar} className="mr-2" />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Container>
                                {linksTplRender(topLinks)}
                                {linksTplRender(bottomLinks)}
                            </Container>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}

class SubMenu extends React.Component {
    static propTypes = {
        toggler: PropTypes.shape({
            label: PropTypes.string.isRequired,
            link: PropTypes.string,
        }).isRequired,
        links: PropTypes.arrayOf(PropTypes.oneOfType([
            PropTypes.shape({
                label: PropTypes.string.isRequired,
                link: PropTypes.string.isRequired,
            }),
            PropTypes.shape({
                divider: PropTypes.bool.isRequired
            })
        ])).isRequired
    };

    render() {
        let links = this.props.links;
        let linkTpl = links.map(function(item, index) {
            let tpl;
            if (item.divider !== undefined) {
                tpl = <div key={index} className="divider"/>;
            } else {
                tpl = <NavLink key={index} href={item.link}>{item.label}</NavLink>
            }
            return	tpl
        });
        return (
            <UncontrolledDropdown nav inNavbar size="lg">
                <DropdownToggle nav caret>
                    {/*<NavLink href={this.props.toggler.link !== undefined ? this.props.toggler.link : ""} >{ this.props.toggler.label }</NavLink>*/}
                    { this.props.toggler.label }
                </DropdownToggle>
                <DropdownMenu right>
                    <Nav vertical>
                        {linkTpl}
                    </Nav>
                </DropdownMenu>
            </UncontrolledDropdown>
        );
    }
}