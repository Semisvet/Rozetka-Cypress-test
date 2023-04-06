import { convertPriceTextToNumber } from '../helpers/price';
import DashboardPage from '../pages/dashboard-page';
import ProductsListPage from '../pages/products-list-page';
import CategoriesPage from '../pages/categories-page';
import ProductDetailsPage from '../pages/product-details-page';
import HeaderElement from '../elements/header-element';
import CartElement from '../elements/cart-element';
import BodyElement from '../elements/body-element';

describe ('Rozetka', function () {
    const url = 'https://rozetka.com.ua/ua/';
    
    beforeEach(function () {
        cy.visit(url);

        cy.url().should('equal', url);
    });


    it('Verify if the price filter working correctly for the following marketplaces',  function () {
        const minPriceValue = 15000;
        const maxPriceValue = 20000;

        DashboardPage.getCategory('Побутова техніка').click();

        CategoriesPage.getSubCategory('Посудомийні машини').click();

        ProductsListPage.getFilterCheckbox('Electrolux').click({force: true});

        ProductsListPage.getFilterCheckbox('Повногабаритна (60 см)').click({force: true});

        ProductsListPage.getFilterCheckbox('Є в наявності').click({force: true});

        // split clear and type to avoid error
        ProductsListPage.getPriceFilterInput('min').clear();
        ProductsListPage.getPriceFilterInput('min').type(minPriceValue.toString());

        ProductsListPage.getPriceFilterInput('max').clear().type(maxPriceValue.toString());

        ProductsListPage.getPriceFilterButton().should('be.not.disabled').click({force: true});

        ProductsListPage.getSortingSelect().select('1: cheap');

        HeaderElement.getHeaderLoader().should('not.be.visible');

        BodyElement.getMainElement().should('not.have.class', 'preloader_type_element');

        ProductsListPage.getCatalogGrid().children().then((children) => {
            children.each((index, element) => {
                const valueElement = element.querySelector('.goods-tile__price-value');
                const price = convertPriceTextToNumber(valueElement);

                expect(price).be.above(minPriceValue);
                expect(price).be.below(maxPriceValue);

                if (index < children.length - 1) {
                    const nextElement = children[index + 1];
                    const nextElementValue = nextElement.querySelector('.goods-tile__price-value');
                    const nextElementPrice = convertPriceTextToNumber(nextElementValue);

                    expect(price).be.below(nextElementPrice);
                }
            })
        });
    });

    it('Add items to the basket', function () {
        DashboardPage.getCategory('Товари для геймерів').click();

        CategoriesPage.getHeadingSubCategory('Ігрові приставки').click();

        ProductsListPage.getProductPriceByIndex(1).then((element) => {
            const price = convertPriceTextToNumber(element[0]);

            cy.wrap(price).as('firstItemPrice');
        });

        ProductsListPage.getProductSelectButtonByIndex(1).click();

        HeaderElement.getCartBadge().should('contain', '1');

        HeaderElement.getHeaderLogoLink().click();

        DashboardPage.getCategory('Дача, сад і город').click();

        CategoriesPage.getSubCategory('Повітродуви').click();

        ProductsListPage.getProductPriceByIndex(2).then((element) => {
            const price = convertPriceTextToNumber(element[0]);

            cy.wrap(price).as('secondItemPrice');
        });

        ProductsListPage.getProductSelectButtonByIndex(2).click();

        HeaderElement.getCartBadge().should('contain', '2');

        HeaderElement.getOpenCartButton().click();

        CartElement.getCartProductActionButtonByIndex(0).click();

        CartElement.getCartProductDeleteButtonByIndex(0).should('be.visible').should('be.not.disabled');

        CartElement.getCartProductActionButtonByIndex(1).click();

        CartElement.getCartProductDeleteButtonByIndex(1).should('be.visible').should('be.not.disabled');

        CartElement.getCartSumPrice().then(element => {
            const sumPrice = convertPriceTextToNumber(element[0]);

            expect(sumPrice).be.equal(this.firstItemPrice + this.secondItemPrice);
        })
    });

    it('Search the item', function () {
        HeaderElement.getSearchInput().type('Холодильник{enter}');

        ProductsListPage.getAllProductsTitles().should('contain', 'Холодильник');
    });

    it('Check comments count [FAIL]', function () {
        DashboardPage.getCategory('Ноутбуки та комп’ютери').click();

        CategoriesPage.getHeadingSubCategory('Ноутбуки').click();

        ProductsListPage.getReviewCountByIndex(2).then(element => {
            const reviewsText = element[0].textContent;
            const reviewsNumber = reviewsText.replace('відгуків', '');

            cy.wrap(parseInt(reviewsNumber)).as('reviewsNumber');
        });

        ProductsListPage.getProductTitleImageLink(2).click();

        ProductDetailsPage.getReviewsCountLabel().then(element => {
            const reviewsText = element[0].textContent;

            // Failed test part
            expect(parseInt(reviewsText) + 100).to.equal(this.reviewsNumber);
        })
    });
});