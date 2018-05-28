import {urlFor} from 'express-named-router-url-generator';

function getLinksState() {
    const headerBottom = [
        {
            toggler: { label: "Buy / Sell" },
            links: [
                { link: urlFor('pages', { name: "learn-the-process"}), label: "Learn the Process" },
                { link: urlFor('pages', { name: "catalog"}), label: "Buy Grains" },
                { link: urlFor('pages', { name: "sell"}), label: "Sell Grains - New Sell Contract" },
                { divider: true },
                { link: urlFor('pages', { name: "terms"}), label: "Standard Terms - Contracts" },
                { link: urlFor('pages', { name: "counterparty-risk-management"}), label: "Clearing: Counterparty Risk Management" },
                { link: urlFor('pages', { name: "physical-delivery"}), label: "Physical Delivery" },
                { link: urlFor('pages', { name: "contract-defaults"}), label: "Contract Defaults" }
            ]
        },
        {
            toggler: { label: "Explore" },
            links: [
                { link: urlFor('pages', { name: "grains-overview"}), label: "Grains Overview" },
                { link: urlFor('pages', { name: "learn-about-the-market"}), label: "Learn about the Market" },
                { divider: true },
                { link: urlFor('pages', { name: "what-is-a-sell-otc-contract"}), label: "What is a Sell OTC Contract" },
                { link: urlFor('pages', { name: "learn-our-platform-strategies"}), label: "Learn our Platform Strategies" },
                { link: urlFor('pages', { name: "understand-the-risks"}), label: "Understand the risks" }
            ]
        },
        {
            toggler: { label: "Community" },
            links: [
                { link: urlFor('pages', { name: "why-use-our-platform"}), label: "Why use our Platform" },
                { link: urlFor('pages', { name: "about"}), label: "About XYZ inc" },
                { link: urlFor('pages', { name: "roadmap"}), label: "2020 Roadmap" },
                { divider: true },
                { link: urlFor('pages', { name: "membership-benefits"}), label: "Membership Benefits" },
                { link: urlFor('pages', { name: "become-a-member"}), label: "Become a Member" },
                { link: urlFor('pages', { name: "membership-events"}), label: "Membership Events" },
                { link: urlFor('pages', { name: "membership-vision"}), label: "Membership Vision 2020" },
                { divider: true },
                { link: urlFor('pages', { name: "contact-us"}), label: "Contact us" }
            ]
        }
    ];

    const footer = headerBottom;
    const login = [
        {
            toggler: { label: "Log In", link: '/' },
            links: [
                { link: getLoginUrl(), label: "Sign In" },
                { link: getRegistrationUrl(), label: "New memberships" }
            ]
        }
    ];

    return {
        header: {
            top: login,
            bottom: headerBottom
        },
        footer: footer,
        loginUrl: getLoginUrl(),
        registrationUrl: getRegistrationUrl()
    };
}


export default getLinksState;

export function getLoginUrl() {
    return urlFor('login');
}
export function getRegistrationUrl() {
    return urlFor('registration');
}