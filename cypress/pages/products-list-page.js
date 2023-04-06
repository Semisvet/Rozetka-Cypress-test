class ProductsListPage {
    static getFilterCheckbox(dataId) {
        return cy.get(`[data-id="${dataId}"]`);
    }

    static getPriceFilterInput(name) {
        return cy.get(`.slider-filter__input[formcontrolname="${name}"]`);
    }

    static getPriceFilterButton() {
        return cy.get('.slider-filter__button');
    }

    static getSortingSelect() {
        return  cy.get('.catalog-settings__sorting > select');
    }

    static getCatalogGrid() {
        return cy.get('.catalog-grid');
    }

    static getProductPriceByIndex(index) {
        return cy.get(`.catalog-grid li:nth-child(${index}) .goods-tile__price-value`);
    }

    static getProductSelectButtonByIndex(index) {
        return cy.get(`.catalog-grid li:nth-child(${index}) .goods-tile__buy-button`);
    }

    static getAllProductsTitles() {
        return cy.get('.goods-tile__title');
    }

    static getReviewCountByIndex(index) {
        return cy.get(`.catalog-grid li:nth-child(${index}) .goods-tile__reviews-link`);
    }
    static getProductTitleImageLink(index) {
        return cy.get(`.catalog-grid li:nth-child(${index}) .goods-tile__picture`);
    }
}

export default ProductsListPage;