describe ('Rozetka', ()=> {
    it('Verify if the price filter working correctly for the following marketplaces',  function () {

        cy.viewport(1388,1038);

        cy.visit("https://rozetka.com.ua/ua");

        cy.url().should('equal', "https://rozetka.com.ua/ua/");

        cy.get('.menu-categories_type_main li:nth-child(4) .menu-categories__link').click();

        cy.get('rz-dynamic-widgets > rz-widget-list:nth-child(3) > section > ul > li:nth-child(1) ul li:nth-child(3) a').click();

        cy.get('[data-id="Electrolux"]', {timeout: 10000}).click({force: true});

        cy.get('[data-id="Повногабаритна (60 см)"]', {timeout: 10000}).click({force: true});

        cy.get('[data-id="Є в наявності"]', {timeout: 10000}).click({force: true});

        cy.get('.slider-filter__input[formcontrolname="min"]').clear();
        cy.get('.slider-filter__input[formcontrolname="min"]').type('15000');

        cy.get('.slider-filter__input[formcontrolname="max"]').clear().type('20000');

        cy.get('.slider-filter__button').should('be.not.disabled').click({force: true});

        cy.get('.catalog-settings__sorting > select', {timeout: 10000}).select('1: cheap');

        cy.get('.preloader', {timeout: 10000}).should('not.be.visible');
        cy.get('main', {timeout: 10000}).should('not.have.class', 'preloader_type_element');

        cy.get('.catalog-grid').children().then((children) => {
            children.each((index, element) => {
                const text = element.querySelector('.goods-tile__price-value').textContent;
                const price = text.replace(/\s/g, '').replace('₴', '');

                expect(parseInt(price)).be.above(15000);
                expect(parseInt(price)).be.below(20000);

                if (index < children.length - 1) {
                    const nextElement = children[index + 1];
                    const nextElementText = nextElement.querySelector('.goods-tile__price-value').textContent
                    const nextElementPrice = nextElementText.replace(/\s/g, '').replace('₴', '');

                    expect(parseInt(price)).be.below(parseInt(nextElementPrice));
                }
            })
        });
    });

    it('Add items to the basket', function () {
        cy.viewport(1388,1038);

        cy.visit("https://rozetka.com.ua/ua");

        cy.url().should('equal', "https://rozetka.com.ua/ua/");

        cy.get('.fat-wrap .menu-categories__link').contains('Товари для геймерів').click();

        cy.get('.tile-cats__heading[title="Ігрові приставки"]').click();

        cy.get('.catalog-grid li:nth-child(1) .goods-tile__price-value').then((element) => {
            const text = element[0].textContent;
            const price = text.replace(/\s/g, '').replace('₴', '');

            cy.wrap(parseInt(price)).as('firstItemPrice');
        });

        cy.get('.catalog-grid li:nth-child(1) .goods-tile__buy-button').click();

        cy.get('rz-cart .badge').should('contain', '1');

        cy.get('.header__logo').click();

        cy.get('.fat-wrap .menu-categories__link').contains('Дача, сад і город').click();

        cy.get('[title="Повітродуви"]').click();

        cy.get('.catalog-grid li:nth-child(2) .goods-tile__price-value').then((element) => {
            const text = element[0].textContent;
            const price = text.replace(/\s/g, '').replace('₴', '');

            cy.wrap(parseInt(price)).as('secondItemPrice');
        });

        cy.get('.catalog-grid li:nth-child(2) .goods-tile__buy-button').click();

        cy.get('rz-cart .badge').should('contain', '2');

        cy.get('.header__button[rzopencart]').click();

        cy.get('#cartProductActions0').click();

        cy.get('#cartProductActions0 + .popup-menu__list--context button').should('be.visible').should('be.not.disabled');

        cy.get('#cartProductActions1').click();

        cy.get('#cartProductActions1 + .popup-menu__list--context button').should('be.visible').should('be.not.disabled');

        cy.get('.cart-receipt__sum-price').then(element => {
            const text = element[0].textContent;
            const price = text.replace(/\s/g, '').replace('₴', '');
            const sumPrice = parseInt(price);

            expect(sumPrice).be.equal(this.firstItemPrice + this.secondItemPrice);
        })
    });

    it('Search the item', function () {
        cy.viewport(1388,1038);

        cy.visit("https://rozetka.com.ua/ua");

        cy.url().should('equal', "https://rozetka.com.ua/ua/");

        cy.get('.search-form__input').type('Холодильник{enter}');

        cy.get('.goods-tile__title').should('contain', 'Холодильник');
    });

    it('Check comments count [FAIL]', function () {
        cy.viewport(1388,1038);

        cy.visit("https://rozetka.com.ua/ua");

        cy.url().should('equal', "https://rozetka.com.ua/ua/");

        cy.get('.fat-wrap .menu-categories__link').contains('Ноутбуки та комп’ютери').click();

        cy.get('.tile-cats__heading[title="Ноутбуки"]').click();

        cy.get('.catalog-grid li:nth-child(2) .goods-tile__reviews-link').then(element => {
            const reviewsText = element[0].textContent;
            const reviewsNumber = reviewsText.replace('відгуків', '');

            cy.wrap(parseInt(reviewsNumber)).as('reviewsNumber');
        });

        cy.get('.catalog-grid li:nth-child(2) .goods-tile__picture').click();

        cy.get('.tabs__list .tabs__item:nth-child(3) .tabs__link-text').then(element => {
            const reviewsText = element[0].textContent;

            // Failed test part
            expect(parseInt(reviewsText) + 100).to.equal(this.reviewsNumber);
        })
    });
});