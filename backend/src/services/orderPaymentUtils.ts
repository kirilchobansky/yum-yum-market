export const calculateOrdersCount = (
  currentValue: unknown,
  quantity: unknown,
): number => {
  const safeCurrentValue = Number.isFinite(Number(currentValue))
    ? Number(currentValue)
    : 0;
  const safeQuantity = Number.isFinite(Number(quantity)) ? Number(quantity) : 0;

  return safeCurrentValue + safeQuantity;
};
