class DashboardPage {
    static getCategory(categoryName) {
        return cy.get('.fat-wrap .menu-categories__link').contains(categoryName);
    }
}

export default DashboardPage;