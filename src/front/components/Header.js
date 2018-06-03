import React from 'react';
import PropTypes from 'prop-types';
import { Collapse, Container, Row, Col, Navbar, NavbarToggler, NavbarBrand, Nav, NavLink, DropdownToggle, DropdownMenu, UncontrolledDropdown} from 'reactstrap';

import 'bootstrap/dist/css/bootstrap-reboot.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/Common.sass';
import '../styles/Header.sass';

export default class Header extends React.Component {
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
        const bottomLinks = this.props.bottomLinks;
        const topLinks = this.props.topLinks;
        const user = this.props.user;

        const renderTop = function (topLinks) {
            let tpl;
            if (topLinks) {
                console.log(user);
                return '';
                tpl = topLinks.map(function (item, index) {
                    return <SubMenu key={index} toggler={item.toggler} links={item.links}/>
                });
                tpl = <div className="nav-group clearfix"><Nav navbar className="nav-row">{ tpl }</Nav></div>
            } else {
                tpl = <div />;
            }
            return tpl;
        };

        const renderBottom = function () {
            let tpl;
            if (bottomLinks) {
                tpl = bottomLinks.map(function (item, index) {
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
                                { renderTop(topLinks) }
                                { renderBottom(bottomLinks) }
                            </Container>
                        </Collapse>
                    </Container>
                </Navbar>
            </header>
        );
    }
}
Header.propTypes = {
    isFixed: PropTypes.bool,
    user: PropTypes.shape,
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
}

class SubMenu extends React.Component {
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
SubMenu.propTypes = {
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
}