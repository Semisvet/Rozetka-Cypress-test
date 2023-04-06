export function convertPriceTextToNumber(element) {
    const elementText = element.textContent;
    const priceText = elementText.replace(/\s/g, '').replace('₴', '');

    return parseInt(priceText);
}