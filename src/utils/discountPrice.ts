export const discountPrice = (price: number, discount?: number): number => {
  if (discount) {
    const discountedPrice = price - (price * discount) / 100;
    return parseFloat(discountedPrice.toFixed(2));
  }
  return parseFloat(price.toFixed(2));
};
