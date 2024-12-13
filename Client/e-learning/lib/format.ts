export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vn-D", {
    style: "currency",
    currency: "USD",
  }).format(price);
};
