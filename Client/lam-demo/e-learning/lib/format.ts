export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("vn-VN", {
    style: "currency",
    currency: "VND",
  }).format(price);
};
