class HeaderElement {
    static getCartBadge() {
        return cy.get('rz-cart .badge');
    }

    static getOpenCartButton() {
        return cy.get('.header__button[rzopencart]');
    }

    static getSearchInput() {
        return cy.get('.search-form__input');
    }

    static getHeaderLogoLink() {
        return cy.get('.header__logo');
    }

    static getHeaderLoader() {
        return cy.get('.preloader');
    }
}

export default HeaderElement;