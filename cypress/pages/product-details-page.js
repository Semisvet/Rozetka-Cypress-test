class ProductDetailsPage {
    static getReviewsCountLabel() {
        return cy.get('.tabs__list .tabs__item:nth-child(3) .tabs__link-text');
    }
}

export default ProductDetailsPage;