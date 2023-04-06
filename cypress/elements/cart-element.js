class CartElement {
    static getCartProductActionButtonByIndex(index) {
        return cy.get(`#cartProductActions${index}`);
    }

    static getCartProductDeleteButtonByIndex(index) {
        return cy.get(`#cartProductActions${index} + .popup-menu__list--context button`)
    }

    static getCartSumPrice() {
        return cy.get('.cart-receipt__sum-price');
    }
}

export default CartElement;