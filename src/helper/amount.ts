export function formatAmount(amount: string): string {
  const value = Number(amount);

  if (Number.isNaN(value)) {
    return `$${amount}`;
  }

  return `$${value.toFixed(2)}`;
}

export function validateAmount(amount: string): boolean {
  const value = Number(amount);
  if (Number.isNaN(value)) {
    return true;
  }
  if (value < 0.01) {
    return true;
  }

  return false;
}

export const formatCurrencyAmount = (amount: number) =>
  new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
