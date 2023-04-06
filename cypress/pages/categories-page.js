class CategoriesPage {
    static getSubCategory(subCategoryName) {
        return cy.get(`.tile-cats__item [title="${subCategoryName}"]`);
    }

    static getHeadingSubCategory(subCategoryName) {
        return cy.get(`.tile-cats__heading[title="${subCategoryName}"]`);
    }
}

export default CategoriesPage;