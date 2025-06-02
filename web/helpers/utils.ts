export function parsePriceToNumber(price: string): number {
    const parsed = parseFloat(price.replace(/[^0-9.]/g, ''));
    if (isNaN(parsed)) {
      throw new Error(`Unable to parse price from: "${price}"`);
    }
    return parsed;
}